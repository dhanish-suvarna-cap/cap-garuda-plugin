# cap-garuda-plugin (v3.2.0)

AI-powered unified pipeline for Capillary Loyalty Frontend — from Jira ticket to verified, tested code in a single command.

---

## Pipeline Lifecycle

```
                              /gix
                               |
               ┌───────────────┴───────────────┐
               |        MODE SELECTION          |
               |   [1] Full    [2] Resume       |
               |   [3] Pre-Dev [4] Dev Only     |
               |   [5] Status                   |
               └───────────────┬───────────────┘
                               |
               ┌───────────────┴───────────────┐
               |    INTERACTIVE INPUTS          |
               |  1. Jira ticket (required)     |
               |  2. Transcript? (Y/N → path)   |
               |  3. Design ref? (Y/N)          |
               |     [1] Figma (fileId:frameId) |
               |     [2] Prototype URL (v0/any) |
               |     [3] Screenshot (file path) |
               |  4. Confluence? (Y/N → space)   |
               |  5. Extra context? (Y/N → paths)|
               |  6. Live dashboard? (Y/N)       |
               |  Confirm → Proceed              |
               └───────────────┬───────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 0: WORKSPACE INIT                                  |
  |                                                          |
  | Creates:                                                 |
  |   pipeline_state.json      session_memory.md             |
  |   session_journal.md       requirements_context.md       |
  |   approach_log.md          live-dashboard.html           |
  |                                                          |
  | Reads:  knowledge-bank.md (pre-session context)          |
  | Git:    branch gix/<ticket>                              |
  └────────────────────────────┬────────────────────────────┘
                               |
  ╔════════════════════════════╧════════════════════════════╗
  ║              PRE-DEV PHASES (1-6)                       ║
  ╚════════════════════════════╤════════════════════════════╝
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 1: PRD INGESTION                                   |
  |                                                          |
  |  ┌──────┐ ┌─────┐ ┌──────────┐ ┌────────────┐ ┌──────┐|
  |  | Jira | | PRD | |Transcript| |Design Ref  | |Cap   ||
  |  |(MCP) | |(Doc/ | |(chunked  | |            | |Docs  ||
  |  |      | | URL) | | at 5k)   | |[1] Figma   | |(fetch||
  |  |      | |      | |          | |[2] v0/URL  | |)     ||
  |  |      | |      | |          | |[3] Image   | |      ||
  |  └──┬───┘ └──┬──┘ └────┬─────┘ └─────┬──────┘ └──┬───┘|
  |     └────────┼─────────┼─────────────┼───────────┘    |
  |              ▼                                          |
  |  ┌───────────────────────────────────────────────┐     |
  |  | If Figma → Figma MCP (component tree)         |     |
  |  | If v0/URL → prototype-analyzer agent           |     |
  |  |   (Claude Preview: screenshot + DOM + mapping) |     |
  |  | If Image → visual analysis                     |     |
  |  └───────────────────────────────────────────────┘     |
  |              ▼                                          |
  |       context_bundle.json                               |
  |       (with component_mapping + product_docs)           |
  |                                                         |
  |  ┌─ ProductEx BRD Review (parallel background) ─┐      |
  |  | Reviews PRD vs official docs independently    |      |
  |  | → verify-prd.json                            |      |
  |  └──────────────────────────────────────────────┘      |
  |                                                         |
  |  ┌─ BRD Validation Gate ─┐                             |
  |  | At least 1 concrete   |                             |
  |  | expected behaviour?   |                             |
  |  | NO → warn + ask user  |                             |
  |  └──────────────────────┘                              |
  |                                                         |
  |  → Confluence publish (auto, non-blocking)              |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 2: CODEBASE SCOUT + CROSS-REPO TRACE              |
  |                                                          |
  |  ┌──── PARALLEL SPAWN ────┐                             |
  |  |                        |                             |
  |  ▼                        ▼                             |
  |  codebase-scout       cross-repo-tracer                 |
  |  (scan target repo)   (scan cap-loyalty-ui              |
  |                        + other repos)                   |
  |  → context_bundle     → cross_repo_trace.json           |
  |    (updated)             (existing implementations)     |
  |                                                          |
  |  → Confluence publish                                    |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 3: HLD GENERATION                                  |
  |                                                          |
  |  Feasibility | Bandwidth | Components | APIs | Diagrams  |
  |  → hld_artifact.json + Confluence + Mermaid diagrams     |
  |                                                          |
  |  ┌─ ProductEx Verify ─┐  Three-way: artifact vs PRD     |
  |  | vs docs.capillarytech.com                            |
  |  └────────────────────┘  → verify-hld.json              |
  |                                                          |
  |  ╔═══════════════════════════════════════════════╗      |
  |  ║ CHECKPOINT: approve | feedback | abort         ║      |
  |  ╚═══════════════════════════════════════════════╝      |
  |  → approach_log.md: decision recorded                   |
  |  → Confluence publish                                    |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 4: BACKEND HANDOFF                                 |
  | ╔═ CHECKPOINT: Provide backend HLD + API sigs ═╗        |
  | ║ "ready" or "skip"                             ║        |
  | ╚═══════════════════════════════════════════════╝        |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 5: LLD GENERATION                                  |
  |  Organisms (10 files) | API contracts | State design     |
  |  + Mermaid state/flow diagrams                           |
  |  ┌─ ProductEx Verify ─┐ → verify-lld.json              |
  |  ╔═ CHECKPOINT: approve | feedback ═╗                   |
  |  → Confluence publish                                    |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 6: TEST CASE GENERATION                            |
  |  P0/P1/P2 test cases | Unit test plans                   |
  |  ╔═ CHECKPOINT: review test cases ═╗                    |
  |  → Confluence publish                                    |
  └────────────────────────────┬────────────────────────────┘
                               |
  ╔════════════════════════════╧════════════════════════════╗
  ║                  DEV PHASES (7-15)                      ║
  ╚════════════════════════════╤════════════════════════════╝
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 7: DEV CONTEXT LOADING                             |
  |  LLD + Figma + extras → Figma-to-Component Mapping       |
  |                                                          |
  |  ┌──────────────────────────────────────────────┐       |
  |  | Figma "Button"  → CapButton  + ref spec      |       |
  |  | Figma "Select"  → CapSelect  + ref spec      |       |
  |  | Figma "Table"   → CapTable   + ref spec      |       |
  |  | Figma "???"     → "custom needed" warning     |       |
  |  └──────────────────────────────────────────────┘       |
  |  → dev_context.json (with component_mapping)            |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 8: CODEBASE COMPREHENSION                          |
  |  Intent: CREATE or UPDATE                                |
  |  Deep-read: 10 files, compose chain, Redux shape         |
  |  → comprehension.json                                    |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 9: PLANNING                                        |
  |  File-by-file plan in dependency order                   |
  |  constants → actions → reducer → saga → selectors       |
  |  → styles → messages → Component → index → Loadable     |
  |  ┌─ ProductEx Verify ─┐ → verify-plan.json             |
  |  ╔═ CHECKPOINT: "yes" to approve plan ═╗                |
  |  → approach_log.md: plan decision                        |
  |  → plan.json                                             |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 10: CODE GENERATION                                |
  |                                                          |
  |  For each of 10 files:                                   |
  |    1. Read plan → Read component_mapping                 |
  |    2. Read ref-<Component>.md for props                  |
  |    3. Generate → Inline guardrail check → Write to disk  |
  |    4. Update generation_report.json (incremental)        |
  |                                                          |
  |  ┌─ Guardrail Checker ─┐  CRITICAL → block & fix       |
  |  └────────────────────┘  HIGH → warn                   |
  |  ┌─ ProductEx Verify ─┐  → verify-code.json            |
  |  → Confluence publish                                    |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 11: BUILD VERIFICATION                             |
  |                                                          |
  |  npm start (compile)                                     |
  |    ├── PASS → continue                                   |
  |    └── FAIL → parse → categorize → auto-fix → retry      |
  |              (max 3 attempts)                             |
  |              Generated code? → fix import/syntax          |
  |              Environment? → warn (non-blocking)           |
  |  → build_report.json                                     |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 12: VISUAL SELF-EVALUATION                         |
  |  (skip if no Figma or build failed)                      |
  |                                                          |
  |  ┌───── Iteration Loop (max 3) ─────┐                  |
  |  | Start dev server → Screenshot     |                  |
  |  | Compare with Figma frame          |                  |
  |  | CRITICAL/MAJOR → Fix CSS          |                  |
  |  | (Cap UI tokens only)              |                  |
  |  | Re-screenshot → Re-compare        |                  |
  |  └──────────────────────────────────┘                  |
  |  Fidelity: HIGH | MEDIUM | LOW                           |
  |  → visual_qa_report.json (with iterations[])            |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 13: TEST WRITING                                   |
  |  ╔═ CHECKPOINT: Write tests? (Y/N) ═╗                  |
  |  Batch 1: reducer + saga tests                           |
  |  Batch 2: Component tests                                |
  |  Target: >90% lines, 100% reducer branches               |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 14: TEST EVALUATION                                |
  |  Jest → coverage → categorize failures                   |
  |  ╔═ CHECKPOINT (if < target): More tests? ═╗           |
  |  → test_report.json                                      |
  └────────────────────────────┬────────────────────────────┘
                               |
  ┌────────────────────────────┴────────────────────────────┐
  | PHASE 15: FINAL SUMMARY + BLUEPRINT                      |
  |                                                          |
  |  Consolidated report (terminal)                          |
  |  Blueprint HTML (stakeholder document)                   |
  |  Final Confluence publish                                |
  |                                                          |
  |  ┌────────────────────────────────────────────┐         |
  |  | <ticket>-blueprint.html                    |         |
  |  |                                            |         |
  |  | Stats: 15 phases | 12 artifacts | 10 files |         |
  |  | HLD + LLD with Mermaid diagrams            |         |
  |  | All decisions from approach_log.md         |         |
  |  | Build: PASS | Visual QA: HIGH              |         |
  |  | Tests: 24/24 passed | Coverage: 94%        |         |
  |  | ProductEx: approved | Guardrails: PASS     |         |
  |  └────────────────────────────────────────────┘         |
  └─────────────────────────────────────────────────────────┘

  CROSS-CUTTING (runs throughout every phase):
  ─── session_memory.md ─── incremental updates after EVERY decision
  ─── approach_log.md ───── every decision with rationale + who decided
  ─── live-dashboard.html ─ updated after EVERY phase (progress + diagrams)
  ─── Confluence publish ── every artifact auto-published as child page
  ─── Git tags ──────────── gix/<ticket>/phase-NN after each phase
  ─── Prerequisite check ── verify required artifacts before each phase
  ─── Internal consultation- consult ProductEx/tracer before asking user
  ─── Rework loops ──────── downstream blocker → re-run upstream (max 3)
  ─── C1-C7 confidence ──── on all uncertain agent claims
```

