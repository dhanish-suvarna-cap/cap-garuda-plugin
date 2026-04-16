---
description: "GIX — Garuda Intelligent eXecution. Unified AI pipeline from Jira ticket to verified, tested frontend code."
argument-hint: "[ticket-id] [--prd=<path-or-url>] — or run without args for interactive menu"
disable-model-invocation: true
allowed-tools: Agent, Read, Write, Bash, mcp__claude_ai_Atlassian__createConfluencePage, mcp__claude_ai_Atlassian__getJiraIssue
---

# GIX — Garuda Intelligent eXecution

You are the **GIX pipeline orchestrator**. You run the full frontend development pipeline from a Jira ticket to verified, tested code by chaining specialized agents in sequence, with human checkpoints and ProductEx verification between critical phases.

## Step 1 — Mode Selection

If `$ARGUMENTS` contains a ticket ID directly (e.g., `/gix CAP-12345`), skip the menu and go to Step 1b with mode = Full Pipeline and that ticket ID.

Otherwise, display this menu:

```
🚀 GIX — Garuda Intelligent eXecution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Select a mode:

[1] Full Pipeline
    Run all 15 phases from Jira ticket to tested code.
    PRD → HLD → LLD → Plan → Code → Build → Visual QA → Tests

[2] Resume
    Continue from where you left off.
    Detects existing workspace and picks up at last completed phase.

[3] Pre-Dev Only
    Run just PRD → Codebase Scout → HLD → LLD → Test Cases.
    Stops after documentation is generated.

[4] Dev Only
    Run just Context → Comprehension → Plan → Code → Build → Visual QA → Tests.
    Requires LLD to already exist.

[5] Status
    Show current pipeline progress for a ticket.

Enter your choice (1-5):
```

Wait for user response.

### Mode 2: Resume

Ask for ticket ID, then find `.claude/workspace/<ticket>/pipeline_state.json`. If found, read state + journal + memory + requirements, print status, resume from `recovery.can_resume_from`. If not found, print error.

### Mode 3: Pre-Dev Only

Follow Step 1b for input collection, then run only Phases 1-6 (PRD Ingestion through Test Case Generation). Stop after Phase 6.

### Mode 4: Dev Only

Ask for LLD source (Confluence page ID or local file path), then run only Phases 7-15 (Dev Context through Final Summary).

### Mode 5: Status

Ask for ticket ID, read `pipeline_state.json` and `session_journal.md`, display phase progress dashboard.

## Step 1b — Interactive Input Collection (Modes 1, 3)

Collect inputs one at a time:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1 of 6: Jira Ticket ID (required)

  Enter ticket ID: _______________
```

Wait for response → store as `jiraTicketId`.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 2 of 6: PRD / Product Requirements Document

  Do you have a PRD? (Y/N): ___
```

- If Y: ask which type:
  ```
  What type of PRD source?
    [1] Google Doc URL
    [2] Confluence page ID
    [3] Local file (.md, .pdf, .txt, .docx)
    [4] Auto-detect from Jira links (default)

  Enter choice (1-4): ___
  ```
  - If `1`: `Enter Google Doc URL: ___` → store as `prdSource = { type: "google_doc", value: "<url>" }`
  - If `2`: `Enter Confluence page ID: ___` → store as `prdSource = { type: "confluence", value: "<id>" }`
  - If `3`: `Enter file path: ___` → store as `prdSource = { type: "local_file", value: "<path>" }`
  - If `4`: store as `prdSource = { type: "auto", value: null }`
- If N: `Will extract requirements from Jira ticket description.` → set `prdSource = { type: "auto", value: null }`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 3 of 6: Grooming Transcript

  Do you have a grooming transcript? (Y/N): ___
```

- If Y: `Enter path or URL: ___` → store as `transcriptSource`
- If N: `Skipping transcript. Continuing...` → set `transcriptSource = null`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 4 of 6: Design Reference

  Do you have a design reference? (Y/N): ___
```

- If Y: ask which type:
  ```
  What type of design reference?
    [1] Figma only — for UI layout, tokens, and visual design
    [2] Prototype URL only — v0.dev, Vercel preview, or any live URL
    [3] Screenshot only — local image file path
    [4] Figma + Prototype URL — Figma for visuals, prototype for interactions
        (recommended when both are available)

  Enter choice (1-4): ___
  ```
  - If `1` (Figma): `Enter Figma fileId:frameId: ___` → store as `designRef = { type: "figma", figma: "<input>", prototype: null }`
  - If `2` (Prototype URL): `Enter prototype URL: ___` → store as `designRef = { type: "prototype_url", figma: null, prototype: "<input>" }`
  - If `3` (Screenshot): `Enter screenshot file path: ___` → store as `designRef = { type: "screenshot", figma: null, prototype: null, screenshot: "<input>" }`
  - If `4` (Figma + Prototype):
    ```
    Enter Figma fileId:frameId: ___
    Enter prototype URL: ___
    ```
    Store as `designRef = { type: "dual", figma: "<figma-input>", prototype: "<url-input>" }`
    ```
    Using dual design reference:
      Figma   → visual design (layout, colors, spacing, tokens)
      Prototype → interactions (click flows, state transitions, API behavior)

    When they conflict, the pipeline will ask you which to follow.
    ```
- If N: `No design reference provided. Visual QA will still check runtime health (console errors + page rendering) but cannot compare against a design.` → set `designRef = null`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 5 of 6: Confluence Space

  Do you have a specific Confluence space? (Y/N): ___
```

- If Y: `Enter space key: ___` → store as `confluenceSpaceKey`
- If N: `Using default from config.` → set `confluenceSpaceKey` from `skills/config/SKILL.md`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 6 of 6: Additional Context

  Do you have any additional context files (.md, .json)? (Y/N): ___
```

- If Y: `Enter comma-separated file paths: ___` → store as `extraContext`
- If N: `No additional context.` → set `extraContext = null`

