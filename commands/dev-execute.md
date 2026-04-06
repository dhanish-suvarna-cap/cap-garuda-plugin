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

4. Initialize session journal: Write `{workspacePath}/session_journal.md`:
   ```markdown
   # Dev Session Journal: <session-id>
   
   > This file is auto-updated after each phase. If a session is interrupted,
   > a new Claude session can read this file to resume from where it stopped.
   
   **Inputs:**
   - LLD source: <lldSource>
   - Figma: <figmaRef or "none">
   - Target organism: <targetOrganism or "to be determined">
   - Extra context: <extraContext or "none">
   
   ---
   ```

5. Capture Requirements Context:
   a. Check if `{workspacePath}/requirements_context.md` exists.
      - If it exists (resume scenario): Read and print it — this restores Claude's understanding of WHAT the user is building.
      - If it does NOT exist (new session): Write `{workspacePath}/requirements_context.md`:

        ```markdown
        # Requirements Context: <session-id>

        > This file captures the user's requirements and decisions for this dev session.
        > It is read on resume so Claude understands WHAT is being built, not just WHERE the pipeline stopped.

        ## Original Request
        - Command: `/dev-execute <full $ARGUMENTS as typed>`
        - LLD Source: <lldSource>
        - Figma: <figmaRef or "not provided">
        - Target Organism: <targetOrganism or "to be determined">
        - Extra Context: <extraContext or "none">
        - Started: <current ISO timestamp>

        ## Feature Description
        <to be filled>

        ## Key Decisions
        <updated at each checkpoint>
        ```

   b. Ask the user:
      > **Briefly describe what this feature does and any specific requirements. Type `skip` if the LLD covers everything.**

   c. Wait for the user's response:
      - If the user provides a description: Update `requirements_context.md` — fill in the **Feature Description** section.
      - If the user types `skip`: Update **Feature Description** to `See LLD — no additional context provided.`

   d. Print: `Requirements captured. Starting pipeline...`

6. If `--from` is specified:
   a. Validate the phase name is one of: context_loading, codebase_comprehension, planning, code_generation, visual_qa, test_writing, test_evaluation
   b. Read `{workspacePath}/session_journal.md` if it exists — print it so context is restored
   c. Read `{workspacePath}/requirements_context.md` if it exists — print it so feature context is restored
   d. Read `{workspacePath}/dev_state.json` — verify the prerequisite phases are completed
   d. Check prerequisite files:
      - `context_loading` requires: nothing (entry point)
      - `codebase_comprehension` requires: `dev_context.json`
      - `planning` requires: `comprehension.json`, `dev_context.json`
      - `code_generation` requires: `plan.json`, `comprehension.json`, `dev_context.json`
      - `visual_qa` requires: `generation_report.json`, `dev_context.json`
      - `test_writing` requires: `generation_report.json`
      - `test_evaluation` requires: test files in organism/tests/
   e. If prerequisites missing: report which file is missing and which phase needs to run first, then STOP
   f. If prerequisites present: print "Resuming from <phase>. Skipping completed phases." and jump to that phase

   If `--from` is NOT specified but a `dev_state.json` already exists in the workspace:
   - Read it and check if pipeline was interrupted (status = "in_progress" but some phases completed)
   - If interrupted: read session_journal.md, print it, and ask user: "Previous session was interrupted at <phase>. Resume? (yes/no)"
   - If yes: set fromPhase to the next incomplete phase

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

**Gate Check**:
- Read `{workspacePath}/dev_context.json`
- Verify `lld_content` is non-empty (not null, not empty object)
- If figma was requested: verify `figma_data` has content
- If `guardrail_warnings` exist: print them as warnings
- If lld_content is empty: STOP with "Failed to load LLD — check source"

Update `dev_state.json`: set `context_loading.status = "completed"`, set `phases.context_loading.summary = "<one-line summary>"`, `phases.context_loading.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "context_loading"`, `recovery.can_resume_from = "codebase_comprehension"`.

