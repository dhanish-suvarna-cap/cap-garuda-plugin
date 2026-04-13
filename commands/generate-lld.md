---
description: Generate LLD and test cases from reviewed HLD + backend inputs — run after HLD is approved
argument-hint: <jira-ticket-id> [--backend-hld=<confluence-page-id-or-file>] [--confluence-space=<SPACE>]
disable-model-invocation: true
allowed-tools: Agent, Read, Write
---

# Generate LLD + Test Cases — Standalone Command

You are the **LLD and test case generation orchestrator**. You generate a Low-Level Design and test case sheet from a reviewed HLD combined with backend inputs.

## Step 1 — Parse Arguments

Parse `$ARGUMENTS` to extract:
- `jiraTicketId` — the first positional argument (required). If missing, print: `Usage: /generate-lld <jira-ticket-id> [--backend-hld=<confluence-page-id-or-file>] [--confluence-space=<SPACE>]` and stop.
- `backendHld` — value of `--backend-hld` flag (optional). Can be a Confluence page ID or a local file path.
- `confluenceSpaceKey` — value of `--confluence-space` flag (optional, default: `default_confluence_space` from `skills/config.md`)

## Step 2 — Validate Workspace and Prerequisites

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jiraTicketId>/`

2. Use Read to check if `<workspacePath>/pre_dev_state.json` exists.
   - If it does not exist, print: `Error: No workspace found for <jiraTicketId>. Run /pre-dev <jiraTicketId> first.` and **STOP**.

3. Read `<workspacePath>/session_journal.md` if it exists — print it so context is restored from any previous session.
   Read `<workspacePath>/requirements_context.md` if it exists — print it so Claude understands WHAT is being built and WHY.

4. Read `pre_dev_state.json` and check the HLD phase status.
   - If `phases.hld_generation` is `"not_started"` or `"in_progress"`, print:
     ```
     Error: HLD has not been completed. Run /pre-dev <jiraTicketId> first, or /generate-hld <jiraTicketId> to generate the HLD.
     ```
     and **STOP**.
   - If `phases.hld_generation` is `"completed"` (not `"approved"`), print:
     ```
     Warning: HLD has not been explicitly reviewed/approved. It is recommended to review the HLD before generating LLD.
     Proceeding anyway — if the HLD needs changes, re-run /generate-hld with feedback and then re-run /generate-lld.
     ```

5. Use Read to check if `<workspacePath>/hld_artifact.json` exists.
   - If it does not exist, print: `Error: HLD artifact not found. Run /generate-hld <jiraTicketId> first.` and **STOP**.

6. Check backend inputs:
   - If `backendHld` argument is provided:
     - If it looks like a file path (contains `/` or `.md`), use Read to check if the file exists. If not found, print error and **STOP**.
     - If it looks like a Confluence page ID (numeric or alphanumeric), note it for the agent to fetch.
   - If `backendHld` is NOT provided:
     - Check if `<workspacePath>/backend_hld.md` exists as a local file.
     - If not found, print:
       ```
       Warning: No backend HLD provided. The LLD will be generated based on the frontend HLD only.
       For better results, provide backend HLD:
         - Place at: <workspacePath>/backend_hld.md
         - Or pass: --backend-hld=<confluence-page-id-or-file>
       Continuing without backend context...
       ```
   - Check if `<workspacePath>/api_signatures.json` exists. If found, note it for the agent. If not, print: `Info: No API signatures file found. API contracts will be inferred from HLD.`

## Step 3 — LLD Generation

1. Update `pre_dev_state.json` — set `phases.lld_generation` to `"in_progress"`, update `updated_at`.
2. Print: `[LLD] Generating Low-Level Design...`
3. Spawn the `lld-generator` agent (defined in `agents/lld-generator.md`) with these inputs:
   - `workspacePath`: `<workspacePath>`
   - `confluenceSpaceKey`: `<confluenceSpaceKey>`
   - `backendHldSource`: `<backendHld source path or Confluence ID>`
   - `apiSignaturesSource`: `<workspacePath>/api_signatures.json` (if exists)
   - `feedback`: none (or feedback if re-generating)

   Give the Agent these tools: `Read, Write, Bash, mcp__claude_ai_Atlassian__getConfluencePage, mcp__claude_ai_Atlassian__createConfluencePage`

4. After the agent completes, use Read to load `<workspacePath>/lld_artifact.json`.

**Gate Check**: Read `<workspacePath>/lld_artifact.json`:
- Verify `component_specifications` has >= 1 item
- Verify every organism component has a `file_list` with >= 10 entries
- Cross-check: every API endpoint in LLD exists in api_contracts
- If `guardrail_warnings` exist: print them
- If critical fields missing: offer to re-run

5. Update `pre_dev_state.json` — set `phases.lld_generation` to `"completed"`, add `artifacts.lld_artifact` = `"lld_artifact.json"`, set `phases.lld_generation.summary = "<one-line summary>"`, `phases.lld_generation.guardrail_result = "PASS" or "PASS with N warnings"`, update `updated_at`.

Append to `{workspacePath}/session_journal.md`:
```markdown
## LLD Generation — COMPLETED at <timestamp>
- Components: <count>
- Redux slices: <count>
- API contracts: <count>
- Confluence: <url>
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace if exists, append if not):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in the target repo directory
2. Start Claude Code
3. Run: `/generate-lld <jiraTicketId>` — LLD is complete, test case generation will proceed next
4. Next action: Generate test cases from LLD
```

### LLD Checkpoint

6. Display the LLD summary:

   ```
   ============================================
   LLD SUMMARY
   ============================================
   Feature:        <feature_name>
   Ticket:         <jira_ticket_id>
   Components:     <number of component_specifications>
   Redux Slices:   <number of redux_store_design entries>
   API Contracts:  <number of api_contracts>
   Routes:         <number of routing_plan entries>
   Utilities:      <number of shared_utilities>
   Migrations:     <number of migration_notes>
   Confluence:     <confluence_url or "Not published">
   ============================================
   ```

7. Print:
   > **Review the LLD above and on Confluence. The test case generation will proceed next.**

## Step 4 — Test Case Generation

1. Update `pre_dev_state.json` — set `phases.testcase_generation` to `"in_progress"`, update `updated_at`.
2. Print: `[Tests] Generating test cases...`
3. Spawn the `testcase-generator` agent (defined in `agents/testcase-generator.md`) with these inputs:
   - `workspacePath`: `<workspacePath>`
   - `confluenceSpaceKey`: `<confluenceSpaceKey>`

   Give the Agent these tools: `Read, Write, Bash, mcp__claude_ai_Atlassian__createConfluencePage`

4. After the agent completes, use Read to load `<workspacePath>/testcase_sheet.json`.

**Gate Check**: Read `<workspacePath>/testcase_sheet.json`:
- Verify `test_cases` array is non-empty
- Verify every organism from LLD has test cases
- If `guardrail_warnings` exist: print them

5. Update `pre_dev_state.json` — set `phases.testcase_generation` to `"completed"`, add `artifacts.testcase_sheet` = `"testcase_sheet.json"`, set `phases.testcase_generation.summary = "<one-line summary>"`, `phases.testcase_generation.guardrail_result = "PASS" or "PASS with N warnings"`, update `updated_at`.

Append to `{workspacePath}/session_journal.md`:
```markdown
## Test Case Generation — COMPLETED at <timestamp>
- Total cases: <count>
- P0: <count>, P1: <count>, P2: <count>
- Confluence: <url>
```

Update the HOW TO RESUME block at the bottom of session_journal.md (replace existing block):
```markdown
---
## HOW TO RESUME (if session interrupted)
1. Open terminal in the target repo directory
2. Start Claude Code
3. Run: `/generate-lld <jiraTicketId>` — both LLD and test cases are complete
4. Next action: Review artifacts and proceed to dev pipeline
```

### Test Case Checkpoint

6. Display the test case summary:

   ```
   ============================================
   TEST CASE SUMMARY
   ============================================
   Total Cases:    <total_test_cases>
   P0 (Critical):  <P0 count>
   P1 (Important): <P1 count>
   P2 (Nice-to-have): <P2 count>
   ---
   Unit Tests:     <unit count>
   Integration:    <integration count>
   Use Case Flows: <usecase_flows_count>
   API Tests:      <api count>
   Confluence:     <confluence_url or "Not published">
   ============================================
   ```

## Step 5 — Final Summary

Print the complete pipeline summary:

```
============================================
PRE-DEV PIPELINE COMPLETE
============================================
Ticket:         <jiraTicketId>
Feature:        <feature_name>

Artifacts:
  - Context Bundle:  <workspacePath>/context_bundle.json
  - HLD:             <workspacePath>/hld_artifact.json
  - LLD:             <workspacePath>/lld_artifact.json
  - Test Cases:      <workspacePath>/testcase_sheet.json

Confluence Pages:
  - HLD: <hld_confluence_url or "N/A">
  - LLD: <lld_confluence_url or "N/A">
  - Test Cases: <testcase_confluence_url or "N/A">

Next Steps:
  - Review all artifacts and Confluence pages
  - Share with the team for feedback
  - When ready to implement, use the dev pipeline commands
============================================
```

Update `pre_dev_state.json` with all phases marked as completed and `updated_at` set to current timestamp.

Append to `{workspacePath}/session_journal.md`:
```markdown
---
## SESSION COMPLETE at <timestamp>
All pre-dev phases completed successfully. Artifacts ready for review and dev pipeline.
```

Remove the HOW TO RESUME block from session_journal.md (no longer needed — session is complete).