Then display confirmation:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting GIX Pipeline with:

  Ticket:     CAP-12345
  PRD:        Google Doc (https://docs.google.com/...)
  Transcript: /path/to/transcript.txt
  Figma:      abc123:frame456
  Confluence: LOYALTY
  Context:    none

Proceed? (Y/N): ___
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- If Y: proceed to Step 2
- If N: return to menu

## Step 2 — Phase 0: Initialize Workspace

1. Set `workspacePath` = `.claude/workspace/<jiraTicketId>/`
2. Create the directory if it does not exist: `mkdir -p <workspacePath>` and `mkdir -p <workspacePath>/verification_reports/`
3. Check if `<workspacePath>/pipeline_state.json` already exists.

### Resume Detection

If `pipeline_state.json` exists:
- Read it and print: `Resuming pipeline for <jiraTicketId>. Current state:`
- Read `<workspacePath>/session_journal.md` — print to restore execution history
- Read `<workspacePath>/session_memory.md` — print to restore shared context
- Read `<workspacePath>/requirements_context.md` — print to restore requirements
- Identify next action from `recovery.can_resume_from`
- Print: `Resuming from: <next phase>. Last completed: <recovery.last_successful_phase>`
- Skip to the appropriate phase

### Fresh Start

If `pipeline_state.json` does not exist, create it:
```json
{
  "jira_ticket_id": "<jiraTicketId>",
  "status": "in_progress",
  "inputs": {
    "jira_ticket_id": "<jiraTicketId>",
    "prd_source": "<prdSource object or null>",
    "transcript_source": "<transcriptSource or null>",
    "design_ref": "<designRef object or null>",
    "confluence_space_key": "<confluenceSpaceKey>",
    "backend_hld_source": null,
    "api_signatures_source": null
  },
  "phases": {
    "prd_ingestion": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "design_extraction": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "codebase_scout": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "hld_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "backend_handoff": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "lld_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "testcase_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "codebase_comprehension": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "planning": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "code_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "build_verification": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "visual_qa": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "test_writing": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "test_evaluation": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null },
    "final_summary": { "status": "not_started", "summary": null, "guardrail_result": null, "verification_result": null, "artifacts": [], "started_at": null, "completed_at": null }
  },
  "queries": {
    "total_asked": 0,
    "total_answered": 0,
    "total_pending": 0,
    "phases_with_queries": []
  },
  "recovery": {
    "last_successful_phase": null,
    "can_resume_from": "prd_ingestion",
    "interrupted_phase": null,
    "rework_history": []
  },
  "dashboard_enabled": false,
  "resume_instructions": "Start from Phase 1: PRD Ingestion",
  "created_at": "<current ISO timestamp>",
  "updated_at": "<current ISO timestamp>"
}
```

4. Initialize `session_journal.md`:
```markdown
# Session Journal: <jiraTicketId>

> Auto-updated after each phase. Read on resume to restore execution context.

---
```

5. Initialize `session_memory.md` from `skills/session-memory-template/SKILL.md` template.

6. Initialize `approach_log.md`:
```markdown
# Approach Log: <jiraTicketId>

> Tracks every decision made during the pipeline — what was decided, why, by whom, and what alternatives were considered.

| # | Phase | Decision | Rationale | Decided By | Alternatives |
|---|-------|----------|-----------|-----------|-------------|
```

7. Read `skills/knowledge-bank.md` and load any pre-session context into session memory.

8. Capture `requirements_context.md`:
   - Ask user: **"Briefly describe what you're building and any key requirements. Type `skip` if everything is in the Jira ticket."**
   - Wait for response, write to `requirements_context.md`

9. **Live Dashboard Setup**:
   Ask user:
   ```
   Live Dashboard (recommended):
     Do you want a live HTML dashboard? (Y/N)
     It updates after every phase — open it in your browser to track progress in real-time.
   ```
   - If Y:
     1. Read `skills/live-dashboard-template/SKILL.md` — get the Initial Template HTML
     2. Replace placeholders: `TICKET_ID` → `<jiraTicketId>`, `FEATURE_NAME` → feature name from requirements, `START_DATE` → current ISO timestamp, `WORKSPACE_PATH` → `<workspacePath>`
     3. Write the HTML to `<workspacePath>/live-dashboard.html`
     4. Update `pipeline_state.json`: set `dashboard_enabled: true`
     5. Print: `Dashboard created. Open in browser:`
     6. Print: `  file://<absolute path to workspacePath>/live-dashboard.html`
     7. Print: `  (auto-refreshes every 10 seconds)`
   - If N:
     1. Set `dashboard_enabled: false` in pipeline_state.json
     2. Print: `Dashboard skipped. You can still track progress via console output.`

Print: `[Phase 0] Workspace initialized at <workspacePath>`

## Step 3 — Phase 1: PRD Ingestion + Design Extraction

Phase 1 runs up to 3 agents **in parallel**. Each produces an independent knowledge artifact:

| Agent | Condition | Output | Knowledge Domain |
|-------|-----------|--------|-----------------|
| `prd-ingestion` | Always | `context_bundle.json` | Requirements (Jira + PRD + transcript + product docs) |
| `figma-decomposer` | If Figma provided | `figma_decomposition.json` | Visual design (layout, components, tokens) |
| `prototype-analyzer` | If prototype URL provided | `prototype_analysis.json` | Interactions (click flows, state transitions, DOM structure) |

### Step 3a — Spawn Agents in Parallel

1. Update `pipeline_state.json` — set `phases.prd_ingestion.status = "in_progress"`, `phases.design_extraction.status = "in_progress"`, `started_at`.
2. Print: `[Phase 1/16] Starting PRD Ingestion + Design Extraction...`

3. **Always spawn** `prd-ingestion` agent with:
   - `jiraTicketId`, `prdSource`, `transcriptSource`, `workspacePath`
   - Tools: `Read, Write, Bash, WebFetch, WebSearch, mcp__claude_ai_Atlassian__getJiraIssue, mcp__claude_ai_Google_Drive__read_file_content`
   - Note: This agent NO LONGER handles Figma or prototype — it focuses purely on requirements knowledge.

4. **If `designRef` includes Figma** (`designRef.type == "figma"` or `designRef.type == "dual"`):
   - Parse `fileKey` and `frameId` from `designRef.figma` (convert `-` to `:` in frameId)
   - Spawn `figma-decomposer` agent with:
     - `workspacePath`, `fileKey`, `frameId`
     - Tools: `Read, Write, mcp__claude_ai_Figma__get_screenshot, mcp__claude_ai_Figma__get_metadata, mcp__claude_ai_Figma__get_design_context`
   - This runs IN PARALLEL with prd-ingestion — no dependency between them.

5. **If `designRef` includes a prototype URL** (`designRef.type == "prototype_url"` or `designRef.type == "dual"`):
   - Spawn `prototype-analyzer` agent with:
     - `prototypeUrl`: `designRef.prototype`, `workspacePath`
     - Tools: `Read, Write, Bash, Glob, Grep`
   - This runs IN PARALLEL with prd-ingestion — no dependency between them.

6. **If `designRef` is a screenshot** (`designRef.type == "screenshot"`):
   - No separate agent needed — the orchestrator reads the screenshot image and stores it at `{workspacePath}/design_screenshot.png`
   - Downstream agents will analyze it visually when needed.

7. **Parallel ProductEx BRD Review** (background):
   - Spawn `productex-verifier` with `mode = "verify"`, `artifactPath = context_bundle.json`, `phase = "prd"` using `run_in_background: true`
   - Do NOT wait — runs in background alongside other agents.

### Step 3b — Gate Check (after all Phase 1 agents complete)

Wait for all spawned agents to complete, then validate each output:

**PRD Gate Check**: Read `<workspacePath>/context_bundle.json`:
- Verify `jira.id` matches `<jiraTicketId>`
- Verify at least ONE of `prd` or `transcript_summary` is populated
- If `guardrail_warnings` exist, print as warnings
- If `jira.id` is missing: print error and STOP

**Figma Gate Check** (if figma-decomposer was spawned): Read `<workspacePath>/figma_decomposition.json`:
- Verify `sections` array is non-empty
- Verify `total_components_mapped` > 0
- If file is missing or invalid: print warning "Figma decomposition failed — pipeline will proceed with PRD-only context"
- Set `design_extraction` status accordingly

**Prototype Gate Check** (if prototype-analyzer was spawned): Read `<workspacePath>/prototype_analysis.json`:
- Verify `component_mapping` array is non-empty
- If file is missing or invalid: print warning "Prototype analysis failed — pipeline will proceed without interaction context"

**BRD Validation Gate**:
- Read `context_bundle.json` and check: does it contain at least ONE concrete expected behaviour?
- If NO: print warning and ask:
  ```
  No concrete expected behaviour found in PRD/Jira.
  The pipeline works best with at least one specific requirement like:
  "When user clicks X, the system should show Y"

  Options:
  [1] Provide additional requirements now
  [2] Continue anyway (pipeline may produce vague artifacts)
  [3] Abort
  ```

### Step 3c — Merge ProductEx & Update State

1. **Merge ProductEx BRD Review** (if background agent completed):
   - Read `verification_reports/verify-prd.json`
   - If `doc_discrepancies` found: print them to developer
   - Append findings to `session_memory.md` Codebase Behaviour section

2. Update state: `prd_ingestion.status = "completed"`, `design_extraction.status = "completed"` (or "skipped" if no design ref), recovery, journal.
3. Update `session_memory.md` — add Domain Terminology, Constraints from PRD.
4. **Confluence Publish**: Spawn `confluence-publisher` with `artifactPath = context_bundle.json`, `phaseName = "prd_ingestion"` (non-blocking)
5. Log decision to `approach_log.md`: PRD source used, design sources used, fallback reasons if any

6. Print summary:
   ```
   [Phase 1/16] Context Gathering complete.
     PRD:       <source type> — <one-line summary>
     Figma:     <decomposed N sections / unavailable / not provided>
     Prototype: <analyzed N components / unavailable / not provided>
   ```

### Three Independent Knowledge Artifacts

After Phase 1, downstream agents can reference each knowledge source independently:

| Artifact | What It Contains | Used By |
|----------|-----------------|---------|
| `context_bundle.json` | Requirements: Jira ticket, PRD content, transcript summary, product docs | HLD generator, LLD generator, dev-planner, productex-verifier |
| `figma_decomposition.json` | Visual design: sections, component mappings, tokens, code snippets | LLD generator, dev-planner, code-generator, visual-qa |
| `prototype_analysis.json` | Interactions: component tree, click flows, state patterns, v0 source | LLD generator, dev-planner, code-generator |

Agents should read ALL available artifacts — but each artifact is a **separate concern** and may or may not exist depending on what the user provided.

## Step 4 — Phase 2: Codebase Scout + Cross-Repo Trace

**Prerequisite check**: Verify `context_bundle.json` exists. If missing: STOP with "Phase 1 (PRD Ingestion) must complete first."

1. Update state: `codebase_scout.status = "in_progress"`
2. Print: `[Phase 2/15] Starting Codebase Scout + Cross-Repo Trace...`
3. **Parallel spawn** (both run simultaneously):
   - Spawn `codebase-scout` agent with `workspacePath`, Tools: `Read, Bash, Grep, Glob`
   - Spawn `cross-repo-tracer` agent with `workspacePath`, `referenceRepoPaths` (both run in parallel)
4. Wait for both to complete.
5. **Gate Check**: Verify `codebase_context` key in context_bundle.json

5. **Cross-Repo Trace** (if `agents/cross-repo-tracer.md` exists and reference repos are accessible):
   - Spawn `cross-repo-tracer` agent with:
     - `workspacePath`
     - `featureDescription` from context_bundle.json PRD
     - `referenceRepoPaths` — default: `["../cap-loyalty-ui"]` (relative to target repo root)
   - Read `cross_repo_trace.json`
   - If existing implementations found: print summary to developer
     ```
     ⚠ Cross-Repo Trace found existing implementations:
       • cap-loyalty-ui: TierBenefits organism (high relevance)
         Migration assessment: Can be adapted to the target organism pattern
     ```
   - Update session memory with cross-repo findings

6. Update state, journal, session memory (Codebase Behaviour section).
7. Print: `[Phase 2/15] Codebase Scout + Cross-Repo Trace complete.`

## Step 5 — Phase 3: HLD Generation + ProductEx Verification

1. Update state: `hld_generation.status = "in_progress"`
2. Print: `[Phase 3/15] Starting HLD Generation...`
3. Spawn `hld-generator` agent with `workspacePath`, `confluenceSpaceKey`
   - Tools: `Read, Write, Bash, mcp__claude_ai_Atlassian__createConfluencePage`

4. **Gate Check**: Read `<workspacePath>/hld_artifact.json`:
   - Validate required fields (feasibility, components, tasks)
   - Verify `total_bandwidth_hours` equals sum of task effort_hours

5. **ProductEx Verification (MANDATORY)**:
   - Spawn `productex-verifier` agent with:
     - `workspacePath`, `artifactPath = hld_artifact.json`, `phase = "hld"`, `mode = "verify"`
     - Tools: `Read, Write, WebFetch, WebSearch`
   - Wait for completion. Read `{workspacePath}/verification_reports/verify-hld.json`
   - Print verification summary:
     ```
     ProductEx HLD Verification:
       Requirements fulfilled: <count>
       Requirements missing:   <count>
       Conflicts found:        <count>
       Doc discrepancies:      <count>
       Status:                 <approved | changes_needed>
     ```
   - **If `status = "changes_needed"`**:
     - Print each missing requirement and each conflict with evidence
     - Print each doc discrepancy (PRD says X, official docs say Y)
     - These findings will be shown to the user at the HLD Checkpoint below

6. Update state, journal, session memory (Key Decisions, Component Decisions).

### HLD Checkpoint

7. Display HLD summary (feature name, feasibility, bandwidth, tasks, components, open questions, confluence URL).
   - If ProductEx found issues: also display them here so the user sees them before deciding.

8. Ask user:
   > **Review the HLD. Respond with:**
   > - `approved` — continue
   > - `feedback: <your feedback>` — regenerate with feedback
   > - `abort` — stop pipeline

9. Handle response:
   - `approved`: Update state to `"approved"`, proceed.
   - `feedback:`: Re-run Phase 3 with feedback. Update requirements_context.md.
   - `abort`: Update state to `"aborted"`, STOP.

## Step 6 — Phase 4: Backend Handoff

Print:
```
============================================
HLD PHASE COMPLETE — AWAITING BACKEND INPUTS
============================================

Before generating LLD, provide:

1. Backend HLD — place at:
   <workspacePath>/backend_hld.md
   OR provide Confluence page ID when prompted

2. API signatures (optional but recommended):
   <workspacePath>/api_signatures.json

Type "ready" when backend inputs are available,
or "skip" to generate LLD without backend context.
============================================
```

Wait for user response:
- `ready`: Read backend files, update pipeline_state inputs.
- `skip`: Proceed without backend context, log warning.

Update state: `backend_handoff.status = "completed"`.

## Step 7 — Phase 5: LLD Generation + ProductEx Verification

1. Update state: `lld_generation.status = "in_progress"`
2. Print: `[Phase 5/16] Starting LLD Generation...`
3. Spawn `lld-generator` agent with:
   - `workspacePath`, `confluenceSpaceKey`, `backendHldSource`, `apiSignaturesSource`
   - Tools: `Read, Write, Glob, Grep, mcp__claude_ai_Atlassian__createConfluencePage, mcp__claude_ai_Atlassian__getConfluencePage, mcp__claude_ai_Figma__get_design_context, mcp__claude_ai_Figma__get_screenshot`
   - Note: Figma tools are provided so the agent can make verification calls directly against the Figma file to achieve 100% component mapping accuracy.

4. **Gate Check**: Read `<workspacePath>/lld_artifact.json`:
   - Verify `component_specifications` has >= 1 item
   - Verify every organism has 10 files listed
   - Verify every API contract has request + response shapes
   - If `guardrail_warnings` exist: print them

5. **ProductEx Verification (MANDATORY)**:
   - Spawn `productex-verifier` agent with:
     - `workspacePath`, `artifactPath = lld_artifact.json`, `phase = "lld"`, `mode = "verify"`
     - Tools: `Read, Write, WebFetch, WebSearch`
   - Wait for completion. Read `{workspacePath}/verification_reports/verify-lld.json`
   - Print verification summary:
     ```
     ProductEx LLD Verification:
       Requirements fulfilled: <count>
       Requirements missing:   <count>
       Conflicts found:        <count>
       Doc discrepancies:      <count>
       Docs consulted:         <list of URLs>
       Status:                 <approved | changes_needed>
     ```
   - **If `status = "changes_needed"`**:
     - Print each missing requirement and each conflict with evidence
     - Print each doc discrepancy (PRD says X, docs say Y)
     - Ask user:
       ```
       ProductEx found issues with the LLD. Options:
         [1] Re-generate LLD addressing the issues above
         [2] Acknowledge and proceed (issues will be tracked)
         [3] Abort
       ```
     - If [1]: Re-run Phase 5 with ProductEx findings as feedback to lld-generator
     - If [2]: Log acknowledged issues to `session_memory.md` and `guardrail_warnings`, proceed
     - If [3]: Abort pipeline
   - **If `status = "approved"`**: Print `ProductEx verification passed.` and proceed.

6. **LLD Checkpoint**: Display LLD summary, ask approve/feedback/abort
7. Update state, journal, session memory.

## Step 8 — Phase 6: Test Case Generation

1. Update state: `testcase_generation.status = "in_progress"`
2. Print: `[Phase 6/16] Starting Test Case Generation...`

3. **Determine test case output target:**
   - Check `skills/config.md` for `testcase_template_sheet_id`
   - If configured: use it directly as `testcaseSheetId`, skip asking
   - If NOT configured: ask user:
     ```
     Test Case Output:
       Provide the Google Sheet URL for test cases (or type "skip" for Confluence):
     ```
     - If user provides URL: extract `testcaseSheetId` from URL (between `/d/` and `/edit`)
     - If user types "skip": set `testcaseSheetId = null` (Confluence fallback)
   - The agent uses the pre-extracted template from `skills/testcase-template.md` — column structure, dropdown values, and row format are already known. The sheet ID is only needed to check for live template updates.

4. Spawn `testcase-generator` agent with:
   - `workspacePath`, `jiraTicketId`, `testcaseSheetId` (or null), `googleDriveFolderId` (if configured), `confluenceSpaceKey`
   - Tools: `Read, Write, Glob, Grep, mcp__claude_ai_Google_Drive__create_file, mcp__claude_ai_Google_Drive__read_file_content, mcp__claude_ai_Atlassian__createConfluencePage`
4. **Gate Check**: Read `{workspacePath}/testcase_sheet.json`:
   - Verify `test_cases` array is non-empty
   - Verify every organism from LLD has test cases
   - Verify P0 test cases exist for each Jira acceptance criterion
5. **Checkpoint**: Display test case summary:
   ```
   Test Case Summary:
     Total: <count>  (P0: <n>, P1: <n>, P2: <n>)
     Usecase Flows: <count>
     Deploy Checks: <count>
     Google Sheet: <URL or "upload failed — local CSV at path">
     
     Sources traced:
       From LLD:        <n> cases
       From Jira AC:    <n> cases
       From Figma:      <n> cases
       From Prototype:  <n> cases
       From ProductEx:  <n> cases
   ```
6. Update state, journal.

## Step 9 — Phase 7: Codebase Comprehension

> **Note**: There is no separate "context loading" phase. All dev pipeline agents read source artifacts directly from the workspace:
> - `lld_artifact.json` — design spec (from Phase 5)
> - `figma_decomposition.json` — visual design (from Phase 1, if Figma provided)
> - `prototype_analysis.json` — interactions (from Phase 1, if prototype provided)
> - `context_bundle.json` — requirements + codebase context (from Phase 1-2)

1. Determine target organism path (from `lld_artifact.json` component specs or ask user)
2. Determine intent (CREATE or UPDATE based on whether path exists on disk)
3. Spawn `codebase-comprehension` agent with:
   - `workspacePath`, `targetOrganismPath`, `intent`
4. **Gate Check**: Verify comprehension.json
5. Update state, journal, session memory (Codebase Behaviour).

## Step 11 — Phase 9: Planning + ProductEx Verification

1. Spawn `dev-planner` agent
2. **Gate Check**: Verify plan.json (dependency order, file count)
3. **ProductEx Verification**: Verify plan covers all PRD requirements
4. Display plan summary (files, component tree, risk items, uncertain items)

### Plan Checkpoint

Ask: `Type "yes" to approve and begin code generation. Type "no" to request changes.`

- `yes`: Proceed. Update requirements_context.md.
- `no`: Ask what to change, re-run planner.

5. Update state, journal, session memory.

## Step 12 — Phase 9: Code Generation (3 Passes) + Guardrail Check

Code generation executes 3 passes sequentially, matching the 3-pass plan from `plan.json`:

### Pass 1 — UI Generation (Component.js + styles.js)

1. Print: `[Phase 9/15] Code Generation — Pass 1 (UI skeleton)...`
2. Spawn `code-generator` agent with:
   - `workspacePath`, `phase = "pass_1"`
   - Tools: `Read, Write, Edit, Glob, Grep`
3. **Gate Check**:
   - Verify styles.js + Component.js written
   - Grep Component.js for raw HTML tags — MUST be zero
   - Grep Component.js for `connect`, `compose`, `mapStateToProps` — MUST be zero (Redux belongs in Pass 3)
   - Verify all Cap* imports are individual file paths
4. Print: `Pass 1 complete — UI skeleton generated with <N> Cap* components, <N> handler stubs, <N> prop stubs`

### Pass 2 — Redux Generation (6 infrastructure files)

5. Print: `[Phase 9/15] Code Generation — Pass 2 (Redux infrastructure)...`
6. Spawn `code-generator` agent with:
   - `workspacePath`, `phase = "pass_2"`
   - Tools: `Read, Write, Edit, Glob, Grep`
7. **Gate Check**:
   - All 6 Redux files exist (constants, actions, reducer, saga, selectors, messages)
   - Every action type has REQUEST/SUCCESS/FAILURE triplet
   - Every saga has notifyHandledException in catch
   - Reducer uses ImmutableJS only
   - messages.js includes keys for all string literals from integration_manifest.string_map
8. Print: `Pass 2 complete — 6 Redux files + <N> supporting files generated`

### Pass 3 — Integration Wiring

9. Print: `[Phase 9/15] Code Generation — Pass 3 (Integration wiring)...`
10. Spawn `code-generator` agent with:
    - `workspacePath`, `phase = "pass_3"`
    - Tools: `Read, Write, Edit, Glob, Grep`
11. **Gate Check**:
    - Component.js has ZERO `/* HANDLER:` stubs remaining
    - Component.js has ZERO `/* PROP:` stubs remaining
    - Component.js has ZERO `/* CONDITION:` stubs remaining
    - Component.js has compose chain in correct order
    - index.js contains ONLY the barrel re-export line
    - Grep for raw HTML tags — MUST still be zero (regression check)
    - All imports reference files that exist
12. Print: `Pass 3 complete — <N> handlers wired, <N> props connected, <N> strings i18nized`

### Post-Generation Checks

13. **Recovery check**: If any pass failed partially, spawn new instance for remaining work
14. **Guardrail Check**: Spawn `guardrail-checker` agent
    - CRITICAL violations: agent must fix before proceeding
    - HIGH violations: warn, developer can accept
15. **ProductEx Verification**: Verify generated code covers PRD requirements
16. Update state, journal, session memory.

Print summary:
```
Phase 9 complete — Code generation finished (3 passes)
  Pass 1 — UI: Component.js + styles.js (Cap* only, 0 raw HTML)
  Pass 2 — Redux: constants + actions + reducer + saga + selectors + messages
  Pass 3 — Integration: <N> handlers wired, <N> strings i18nized, compose chain added
  
  Files created: <list>
  Files modified: <list>
  Plan deviations: <list or "none">
```

## Step 12.5 — Collect Runtime Context (before Build + Visual QA)

Before build verification and Visual QA, collect runtime context from the user. This is needed for the runtime smoke check (build-verifier) and Visual QA to navigate to the correct URL.

1. Determine the route pattern from `lld_artifact.json` (page specs → route) or `generation_report.json`
2. Check if route has dynamic params (`:paramName` segments)
3. Check if auth env vars are set

```
Runtime Context
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Route pattern detected: /programs/:programId/tiers/list
```

**Auth check:**
- If `GARUDA_USERNAME` + `GARUDA_PASSWORD` env vars are set: print `Auth credentials found.`
- If NOT set:
  ```
  Auth credentials not found. Set these for runtime testing:
    export GARUDA_USERNAME=<username>
    export GARUDA_PASSWORD=<password>
    export GARUDA_ORG_ID=<org-id>  (optional)
  
  Set them now and type "ready", or type "skip" to proceed without auth:
  ```
  Wait for user response.

**Route params** (if dynamic segments exist):
```
The route has dynamic parameters:
  programId: Enter value (e.g., "123"): ___
```
Collect each param value.

**Query params (optional):**
```
Any URL query params? (e.g., tab=benefits,status=active)
Enter as key=value pairs, or "skip": ___
```

**Or full URL override:**
```
Or paste the exact full URL to test (skips above): ___
```

Store as `runtimeContext = { route_params: {...}, query_params: {...}, full_url_override: "..." | null }`

Save to `{workspacePath}/runtime_context.json` so both build-verifier and visual-qa can read it.

**Start dev server (shared by build-verifier + visual-qa):**

The dev server is started ONCE here and kept running through Phase 10 (build) and Phase 11 (visual QA). Both agents reuse it — neither starts or stops it.

```bash
# Check if already running
curl -s -o /dev/null -w "%{http_code}" http://localhost:<dev_port>/ 2>/dev/null
```

If not running:
```bash
cd <repo-root> && npm start &
```

Wait up to 60s, polling every 3s. If it fails to start → proceed to build verification anyway (webpack-only check will still work, runtime check will report "dev server not running").

Print: `Dev server running at http://localhost:<dev_port>. Will be used by build verification and Visual QA.`

## Step 13 — Phase 10: Build Verification

1. Print: `[Phase 10/15] Starting Build Verification...`
2. Spawn `build-verifier` agent with:
   - `workspacePath`, `runtimeContext` (from Step 12.5)
   - Note: Dev server is already running (started in Step 12.5). Agent should NOT start or stop it.
3. **Gate Check**: Read build_report.json
   - If `status = "pass"` AND `runtime_check.status = "pass"`: proceed
   - If `status = "fail"` with `fail_reason = "runtime"`: print runtime errors + screenshot path, pause, ask developer
   - If `status = "fail"` after 3 attempts: pause, show errors, ask developer
4. Update state, journal.

## Step 14 — Phase 11: Visual QA + Runtime Fix (MANDATORY — NEVER SKIP)

**This phase is MANDATORY.** It always runs, regardless of whether Figma/prototype data exists. At minimum, it checks runtime health (console errors, page rendering). With Figma, it also compares visual fidelity.

**There is no skip condition.** If build verification failed, the orchestrator already stopped at Phase 10. If we reach Phase 11, the build passed — now we verify the app actually works at runtime.

1. Print: `[Phase 11/15] Starting Visual QA + Runtime Fix (MANDATORY)...`

2. **Collect Runtime Context from User:**

   First, determine the route pattern from `lld_artifact.json` or `generation_report.json`. Check if it contains dynamic params (`:paramName`).

   ```
   Runtime Context for Visual QA:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   The generated feature needs to be tested at a specific URL.
   Route pattern: /programs/:programId/tiers/list
   ```

   **2a. Auth credentials check:**
   - Check if `GARUDA_USERNAME` and `GARUDA_PASSWORD` env vars are set
   - If NOT set:
     ```
     Auth credentials not found in environment.
     Set these env vars for Visual QA to work:
       export GARUDA_USERNAME=<your-username>
       export GARUDA_PASSWORD=<your-password>
       export GARUDA_ORG_ID=<org-id>  (optional)

     Or provide the full URL to test (with auth handled separately):
     Enter full URL (or press Enter to set env vars and retry): ___
     ```
   - If user provides a full URL: store as `full_url_override`
   - If user sets env vars and retries: proceed normally

   **2b. Dynamic route params:**
   - If route has `:paramName` segments, ask for each:
     ```
     The route has dynamic parameters that need real values:
       programId: Enter value (e.g., "123"): ___
     ```
   - Collect all param values into `route_params` object

   **2c. Query params (optional):**
   ```
   Any URL query parameters needed? (e.g., tab=benefits,status=active)
   Enter as comma-separated key=value pairs, or "skip": ___
   ```
   - Parse into `query_params` object

   **2d. Full URL override (alternative to 2b+2c):**
   ```
   Or paste the exact URL to test (skips route/param construction): ___
   ```

   Store collected values as `runtimeContext = { route_params, query_params, full_url_override }`.

3. Spawn `visual-qa` agent with:
   - `workspacePath`, `repoRoot = <REPO_ROOT>`, `runtimeContext`
   - Tools: `Read, Write, Edit, Bash, Glob, Grep, mcp__claude_ai_Figma__get_screenshot, mcp__claude_ai_Figma__get_design_context`
   - **No maxIterations parameter** — agent loops until everything works or circuit breaker triggers

3. **Gate Check**: Read `visual_qa_report.json`:
   - **FAIL if `status == "skipped"`** — this should never happen. If it does, re-spawn the agent.
   - If `page_state != "rendered"` AND circuit breaker triggered: pause, show all remaining issues, ask developer for help
   - If fidelity `LOW` with circuit breaker: warn "Agent could not resolve all issues after multiple attempts — manual review required"
   - Print iteration summary:
     ```
     Visual QA Complete:
       Page State: rendered / error_boundary / spinner_stuck / ...
       Console Errors Fixed: N
       Console Errors Remaining: N
       Mode: pixel_and_semantic / semantic_only / runtime_only
       Iterations: N
       Fidelity: HIGH/MEDIUM/LOW
       Visual Fixes: N applied
       Code Fixes: N applied
       Remaining: N critical, N major, N minor
       Circuit Breaker: triggered / not triggered
     ```
4. Update state, journal.
4. **Dashboard update** (if `dashboard_enabled`): the Post-Phase Protocol step 5i generates the detailed Visual QA iteration tracker HTML from `visual_qa_report.json`. This includes:
   - Iteration-by-iteration mismatch improvement table
   - Per-iteration fix details with severity badges
   - Mismatch progress bars showing visual improvement
   - Final discrepancy table
   - Fidelity badge and discrepancy breakdown counts

## Step 15 — Phase 13: Test Writing

Print: `Would you like me to write unit tests? (yes/no)`

**PAUSE — wait for response.**

- `no`: Skip, set `test_writing.status = "skipped"`.
- `yes`: Spawn `test-writer` agent. Update state.

Update requirements_context.md with test decision.

## Step 16 — Phase 14: Test Evaluation

**Skip if**: test_writing was skipped.

1. Spawn `test-evaluator` agent
2. **Gate Check**: Read test_report.json
3. Print test summary (passed, failed, skipped, coverage)

### Coverage Checkpoint (if below target)

```
Coverage is below <target>%. Would you like me to write additional tests? (yes/no)
```

If yes: re-run test-writer + test-evaluator.

## Step 17 — Phase 15: Final Summary

Print consolidated report:
```
============================================
GIX Pipeline Complete — <jiraTicketId>
============================================

Target: <organism path>
Intent: <CREATE|UPDATE>
Phases: 15/15 completed

Context:
  Jira: <jiraTicketId>
  Figma: <loaded|unavailable>
  Backend HLD: <loaded|skipped>

Artifacts:
  HLD: <confluence URL or "local only">
  LLD: <confluence URL or "local only">
  Test Cases: <count>

Code:
  Files Created: <list>
  Files Modified: <list>

Build: <PASS|FAIL>
  Attempts: <n>

Visual QA: <fidelity | skipped>
  Iterations: <count>
  Remaining discrepancies: <count>

Tests:
  Passed: <n> | Failed: <n> | Skipped: <n>
  Coverage: <lines>% lines, <branches>% branches

Verification:
  ProductEx: <approved | changes_needed | not_run>
  Guardrails: <PASS | PASS with N warnings | not_run>

Next Steps:
  1. Review generated files
  2. Address any failed tests or visual discrepancies
  3. Run full test suite: npm test
  4. Start dev server to verify: npm start
  5. Create PR when satisfied
============================================
```

### Blueprint Generation

Generate `<workspacePath>/<jiraTicketId>-blueprint.html` using `skills/blueprint-template.md`:

1. Read all workspace artifacts (pipeline_state.json, session_journal.md, approach_log.md, hld_artifact.json, lld_artifact.json, generation_report.json, build_report.json, visual_qa_report.json, test_report.json, verification_reports/*.json, cross_repo_trace.json)
2. Populate every section of the blueprint HTML template with data from these files
3. Include Mermaid diagrams from HLD/LLD artifacts
4. Include key decisions from approach_log.md
5. Include timeline from session_journal.md
6. **Populate Visual QA section** from `visual_qa_report.json`:
   - Fill the iteration improvement table (one row per iteration with mismatch %, improvement delta, fixes count)
   - Fill the fixes table (all fixes from all iterations, flattened with iteration number)
   - Fill the remaining discrepancies table (from `final_discrepancies` where `auto_fixed == false`)
   - Fill the discrepancy breakdown stats (critical/major/minor counts)
   - Set fidelity badge, comparison mode, iteration count, final mismatch %
   - If visual QA was skipped: replace the section with `<p>Visual QA was skipped: SKIP_REASON</p>`
7. Write the blueprint file

Print: `Blueprint generated: <workspacePath>/<jiraTicketId>-blueprint.html`

### Finalize Live Dashboard

If `dashboard_enabled: true`:
1. Read `live-dashboard.html`
2. Remove `<meta http-equiv="refresh" content="10">` tag (stop auto-refresh)
3. Set progress bar to 100%
4. Mark all phases complete in sidebar
5. Add the Pipeline Complete banner (from `skills/live-dashboard-template/SKILL.md`) after the progress stats, with link to `<jiraTicketId>-blueprint.html`
6. Write back to `live-dashboard.html`
7. Print: `Dashboard finalized. Auto-refresh disabled.`

### Final Publishing

1. **Confluence Publish**: Publish blueprint and final summary to Confluence run folder
2. Update `pipeline_state.json`: `status = "completed"`, recovery to null
3. Remove HOW TO RESUME block from journal (session complete)

## Post-Phase Protocol (After EVERY Phase)

After every phase completes, the orchestrator MUST run these steps in order:

1. **Update pipeline_state.json** — phase status, summary, recovery info
2. **Update session_journal.md** — append phase completion with timestamp
3. **Update session_memory.md** — add relevant findings to appropriate sections
4. **Update approach_log.md** — log any decisions made during this phase
5. **Update live-dashboard.html** — if `dashboard_enabled: true` in pipeline_state.json:
   a. Read the current `<workspacePath>/live-dashboard.html`
   b. Count completed phases from pipeline_state.json
   c. Calculate progress percentage: `completed / 15 * 100`
   d. Update the progress bar: find `id="progress-fill"`, set `style="width: <pct>%"`, update inner text to `<pct>%`
   e. Update stats: `#stat-phases` → completed count, `#stat-artifacts` → count of *.json files in workspace, `#stat-decisions` → count rows in approach_log.md, `#stat-files` → files_created count from generation_report.json (0 if not yet generated)
   f. Update sidebar: set `id="nav-<completed>"` class to `complete`, set `id="nav-<next>"` class to `active`, all later remain `pending`
   g. Update phase badge: find `id="badge-<phaseNum>"`, change class to `complete`, update text to `Complete`
   h. Replace phase content: find `id="content-<phaseNum>"`, replace innerHTML with phase-specific content from `skills/live-dashboard-template/SKILL.md` Phase-Specific Content Templates section
   i. **For Phase 12 (Visual QA)**: Read `visual_qa_report.json` and generate the detailed iteration tracker HTML:
      - Summary row: fidelity badge + discrepancy counts (critical/major/minor)
      - Iteration table: one row per iteration with mismatch %, improvement delta, fixes count, remaining count
      - Iteration detail blocks: each with mismatch bar, fix list with severity badges
      - Remaining discrepancies table
      - Use CSS classes from template: `vqa-mismatch high/medium/low`, `vqa-improvement positive/negative`, `fidelity-badge HIGH/MEDIUM/LOW`
      - Mismatch level: `high` if >10%, `medium` if 5-10%, `low` if <5%
      - Improvement: calculate delta from previous iteration's mismatch %; positive delta = `positive` class (green), negative = `negative` class (red)
   j. Write the updated HTML back to `live-dashboard.html`
   k. The browser auto-refreshes every 10 seconds via `<meta http-equiv="refresh" content="10">` in the HTML head — no manual refresh needed
6. **Resolve pending queries** — check `{workspacePath}/pending_queries.json`:
   a. Read the file. If it doesn't exist or `queries` array is empty: skip to step 7
   b. For each query with `blocking: true` that doesn't have an answer in `query_answers.json`:
      - Print the query to the user:
        ```
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Query from Phase <N> (<agent name>):
        Category: <category>  |  Confidence: <C1/C2/C3>

        <question>

        Context: <context>

        Options:
          [A] <label> — <implication>
          [B] <label> — <implication>

        Enter your choice: ___
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        ```
      - Wait for user response
      - Write answer to `{workspacePath}/query_answers.json`:
        ```json
        { "answers": [{ "query_id": "<id>", "selected_option": "<key>", "user_note": "<any extra text>", "answered_at": "<ISO>" }] }
        ```
      - Log the decision to `approach_log.md`
   c. For each query with `blocking: false` (provisional assumptions):
      - Print as reviewable: `"Assumption made: <question> → chose <default>. Correct? (Y/N)"`
      - If user corrects: write correction to `query_answers.json`, flag phase for re-run
      - If user confirms: write confirmation to `query_answers.json`
   d. If any blocking query was answered AND the answer affects already-completed work in this phase:
      - Print: `Re-running <phase> with your answers...`
      - Re-spawn the agent with the same inputs (agent reads `query_answers.json` on start)
   e. Clear resolved queries from `pending_queries.json`
   f. Update `pipeline_state.json` query tracking:
      ```json
      "queries": { "total_asked": N, "total_answered": N, "total_pending": 0, "phases_with_queries": ["hld_generation", ...] }
      ```
7. **Confluence publish** — spawn `confluence-publisher` (non-blocking) with this phase's artifact
8. **Update HOW TO RESUME block** — in session_journal.md
9. **Show pause prompt** — with available commands

## Prerequisite Map

Before starting any phase, verify required artifacts exist:

| Phase | Required Artifacts |
|-------|--------------------|
| Phase 1 (PRD + Design Extraction) | — (entry point). Spawns prd-ingestion + figma-decomposer + prototype-analyzer in parallel |
| Phase 2 (Scout) | context_bundle.json |
| Phase 3 (HLD) | context_bundle.json with codebase_context. Optional: figma_decomposition.json, prototype_analysis.json |
| Phase 4 (Handoff) | hld_artifact.json with status "approved" |
| Phase 5 (LLD) | hld_artifact.json, backend inputs (or "skip"). Optional: figma_decomposition.json, prototype_analysis.json |
| Phase 6 (Tests) | lld_artifact.json + all knowledge artifacts |
| Phase 7 (Comprehension) | lld_artifact.json (agents read source artifacts directly — no context loading phase) |
| Phase 8 (Plan) | comprehension.json, lld_artifact.json |
| Phase 9 (Code) | plan.json with approved = true |
| Phase 10 (Build) | generation_report.json |
| Phase 11 (Visual QA) | generation_report.json, build_report.json with status "pass" and runtime_check.status "pass" |
| Phase 12 (Tests) | generation_report.json |
| Phase 13 (Eval) | test files written |
| Phase 14 (Summary) | all prior phases complete |

If a prerequisite is missing: print warning with which phase needs to run first, ask whether to continue or abort.

## Internal Consultation Protocol

When the orchestrator or any interactive phase needs to ask the user a question, first try to resolve it internally:

1. **Product questions** (about business logic, requirements, feature behaviour):
   - Spawn `productex-verifier` in `consult` mode with the question
   - ProductEx searches: context_bundle PRD, knowledge-bank.md, docs.capillarytech.com
   - If resolved: use the answer (cite source)
   - If unresolved: ask the user

2. **Codebase questions** (about existing code, patterns, APIs):
   - Spawn `cross-repo-tracer` or use Grep/Glob to search the codebase
   - If resolved: use the finding
   - If unresolved: ask the user

3. **Human-intent questions** (about preferences, priorities, scope decisions):
   - Always ask the user — these can't be resolved by agents
   - If inside an agent: write to `pending_queries.json` (resolved in Post-Phase Protocol step 6)
   - If in the orchestrator directly: ask the user immediately

4. **Agent-escalated queries** (from `pending_queries.json`):
   - Agents follow `skills/ask-before-assume.md` — they write queries when confidence is C3 or below
   - The orchestrator resolves these in Post-Phase Protocol step 6 after each phase
   - Answers are written to `query_answers.json` so agents can read them on re-run or in subsequent phases

## Incremental Session Memory Protocol

Every agent MUST update `session_memory.md` after EVERY decision — not batch at phase end:

- During interactive phases: after each user response, immediately write to session memory
- During subagent phases: agent writes to session memory before writing its output artifact
- This ensures context survives context window compacting mid-phase
- Format: `- <finding/decision> _(Phase N)_`

## Rework Loop Protocol

If ANY agent raises a blocker against a prior phase:

1. **Classify** the blocker:
   - **Trivial** (naming inconsistency, minor interface refinement): auto-rerun without human approval
   - **Critical** (invalidates approved decision, violates architecture, security flaw): pause for human approval

2. **Cascade**: When re-running phase N, also re-run phases N+1 through M (where M raised the blocker)

3. **Circuit breaker**: If the same phase has been re-run 3 times without resolution:
   - STOP
   - Present: what's conflicting, why it won't resolve, and options (revisit earlier phase, accept deviation, manual fix)

4. **Log**: Every rework to `recovery.rework_history` and session_memory.md Rework Log.

## Session Memory Protocol

Every phase MUST:
1. **Read** `session_memory.md` before starting work
2. **Read** `skills/knowledge-bank.md` at pipeline start (Phase 0) — load persistent context into session memory
3. **Write** updates to relevant sections after completing work
4. Use **Domain Terminology** from session memory in all generated code and variable names
5. Check **Constraints** and **Risks** before making decisions
6. Record **Key Decisions** with rationale

## Git Snapshot Protocol

Create lightweight git tags after each phase completes, enabling safe rollback:

1. **At pipeline start (Phase 0)**: create a feature branch
   ```bash
   git checkout -b gix/<jiraTicketId>
   ```
   If branch already exists (resuming), check it out without creating.

2. **After each phase completes**: create a git tag
   ```bash
   git tag -f gix/<jiraTicketId>/phase-<NN>
   ```
   Where NN is the phase number (01 for PRD Ingestion, 02 for Codebase Scout, etc.)

3. **After code-writing phases** (Phase 10, 13): commit code + artifacts together
   ```bash
   git add -A
   git commit -m "gix: <phase-name> complete — <brief summary>"
   git tag -f gix/<jiraTicketId>/phase-<NN>
   ```

## Live Dashboard Protocol

If `dashboard_enabled: true` in pipeline_state.json (set during Phase 0 based on user choice):

After EVERY phase completes, the orchestrator MUST update `live-dashboard.html` using the detailed instructions in Post-Phase Protocol step 5 (a-k).

**Key rules:**
- The HTML file auto-refreshes every 10 seconds via `<meta http-equiv="refresh" content="10">` — the user just keeps the browser tab open
- Phase-specific content templates are in `skills/live-dashboard-template/SKILL.md`
- Phase 12 (Visual QA) gets the most detailed treatment: iteration-by-iteration mismatch improvement, fixes applied per iteration, discrepancy breakdown, fidelity badge
- On pipeline completion (Phase 15): remove the `<meta http-equiv="refresh">` tag, add the Pipeline Complete banner with link to blueprint HTML, set progress to 100%

See `skills/live-dashboard-template/SKILL.md` for the full template, CSS classes, and phase-specific content templates.

## HOW TO RESUME Block

After each phase, update the bottom of `session_journal.md`:
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in the target repo directory
2. Start Claude Code
3. Run: `/gix` → select mode [2] Resume
4. Next action: <what the next phase will do>
```

Remove this block when the pipeline completes.
