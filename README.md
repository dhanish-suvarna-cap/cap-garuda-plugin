# cap-garuda-plugin

AI-powered Pre-Dev documentation and Dev execution pipelines for **garuda-ui** (Capillary Loyalty Frontend).

This plugin provides two fully independent pipelines:

- **Pre-Dev**: AI-generated HLD and LLD documents, written directly to Confluence
- **Dev**: AI-driven code generation with visual QA and test writing

---

## Quick Install

From the garuda-ui repo root:

```bash
./cap-garuda-plugin/install.sh .
```

The script is idempotent — safe to run multiple times. It copies commands, agents, skills, and schemas into your repo's `.claude/` directory.

---

## Pipeline 1: Pre-Dev

### Full Pipeline

```bash
/pre-dev CAP-12345 --transcript=/path/to/grooming-transcript.txt --figma=fileId:frameId --confluence-space=LOYALTY
```

**What happens:**

1. Fetches Jira ticket, PRD (Google Doc/Confluence/Jira), transcript, Figma design
2. Scans codebase for existing components, endpoints, Redux slices
3. Generates HLD and writes to Confluence
4. **Pauses for human review** — review on Confluence, provide feedback or approve
5. Stops — awaiting backend team's HLD and API signatures
6. Run `/generate-lld` when backend inputs are ready
7. Generates LLD and test case sheet, writes both to Confluence

### Standalone Commands

```bash
# Regenerate HLD with feedback
/generate-hld CAP-12345 --feedback="Split the config task into two parallel tasks"

# Generate LLD after backend provides inputs
/generate-lld CAP-12345 --backend-hld=<confluence-page-id> --confluence-space=LOYALTY

# Just fetch context without starting pipeline
/fetch-context CAP-12345 --transcript=/path/to/transcript.txt
```

### Human Checkpoints

| When                       | What You Do                                    |
| -------------------------- | ---------------------------------------------- |
| After HLD generation       | Review on Confluence, approve or give feedback |
| After Phase 4              | Provide backend HLD + API signatures           |
| After LLD generation       | Review on Confluence, approve or give feedback |
| After test case generation | Review test cases, add/remove as needed        |

---

## Pipeline 2: Dev

### Full Pipeline

```bash
/dev-execute --lld=<confluence-page-id> --figma=fileId:frameId --organism=app/components/organisms/MyFeature
```

**What happens:**

1. Loads LLD from Confluence (or local file), Figma data, extra context
2. Deep-reads target organism structure (or reference organisms if creating new)
3. Creates file-by-file coding plan
4. **Pauses for plan approval** — review and approve
5. Generates source code (10 organism files in dependency order)
6. Visual QA: screenshots app, compares with Figma, auto-fixes up to 3 iterations
7. Writes unit tests (if requested) targeting >90% coverage
8. Runs tests and reports coverage

### Resume from a Specific Phase

```bash
# Resume from code generation (skips context loading, comprehension, planning)
/dev-execute --from=code_generation

# Resume from visual QA only
/dev-execute --from=visual_qa
```

### Input Options

| Flag           | Description                           | Example                                           |
| -------------- | ------------------------------------- | ------------------------------------------------- |
| `--lld`      | Confluence page ID or local file path | `--lld=123456` or `--lld=./lld.json`          |
| `--figma`    | Figma file and frame IDs              | `--figma=abcdef:12345`                          |
| `--context`  | Extra .md or .json files              | `--context=./notes.md,./api-spec.json`          |
| `--organism` | Target organism path                  | `--organism=app/components/organisms/MyFeature` |
| `--from`     | Resume from phase                     | `--from=visual_qa`                              |

### Human Checkpoints

| When                  | What You Do                                |
| --------------------- | ------------------------------------------ |
| After planning        | Review plan summary, type "yes" to approve |
| After visual QA       | Review discrepancy report                  |
| After test evaluation | Accept coverage or request more tests      |

---

## MCP Requirements

### Required

| MCP                 | Purpose                              |
| ------------------- | ------------------------------------ |
| mcp-atlassian       | Jira tickets + Confluence read/write |
| framelink-figma-mcp | Figma design data + image export     |
| cap-ui-library-mcp  | Cap* component documentation         |
| Claude Preview      | Visual QA (dev server screenshots)   |

### Optional

| MCP          | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| Google Drive | Fetch PRD from Google Docs (fallback: Jira description) |

---

## Workspace Structure

### Pre-Dev (per ticket)

```
.claude/pre-dev-workspace/CAP-12345/
  pre_dev_state.json          # Pipeline state
  context_bundle.json         # Fetched inputs
  hld_artifact.json           # HLD (local copy)
  lld_artifact.json           # LLD (local copy)
  testcase_sheet.json         # Test cases
  backend_hld.md              # User-placed backend docs
  api_signatures.json         # User-placed API specs
```

### Dev (per session)

```
.claude/dev-workspace/dev-20260331-143022/
  dev_state.json              # Pipeline state
  dev_context.json            # Loaded LLD + Figma + context
  comprehension.json          # Codebase analysis
  plan.json                   # Coding plan
  generation_report.json      # Files created/modified
  visual_qa_report.json       # Figma comparison
  test_report.json            # Jest results
```

Both workspaces are gitignored and safe to delete between runs.

### Session Journal (NEW in v2)

Each workspace also contains a `session_journal.md` — a human-readable log updated after every phase:

```
.claude/pre-dev-workspace/CAP-12345/
  requirements_context.md       # User's requirements, use cases, decisions
  session_journal.md            # Auto-updated phase-by-phase execution log
  ...

.claude/dev-workspace/dev-20260331-143022/
  requirements_context.md       # Feature description, key decisions
  session_journal.md            # Auto-updated phase-by-phase execution log
  ...
```

