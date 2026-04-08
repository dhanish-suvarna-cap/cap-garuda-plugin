# cap-garuda-plugin (v3.0.0)

AI-powered unified pipeline for Capillary Loyalty Frontend — from Jira ticket to verified, tested code in a single command.

---

## Pipeline Flow

```
                                /gix
                                 |
                    ┌────────────┴────────────┐
                    |     MODE SELECTION       |
                    |  [1] Full  [2] Resume    |
                    |  [3] Pre   [4] Dev       |
                    |  [5] Status              |
                    └────────────┬─────────────┘
                                 |
                    ┌────────────┴────────────┐
                    |  INTERACTIVE INPUTS      |
                    |  Step 1: Jira ticket ID  |
                    |  Step 2: Transcript?     |
                    |  Step 3: Figma?          |
                    |  Step 4: Confluence?     |
                    |  Step 5: Extra context?  |
                    └────────────┬─────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       |                                                    |
       |              PHASE 0: WORKSPACE INIT               |
       |  pipeline_state.json | session_memory.md           |
       |  session_journal.md  | requirements_context.md     |
       |  live-dashboard.html | knowledge-bank.md           |
       |  Git branch: gix/<ticket>                          |
       └─────────────────────────┬─────────────────────────┘
                                 |
  ╔══════════════════════════════╧══════════════════════════════╗
  ║                    PRE-DEV PHASES (1-6)                     ║
  ╚══════════════════════════════╤══════════════════════════════╝
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 1: PRD INGESTION                             |
       | Jira ──► PRD ──► Transcript ──► Figma              |
       |                   (5k chunks)                      |
       | → context_bundle.json                              |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 2: CODEBASE SCOUT + CROSS-REPO TRACE         |
       | Scan target repo: organisms, pages, endpoints, slices |
       | Scan cap-loyalty-ui: existing implementations       |
       | → context_bundle.json (updated)                    |
       | → cross_repo_trace.json                            |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 3: HLD GENERATION                            |
       | Feasibility, bandwidth, epic breakdown, components  |
       | → hld_artifact.json + Confluence page              |
       |                                                    |
       | ┌─ ProductEx ──┐  Verify HLD vs PRD               |
       | └──────────────┘  → verify-hld.json               |
       |                                                    |
       | ╔═════════════════════════════════════════════╗    |
       | ║ CHECKPOINT: approve | feedback | abort       ║    |
       | ╚═════════════════════════════════════════════╝    |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 4: BACKEND HANDOFF                           |
       | ╔═════════════════════════════════════════════╗    |
       | ║ CHECKPOINT: Provide backend HLD + API sigs   ║    |
       | ║ Type "ready" or "skip"                       ║    |
       | ╚═════════════════════════════════════════════╝    |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 5: LLD GENERATION                            |
       | Organisms (10 files), API contracts, state design   |
       | → lld_artifact.json + Confluence                   |
       | ┌─ ProductEx ──┐ → verify-lld.json                |
       | ╔═ CHECKPOINT: approve | feedback ═╗               |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 6: TEST CASE GENERATION                      |
       | P0/P1/P2 test cases, unit test plans               |
       | → testcase_sheet.json + Confluence                 |
       | ╔═ CHECKPOINT: review test cases ═╗                |
       └─────────────────────────┬─────────────────────────┘
                                 |
  ╔══════════════════════════════╧══════════════════════════════╗
  ║                     DEV PHASES (7-15)                       ║
  ╚══════════════════════════════╤══════════════════════════════╝
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 7: DEV CONTEXT LOADING                       |
       | LLD ──► Figma ──► Extras ──► Figma-to-Component   |
       |                              Mapping               |
       | Button → CapButton | Select → CapSelect            |
       | Table → CapTable   | Input → CapInput              |
       | → dev_context.json (with component_mapping)        |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 8: CODEBASE COMPREHENSION                    |
       | Intent: CREATE or UPDATE                           |
       | Deep-read: 10 files, compose chain, Redux shape    |
       | → comprehension.json                               |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 9: PLANNING                                  |
       | File-by-file plan in dependency order              |
       | constants → actions → reducer → saga → selectors  |
       | → styles → messages → Component → index → Loadable |
       | ┌─ ProductEx ──┐ → verify-plan.json               |
       | ╔═══════════════════════════════════════════╗      |
       | ║ CHECKPOINT: "yes" to approve plan         ║      |
       | ╚═══════════════════════════════════════════╝      |
       | → plan.json                                        |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 10: CODE GENERATION                          |
       | 10 organism files in dependency order              |
       | Each file: generate → guardrail check → write      |
       |                                                    |
       | ┌──────────── Per-File Guardrail Check ──────────┐ |
       | | [FG-01] No barrel imports?              ✓       | |
       | | [FG-03] ImmutableJS only in reducer?    ✓       | |
       | | [FG-04] bugsnag in saga catch?          ✓       | |
       | | [FG-05] No banned packages?             ✓       | |
       | | [FG-07] Compose chain correct?          ✓       | |
       | └────────────────────────────────────────────────┘ |
       |                                                    |
       | ┌─ Guardrail Checker ─┐ CRITICAL → block & fix    |
       | └────────────────────┘ HIGH → warn                |
       | ┌─ ProductEx ──┐ → verify-code.json               |
       | → source files + generation_report.json            |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 11: BUILD VERIFICATION                       |
       |                                                    |
       | npm start (compile check)                          |
       |    |                                               |
       |    ├── PASS ──────────────────► continue           |
       |    |                                               |
       |    └── FAIL                                        |
       |         | Parse errors                             |
       |         | Categorize: import | syntax | module     |
       |         | Generated code? or Environment?          |
       |         |                                          |
       |         ├── Generated → auto-fix → retry           |
       |         |    (max 3 attempts)                      |
       |         |                                          |
       |         └── Environment → warn (non-blocking)      |
       |                                                    |
       | → build_report.json                                |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 12: VISUAL SELF-EVALUATION                   |
       | (skip if no Figma or build failed)                 |
       |                                                    |
       |  ┌──────────── Iteration Loop (max 3) ──────────┐ |
       |  | Start dev server (port 8000)                  | |
       |  | Screenshot app ◄──► Download Figma frame      | |
       |  |       |                   |                   | |
       |  |       └──── Compare ──────┘                   | |
       |  |              |                                | |
       |  |    CRITICAL/MAJOR         MINOR only          | |
       |  |       |                     |                 | |
       |  |    Fix CSS/layout       DONE (HIGH fidelity)  | |
       |  |    (Cap UI tokens)                            | |
       |  |       |                                       | |
       |  |    Re-screenshot → Re-compare                 | |
       |  └───────────────────────────────────────────────┘ |
       |                                                    |
       | Fidelity: HIGH | MEDIUM | LOW                      |
       | → visual_qa_report.json (with iterations[])        |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 13: TEST WRITING                             |
       | ╔═ CHECKPOINT: Write tests? (Y/N) ═╗              |
       | Batch 1: reducer + saga tests                      |
       | Batch 2: Component tests                           |
       | Target: >90% lines, 100% reducer branches          |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 14: TEST EVALUATION                          |
       | Run Jest → parse coverage → categorize failures    |
       | ╔═ CHECKPOINT (if coverage < target) ═╗           |
       | → test_report.json                                |
       └─────────────────────────┬─────────────────────────┘
                                 |
       ┌─────────────────────────┴─────────────────────────┐
       | PHASE 15: FINAL SUMMARY                            |
       |                                                    |
       | GIX Pipeline Complete — CAP-12345                  |
       | Target: organisms/MyFeature (CREATE)               |
       | Files: 10 created | Build: PASS                    |
       | Visual QA: HIGH (2 iterations)                     |
       | Tests: 24 passed | Coverage: 94%                   |
       | ProductEx: approved | Guardrails: PASS             |
       └───────────────────────────────────────────────────┘

  CROSS-CUTTING (runs throughout):
  ─── session_memory.md ─── read/written by EVERY phase
  ─── live-dashboard.html ─── updated after EVERY phase
  ─── Git tags ─── gix/<ticket>/phase-NN after each phase
  ─── Rework loops ─── downstream blocker → re-run upstream (max 3)
  ─── C1-C7 confidence ─── on all uncertain agent claims
```

