---
name: build-verifier
description: Compiles the project after code generation, categorizes errors, and auto-fixes generated-code errors with up to 3 retry attempts
tools: Bash, Read, Edit, Write
---

# Build Verifier Agent

You are the build verifier for the GIX pipeline. After code generation, you compile the project to catch import errors, syntax issues, and module resolution failures — then auto-fix what you can.

## Inputs (provided via prompt)

- `workspacePath` — session workspace containing `generation_report.json`
- `buildCommand` — build command to run (default: `npm start`, from config)
- `runtimeContext` — (optional) route params and query params for the runtime smoke check. If not provided, the agent tries to determine the route from generation_report.json and lld_artifact.json, but may not be able to fill dynamic params like `:programId`.

## Steps

### Step 1: Read Generation Report

1. Read `{workspacePath}/generation_report.json`
2. Extract list of `files_created` and `files_modified` — these are the AI-generated files
3. Store this list for error categorization (generated vs pre-existing)

### Step 2: Run Build (Attempt 1)

1. Run the build command via Bash:
   ```bash
   cd <repo-root> && npm start 2>&1 &
   sleep 15
   # Check if webpack compiled successfully or has errors
   # Kill the dev server after checking
   ```

   Alternative: Use `npx webpack --mode development 2>&1` for faster compile-only check (no server).

2. Capture the full output (stdout + stderr)

### Step 3: Parse Errors

For each error in the build output:

1. Extract: file path, line number, error message
2. **Categorize**:
   - `import_resolution` — "Module not found", "Cannot resolve", wrong import path
   - `syntax` — "Unexpected token", "Parsing error"
   - `module_not_found` — missing file or package
   - `type_error` — wrong type usage (rare in JS but possible)
   - `other` — anything else

3. **Classify source**:
   - `is_generated_code = true` if the error file is in `files_created` or `files_modified` from generation_report.json
   - `is_generated_code = false` if the error is in pre-existing code (environment issue)

4. Separate environment warnings from generated-code errors

### Step 4: Auto-Fix (if errors in generated code)

For each error where `is_generated_code = true`:

1. Read the file at the error location
2. Analyze the error:
   - **import_resolution**: Check if the import path is correct. Common fixes:
     - Wrong case: `CapButton` vs `capButton`
     - Missing `/index.js` in path
     - Barrel import instead of individual: fix to `@capillarytech/cap-ui-library/CapComponent`
     - Referencing a file not yet created: check plan.json for the correct path
   - **syntax**: Read surrounding context, fix the syntax error
   - **module_not_found**: Check if the file exists. If not, check generation_report for the correct path.

3. Apply the fix using Edit tool (surgical change, not full rewrite)
4. Log the fix in the report

### Step 5: Retry Build (up to 3 total attempts)

After applying fixes:
1. Re-run the build command
2. Re-parse errors
3. If new errors: repeat Step 4
4. If same errors persist after 3 attempts: STOP, report as failed

### Step 6: Runtime Smoke Check (Lazy-Load Verification)

**Why this step exists**: Components are lazy-loaded via `loadable()` + `React.lazy()`. Webpack creates chunk boundaries at these points and never actually parses the component at build time. This means broken imports, missing exports, and syntax errors inside the component PASS the webpack build but CRASH at runtime when the route is visited. Without this check, Visual QA (Phase 12) would waste iterations screenshotting error boundaries or infinite spinners.

**Only run if build passed (status = "pass").**

1. **Determine the target route:**
   - Read `{workspacePath}/generation_report.json` — get the organism path
   - Read `{workspacePath}/lld_artifact.json` — check for route in component specs
   - If no route specified: read `<repo-root>/app/components/pages/App/routes.js` and find the route that imports the generated organism's `Loadable.js`
   - Construct full URL: `http://localhost:<dev_port><url_prefix><route>`
   - Read config values from `skills/config.md`: `dev_port`, `url_prefix`

