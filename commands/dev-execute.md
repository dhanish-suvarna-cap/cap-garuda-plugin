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
    "structure_preview": { "status": "not_started", "approved": false },
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
   a. Validate the phase name is one of: context_loading, codebase_comprehension, planning, structure_preview, code_generation, visual_qa, test_writing, test_evaluation
   b. Read `{workspacePath}/session_journal.md` if it exists — print it so context is restored
   c. Read `{workspacePath}/requirements_context.md` if it exists — print it so feature context is restored
   d. Read `{workspacePath}/dev_state.json` — verify the prerequisite phases are completed
   d. Check prerequisite files:
      - `context_loading` requires: nothing (entry point)
      - `codebase_comprehension` requires: `dev_context.json`
      - `planning` requires: `comprehension.json`, `dev_context.json`
      - `structure_preview` requires: `plan.json`, `dev_context.json`
      - `code_generation` requires: `plan.json`, `comprehension.json`, `dev_context.json`, structure_preview approved
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
1. Open terminal in the target repo directory  
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
1. Open terminal in the target repo directory  
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
1. Open terminal in the target repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=structure_preview`
4. Next action: Generate structure preview for user confirmation
```

---

## Phase 3.5 — Structure Preview Gate

**Purpose**: Before writing ANY production code, show the user a layout preview so they can catch structural mistakes BEFORE 10+ files are generated. This is the cheapest point to fix layout issues.

**Skip if**: `--from` is set to a later phase AND `structure_preview` is already approved in dev_state.json.

### Step 1: Generate ASCII Wireframe

Read `{workspacePath}/plan.json` and generate `{workspacePath}/preview-wireframe.txt`.

Build an ASCII wireframe from the `component_tree` and `content_plan` for Component.js. Show:
- Every Cap* component as a labeled box with its type
- Layout structure (CapRow horizontal, CapColumn vertical)
- Nesting depth reflecting the JSX hierarchy
- Key props (CapTable columns, CapButton type, CapHeading type)

**Example format**:
```
┌──────────────────────────────────────────────────────────────────┐
│ Page: BenefitsSettings                                           │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ CapRow [header] justify="space-between" align="middle"       │ │
│ │ ├── CapHeading type="h3" "Benefits Settings"                 │ │
│ │ └── CapButton type="primary" "Create New"                    │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ CapRow [filters] gutter={16}                                 │ │
│ │ ├── CapInput.Search                                          │ │
│ │ ├── CapSelect [status filter]                                │ │
│ │ └── CapDateRangePicker                                       │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ CapTable [benefits list]                                     │ │
│ │ columns: Name | Category | Status | Actions                  │ │
│ │ pagination: yes                                              │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ CapModal [create/edit] (conditional)                         │ │
│ │ ├── CapInput [name field]                                    │ │
│ │ ├── CapSelect [category]                                     │ │
│ │ └── CapRow [footer] → CapButton "Cancel" + "Save"            │ │
│ └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Step 2: Generate Skeleton JSX

Write `{workspacePath}/preview-skeleton.jsx` — a minimal JSX file showing the Cap* component tree WITHOUT:
- No Redux wiring (no connect, compose, mapStateToProps)
- No saga/reducer/selector imports
- No real data or API calls
- No i18n (use plain strings for readability)
- No event handlers (use `{/* HANDLER: description */}` comments)
- No PropTypes

The skeleton should:
- Use ONLY Cap* components (ZERO raw HTML tags)
- Use styled components from styles.js where needed
- Show the complete layout hierarchy
- Include `// recipe: <ComponentName> — <purpose>` comments on each Cap* component
- Follow the typography hierarchy from `skills/cap-ui-composition-patterns.md`