---

## Quick Install

From the target repo root:

```bash
./cap-garuda-plugin/install.sh .
```

Copies commands, agents, skills (131 Cap UI component specs), schemas. Creates workspace directory. Idempotent.

---

## Usage

### Start the Pipeline

```bash
/gix
```

Interactive menu:

```
🚀 GIX — Garuda Intelligent eXecution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Full Pipeline — all 15 phases
[2] Resume — continue from last phase
[3] Pre-Dev Only — PRD → HLD → LLD → Test Cases
[4] Dev Only — Context → Code → Build → Visual QA → Tests
[5] Status — show progress
```

### Input Collection

Inputs are collected step-by-step (not flags):

```
Step 1: Jira Ticket ID (required)
Step 2: Grooming Transcript? (Y/N)
Step 3: Design Reference? (Y/N)
         [1] Figma — enter fileId:frameId
         [2] Prototype URL — v0.dev, Vercel preview, or any live URL
         [3] Screenshot — local image file path
Step 4: Confluence Space? (Y/N)
Step 5: Additional Context? (Y/N)
Step 6: Live Dashboard? (Y/N)

Confirm → Proceed
```

**Design Reference Options:**
- **Figma only** — uses Figma MCP to fetch component tree, tokens, and dimensions. Best for layout and visual design.
- **Prototype URL only** — uses Claude Preview to navigate to the URL, take screenshots, inspect the DOM, and map components to Cap UI Library. Works with v0.dev, Vercel previews, Netlify deploys, or any live web URL. If v0.dev, also reads the generated source code for higher-confidence mapping. Best for interactions.
- **Screenshot only** — uses visual analysis to identify and map components
- **Figma + Prototype URL (recommended)** — uses BOTH sources together:
  - **Figma** = source of truth for layout, colors, spacing, typography, component appearance
  - **Prototype** = source of truth for interactions, state transitions, click flows, form behavior, API patterns
  - When they conflict (e.g., Figma shows dropdown but prototype shows radio buttons), the pipeline asks you which to follow
  - Visual QA runs a **two-pass comparison**: Pass 1 checks visual fidelity against Figma, Pass 2 checks interaction fidelity against prototype
