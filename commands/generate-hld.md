---
description: Generate or regenerate HLD for a ticket — standalone command for partial re-runs
argument-hint: <jira-ticket-id> [--feedback="<feedback text>"] [--confluence-space=<SPACE>]
disable-model-invocation: true
allowed-tools: Agent, Read, Write
---

# Generate HLD — Standalone Command

You are a **standalone HLD generation orchestrator**. You generate (or regenerate with feedback) a High-Level Design for a ticket that already has a context bundle prepared.

## Step 1 — Parse Arguments

Parse `$ARGUMENTS` to extract:
- `jiraTicketId` — the first positional argument (required). If missing, print: `Usage: /generate-hld <jira-ticket-id> [--feedback="<feedback text>"] [--confluence-space=<SPACE>]` and stop.
- `feedback` — value of `--feedback` flag (optional). This is used for regeneration with reviewer comments.
- `confluenceSpaceKey` — value of `--confluence-space` flag (optional, default: `GARUDA`)

## Step 2 — Validate Workspace

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jiraTicketId>/`
2. Use Read to check if `<workspacePath>/pre_dev_state.json` exists.
   - If it does not exist, print: `Error: No workspace found for <jiraTicketId>. Run /pre-dev <jiraTicketId> first to initialize the workspace and run PRD ingestion.` and **STOP**.
3. Use Read to check if `<workspacePath>/context_bundle.json` exists.
   - If it does not exist, print: `Error: No context bundle found. Run /pre-dev <jiraTicketId> first to complete PRD ingestion and codebase scout phases.` and **STOP**.
4. Read `context_bundle.json` and verify it has a `codebase_context` key.
   - If missing, print: `Warning: Codebase scout has not been run. The HLD will be generated without codebase context. Consider running /pre-dev first for better results.`
5. Read `pre_dev_state.json` to get the current state.

## Step 3 — Generate HLD

1. Update `pre_dev_state.json` — set `phases.hld_generation` to `"in_progress"`, update `updated_at`.
2. If feedback is provided, print: `[HLD] Regenerating HLD with feedback: "<feedback>"`
   Otherwise, print: `[HLD] Generating HLD...`
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
   > 1. Read `<workspacePath>/context_bundle.json` (including codebase_context if present).
   > 2. If feedback is provided and a previous `<workspacePath>/hld_artifact.json` exists, read the previous HLD and incorporate the feedback into the regenerated version.
   > 3. Generate a High-Level Design covering:
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
   > 4. Write the HLD to `<workspacePath>/hld_artifact.json` with schema:
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
   > 5. If feedback was provided, append it to the `feedback_history` array with a timestamp.
   > 6. If Confluence space key is provided, create a Confluence page with the HLD content using `mcp__mcp-atlassian__confluence_create_page` and save the URL in the artifact.
   > 7. Print a summary of the HLD.

   Give the Agent these tools: `Read, Write, Bash, mcp__mcp-atlassian__confluence_create_page`

## Step 4 — Display Summary

1. Use Read to load `<workspacePath>/hld_artifact.json`.
2. Update `pre_dev_state.json` — set `phases.hld_generation` to `"completed"`, add `artifacts.hld_artifact` = `"hld_artifact.json"`, update `updated_at`.
3. Display the HLD summary:

   ```
   ============================================
   HLD SUMMARY
   ============================================
   Feature:        <feature_name>
   Ticket:         <jira_ticket_id>
   Feasibility:    <verdict>
   Bandwidth:      <total_bandwidth_hours> hours
   Tasks:          <number of tasks>
   Components:     <number of components in component_breakdown>
   Open Questions: <number of open_questions>
   Confluence:     <confluence_url or "Not published">
   ============================================
   ```

4. If feedback was provided, print: `HLD regenerated with feedback. Review iteration <N> on Confluence.`

5. Print:
   > **Next steps:**
   > - Review the HLD on Confluence and in `<workspacePath>/hld_artifact.json`
   > - To regenerate with feedback: `/generate-hld <jiraTicketId> --feedback="<your feedback>"`
   > - To proceed to LLD: `/generate-lld <jiraTicketId> [--backend-hld=<confluence-page-id>] [--confluence-space=<SPACE>]`