These files enable **resume across sessions** — if Claude's quota runs out, terminal closes, or you need to pick up tomorrow, just re-run the command. It reads the journal and state file to restore context.

---

## Guardrails

Every agent has an **Exit Checklist** — validation checks it must pass before writing output. Every command has **Gate Checks** — the orchestrator validates agent output before proceeding to the next phase.

If guardrails detect issues:
- Fixable issues: agent fixes them automatically before writing output
- Unfixable issues: logged to `guardrail_warnings` in the output JSON and printed to user
- Critical failures: pipeline stops with clear error message

---

## Resume & Recovery

### Automatic Resume

All pipelines support resume. Just re-run the same command:

```bash
# Re-run after interruption — auto-detects existing state and resumes
/pre-dev CAP-12345

# Or explicitly resume from a specific phase
/dev-execute --from=code_generation
```

### What Survives Interruptions

| Scenario | What's Preserved | How to Resume |
|----------|-----------------|---------------|
| Context overflow mid-agent | State JSON + completed files | Orchestrator auto-retries |
| Quota limit hit | State JSON + journal + all disk files | Re-run command |
| Terminal closed | State JSON + journal + all disk files | Re-run command |
| Computer restart | State JSON + journal + all disk files | Re-run command |

### How It Works

1. **State files** (`pre_dev_state.json`, `dev_state.json`) track phase status, summaries, and `recovery.can_resume_from`
2. **Requirements context** (`requirements_context.md`) captures the user's original prompt, functional requirements, use cases, and checkpoint decisions — so Claude knows WHAT is being built
3. **Session journal** (`session_journal.md`) provides phase-by-phase execution history — so Claude knows WHAT happened
4. **Incremental writes** (code-generator saves after each file via `generation_report.json`)
5. On resume: command reads state + requirements + journal, prints all three, skips completed phases

---

## Shared Rules & Config

### `skills/shared-rules.md`
Single source of truth for all non-negotiable coding patterns. Agents reference this instead of embedding rules inline. Covers: organism anatomy, compose chain, action types, Cap* imports, ImmutableJS, bugsnag, test imports, coverage targets, etc.

### `skills/config.md`
All configurable values in one place. Change a value here and all agents/commands pick it up. Covers: ports, URLs, Confluence space, coverage thresholds, retry limits, chunk sizes, bandwidth defaults, etc.

---

## Context Overflow Protection

The plugin is designed to handle Claude's context window limits:

1. **Small focused agents** — each does one thing, fresh context per agent
2. **Incremental file writes** — code-generator saves after each file, enabling recovery
3. **Transcript chunking** — 30k+ word transcripts processed in 5k-word chunks
4. **State file recovery** — orchestrators detect partial outputs and resume

---

## Skills (Auto-Triggered)

These skills are automatically loaded when relevant topics come up.

### Utility Skills

| Skill               | Triggers On                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| cap-ui-components   | "CapSelect", "CapButton", "cap-ui-library" — Top-15 Cap* component usage guide with prop examples |
| atomic-design-rules | "which layer", "atom molecule organism" — Decision flowchart for atom/molecule/organism/page      |
| hld-template        | "create HLD", "HLD template" — Confluence page structure for HLD                                  |
| lld-template        | "create LLD", "LLD template" — Confluence page structure for LLD                                  |

### Coding DNA Skills (Capillary Standards)

These are comprehensive coding standards extracted from the Capillary UI team's coding-dna documentation. Each skill has a SKILL.md summary and detailed reference files (ref-*.md) for deep dives.

| Skill                    | Coverage                                                                                                  | Used By Agents                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| coding-dna-architecture  | Tech stack, banned packages, file structure, import order, naming conventions                             | codebase-scout, hld-generator, lld-generator, dev-planner, code-generator |
| coding-dna-components    | Component anatomy, HOC composition, props rules, hooks, conditional rendering, memoization                | lld-generator, dev-planner, code-generator                                |
| coding-dna-styling       | Design tokens (CAP_SPACE/CAP_G/FONT_SIZE), styled-components patterns, class naming, Ant Design overrides | visual-qa, code-generator                                                 |
| coding-dna-state-and-api | State decision tree, Redux three-state pattern, saga patterns, API client, form handling, auth/RBAC       | hld-generator, lld-generator, dev-planner, code-generator                 |
| coding-dna-testing       | Testing stack (Jest/RTL/MSW/saga-test-plan), test patterns, mocking strategies, test data organization    | testcase-generator, test-writer                                           |
| coding-dna-quality       | Error handling (4 layers), Bugsnag, git workflow, accessibility, code splitting, bundle optimization      | code-generator                                                            |

---

## Plugin Architecture

```
Pre-Dev Pipeline:
  /pre-dev → prd-ingestion → codebase-scout → hld-generator → [REVIEW] → STOP
  /generate-lld → lld-generator → testcase-generator → [REVIEW] → DONE

Dev Pipeline:
  /dev-execute → dev-context-loader → codebase-comprehension → dev-planner → [APPROVE]
    → code-generator → visual-qa (3x loop) → test-writer → test-evaluator → DONE
```

---

## Verification

After install, verify the plugin:

```bash
# 1. Check skills load
# Ask: "how do I import a CapSelect?"
# Expected: cap-ui-components skill triggers

# 2. Check commands exist
# Type: /pre-dev
# Expected: Command recognized with argument hint

# 3. Check workspace created
ls .claude/pre-dev-workspace/
ls .claude/dev-workspace/
# Expected: directories exist

# 4. Test Pre-Dev pipeline
/pre-dev CAP-12345 --transcript=./sample-transcript.txt

# 5. Test Dev pipeline
/dev-execute --lld=./sample-lld.json --organism=app/components/organisms/TestFeature
```