- **None** — skips visual QA and component mapping, uses LLD text descriptions only

Or skip the menu: `/gix CAP-12345`

### Human Checkpoints

| Phase | When | Your Action |
|-------|------|-------------|
| 3 | After HLD | `approved` / `feedback: <text>` / `abort` |
| 4 | Backend handoff | `ready` / `skip` |
| 5 | After LLD | `approved` / `feedback: <text>` |
| 6 | After test cases | Review |
| 9 | After planning | `yes` to approve plan |
| 13 | Before tests | `yes` / `no` |
| 14 | After tests | Accept coverage or request more |

### Resume

```bash
/gix
# Select [2] Resume
# Or: /gix CAP-12345 (auto-detects existing state)
```

---

## What Gets Generated

### Workspace Files

```
.claude/workspace/CAP-12345/
├── pipeline_state.json          # Phase status + recovery + Confluence IDs
├── session_journal.md           # Phase-by-phase execution log
├── session_memory.md            # Shared context (decisions, risks, terms)
├── approach_log.md              # Decision log (what/why/who/alternatives)
├── requirements_context.md      # User's requirements + checkpoint decisions
├── live-dashboard.html          # Visual progress (dark theme, Mermaid)
├── context_bundle.json          # PRD + transcript + design ref + Cap docs
├── prototype_analysis.json      # v0/prototype analysis (if URL provided)
├── cross_repo_trace.json        # Cross-repo pattern findings
├── hld_artifact.json            # HLD + Mermaid diagrams
├── lld_artifact.json            # LLD + Mermaid diagrams
├── testcase_sheet.json          # Test cases
├── dev_context.json             # LLD + Figma + component mapping
├── comprehension.json           # Codebase analysis
├── plan.json                    # File-by-file coding plan
├── generation_report.json       # Files created/modified
├── build_report.json            # Build verification
├── visual_qa_report.json        # Figma comparison + iterations
├── test_report.json             # Jest results + coverage
├── CAP-12345-blueprint.html     # Final stakeholder document
└── verification_reports/        # ProductEx + guardrail reports
```