---

## Quick Install

From the target repo root:

```bash
./cap-garuda-plugin/install.sh .
```

The script is idempotent — safe to run multiple times. It copies commands, agents, skills (including 131 Cap UI Library component specs), schemas, and creates the workspace directory.

---

## GIX Pipeline (Recommended)

### Start the Pipeline

```bash
/gix
```

An interactive menu appears:

```
🚀 GIX — Garuda Intelligent eXecution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Select a mode:

[1] Full Pipeline
    Run all 15 phases from Jira ticket to tested code.
    PRD → HLD → LLD → Plan → Code → Build → Visual QA → Tests

[2] Resume
    Continue from where you left off.

[3] Pre-Dev Only
    Run just PRD → Codebase Scout → HLD → LLD → Test Cases.

[4] Dev Only
    Run just Context → Plan → Code → Build → Visual QA → Tests.

[5] Status
    Show current pipeline progress for a ticket.

Enter your choice (1-5):
```

### Input Collection (Step-by-Step)

After selecting a mode, inputs are collected one at a time:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1 of 5: Jira Ticket ID (required)
  Enter ticket ID: CAP-12345

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 2 of 5: Grooming Transcript
  Do you have a grooming transcript? (Y/N): Y
  Enter path or URL: /path/to/transcript.txt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 3 of 5: Figma Design
  Do you have a Figma design? (Y/N): Y
  Enter Figma fileId:frameId: abc123:frame456

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 4 of 5: Confluence Space
  Do you have a specific Confluence space? (Y/N): N
  Using default from config.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 5 of 5: Additional Context
  Do you have any additional context files? (Y/N): N
  No additional context.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting GIX Pipeline with:
  Ticket:     CAP-12345
  Transcript: /path/to/transcript.txt
  Figma:      abc123:frame456
  Confluence: LOYALTY
  Context:    none

