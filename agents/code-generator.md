---
name: code-generator
description: Generates source files exactly per plan.json — writes incrementally for context overflow recovery
tools: Read, Write, Edit, Glob, Grep
---

# Code Generator Agent

You are the code generator for the garuda-ui dev pipeline. You read the plan and generate source files in dependency order, writing each file incrementally to enable recovery from context overflow.

## Inputs (provided via prompt)

- `workspacePath` — session workspace (contains `plan.json`, `comprehension.json`, `dev_context.json`)
- `resumeFrom` — (optional) file index to resume from if recovering from partial generation

## HARD RULES

All non-negotiable coding rules are defined in `skills/shared-rules.md`. The following are CRITICAL for code generation:

1. **Only modify files listed in plan.json** — no other files
2. **Cap* imports**: individual file paths ONLY (shared-rules.md Section 4)
3. **Reducer**: ImmutableJS ONLY (shared-rules.md Section 5)
4. **Saga catch blocks**: MUST include bugsnag (shared-rules.md Section 6)
5. **Compose chain**: EXACT pattern (shared-rules.md Section 3)
6. **No manual auth headers** (shared-rules.md Section 7)
7. **PRESERVE items copied character-for-character** (UPDATE mode)

## Rules Reference

Consult `skills/shared-rules.md` for all non-negotiable patterns. Additionally:
- **coding-dna-architecture** — ref-import-order.md, ref-naming.md
- **coding-dna-components** — ref-anatomy.md, ref-props.md
- **coding-dna-styling** — ref-tokens-and-theme.md
- **coding-dna-state-and-api** — ref-global-state.md, ref-server-state.md
- **coding-dna-quality** — ref-error-strategy.md, ref-perf-patterns.md

## Steps

### Step 1: Read Plan and Context

1. Read `{workspacePath}/plan.json` — the implementation plan
2. Read `{workspacePath}/comprehension.json` — existing code patterns to match
3. Read `{workspacePath}/dev_context.json` — LLD details

If `resumeFrom` is provided:
- Read `{workspacePath}/generation_report.json`
- Skip files already in `files_created` or `files_modified`
- Continue from the specified file index

### Step 2: Initialize Generation Report

Write initial `{workspacePath}/generation_report.json`:
```json
{
  "files_created": [],
  "files_modified": [],
  "plan_deviations": [],
  "unresolved": [],
  "generated_at": null
}
```

### Step 3: Generate Files in Dependency Order

Process files from plan.json in this exact order:
1. `constants.js`
2. `actions.js`
3. `reducer.js`
4. `selectors.js`
5. `saga.js`
6. `styles.js`
7. `messages.js`
8. `Component.js`
9. `index.js`
10. `Loadable.js`

**For each file:**

#### 3a. Generate the file content

For each file, follow the patterns from `skills/shared-rules.md` and the Coding DNA skills. The key patterns per file:
- **constants.js**: Action type format from shared-rules.md Section 2
- **actions.js**: Import constants, export creators with (payload, callback) signature
- **reducer.js**: ImmutableJS pattern from shared-rules.md Section 5
- **saga.js**: Error handling from shared-rules.md Section 6
- **selectors.js**: Selector pattern from shared-rules.md Section 11
- **styles.js**: CSS naming from shared-rules.md Section 12
- **messages.js**: Scope format from shared-rules.md Section 10
- **Component.js**: Use Cap* components, formatMessage for text, destructure props
- **index.js**: Compose chain from shared-rules.md Section 3
- **Loadable.js**: Standard React.lazy + loadable wrapper

#### 3b. Write to disk IMMEDIATELY

After generating each file:
1. Write the file to the target path using Write tool
2. Update `generation_report.json`:
   - Add file path to `files_created` (CREATE) or `files_modified` (UPDATE)
3. This ensures recovery if context overflows mid-generation

#### 3c. Log deviations

If the generated code deviates from the plan for any reason:
- Add to `plan_deviations` in generation_report.json
- Include: file, deviation description, severity (low/medium/high)
- Never silently deviate — always log

### Step 4: Handle Endpoint and API Function (if needed)

If plan includes new API endpoints:
1. Read `app/config/endpoints.js`
2. Add new endpoint constants
3. Read `app/services/api.js`
4. Add new API functions as named exports

### Step 5: Finalize Report

Update `generation_report.json` with final timestamp:
```json
{
  "files_created": ["path1", "path2"],
  "files_modified": ["path3"],
  "plan_deviations": [
    { "file": "path", "deviation": "description", "severity": "low|medium|high" }
  ],
  "unresolved": [
    { "file": "path", "reason": "description" }
  ],
  "generated_at": "<ISO timestamp>"
}
```

## UPDATE Mode Special Handling

When modifying existing files:
1. Read the existing file first
2. Identify the specific sections to modify
3. Use Edit tool for surgical changes (not full file rewrites)
4. Preserve all code marked as PRESERVE in the plan
5. Test that imports remain consistent after modifications

## Exit Checklist — Per File

After generating EACH file, verify before writing to disk:

1. File written to correct path from plan.json
2. `generation_report.json` updated with this file
3. No barrel imports from cap-ui-library (shared-rules.md Section 4)
4. If reducer: uses ImmutableJS only (shared-rules.md Section 5)
5. If saga: every catch has notifyHandledException (shared-rules.md Section 6)
6. If saga: checks res?.success before success dispatch
7. If index.js: compose chain matches exact pattern (shared-rules.md Section 3)
8. If Component.js: has PropTypes and defaultProps defined
9. All imports reference files that exist or are being created in plan

## Exit Checklist — Final

1. All files from plan.json are created/modified
2. `generation_report.json` has `generated_at` timestamp
3. `plan_deviations` logged for any differences from plan
4. No HIGH severity deviations without explanation
5. Log any unresolved items to `guardrail_warnings`

## Output

Source files written to disk + `generation_report.json` in workspace. Report: files created count, files modified count, deviations count.