### Confluence Pages (Auto-Published)

Each pipeline run creates a folder with child pages per phase:

```
GIX: CAP-12345 — 2026-04-08/
├── Phase 1: PRD Ingestion
├── Phase 2: Codebase Scout
├── Phase 3: HLD
├── Phase 5: LLD
├── Phase 6: Test Cases
├── Phase 10: Code Generation
└── Blueprint
```

### Blueprint HTML

Final stakeholder document with:
- Pipeline stats (phases, artifacts, files, decisions, coverage)
- All key decisions from approach_log.md
- HLD/LLD summaries with Mermaid diagrams
- Component inventory (Figma mappings)
- Build/Visual QA/Test results
- ProductEx verification status
- Guardrail compliance
- Cross-repo trace findings
- Full timeline

Open in any browser — no Confluence/repo access needed.

---

## Verification & Quality

### Frontend Guardrails (FG-01 through FG-12)

| ID | Rule | Priority |
|----|------|----------|
| FG-01 | Cap UI: individual file imports only | CRITICAL |
| FG-02 | Organisms: exactly 10 files | CRITICAL |
| FG-03 | ImmutableJS: no direct mutation | CRITICAL |
| FG-04 | Sagas: bugsnag in every catch | CRITICAL |
| FG-05 | Banned packages: no TS/RTK/Zustand/Tailwind/axios | CRITICAL |
| FG-06 | Auth headers: never manual | HIGH |
| FG-07 | Compose chain: exact order | HIGH |
| FG-08 | Tests: from app/utils/test-utils.js | HIGH |
| FG-09 | Actions: garuda/Org/VERB_NOUN pattern | HIGH |
| FG-10 | i18n: formatMessage, no hardcoded text | HIGH |
| FG-11 | CSS: Cap UI tokens, no hardcoded values | HIGH |
| FG-12 | AI: read before write, verify imports | CRITICAL |