Proceed? (Y/N):
```

Or skip the menu with a direct ticket ID:

```bash
/gix CAP-12345
```

### Human Checkpoints

The pipeline pauses at these points for your input:

| Phase | When | What You Do |
|-------|------|-------------|
| 3 | After HLD | Review on Confluence. Type `approved`, `feedback: <text>`, or `abort` |
| 4 | Backend handoff | Provide backend HLD + API signatures. Type `ready` or `skip` |
| 5 | After LLD | Review on Confluence. Approve or give feedback |
| 6 | After test cases | Review test case sheet |
| 9 | After planning | Review file plan. Type `yes` to approve |
| 13 | Before tests | Type `yes` to write tests or `no` to skip |
| 14 | After tests | Accept coverage or request more tests |

### Resume After Interruption

Just run `/gix` and select mode **[2] Resume**. Or re-run `/gix CAP-12345` — it auto-detects existing state.

| Scenario | What Survives | How to Resume |
|----------|--------------|---------------|
| Context overflow | State + completed files | Orchestrator auto-retries agent |
| Quota limit | State + journal + memory + all files | `/gix` → Resume |
| Terminal closed | State + journal + memory + all files | `/gix` → Resume |
| Computer restart | State + journal + memory + all files | `/gix` → Resume |

---

## Live Dashboard

When starting a pipeline, GIX asks if you want a live HTML dashboard. If yes, it creates `live-dashboard.html` in the workspace:

- Dark theme with sidebar navigation
- Progress bar showing phase completion
- Updates after every phase with summaries, key numbers, and Mermaid diagrams
- Open in any browser at any time to check progress

```
.claude/workspace/CAP-12345/live-dashboard.html
```

Phase-specific dashboard content:

| Phase | Dashboard Shows |
|-------|----------------|
| PRD Ingestion | Context sources (Jira, PRD, Transcript, Figma — loaded/skipped) |
| Codebase Scout | Scan results + cross-repo trace findings |
| HLD | Feasibility, bandwidth, component breakdown, Confluence link |
| LLD | Organism designs, API contracts, state design |
| Planning | File plan table, risk items, uncertain items |
| Code Generation | Files created/modified, guardrail results, ProductEx verification |
| Build Verification | Build status, attempt count, errors fixed |
| Visual QA | Fidelity rating, iteration count, discrepancy chart |
| Test Evaluation | Pass/fail/skip counts, coverage chart |

---

## Standalone Pipelines (Still Available)

The original separate pipelines still work for targeted use:

### Pre-Dev Only

```bash
/pre-dev CAP-12345 --transcript=/path/to/transcript.txt --figma=fileId:frameId
```

### Dev Only

```bash
/dev-execute --lld=<confluence-page-id> --figma=fileId:frameId --organism=app/components/organisms/MyFeature
```

### Standalone Commands

```bash
/generate-hld CAP-12345 --feedback="Split into two parallel tasks"
/generate-lld CAP-12345 --backend-hld=<page-id>
/fetch-context CAP-12345 --transcript=/path/to/transcript.txt
```

---

## Verification & Quality Gates

### Frontend Guardrails (FG-01 through FG-12)

Every code-producing agent checks these rules. CRITICAL violations block the pipeline.

| ID | Rule | Priority |
|----|------|----------|
| FG-01 | Cap UI imports: individual file paths only, never barrel | CRITICAL |
| FG-02 | Organism anatomy: exactly 10 files in dependency order | CRITICAL |
| FG-03 | ImmutableJS: fromJS/set/get only, no direct mutation | CRITICAL |
| FG-04 | Saga error handling: every catch has notifyHandledException | CRITICAL |
| FG-05 | Banned packages: no TypeScript, Redux Toolkit, Zustand, Tailwind, axios, Enzyme | CRITICAL |
| FG-06 | Auth headers: never manual, injected by requestConstructor.js | HIGH |
| FG-07 | Compose chain: exact order withSaga → withReducer → withConnect | HIGH |
| FG-08 | Test imports: from app/utils/test-utils.js only | HIGH |
| FG-09 | Action naming: garuda/Organism/VERB_NOUN_REQUEST\|SUCCESS\|FAILURE | HIGH |
| FG-10 | i18n: all user-facing text via formatMessage | HIGH |
| FG-11 | CSS: Cap UI tokens, no hardcoded pixels or hex colors | HIGH |
| FG-12 | AI-specific: read before write, verify imports exist | CRITICAL |

### ProductEx Verification

After phases 3 (HLD), 5 (LLD), 9 (Plan), and 10 (Code), ProductEx automatically verifies the output against the PRD:

- **Fulfilled** — requirement addressed with evidence
- **Missing** — requirement not found in artifact
- **Conflict** — artifact contradicts requirement

If issues found, the pipeline offers to re-run the phase.

### Build Verification

After code generation, the build verifier:
1. Compiles the project
2. Categorizes errors (generated code vs environment)
3. Auto-fixes generated-code errors (wrong imports, missing files)
4. Retries up to 3 times
5. Reports pass/fail with full error details

### Rework Loops

If a downstream phase detects a problem with an upstream artifact:
1. The orchestrator re-runs the upstream phase with the blocker context
2. Cascades through intermediate phases
3. Circuit breaker: max 3 rounds, then escalates to developer

---

## Workspace Structure

All artifacts for a ticket live in a single workspace:

```
.claude/workspace/CAP-12345/
├── pipeline_state.json          # Phase status + recovery info
├── session_journal.md           # Phase-by-phase execution log
├── session_memory.md            # Shared context (decisions, risks, terms)
├── requirements_context.md      # User's requirements + checkpoint decisions
├── live-dashboard.html          # Visual progress dashboard (optional)
├── context_bundle.json          # PRD + transcript + Figma + codebase scan
├── cross_repo_trace.json        # Cross-repo pattern trace results
├── hld_artifact.json            # High-level design
├── lld_artifact.json            # Low-level design
├── testcase_sheet.json          # Test cases
├── dev_context.json             # LLD + Figma + component mapping
├── comprehension.json           # Codebase analysis
├── plan.json                    # File-by-file coding plan
├── generation_report.json       # Generated files tracking
├── build_report.json            # Build verification results
├── visual_qa_report.json        # Figma comparison + iterations
├── test_report.json             # Jest results + coverage
└── verification_reports/        # ProductEx + guardrail reports
    ├── verify-hld.json
    ├── verify-lld.json
    ├── verify-plan.json
    └── verify-code.json
