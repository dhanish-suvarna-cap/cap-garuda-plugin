---
description: Run the full dev pipeline — load context, comprehend codebase, plan, generate code, visual QA, write tests
argument-hint: [--lld=<confluence-page-id-or-file>] [--figma=<fileId:frameId>] [--context=<extra-file-paths>] [--organism=<target-path>] [--from=<phase>]
disable-model-invocation: true
allowed-tools: Agent, Read, Write, Bash
---

# /dev-execute

Orchestrates the full dev pipeline. Loads LLD context, comprehends codebase, plans implementation, generates code, runs visual QA, writes tests, and evaluates coverage.

## Pre-flight

Parse `$ARGUMENTS`:
- `lldSource` — Confluence page ID or local file path to LLD (required unless resuming)
- `figmaRef` — Figma `fileId:frameId` (optional)
- `extraContext` — comma-separated paths to additional .md/.json files (optional)
- `targetOrganism` — target organism path e.g., `app/components/organisms/MyFeature` (optional, derived from LLD if not specified)
- `fromPhase` — resume from specific phase: `context_loading`, `codebase_comprehension`, `planning`, `code_generation`, `visual_qa`, `test_writing`, `test_evaluation` (optional)

---

## Phase 0 — Workspace Setup

1. Generate a session ID: `dev-<timestamp>` (e.g., `dev-20260331-143022`)
2. Create `.claude/dev-workspace/<session-id>/` if it does not exist
3. Initialize `dev_state.json`:
```json
{
  "session_id": "<session-id>",
  "pipeline": "dev",
  "status": "in_progress",
  "created_at": "<ISO timestamp>",
  "updated_at": "<ISO timestamp>",
  "inputs": {
    "lld_source": "<lldSource>",
    "figma_ref": "<figmaRef or null>",
    "extra_context": ["<paths>"],
    "target_organism": "<targetOrganism or null>"
  },
  "phases": {
    "context_loading": { "status": "not_started" },
    "codebase_comprehension": { "status": "not_started" },
    "planning": { "status": "not_started", "approved": false },
    "code_generation": { "status": "not_started", "files_completed": 0, "files_total": 0 },
    "visual_qa": { "status": "not_started", "iteration": 0 },
    "test_writing": { "status": "not_started" },
    "test_evaluation": { "status": "not_started", "coverage_percent": null }
  },
  "recovery": { "last_successful_phase": null, "can_resume_from": "context_loading" }
}
```

4. If `--from` is specified:
   - Validate the phase name is valid
   - Check prerequisite files exist:
     - `code_generation` requires: `plan.json`, `comprehension.json`, `dev_context.json`
     - `planning` requires: `comprehension.json`, `dev_context.json`
     - `visual_qa` requires: `generation_report.json`, `dev_context.json`
     - `test_writing` requires: `generation_report.json`
     - `test_evaluation` requires: test files in organism/tests/
   - If prerequisites missing: report which phase needs to run first and STOP
   - If prerequisites present: skip to that phase

---

## Phase 1 — Context Loading

**Skip if**: `--from` is set to a later phase AND `dev_context.json` exists.

Spawn agent: `dev-context-loader`

Pass:
- `lldSource`: the LLD source (Confluence ID or file path)
- `figmaRef`: Figma reference
- `extraContextPaths`: extra context file paths
- `workspacePath`: the session workspace path

Wait for `dev_context.json` to be written.

Update `dev_state.json`: set `context_loading.status = "completed"`.

Print: `Phase 1 complete — dev context loaded (LLD + Figma + extra context)`

---

## Phase 2 — Codebase Comprehension

**Skip if**: `--from` is set to a later phase AND `comprehension.json` exists.

Determine target organism path:
- If provided via `--organism`: use it
- If LLD contains component_design.organisms: use the first organism's path
- If neither: ask user to specify

Determine intent:
- If target path exists on disk: `UPDATE`
- If target path does not exist: `CREATE`

Spawn agent: `codebase-comprehension`

Pass:
- `targetOrganismPath`: the target path
- `intent`: CREATE or UPDATE
- `workspacePath`: session workspace

Wait for `comprehension.json` to be written.

Update `dev_state.json`: set `codebase_comprehension.status = "completed"`.

Print:
```
Phase 2 complete — codebase comprehension
  Intent: <CREATE|UPDATE>
  Target: <path>
  Files mapped: <count>
  Redux slice: <key or "new">
```

---

## Phase 3 — Planning

**Skip if**: `--from` is set to a later phase AND `plan.json` exists.

Spawn agent: `dev-planner`