### ProductEx Verification

Three-way cross-reference at phases 3, 5, 9, 10:
- **Artifact** vs **PRD** vs **docs.capillarytech.com**
- Flags: fulfilled, missing, conflicts, doc discrepancies

### Quality Gates

| Gate | What | Failure Action |
|------|------|----------------|
| BRD validation | PRD has concrete behaviours | Warn + ask user |
| Prerequisites | Prior artifacts exist | Stop + tell which phase to run |
| Exit checklist | Agent verifies own output | Fix before writing |
| Gate check | Orchestrator validates agent output | Re-run or stop |
| Guardrail check | Code scanned for violations | CRITICAL = block |
| Build verify | Project compiles | 3x auto-fix then stop |
| Circuit breaker | Rework loop stuck | 3 rounds then escalate |

---

## Skills & Agents

### Agents (18)

| Agent | Phase | Purpose |
|-------|-------|---------|
| prd-ingestion | 1 | Fetch Jira + PRD + transcript + design ref + Cap docs |
| prototype-analyzer | 1 | Analyze v0/prototype URL: screenshot + DOM + component mapping |
| codebase-scout | 2 | Lightweight scan of target codebase |
| cross-repo-tracer | 2 | Trace patterns across repos |
| hld-generator | 3 | HLD with Mermaid diagrams → Confluence |
| lld-generator | 5 | LLD with organism designs → Confluence |
| testcase-generator | 6 | P0/P1/P2 test cases |
| dev-context-loader | 7 | Load LLD + design ref + component mapping |
| codebase-comprehension | 8 | Deep-read existing organism |
| dev-planner | 9 | File-by-file implementation plan |
| code-generator | 10 | Generate 10 organism files (incremental) |
| build-verifier | 11 | Compile check + 3x auto-fix |
| visual-qa | 12 | Screenshot + design ref compare + 3x fix |
| test-writer | 13 | Unit tests (>90% coverage) |
| test-evaluator | 14 | Jest results + coverage |
| productex-verifier | 3,5,9,10 | PRD + docs alignment check |
| guardrail-checker | 10 | FG-01..FG-12 violation scan |
| confluence-publisher | all | Auto-publish artifacts to Confluence |

### Skills (25+)

| Skill | Purpose |
|-------|---------|
| cap-ui-library/ | 131 component specs (props, import paths, usage) |
| fe-guardrails/ | 12 guardrail categories with code examples |
| figma-component-map/ | Figma element → Cap component mapping |
| coding-dna-*/ | 6 coding standard domains |
| tutor/ | Read-only codebase teaching |
| debug/ | Root cause analysis |
| blueprint-template | Final HTML stakeholder document template |
| live-dashboard-template | Progress dashboard template |
| session-memory-template | Shared context structure |
| fe-principles | C1-C7 confidence framework |
| knowledge-bank | Pre-session context (human-populated) |
| shared-rules | Non-negotiable coding patterns |
| config | Centralized configurable values |

### Standalone Commands

```bash
/gix                     # Unified pipeline (interactive menu)
/pre-dev CAP-12345       # Pre-dev phases only
/dev-execute --lld=<id>  # Dev phases only
/generate-hld CAP-12345  # Standalone HLD
/generate-lld CAP-12345  # Standalone LLD
/fetch-context CAP-12345 # Just fetch context
/tutor                   # Codebase teaching
/debug                   # Root cause analysis
```

---

## MCP Requirements

| MCP | Purpose | Required? |
|-----|---------|-----------|
| mcp-atlassian | Jira + Confluence read/write | Required |
| framelink-figma-mcp | Figma design data + images | Required |
| Claude Preview | Visual QA screenshots | Required |
| Google Drive | PRD from Google Docs | Optional |

**Built-in** (no MCP needed): Cap UI Library specs (131 components as skills)

---

## Git Integration

- Branch: `gix/<ticket-id>`
- Tags: `gix/<ticket-id>/phase-<NN>` after each phase
- Commits: artifacts before code gen, code + artifacts after code gen
- Rollback: `git reset --hard gix/CAP-12345/phase-09`