**Example**:
```jsx
// preview-skeleton.jsx — LAYOUT PREVIEW ONLY (no Redux, no i18n, no handlers)
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapColumn from '@capillarytech/cap-ui-library/CapColumn';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapTable from '@capillarytech/cap-ui-library/CapTable';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
import CapModal from '@capillarytech/cap-ui-library/CapModal';

const BenefitsSettingsPreview = () => (
  <CapColumn span={24}> {/* recipe: CapColumn — page container */}
    <CapRow type="flex" justify="space-between" align="middle"> {/* recipe: CapRow — header bar */}
      <CapHeading type="h3">Benefits Settings</CapHeading> {/* recipe: CapHeading — page title */}
      <CapButton type="primary">{/* HANDLER: Create new benefit */}Create New</CapButton>
    </CapRow>

    <CapRow type="flex" gutter={16}> {/* recipe: CapRow — filter bar */}
      <CapInput.Search placeholder="Search benefits" />
      <CapSelect placeholder="Filter by status" />
    </CapRow>

    <CapTable  {/* recipe: CapTable — benefits list */}
      columns={[
        { title: 'Name', dataIndex: 'name' },
        { title: 'Category', dataIndex: 'category' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Actions', dataIndex: 'actions' },
      ]}
      dataSource={[]}
    />

    <CapModal title="Create Benefit" visible={false}> {/* recipe: CapModal — create/edit form */}
      <CapInput label="Name" />
      <CapSelect label="Category" />
      <CapRow type="flex" justify="end" gutter={12}>
        <CapButton type="flat">Cancel</CapButton>
        <CapButton type="primary">Save</CapButton>
      </CapRow>
    </CapModal>
  </CapColumn>
);

export default BenefitsSettingsPreview;
```

### Step 3: Validate Skeleton

Run a quick validation on the skeleton:
1. **Check 1**: Grep for raw HTML tags (`<div`, `<span`, `<p`, etc.) — MUST be zero
2. **Check 2**: Verify every Cap* component in plan.json's `cap_components` list appears in skeleton
3. **Check 3**: Verify Cap* imports are individual file paths (not barrel)

If any check fails: fix the skeleton before presenting to user.

### Step 4: Present to User and Wait for Approval

Print:

```
Phase 3.5 — Structure Preview
===============================

Layout wireframe written to: {workspacePath}/preview-wireframe.txt
Skeleton JSX written to: {workspacePath}/preview-skeleton.jsx

[Display the ASCII wireframe inline]

Cap* Components Used:
  - CapRow (layout: header, filters, footer)
  - CapColumn (page container)
  - CapHeading type="h3" (page title)
  - CapButton type="primary" (CTA), type="flat" (cancel)
  - CapTable (data display)
  - CapInput.Search (search filter)
  - CapSelect (status filter)
  - CapModal (create/edit form)

Raw HTML tags: 0 ✓

Does this layout structure match your design?
  (a) Yes — proceed to full code generation
  (b) No — I'll describe what needs to change
  (c) Skip preview — proceed directly to code generation
```

**PAUSE CHECKPOINT — wait for user response.**

**If (a) "Yes"**: 
- Update `dev_state.json`: `structure_preview.status = "completed"`, `structure_preview.approved = true`
- Append to requirements_context.md: `### Structure Preview — <timestamp>\n- Decision: approved\n- Components: <list>`
- Proceed to Phase 4

**If (b) "No"**:
- Ask user what needs to change
- Regenerate wireframe + skeleton with corrections
- Re-present for approval (loop until approved or user aborts)
- Append to requirements_context.md: `### Structure Preview — <timestamp>\n- Decision: revised\n- Changes: <user's description>`

**If (c) "Skip"**: 
- Update `dev_state.json`: `structure_preview.status = "skipped"`
- Proceed to Phase 4

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 3.5: Structure Preview — <APPROVED/REVISED/SKIPPED> at <timestamp>
- Wireframe: preview-wireframe.txt
- Skeleton: preview-skeleton.jsx
- Cap* components: <count> used, 0 raw HTML
- User decision: <approved/revised N times/skipped>
```

Update the HOW TO RESUME block:
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in the target repo directory  
2. Start Claude Code
3. Say: "Resume dev pipeline" or run: `/dev-execute --from=code_generation`
4. Next action: Generate code from approved plan and confirmed structure
```

---