Print: `Phase 1 complete — dev context loaded (LLD + Figma + extra context)`

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 1: Context Loading — COMPLETED at <timestamp>
- LLD loaded from: <source type>
- Figma: <loaded/unavailable>
- Extra context files: <count>
- Output: dev_context.json
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace if exists, append if not):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=codebase_comprehension`
4. Next action: Run codebase comprehension on target organism
```

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

**Gate Check**:
- Read `{workspacePath}/comprehension.json`
- For UPDATE: verify `target_path` exists on disk via Bash `test -d`
- For CREATE: verify `target_path` does NOT exist on disk
- Verify no source files changed: `git diff --name-only` should show no organism files
- If `guardrail_warnings` exist: print them

Update `dev_state.json`: set `codebase_comprehension.status = "completed"`, set `phases.codebase_comprehension.summary = "<one-line summary>"`, `phases.codebase_comprehension.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "codebase_comprehension"`, `recovery.can_resume_from = "planning"`.

Print:
```
Phase 2 complete — codebase comprehension
  Intent: <CREATE|UPDATE>
  Target: <path>
  Files mapped: <count>
  Redux slice: <key or "new">
```

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 2: Codebase Comprehension — COMPLETED at <timestamp>
- Intent: <CREATE/UPDATE>
- Target: <path>
- Files mapped: <count>
- Redux slice: <key or "new">
- Output: comprehension.json
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=planning`
4. Next action: Generate implementation plan from comprehension + context
```

---

## Phase 3 — Planning

**Skip if**: `--from` is set to a later phase AND `plan.json` exists.

Spawn agent: `dev-planner`

Pass:
- `workspacePath`: session workspace (contains dev_context.json and comprehension.json)

Wait for `plan.json` to be written.

**Gate Check**:
- Read `{workspacePath}/plan.json`
- Verify `files` array has entries (>= 10 for CREATE, >= 1 for UPDATE)
- Verify `intent` matches comprehension.json intent
- If `uncertain_items` has > 3 entries: WARN user about high uncertainty
- If `guardrail_warnings` exist: print them

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

If "yes": Append to `{workspacePath}/requirements_context.md` under **Key Decisions**:
```markdown
### Plan Review — <ISO timestamp>
- Decision: approved
- Files planned: <count>
```

If "no" or change requested: Append to `{workspacePath}/requirements_context.md` under **Key Decisions**:
```markdown
### Plan Review — <ISO timestamp>
- Decision: rejected / changes requested
- Notes: <what the user asked to change>
```
Ask what to change, re-run planner. Do NOT proceed to Phase 4.

Update `dev_state.json`: set `planning.status = "completed"`, `planning.approved = true`, `phases.planning.summary = "<one-line summary>"`, `phases.planning.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "planning"`, `recovery.can_resume_from = "code_generation"`.

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 3: Planning — <APPROVED/REJECTED> at <timestamp>
- Files planned: <count>
- Risk items: <count>
- Uncertain items: <count>
- User decision: <approved/rejected>
- Output: plan.json
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=code_generation`
4. Next action: Generate code from approved plan
```

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
   - Repeat until all files are done or `max_code_gen_retries` attempts fail (see `skills/config.md`)

**Gate Check**:
- Read `{workspacePath}/generation_report.json`
- Count `files_created` + `files_modified` vs plan.json total
- Quick grep on all generated files for banned patterns:
  - `from '@capillarytech/cap-ui-library'` (barrel import — NOT individual file imports)
  - `import axios` (banned)
  - `from '@testing-library/react'` (wrong import)
- If banned patterns found: print warnings with file:line
- If `guardrail_warnings` exist: print them
- If file count mismatch: check if partial (attempt recovery) or failed

Update `dev_state.json`: set `code_generation.status = "completed"`, set `phases.code_generation.summary = "<one-line summary>"`, `phases.code_generation.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "code_generation"`, `recovery.can_resume_from = "visual_qa"`.