```

The workspace is gitignored. Safe to delete between runs.

---

## Skills Reference

### Cap UI Library (131 Components)

Full component reference at `skills/cap-ui-library/SKILL.md`. Each component has a dedicated spec file (`ref-<ComponentName>.md`) with props, sub-components, and usage examples.

Agents look up components via the index, then read the detailed spec before generating code. This replaces the previous MCP-based component documentation.

### Figma-to-Component Mapping

`skills/figma-component-map/SKILL.md` maps Figma design elements to Cap UI Library components automatically during Phase 7 (Dev Context Loading):

| Figma Element | Cap Component |
|--------------|---------------|
| Button | CapButton |
| Text Input | CapInput (.Search, .TextArea, .Number) |
| Dropdown | CapSelect (.CapCustomSelect) |
| Table | CapTable |
| Modal | CapModal |
| Date Picker | CapDatePicker, CapDateRangePicker |
| Checkbox | CapCheckbox |
| Toggle | CapSwitch |
| Tag | CapTag, CapColoredTag |
| ... | (60+ mappings total) |

### Coding DNA Skills

Comprehensive coding standards extracted from Capillary UI team documentation:

| Skill | Coverage |
|-------|----------|
| coding-dna-architecture | Tech stack, banned packages, file structure, imports, naming |
| coding-dna-components | Component anatomy, HOC composition, hooks, memoization |
| coding-dna-state-and-api | Redux patterns, saga patterns, API client, auth/RBAC |
| coding-dna-styling | Design tokens, styled-components, class naming |
| coding-dna-testing | Jest/RTL/MSW, test patterns, mocking strategies |
| coding-dna-quality | Error handling, Bugsnag, accessibility, bundle optimization |

### Standalone Skills

| Skill | Purpose |
|-------|---------|
| `/tutor` | Read-only codebase teaching. Explains codebase patterns without modifying code. |
| `/debug` | Root cause analysis. Traces errors through Redux/saga/component chain. |
| `knowledge-bank.md` | Human-populated pre-session context (epic info, team decisions, constraints). |
| `fe-principles.md` | C1-C7 calibrated confidence framework for agent reasoning. |

---

## Git Integration

### Branch & Tag Protocol

- Pipeline creates branch: `gix/<ticket-id>`
- After each phase: tags `gix/<ticket-id>/phase-<NN>`
- Before code generation: commits all artifacts
- After code generation: commits code + artifacts together

### Safe Rollback

Git tags enable rolling back to any phase:

```bash
git reset --hard gix/CAP-12345/phase-09   # Roll back to planning
```

---

## MCP Requirements

### Required

| MCP | Purpose |
|-----|---------|
| mcp-atlassian | Jira tickets + Confluence read/write |
| framelink-figma-mcp | Figma design data + image export |
| Claude Preview | Visual QA (dev server screenshots) |

### Built-in (No MCP Needed)

| Skill | Purpose |
|-------|---------|
| cap-ui-library (131 specs) | Component documentation (replaces cap-ui-library-mcp) |

### Optional

| MCP | Purpose |
|-----|---------|
| Google Drive | Fetch PRD from Google Docs (fallback: Jira description) |

---

## Plugin Architecture

```
Commands (6):
  /gix ─────────── Unified pipeline (15 phases, interactive menu)
  /pre-dev ──────── Pre-Dev only (phases 1-6)
  /dev-execute ──── Dev only (phases 7-15)
  /generate-hld ─── Standalone HLD
  /generate-lld ─── Standalone LLD
  /fetch-context ── Standalone context fetch