## Phase 4 — Code Generation (Delegated: 3 Sub-Phases)

Code generation is split into three specialized sub-phases to improve accuracy. Each sub-phase focuses on ONE concern, preventing attention split between visual fidelity and state management.

```
Phase 4a — UI Generation (VISUAL FOCUS)
  Agent focuses ONLY on: Component.js JSX + styles.js
  Does NOT touch: Redux, i18n, compose chain
  Output: Component.js (with callback stubs + raw strings) + styles.js

Phase 4b — Redux Generation (STATE FOCUS)
  Agent focuses ONLY on: constants, actions, reducer, saga, selectors, messages
  Does NOT touch: Component.js
  Output: 6 Redux infrastructure files

Phase 4c — Integration Pass (WIRING FOCUS)
  Agent EDITS Phase 4a output: wires Redux, fills callbacks, i18nizes strings
  Output: Fully wired Component.js + index.js + Loadable.js
```

### Phase 4a — UI Generation (Component.js + styles.js ONLY)

Spawn agent: `code-generator` with `phase: "4a"`

Pass:
- `workspacePath`: session workspace
- `phase`: `"4a"` — UI generation only
- `previewSkeleton`: path to `preview-skeleton.jsx` (if Phase 3.5 was approved — use as layout reference)

**What code-generator does in Phase 4a:**
1. Read plan.json — focus ONLY on Component.js and styles.js entries
2. Read preview-skeleton.jsx if it exists — use as the approved layout structure
3. Read `skills/cap-ui-composition-patterns.md` — mandatory for every JSX element
4. Read component_mapping from dev_context.json
5. Generate `styles.js`:
   - All styled components using Cap* bases (styled(CapRow), styled(CapLabel), etc.)
   - All Cap UI tokens — ZERO raw hex or px values
6. Generate `Component.js` with these constraints:
   - **ONLY Cap* components** — zero raw HTML (Constitution Principle I)
   - **NO Redux wiring** — no connect, compose, mapStateToProps, mapDispatchToProps, withSaga, withReducer
   - **NO i18n** — use plain string literals (Phase 4c will replace them)
   - **Callback stubs** instead of real handlers: `onClick={/* HANDLER: Create new benefit */}`
   - **Prop stubs** instead of real Redux data: `data={/* PROP: benefits list from Redux */}`
   - **Recipe comments** on every Cap* component: `{/* recipe: CapTable — benefits list */}`
   - Export bare component: `export default ComponentName;` (no HOC wrapping)
7. Run pre-emission validation (Check 1–4 from Step 3b)
8. Write `{workspacePath}/ui-generation-manifest.json`:

```json
{
  "version": "1.0",
  "rootComponent": "BenefitsSettings",
  "filesWritten": ["<path>/Component.js", "<path>/styles.js"],
  "callbackSlots": [
    {
      "file": "<path>/Component.js",
      "marker": "HANDLER: Create new benefit",
      "proposedAction": "openCreateModal",
      "line": 42
    }
  ],
  "stringSlots": [
    {
      "file": "<path>/Component.js",
      "literal": "Benefits Settings",
      "suggestedIntlKey": "pageTitle",
      "line": 15
    },
    {
      "file": "<path>/Component.js",
      "literal": "Create New",
      "suggestedIntlKey": "createNewButton",
      "line": 18
    }
  ],
  "propSlots": [
    {
      "file": "<path>/Component.js",
      "marker": "PROP: benefits list from Redux",
      "suggestedSelector": "makeSelectBenefits",
      "suggestedPropName": "benefits"
    }
  ],
  "capComponentsUsed": ["CapRow", "CapColumn", "CapHeading", "CapButton", "CapTable", "CapModal", "CapInput", "CapSelect"],
  "tokensUsed": ["CAP_SPACE_16", "CAP_SPACE_24", "CAP_G01", "CAP_G05"]
}
```

9. Update generation_report.json with files from Phase 4a