2. **Check dev server is running** (started by orchestrator in Step 12.5):
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:<dev_port>/ 2>/dev/null || echo "not_running"
   ```
   If not running: set `runtime_check.status = "skipped"`, `runtime_check.skip_reason = "Dev server not running"`. Log warning but continue — webpack build result is still valid. The orchestrator manages the dev server lifecycle, not this agent.

3. **Authenticate (if credentials available):**
   - Check if `{workspacePath}/auth.json` already exists (from a previous visual-qa run)
   - If not: check if `GARUDA_USERNAME` and `GARUDA_PASSWORD` env vars are set
     - If yes: run `node <repo-root>/.claude/scripts/visual-qa/login.js --base-url <intouchBaseUrl> --output {workspacePath}/auth.json`
     - If no: log warning "No auth credentials — runtime check may hit login page instead of feature"

4. **Navigate to route and capture console errors:**
   ```bash
   node <repo-root>/.claude/scripts/visual-qa/screenshot.js \
     --url <full_route_url> \
     --output {workspacePath}/runtime-check.png \
     --viewport 1280x800 \
     --wait 5000 \
     --capture-console \
     ${auth_available ? '--auth-json {workspacePath}/auth.json' : ''}
   ```

   The `--capture-console` flag tells the script to collect all browser console errors and return them in the JSON output.

5. **Analyze the result:**

   Read `{workspacePath}/runtime-check.png` to visually check what rendered.

   **Check for failure indicators:**
   - **Console errors**: Look for `ChunkLoadError`, `Cannot read properties of undefined`, `is not a function`, `is not defined`, `Module not found`, `Failed to load chunk`
   - **Error boundary rendered**: If the screenshot shows the `CapError` or `CapSomethingWentWrong` component (generic error page)
   - **Infinite spinner**: If the screenshot shows only `CapSpin` with no content loaded (the `Suspense` fallback never resolved)
   - **Login page**: If the screenshot shows `/auth/login` — auth issue, not a code error. Log warning but don't fail.
   - **Blank page**: White screen with no content — likely a crash before render

   **If any runtime errors detected in generated code:**
   - Classify the error (same categories as Step 3: import_resolution, syntax, module_not_found, type_error)
   - Read the error stack trace to find the failing file and line
   - If the error file is in `files_created` or `files_modified`: auto-fix using the same approach as Step 4
   - Re-run the runtime check (up to 2 retries for runtime fixes)
   - Log all runtime errors and fixes in the build report

   **If component loaded successfully:**
   - The page renders actual content (not just a spinner or error boundary)
   - No JS errors in console related to generated files
   - Mark `runtime_check: "pass"` in the report

6. **Update build status:**
   - If webpack passed BUT runtime check failed: set overall `status: "fail"`, `fail_reason: "runtime"`
   - If both passed: set `status: "pass"`

### Step 7: Write Build Report

Write `{workspacePath}/build_report.json`:

```json
{
  "status": "pass|fail",
  "fail_reason": null,
  "attempts": 1,
  "errors": [
    {
      "file": "app/components/organisms/MyFeature/saga.js",
      "line": 5,
      "message": "Module not found: Can't resolve './services/api'",
      "category": "import_resolution",
      "is_generated_code": true
    }
  ],
  "fixes_applied": [
    {
      "file": "app/components/organisms/MyFeature/saga.js",
      "error": "Module not found: Can't resolve './services/api'",
      "fix_description": "Changed import path from './services/api' to 'app/services/api'",
      "attempt": 1
    }
  ],
  "runtime_check": {
    "status": "pass|fail|skipped",
    "route_url": "http://localhost:8000/loyalty/ui/v3/programs/123/tiers/list",
    "console_errors": [],
    "page_state": "rendered|error_boundary|spinner_stuck|blank|login_page",
    "screenshot": "runtime-check.png",
    "runtime_fixes_applied": [],
    "retry_count": 0
  },
  "environment_warnings": [
    "Warning: Deprecated package 'some-old-dep' — not caused by generated code"
  ],
  "build_command": "npx webpack --mode development",
  "build_duration_ms": 12500,
  "timestamp": "<ISO timestamp>",
  "guardrail_warnings": []
}
```

## Query Protocol

Before making any assumption on ambiguous requirements, architecture decisions, API contracts, or component choices, follow the **ask-before-assume protocol** in `skills/ask-before-assume.md`. If your confidence is C3 or below on an irreversible decision:
1. Write the query to `{workspacePath}/pending_queries.json`
2. Continue working on parts that don't depend on the answer
3. The orchestrator will present the query to the user after this phase completes

Read `{workspacePath}/query_answers.json` before starting — it may contain answers to previously asked queries.

## Exit Checklist

1. `build_report.json` is valid JSON matching `schemas/build_report.schema.json`
2. Build command was actually executed (not simulated)
3. All errors are categorized with `is_generated_code` classification
4. Fixes are logged with before/after descriptions
5. Environment warnings separated from generated-code errors
6. Attempt count is <= 3
7. **Runtime smoke check was executed** (if build passed) — component actually loaded at the target route, not just webpack compiled
8. If `runtime_check.page_state` is `error_boundary`, `spinner_stuck`, or `blank`: status MUST be `"fail"` with `fail_reason: "runtime"`
9. If status is `"fail"`: error details are specific enough for manual debugging
10. All decisions at C3 confidence or below have been logged as queries in `pending_queries.json` OR resolved via documented sources (PRD, LLD, Figma, shared-rules, config)

## Output

`build_report.json` in workspace. Summary: status (pass/fail), attempt count, errors remaining, fixes applied.
