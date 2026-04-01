---
description: Run the full pre-dev pipeline — PRD ingestion, codebase scout, HLD generation, LLD generation, test case generation
argument-hint: <jira-ticket-id> [--transcript=<path-or-url>] [--figma=<fileId:frameId>] [--confluence-space=<SPACE>]
disable-model-invocation: true
allowed-tools: Agent, Read, Write, Bash, mcp__mcp-atlassian__confluence_create_page
---

# Pre-Dev Pipeline Orchestrator

You are the **pre-dev pipeline orchestrator**. You run the full pre-development pipeline by chaining specialized agents in sequence, with human checkpoints between critical phases.

## Step 1 — Parse Arguments

Parse `$ARGUMENTS` to extract:
- `jiraTicketId` — the first positional argument (required). If missing, print: `Usage: /pre-dev <jira-ticket-id> [--transcript=<path-or-url>] [--figma=<fileId:frameId>] [--confluence-space=<SPACE>]` and stop.
- `transcriptSource` — value of `--transcript` flag (optional)
- `figmaRef` — value of `--figma` flag (optional)
- `confluenceSpaceKey` — value of `--confluence-space` flag (optional, default: `GARUDA`)

## Step 2 — Phase 0: Initialize Workspace

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jiraTicketId>/`
2. Use Bash to create the directory if it does not exist: `mkdir -p <workspacePath>`
3. Use Read to check if `<workspacePath>/pre_dev_state.json` already exists.
   - If it exists, read it and print: `Resuming pipeline for <jiraTicketId>. Current state:` followed by the phase statuses.
   - If it does not exist, use Write to create `<workspacePath>/pre_dev_state.json` with this content:
     ```json
     {
       "jiraTicketId": "<jiraTicketId>",
       "transcriptSource": "<transcriptSource or null>",
       "figmaRef": "<figmaRef or null>",
       "confluenceSpaceKey": "<confluenceSpaceKey>",
       "phases": {
         "prd_ingestion": "not_started",
         "codebase_scout": "not_started",
         "hld_generation": "not_started",
         "lld_generation": "not_started",
         "testcase_generation": "not_started"
       },
       "artifacts": {},
       "created_at": "<current ISO timestamp>",
       "updated_at": "<current ISO timestamp>"
     }
     ```
4. Print: `[Phase 0] Workspace initialized at <workspacePath>`

## Step 3 — Phase 1: PRD Ingestion

1. Update `pre_dev_state.json` — set `phases.prd_ingestion` to `"in_progress"` and update `updated_at`.
2. Print: `[Phase 1] Starting PRD Ingestion...`
3. Spawn an Agent with this prompt:

   > You are the **prd-ingestion** agent. Your job is to gather all requirement context for Jira ticket `<jiraTicketId>` and produce a unified context bundle.
   >
   > **Inputs:**
   > - Jira Ticket ID: `<jiraTicketId>`
   > - Transcript source: `<transcriptSource or "none">`
   > - Figma reference: `<figmaRef or "none">`
   > - Workspace path: `<workspacePath>`
   >
   > **Tasks:**
   > 1. Fetch the Jira ticket using `mcp__mcp-atlassian__jira_get_issue` to get title, description, acceptance criteria, labels, components, linked issues.
   > 2. If a transcript source is provided, read the transcript file (use Read for local path, or WebFetch for URL) and extract key decisions, requirements, and action items.
   > 3. If a Figma reference is provided, use `mcp__framelink-figma-mcp__get_figma_data` to extract the design structure, component names, and layout information.
   > 4. Combine all gathered context into a structured `context_bundle.json` and write it to `<workspacePath>/context_bundle.json` with this schema:
   >    ```json
   >    {
   >      "jira": { "id": "", "title": "", "description": "", "acceptance_criteria": [], "labels": [], "components": [], "linked_issues": [] },
   >      "transcript": { "source": "", "decisions": [], "requirements": [], "action_items": [] },
   >      "figma": { "file_id": "", "frame_id": "", "components": [], "layout_notes": "" },
   >      "synthesized_requirements": [],
   >      "created_at": ""
   >    }
   >    ```
   > 5. Print a summary of what was gathered.

   Give the Agent these tools: `Read, Write, Bash, WebFetch, mcp__mcp-atlassian__jira_get_issue, mcp__framelink-figma-mcp__get_figma_data, mcp__framelink-figma-mcp__download_figma_images`

4. After the agent completes, use Read to verify `<workspacePath>/context_bundle.json` exists.
5. Update `pre_dev_state.json` — set `phases.prd_ingestion` to `"completed"`, add `artifacts.context_bundle` = `"context_bundle.json"`, update `updated_at`.
6. Print: `[Phase 1] PRD Ingestion complete. Context bundle written.`

## Step 4 — Phase 2: Codebase Scout

1. Update `pre_dev_state.json` — set `phases.codebase_scout` to `"in_progress"`, update `updated_at`.
2. Print: `[Phase 2] Starting Codebase Scout...`
3. Spawn an Agent with this prompt:

   > You are the **codebase-scout** agent. Your job is to analyze the garuda-ui codebase and identify all areas relevant to the requirements in the context bundle.
   >
   > **Inputs:**
   > - Workspace path: `<workspacePath>`
   > - Context bundle: `<workspacePath>/context_bundle.json`
   > - Codebase root: The current working directory (garuda-ui repo)
   >
   > **Tasks:**
   > 1. Read `<workspacePath>/context_bundle.json` to understand the requirements.
   > 2. Search the codebase to identify:
   >    - Existing organisms/components that will be modified
   >    - Existing Redux slices (reducers, sagas, selectors) that are affected
   >    - API endpoints and services that are relevant
   >    - Shared utilities, HOCs, or hooks that can be reused
   >    - Route definitions that need changes
   >    - Similar features already implemented (for pattern reference)
   > 3. For each identified area, note the file paths, current behavior, and how it relates to the new requirements.
   > 4. Update `<workspacePath>/context_bundle.json` by adding a `codebase_context` key:
   >    ```json
   >    {
   >      "codebase_context": {
   >        "affected_organisms": [{ "name": "", "path": "", "files": [], "change_type": "modify|create", "notes": "" }],
   >        "affected_redux_slices": [{ "key": "", "reducer_path": "", "saga_path": "", "notes": "" }],
   >        "relevant_apis": [{ "name": "", "path": "", "endpoint": "", "notes": "" }],
   >        "reusable_patterns": [{ "name": "", "path": "", "description": "" }],
   >        "route_changes": [{ "path": "", "file": "", "notes": "" }],
   >        "reference_implementations": [{ "name": "", "path": "", "relevance": "" }]
   >      }
   >    }
   >    ```
   > 5. Print a summary of findings.

   Give the Agent these tools: `Read, Bash, Grep, Glob`

4. After the agent completes, use Read to verify `codebase_context` is present in `<workspacePath>/context_bundle.json`.
5. Update `pre_dev_state.json` — set `phases.codebase_scout` to `"completed"`, update `updated_at`.
6. Print: `[Phase 2] Codebase Scout complete. Codebase context added to bundle.`

## Step 5 — Phase 3: HLD Generation

1. Update `pre_dev_state.json` — set `phases.hld_generation` to `"in_progress"`, update `updated_at`.
2. Print: `[Phase 3] Starting HLD Generation...`
3. Spawn an Agent with this prompt:

   > You are the **hld-generator** agent. Your job is to produce a High-Level Design document for the frontend implementation based on the context bundle.
   >
   > **Inputs:**
   > - Workspace path: `<workspacePath>`
   > - Context bundle: `<workspacePath>/context_bundle.json`
   > - Confluence space key: `<confluenceSpaceKey>`
   > - Feedback (if any): `<feedback or "none">`
   >
   > **Tasks:**
   > 1. Read `<workspacePath>/context_bundle.json` (including codebase_context).
   > 2. Generate a High-Level Design covering:
   >    - **Feature Summary**: What is being built and why
   >    - **Feasibility Verdict**: feasible / feasible-with-risks / not-feasible, with reasoning
   >    - **Architecture Overview**: How new components fit into the existing atomic design structure
   >    - **Component Breakdown**: List of organisms/molecules/atoms to create or modify, with responsibilities
   >    - **State Management Plan**: Redux slices, key state shapes, data flow
   >    - **API Integration Points**: Endpoints needed, request/response shapes
   >    - **Route Changes**: New or modified routes
   >    - **Task Breakdown**: Ordered list of implementation tasks with effort estimates (in hours)
   >    - **Total Bandwidth Estimate**: Sum of task estimates
   >    - **Dependencies & Assumptions**: External dependencies, backend requirements
   >    - **Open Questions**: Anything unresolved that needs clarification
   >    - **Risk Assessment**: Technical risks and mitigation strategies
   > 3. Write the HLD to `<workspacePath>/hld_artifact.json` with schema:
   >    ```json
   >    {
   >      "feature_name": "",
   >      "jira_ticket_id": "",
   >      "feasibility": { "verdict": "", "reasoning": "" },
   >      "architecture_overview": "",
   >      "component_breakdown": [{ "name": "", "layer": "", "action": "create|modify", "responsibility": "" }],
   >      "state_management": [{ "slice_key": "", "state_shape": {}, "notes": "" }],
   >      "api_integrations": [{ "endpoint": "", "method": "", "request_shape": {}, "response_shape": {}, "notes": "" }],
   >      "route_changes": [{ "path": "", "component": "", "action": "create|modify" }],
   >      "task_breakdown": [{ "id": "", "title": "", "description": "", "effort_hours": 0, "dependencies": [] }],
   >      "total_bandwidth_hours": 0,
   >      "dependencies_and_assumptions": [],
   >      "open_questions": [],
   >      "risk_assessment": [{ "risk": "", "impact": "", "mitigation": "" }],
   >      "confluence_url": "",
   >      "created_at": "",
   >      "feedback_history": []
   >    }
   >    ```
   > 4. If Confluence space key is provided, create a Confluence page with the HLD content using `mcp__mcp-atlassian__confluence_create_page` and save the URL in the artifact.
   > 5. Print a summary of the HLD.

   Give the Agent these tools: `Read, Write, Bash, mcp__mcp-atlassian__confluence_create_page`

4. After the agent completes, use Read to load `<workspacePath>/hld_artifact.json`.
5. Update `pre_dev_state.json` — set `phases.hld_generation` to `"completed"`, add `artifacts.hld_artifact` = `"hld_artifact.json"`, update `updated_at`.

### HLD Checkpoint

6. Display the HLD summary in this format:

   ```
   ============================================
   HLD SUMMARY
   ============================================
   Feature:       <feature_name>
   Feasibility:   <verdict>
   Bandwidth:     <total_bandwidth_hours> hours
   Tasks:         <number of tasks>
   Components:    <number of components>
   Open Questions: <number of open questions>
   Confluence:    <confluence_url or "Not published">
   ============================================
   ```

7. Ask the user:
   > **Review the HLD on Confluence (or above). Respond with one of:**
   > - `approved` — to continue the pipeline
   > - `feedback: <your feedback>` — to regenerate the HLD with your feedback
   > - `abort` — to stop the pipeline

8. Wait for the user's response.
   - If `approved`: Print `[Phase 3] HLD approved. Proceeding...` and continue to Step 6.
   - If starts with `feedback:`: Extract the feedback text. Re-run this Phase 3 from step 3, passing the feedback to the hld-generator agent. Append the feedback to `hld_artifact.json`'s `feedback_history` array.
   - If `abort`: Update `pre_dev_state.json` with `phases.hld_generation` = `"aborted"`. Print `Pipeline aborted by user at HLD review.` and **STOP**.

## Step 6 — Phase 4: Hand-off to LLD

Update `pre_dev_state.json` — set `phases.hld_generation` to `"approved"`, update `updated_at`.

Print the following message and **STOP** (do not proceed further):

```
============================================
HLD PHASE COMPLETE
============================================

Before generating LLD, you need:

1. Backend team's HLD — place as .md file in:
   <workspacePath>/backend_hld.md
   OR provide the Confluence page ID when running /generate-lld

2. API signatures — place as .json file in:
   <workspacePath>/api_signatures.json (optional, but recommended)

When ready, run:
  /generate-lld <jiraTicketId> [--backend-hld=<confluence-page-id>] [--confluence-space=<confluenceSpaceKey>]

============================================
```