**Gate Check for 4a:**
- Grep Component.js for raw HTML tags — MUST be zero
- Grep Component.js for `connect`, `compose`, `mapStateToProps` — MUST be zero (Redux belongs in 4c)
- Verify ui-generation-manifest.json is valid JSON with `filesWritten`, `callbackSlots`, `stringSlots`
- Verify all Cap* imports are individual file paths

Print: `Phase 4a complete — UI generated (Component.js + styles.js) with <N> callback stubs, <N> string slots`

### Phase 4b — Redux Generation (Infrastructure Files ONLY)

Spawn agent: `code-generator` with `phase: "4b"`

Pass:
- `workspacePath`: session workspace
- `phase`: `"4b"` — Redux generation only

**What code-generator does in Phase 4b:**
1. Read plan.json — focus ONLY on: constants.js, actions.js, reducer.js, saga.js, selectors.js, messages.js
2. Generate files in dependency order:
   - `constants.js` — action type constants (shared-rules.md Section 2)
   - `actions.js` — action creators with (payload, callback) signature
   - `reducer.js` — ImmutableJS reducer (shared-rules.md Section 5)
   - `saga.js` — workers with notifyHandledException (shared-rules.md Section 6)
   - `selectors.js` — reselect selectors with .toJS() (shared-rules.md Section 11)
   - `messages.js` — react-intl messages including keys from ui-generation-manifest.json `stringSlots`
3. Read ui-generation-manifest.json — use `stringSlots` to generate matching message keys in messages.js
4. Run pre-emission validation on each file
5. Handle mock APIs if plan contains ASSUMED endpoints
6. Update generation_report.json with files from Phase 4b

**Gate Check for 4b:**
- All 6 Redux files exist
- Every action type has REQUEST/SUCCESS/FAILURE triplet
- Every saga has notifyHandledException in catch
- Reducer uses ImmutableJS only
- messages.js includes keys for all stringSlots from manifest

Print: `Phase 4b complete — Redux infrastructure generated (6 files)`

### Phase 4c — Integration Pass (Wire Redux into Component.js)

Spawn agent: `code-generator` with `phase: "4c"`

Pass:
- `workspacePath`: session workspace
- `phase`: `"4c"` — integration wiring only

**What code-generator does in Phase 4c — EDITS Component.js from Phase 4a:**

1. **Read the manifest**: `{workspacePath}/ui-generation-manifest.json`
2. **Read Phase 4a's Component.js** (the one with stubs)
3. **Read Phase 4b's files** (constants, actions, reducer, saga, selectors, messages)

4. **Add Redux imports** at the top of Component.js:
   ```js
   import { connect } from 'react-redux';
   import { compose, bindActionCreators } from 'redux';
   import { createStructuredSelector } from 'reselect';
   import injectSaga from 'utils/injectSaga';
   import injectReducer from 'utils/injectReducer';
   import { injectIntl } from 'react-intl';
   import withStyles from 'utils/withStyles';
   // + local imports: constants, actions, reducer, saga, selectors, styles, messages
   ```

5. **Fill callback stubs**: For each `callbackSlots` entry in manifest:
   - Find the `/* HANDLER: <marker> */` comment in Component.js
   - Replace with: `props.actions.<proposedAction>` (mapped to action creator from actions.js)
   - Example: `onClick={/* HANDLER: Create new benefit */}` → `onClick={() => actions.openCreateModal()}`

6. **Fill prop stubs**: For each `propSlots` entry in manifest:
   - Find the `/* PROP: <marker> */` comment in Component.js
   - Replace with the actual prop name: `data={/* PROP: benefits list */}` → `data={benefits}`

7. **Replace string literals with i18n**: For each `stringSlots` entry in manifest:
   - Find the literal string in Component.js
   - Replace with: `{formatMessage(messages.<suggestedIntlKey>)}`
   - Example: `"Benefits Settings"` → `{formatMessage(messages.pageTitle)}`

8. **Add mapStateToProps + mapDispatchToProps** at the bottom of Component.js:
   ```js
   const mapStateToProps = createStructuredSelector({
     benefits: makeSelectBenefits(),
     loading: makeSelectLoading(),
     // ... one entry per propSlot
   });
   
   const mapDispatchToProps = (dispatch) => ({
     actions: bindActionCreators({ openCreateModal, fetchBenefits, ... }, dispatch),
   });
   ```