Print:
```
Phase 4 complete — Code generation finished
  Files created: <list>
  Files modified: <list>
  Plan deviations: <list or "none">
  Unresolved items: <list or "none">
```

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 4: Code Generation — COMPLETED at <timestamp>
- Files created: <list>
- Files modified: <list>
- Plan deviations: <count>
- Unresolved items: <count>
- Output: generation_report.json
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=visual_qa`
4. Next action: Run visual QA comparing generated code to Figma designs
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
- `maxIterations`: per `skills/config.md` `max_qa_iterations`

Wait for `visual_qa_report.json` to be written.

**Gate Check**:
- Read `{workspacePath}/visual_qa_report.json`
- If fidelity is LOW: WARN "Significant visual differences remain — manual review recommended"
- If `guardrail_warnings` exist: print them

Update `dev_state.json`: set `visual_qa.status = "completed"`, set `phases.visual_qa.summary = "<one-line summary>"`, `phases.visual_qa.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "visual_qa"`, `recovery.can_resume_from = "test_writing"`.

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

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 5: Visual QA — COMPLETED at <timestamp>
- Fidelity: <HIGH/MEDIUM/LOW>
- Iterations: <count>
- Remaining discrepancies: <count>
- Output: visual_qa_report.json
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=test_writing`
4. Next action: Write unit tests for generated code
```

---

## Phase 6 — Test Writing

Print:
```
Would you like me to write unit tests? (yes/no)
```

**PAUSE — wait for user response.**

Append to `{workspacePath}/requirements_context.md` under **Key Decisions**:
```markdown
### Test Decision — <ISO timestamp>
- Write tests: <yes/no>
```

If "no": skip, set `test_writing.status = "skipped"`.

If "yes":

Spawn agent: `test-writer`

Pass:
- `workspacePath`: session workspace (contains generation_report.json, optionally testcase_sheet.json)

Wait for test files to be written.

Update `dev_state.json`: set `test_writing.status = "completed"`, set `phases.test_writing.summary = "<one-line summary>"`, `phases.test_writing.guardrail_result = "PASS"`, `recovery.last_successful_phase = "test_writing"`, `recovery.can_resume_from = "test_evaluation"`.

Print: `Phase 6 complete — test files written`

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 6: Test Writing — <COMPLETED/SKIPPED> at <timestamp>
- Test files written: <list or "skipped by user">
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=test_evaluation`
4. Next action: Evaluate test coverage and results
```

---

## Phase 7 — Test Evaluation

**Skip if**: test_writing was skipped.

Spawn agent: `test-evaluator`

Pass:
- `workspacePath`: session workspace

Wait for `test_report.json` to be written.

**Gate Check**:
- Read `{workspacePath}/test_report.json`
- Verify assessment is PASS, PARTIAL, or FAIL
- If `guardrail_warnings` exist: print them

Update `dev_state.json`: set `test_evaluation.status = "completed"`, set `phases.test_evaluation.summary = "<one-line summary>"`, `phases.test_evaluation.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "test_evaluation"`, `recovery.can_resume_from = null`.

Print test summary:
```
Phase 7 — Test Results
  Passed: <n> | Failed: <n> | Skipped: <n>
  Coverage: <lines>% lines, <branches>% branches, <functions>% functions
```

**CHECKPOINT if coverage < `coverage_line_target` from `skills/config.md`:**
```
Coverage is below <coverage_line_target>% target. Would you like me to write additional tests? (yes/no)
```
Append to `{workspacePath}/requirements_context.md` under **Key Decisions**:
```markdown
### Coverage Review — <ISO timestamp>
- Coverage: <lines>%
- Decision: <accept / write more tests>
```
If yes: re-run test-writer with focus on uncovered lines, then re-run test-evaluator.

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 7: Test Evaluation — COMPLETED at <timestamp>
- Passed: <n> | Failed: <n> | Skipped: <n>
- Coverage: <lines>% lines, <branches>% branches
- Assessment: <PASS/PARTIAL/FAIL>
- Output: test_report.json
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in garuda-ui repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=test_evaluation`
4. Next action: Review final summary and address any remaining issues
```

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

Update `dev_state.json`: set `status = "completed"`, `recovery.last_successful_phase = "final_summary"`, `recovery.can_resume_from = null`.

Append to `{workspacePath}/session_journal.md`:
```markdown
---
## SESSION COMPLETE at <timestamp>
All phases completed successfully.
```

Remove the HOW TO RESUME block from session_journal.md (no longer needed — session is complete).