Pass:
- `workspacePath`: session workspace (contains dev_context.json and comprehension.json)

Wait for `plan.json` to be written.

Read `plan.json` and display plan summary:

```
Dev Plan for <target_path>
================================
Intent: <CREATE|UPDATE>

Files to <create/modify>:
  <for each file in plan:>
  - <path> (<operation>): <description>

Component tree: <root → children>
Data flow: <summary>

Risk items:
  <list risk_items or "none">

Uncertain items (need guidance):
  <list uncertain items or "none">

================================
Type "yes" to approve and begin code generation.
Type "no" to abort or request changes.
```

**PAUSE CHECKPOINT — wait for explicit "yes" before Phase 4.**

If "no" or change requested: ask what to change, re-run planner. Do NOT proceed to Phase 4.

Update `dev_state.json`: set `planning.status = "completed"`, `planning.approved = true`.

---

## Phase 4 — Code Generation

Spawn agent: `code-generator`

Pass:
- `workspacePath`: session workspace (contains plan.json, comprehension.json, dev_context.json)

Wait for source files to be generated and `generation_report.json` to be written.

**Recovery check**: If the agent returns with an error or partial completion:
1. Read `generation_report.json` to see how many files were completed
2. If partial (some files created but not all):
   - Log: "Code generation partially completed (<N>/<total> files)"
   - Spawn a NEW code-generator instance with instructions to generate only the remaining files
   - Repeat until all files are done or 3 attempts fail

Update `dev_state.json`: set `code_generation.status = "completed"`.

Print:
```
Phase 4 complete — Code generation finished
  Files created: <list>
  Files modified: <list>
  Plan deviations: <list or "none">
  Unresolved items: <list or "none">
```

---

## Phase 5 — Visual QA

**Skip conditions** (any of these → skip with message):
- No Figma data in dev_context.json (figma.status = "unavailable")
- Cannot determine the route URL for the page
- User passed `--skip-visual-qa` flag

Spawn agent: `visual-qa`

Pass:
- `workspacePath`: session workspace
- `maxIterations`: 3

Wait for `visual_qa_report.json` to be written.

Update `dev_state.json`: set `visual_qa.status = "completed"`.

Print visual QA summary:
```
Phase 5 — Visual QA <status>
  Overall fidelity: <HIGH|MEDIUM|LOW>
  Iterations: <count>
  Critical discrepancies: <count>
  Major discrepancies: <count>
  Minor discrepancies: <count>
```

If discrepancies remain after max iterations:
```
Some visual discrepancies remain. Review visual_qa_report.json for details.
```

---

## Phase 6 — Test Writing

Print:
```
Would you like me to write unit tests? (yes/no)
```

**PAUSE — wait for user response.**

If "no": skip, set `test_writing.status = "skipped"`.

If "yes":

Spawn agent: `test-writer`

Pass:
- `workspacePath`: session workspace (contains generation_report.json, optionally testcase_sheet.json)

Wait for test files to be written.

Update `dev_state.json`: set `test_writing.status = "completed"`.

Print: `Phase 6 complete — test files written`

---

## Phase 7 — Test Evaluation

**Skip if**: test_writing was skipped.

Spawn agent: `test-evaluator`

Pass:
- `workspacePath`: session workspace

Wait for `test_report.json` to be written.

Update `dev_state.json`: set `test_evaluation.status = "completed"`.

Print test summary:
```
Phase 7 — Test Results
  Passed: <n> | Failed: <n> | Skipped: <n>
  Coverage: <lines>% lines, <branches>% branches, <functions>% functions
```

**CHECKPOINT if coverage < 90%:**
```
Coverage is below 90% target. Would you like me to write additional tests? (yes/no)
```
If yes: re-run test-writer with focus on uncovered lines, then re-run test-evaluator.

---

## Phase 8 — Final Summary

Print consolidated report:

```
Dev Pipeline Complete — <session-id>
==========================================

Target: <target_path>
Intent: <CREATE|UPDATE>

Files Changed:
  Created: <list>
  Modified: <list>

Plan Adherence:
  Deviations: <list or "none">
  Unresolved: <list or "none">

Visual QA: <fidelity | skipped>
  Remaining discrepancies: <count or 0>

Tests:
  Passed: <n> | Failed: <n> | Skipped: <n>
  Coverage: <lines>% lines, <branches>% branches

Next Steps:
  1. Review generated files
  2. Address any failed tests or visual discrepancies
  3. Run full test suite: npm test
  4. Start dev server to verify: npm start
  5. Create PR when satisfied
==========================================
```

Update `dev_state.json`: set `status = "completed"`.
