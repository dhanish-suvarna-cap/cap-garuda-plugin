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
- `confluenceSpaceKey` — value of `--confluence-space` flag (optional, default: `GARUDA`)

## Step 2 — Validate Workspace and Prerequisites

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jiraTicketId>/`

2. Use Read to check if `<workspacePath>/pre_dev_state.json` exists.
   - If it does not exist, print: `Error: No workspace found for <jiraTicketId>. Run /pre-dev <jiraTicketId> first.` and **STOP**.

3. Read `pre_dev_state.json` and check the HLD phase status.
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

4. Use Read to check if `<workspacePath>/hld_artifact.json` exists.
   - If it does not exist, print: `Error: HLD artifact not found. Run /generate-hld <jiraTicketId> first.` and **STOP**.

5. Check backend inputs:
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
3. Spawn an Agent with this prompt:

   > You are the **lld-generator** agent. Your job is to produce a detailed Low-Level Design document for frontend implementation, incorporating both the frontend HLD and any available backend context.
   >
   > **Inputs:**
   > - Workspace path: `<workspacePath>`
   > - HLD artifact: `<workspacePath>/hld_artifact.json`
   > - Context bundle: `<workspacePath>/context_bundle.json`
   > - Backend HLD source: `<backendHld or "none — check workspace for backend_hld.md">`
   > - API signatures file: `<workspacePath>/api_signatures.json` (if exists)
   > - Confluence space key: `<confluenceSpaceKey>`
   >
   > **Tasks:**
   > 1. Read the HLD artifact and context bundle.
   > 2. If a backend HLD source is provided:
   >    - If it is a file path, read the file.
   >    - If it is a Confluence page ID, fetch it using `mcp__mcp-atlassian__confluence_get_page`.
   > 3. If `api_signatures.json` exists in the workspace, read it for API contract details.
   > 4. Generate a Low-Level Design covering:
   >    - **Component Specifications**: For each component in the HLD:
   >      - Full file list per organism anatomy (Component.js, actions.js, constants.js, reducer.js, saga.js, selectors.js, styles.js, messages.js, index.js, Loadable.js)
   >      - Props interface and prop types
   >      - Internal state (if any local state beyond Redux)
   >      - Key methods / event handlers with pseudocode
   >      - Render structure (JSX tree outline)
   >    - **Redux Store Design**: For each slice:
   >      - Full initial state shape (ImmutableJS)
   >      - All action types with payload schemas
   >      - Reducer case logic
   >      - Saga flows (sequence diagrams as text)
   >      - Selector definitions
   >    - **API Contract Details**: For each endpoint:
   >      - Full request/response schemas (aligned with backend HLD if available)
   >      - Error handling strategy
   >      - Loading/retry logic
   >    - **Routing Plan**: Exact route paths, lazy loading setup, guards
   >    - **Shared Utilities**: Any new utils, hooks, or HOCs needed
   >    - **Migration Notes**: If modifying existing code, exact files and changes needed
   >    - **Integration Points with Backend**: How frontend APIs map to backend endpoints, any middleware or transformation needed
   > 5. Write the LLD to `<workspacePath>/lld_artifact.json` with schema:
   >    ```json
   >    {
   >      "feature_name": "",
   >      "jira_ticket_id": "",
   >      "component_specifications": [{
   >        "name": "",
   >        "layer": "",
   >        "action": "create|modify",
   >        "file_list": [],
   >        "props_interface": {},
   >        "internal_state": {},
   >        "key_methods": [{ "name": "", "pseudocode": "" }],
   >        "render_structure": "",
   >        "notes": ""
   >      }],
   >      "redux_store_design": [{
   >        "slice_key": "",
   >        "initial_state": {},
   >        "action_types": [{ "type": "", "payload_schema": {} }],
   >        "reducer_logic": "",
   >        "saga_flows": [{ "trigger": "", "steps": [] }],
   >        "selectors": [{ "name": "", "path": "" }]
   >      }],
   >      "api_contracts": [{
   >        "endpoint": "",
   >        "method": "",
   >        "request_schema": {},
   >        "response_schema": {},
   >        "error_handling": "",
   >        "service_function_name": ""
   >      }],
   >      "routing_plan": [{ "path": "", "component": "", "lazy_loaded": true, "guards": [] }],
   >      "shared_utilities": [{ "name": "", "type": "util|hook|hoc", "description": "" }],
   >      "migration_notes": [{ "file": "", "changes": "" }],
   >      "backend_integration_notes": "",
   >      "confluence_url": "",
   >      "created_at": ""
   >    }
   >    ```
   > 6. If Confluence space key is provided, create a Confluence page with the LLD content and save the URL.
   > 7. Print a summary of the LLD.

   Give the Agent these tools: `Read, Write, Bash, mcp__mcp-atlassian__confluence_get_page, mcp__mcp-atlassian__confluence_create_page`

4. After the agent completes, use Read to load `<workspacePath>/lld_artifact.json`.
5. Update `pre_dev_state.json` — set `phases.lld_generation` to `"completed"`, add `artifacts.lld_artifact` = `"lld_artifact.json"`, update `updated_at`.

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
3. Spawn an Agent with this prompt:

   > You are the **testcase-generator** agent. Your job is to produce a comprehensive test case sheet based on the HLD, LLD, and original requirements.
   >
   > **Inputs:**
   > - Workspace path: `<workspacePath>`
   > - Context bundle: `<workspacePath>/context_bundle.json`
   > - HLD artifact: `<workspacePath>/hld_artifact.json`
   > - LLD artifact: `<workspacePath>/lld_artifact.json`
   > - Confluence space key: `<confluenceSpaceKey>`
   >
   > **Tasks:**
   > 1. Read the context bundle, HLD, and LLD artifacts.
   > 2. Generate test cases covering:
   >    - **Unit Tests**: For each component, reducer, saga, and selector
   >      - Component rendering tests
   >      - Prop variation tests
   >      - Event handler tests
   >      - Reducer state transition tests
   >      - Saga flow tests (success, failure, edge cases)
   >      - Selector output tests
   >    - **Integration Tests**: Cross-component interactions, Redux flow end-to-end
   >    - **Use Case Flows**: End-to-end user journeys derived from acceptance criteria
   >      - Happy path flows
   >      - Error/edge case flows
   >      - Permission/role-based flows
   >    - **API Tests**: Mock API response handling, error states, loading states
   > 3. Assign priority to each test case: P0 (critical), P1 (important), P2 (nice-to-have)
   > 4. Write the test cases to `<workspacePath>/testcase_sheet.json` with schema:
   >    ```json
   >    {
   >      "feature_name": "",
   >      "jira_ticket_id": "",
   >      "test_cases": [{
   >        "id": "TC-001",
   >        "category": "unit|integration|usecase|api",
   >        "target_component": "",
   >        "title": "",
   >        "description": "",
   >        "priority": "P0|P1|P2",
   >        "preconditions": [],
   >        "steps": [],
   >        "expected_result": "",
   >        "test_file_path": ""
   >      }],
   >      "usecase_flows": [{
   >        "id": "UC-001",
   >        "title": "",
   >        "description": "",
   >        "steps": [{ "action": "", "expected": "" }],
   >        "acceptance_criteria_ref": ""
   >      }],
   >      "summary": {
   >        "total_test_cases": 0,
   >        "by_priority": { "P0": 0, "P1": 0, "P2": 0 },
   >        "by_category": { "unit": 0, "integration": 0, "usecase": 0, "api": 0 },
   >        "usecase_flows_count": 0
   >      },
   >      "confluence_url": "",
   >      "created_at": ""
   >    }
   >    ```
   > 5. If Confluence space key is provided, create a Confluence page with the test cases and save the URL.
   > 6. Print a summary.

   Give the Agent these tools: `Read, Write, Bash, mcp__mcp-atlassian__confluence_create_page`

4. After the agent completes, use Read to load `<workspacePath>/testcase_sheet.json`.
5. Update `pre_dev_state.json` — set `phases.testcase_generation` to `"completed"`, add `artifacts.testcase_sheet` = `"testcase_sheet.json"`, update `updated_at`.

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