9. **Add compose chain** (shared-rules.md Section 3):
   ```js
   const withConnect = connect(mapStateToProps, mapDispatchToProps);
   const withSagaInjection = injectSaga({ key: INJECT_KEY, saga });
   const withReducerInjection = injectReducer({ key: INJECT_KEY, reducer });
   
   export default compose(
     withSagaInjection,
     withReducerInjection,
     withConnect,
   )(injectIntl(withStyles(ComponentName, styles)));
   ```

10. **Add PropTypes** for all props from manifest

11. **Generate index.js**: `export { default } from './ComponentName';`

12. **Generate Loadable.js**: Standard lazy loading wrapper

13. **Run final pre-emission validation** on the edited Component.js

14. **Write integration-patches.md** documenting every edit:
    ```markdown
    ## Phase 4c Integration Patches
    
    ### <path>/Component.js
    + imports: connect, compose, bindActionCreators, createStructuredSelector, ...
    + mapStateToProps: <N> selectors wired
    + mapDispatchToProps: <N> action creators bound
    - callback "HANDLER: Create new benefit" → actions.openCreateModal
    - callback "HANDLER: Sort change" → actions.setSortOrder
    - string "Benefits Settings" → formatMessage(messages.pageTitle)
    - string "Create New" → formatMessage(messages.createNewButton)
    + compose chain: withSaga → withReducer → withConnect
    + PropTypes: <N> props declared
    + export: replaced bare export with compose-wrapped export
    
    ### <path>/index.js — GENERATED
    ### <path>/Loadable.js — GENERATED
    ```

15. **Update generation_report.json** with all files from Phase 4c

**Gate Check for 4c:**
- Component.js has ZERO callback stubs remaining (`/* HANDLER:` markers)
- Component.js has ZERO prop stubs remaining (`/* PROP:` markers)
- Component.js has ZERO raw string literals that match stringSlots
- Component.js has compose chain in correct order
- index.js contains ONLY re-export line
- Grep for raw HTML tags — MUST still be zero (regression check)
- All imports reference files that exist

**Recovery check**: If the agent returns with an error or partial completion:
1. Read `generation_report.json` to see how many files were completed
2. If partial: spawn a NEW code-generator instance with `phase: "4c"` and `resumeFrom` flag
3. Repeat until done or `max_code_gen_retries` fail (see `skills/config.md`)

Update `dev_state.json`: set `code_generation.status = "completed"`, set `phases.code_generation.summary = "<one-line summary>"`, `phases.code_generation.guardrail_result = "PASS" or "PASS with N warnings"`, `recovery.last_successful_phase = "code_generation"`, `recovery.can_resume_from = "visual_qa"`.

Print:
```
Phase 4 complete — Code generation finished (3 sub-phases)
  4a — UI: Component.js + styles.js (Cap* only, 0 raw HTML)
  4b — Redux: constants + actions + reducer + saga + selectors + messages
  4c — Integration: <N> callbacks wired, <N> strings i18nized, compose chain added
  
  Files created: <list>
  Files modified: <list>
  Plan deviations: <list or "none">
  Unresolved items: <list or "none">
```

Append to `{workspacePath}/session_journal.md`:
```markdown
## Phase 4: Code Generation — COMPLETED at <timestamp>
- Phase 4a (UI): Component.js + styles.js — <N> Cap* components, 0 raw HTML
- Phase 4b (Redux): 6 infrastructure files
- Phase 4c (Integration): <N> callbacks wired, <N> strings i18nized
- Files created: <list>
- Files modified: <list>
- Plan deviations: <count>
- Output: generation_report.json, ui-generation-manifest.json, integration-patches.md
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in the target repo directory  
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
1. Open terminal in the target repo directory  
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
1. Open terminal in the target repo directory  
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
1. Open terminal in the target repo directory  
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