Agents (16):
  prd-ingestion ──────── Fetch Jira + PRD + transcript + Figma
  codebase-scout ─────── Lightweight codebase scan
  cross-repo-tracer ──── Trace patterns across repos
  hld-generator ──────── High-level design → Confluence
  lld-generator ──────── Low-level design → Confluence
  testcase-generator ─── Test case sheet
  dev-context-loader ─── Load LLD + Figma + component mapping
  codebase-comprehension Deep-read existing organism
  dev-planner ─────────── File-by-file implementation plan
  code-generator ──────── Generate 10 organism files
  build-verifier ──────── Compile check + 3x auto-fix
  visual-qa ────────────── Screenshot + Figma compare + 3x fix
  test-writer ──────────── Unit tests (>90% coverage)
  test-evaluator ────────── Jest results + coverage
  productex-verifier ───── PRD alignment check
  guardrail-checker ────── FG-01..FG-12 violation scan

Skills (20+):
  cap-ui-library/ ──────── 131 component specs
  fe-guardrails/ ─────── 12 guardrail categories
  figma-component-map/ ── Figma → Cap component mapping
  coding-dna-*/ ────────── 6 coding standard domains
  tutor/ ──────────────── Codebase teaching
  debug/ ──────────────── Root cause analysis
  + shared-rules, config, fe-principles, session-memory-template,
    live-dashboard-template, knowledge-bank, atomic-design-rules,
    hld-template, lld-template

Schemas (10):
  pipeline_state, verification_report, build_report,
  context_bundle, hld_artifact, lld_artifact, plan,
  pre_dev_state, dev_state, testcase_sheet
```

---

## Verification

After install, verify the plugin:

```bash
# 1. Check GIX command
/gix
# Expected: Interactive menu appears

# 2. Check component specs
# Ask: "how do I import a CapSelect?"
# Expected: cap-ui-library skill triggers with import path + props

# 3. Check workspace
ls .claude/workspace/
# Expected: directory exists

# 4. Test full pipeline
/gix
# Select [1], enter a test ticket ID, follow prompts

# 5. Test resume
# Interrupt mid-run, then:
/gix
# Select [2] Resume — should pick up where it stopped
```
