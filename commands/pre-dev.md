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
- `confluenceSpaceKey` — value of `--confluence-space` flag (optional, default from `skills/config.md`)

## Step 2 — Phase 0: Initialize Workspace

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jiraTicketId>/`
2. Use Bash to create the directory if it does not exist: `mkdir -p <workspacePath>`
3. Use Read to check if `<workspacePath>/pre_dev_state.json` already exists.
   - If it exists:
     - Read it and print: `Resuming pipeline for <jiraTicketId>. Current state:` followed by the phase statuses.
     - Read `<workspacePath>/session_journal.md` if it exists — print it so execution history is restored
     - Read `<workspacePath>/requirements_context.md` if it exists — print it so Claude understands WHAT is being built and WHY
     - Identify the next action from `pre_dev_state.json` using `recovery.can_resume_from`
     - Print: `Resuming from: <next phase>. Last completed: <recovery.last_successful_phase>`
     - Skip to the appropriate phase
   - If it does not exist, use Write to create `<workspacePath>/pre_dev_state.json` with this content:
     ```json
     {
       "jiraTicketId": "<jiraTicketId>",
       "transcriptSource": "<transcriptSource or null>",
       "figmaRef": "<figmaRef or null>",
       "confluenceSpaceKey": "<confluenceSpaceKey>",
       "phases": {
         "prd_ingestion": { "status": "not_started", "summary": null, "guardrail_result": null },
         "codebase_scout": { "status": "not_started", "summary": null, "guardrail_result": null },
         "hld_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "confluence_url": null },
         "lld_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "confluence_url": null },
         "testcase_generation": { "status": "not_started", "summary": null, "guardrail_result": null, "confluence_url": null }
       },
       "artifacts": {},
       "recovery": { "last_successful_phase": null, "can_resume_from": "prd_ingestion" },
       "resume_instructions": "Start from Phase 1: PRD Ingestion",
       "created_at": "<current ISO timestamp>",
       "updated_at": "<current ISO timestamp>"
     }
     ```
4. Print: `[Phase 0] Workspace initialized at <workspacePath>`
5. Initialize session journal: Write `<workspacePath>/session_journal.md` (if not exists):
   ```markdown
   # Session Journal: <jiraTicketId>
   
   > This file is auto-updated after each phase. If a session is interrupted,
   > a new Claude session can read this file to resume from where it stopped.
   
   ---
   ```

## Step 2b — Capture Requirements Context

1. Check if `<workspacePath>/requirements_context.md` exists.
   - If it exists (resume scenario): Read and print it — this restores Claude's understanding of WHAT the user is building.
   - If it does NOT exist (new pipeline): Write `<workspacePath>/requirements_context.md`:

     ```markdown
     # Requirements Context: <jiraTicketId>

     > This file captures the user's requirements, use cases, and decisions.
     > It is read on resume so Claude understands WHAT is being built, not just WHERE the pipeline stopped.

     ## Original Request
     - Command: `/pre-dev <full $ARGUMENTS as typed>`
     - Jira Ticket: <jiraTicketId>
     - Transcript: <transcriptSource or "not provided">
     - Figma: <figmaRef or "not provided">
     - Started: <current ISO timestamp>

     ## Functional Requirements
     <to be filled>

     ## Use Cases
     <to be filled>

     ## Decisions & Notes
     <updated at each checkpoint>
     ```

2. Ask the user:
   > **Before starting the pipeline, briefly describe what you're building and any key requirements or use cases not captured in the Jira ticket.**
   > Type `skip` if everything is already in the Jira ticket.

3. Wait for the user's response:
   - If the user provides requirements: Update `requirements_context.md` — fill in the **Functional Requirements** and **Use Cases** sections with the user's response.
   - If the user types `skip`: Update **Functional Requirements** to `See Jira ticket — no additional context provided.` and **Use Cases** to `See Jira ticket acceptance criteria.`

4. Print: `[Phase 0] Requirements captured. Starting pipeline...`

## Step 3 — Phase 1: PRD Ingestion

1. Update `pre_dev_state.json` — set `phases.prd_ingestion.status` to `"in_progress"` and update `updated_at`.
2. Print: `[Phase 1] Starting PRD Ingestion...`
3. Spawn the `prd-ingestion` agent (defined in `agents/prd-ingestion.md`) with these inputs:
   - `jiraTicketId`: `<jiraTicketId>`
   - `transcriptSource`: `<transcriptSource or "none">`
   - `figmaRef`: `<figmaRef or "none">`
   - `workspacePath`: `<workspacePath>`

   Give the Agent these tools: `Read, Write, Bash, WebFetch, mcp__mcp-atlassian__jira_get_issue, mcp__framelink-figma-mcp__get_figma_data, mcp__framelink-figma-mcp__download_figma_images`

4. **Gate Check**: Read `<workspacePath>/context_bundle.json`:
   - Verify `jira.id` matches `<jiraTicketId>`
   - Verify at least ONE of prd, transcript_summary, or figma is populated
   - If `guardrail_warnings` exist in the JSON, print them as warnings
   - If jira.id is empty or doesn't match: print error and STOP

5. Update `pre_dev_state.json`:
   - `phases.prd_ingestion.status` = `"completed"`
   - `phases.prd_ingestion.summary` = `"<one-line summary of context gathered>"`
   - `phases.prd_ingestion.guardrail_result` = `"PASS"` or `"PASS with warnings: <list>"`
   - `artifacts.context_bundle` = `"context_bundle.json"`
   - `recovery.last_successful_phase` = `"prd_ingestion"`
   - `recovery.can_resume_from` = `"codebase_scout"`
   - `resume_instructions` = `"Start from Phase 2: Codebase Scout"`
   - `updated_at` = current ISO timestamp

6. **Journal Update**: Append to `<workspacePath>/session_journal.md`:
   ```markdown
   ## Phase 1: PRD Ingestion — COMPLETED at <ISO timestamp>
   - <1-line summary of what was done>
   - <Key outputs/decisions>
   - Output: context_bundle.json
   ```

7. Print: `[Phase 1] PRD Ingestion complete. Context bundle written.`

## Step 4 — Phase 2: Codebase Scout

1. Update `pre_dev_state.json` — set `phases.codebase_scout.status` to `"in_progress"`, update `updated_at`.
2. Print: `[Phase 2] Starting Codebase Scout...`
3. Spawn the `codebase-scout` agent (defined in `agents/codebase-scout.md`) with these inputs:
   - `workspacePath`: `<workspacePath>`
   - Context bundle at: `<workspacePath>/context_bundle.json`
   - Codebase root: current working directory

   Give the Agent these tools: `Read, Bash, Grep, Glob`

4. **Gate Check**: Read updated `<workspacePath>/context_bundle.json`:
   - Verify `codebase_context` key exists
   - If `guardrail_warnings` exist, print them as warnings
   - If codebase_context is missing: print error and STOP

5. Update `pre_dev_state.json`:
   - `phases.codebase_scout.status` = `"completed"`
   - `phases.codebase_scout.summary` = `"<one-line summary of codebase findings>"`
   - `phases.codebase_scout.guardrail_result` = `"PASS"` or `"PASS with warnings: <list>"`
   - `recovery.last_successful_phase` = `"codebase_scout"`
   - `recovery.can_resume_from` = `"hld_generation"`
   - `resume_instructions` = `"Start from Phase 3: HLD Generation"`
   - `updated_at` = current ISO timestamp

6. **Journal Update**: Append to `<workspacePath>/session_journal.md`:
   ```markdown
   ## Phase 2: Codebase Scout — COMPLETED at <ISO timestamp>
   - <1-line summary of what was done>
   - <Key outputs/decisions>
   - Output: context_bundle.json (updated with codebase_context)
   ```

7. Print: `[Phase 2] Codebase Scout complete. Codebase context added to bundle.`

## Step 5 — Phase 3: HLD Generation

1. Update `pre_dev_state.json` — set `phases.hld_generation.status` to `"in_progress"`, update `updated_at`.
2. Print: `[Phase 3] Starting HLD Generation...`
3. Spawn the `hld-generator` agent (defined in `agents/hld-generator.md`) with these inputs:
   - `workspacePath`: `<workspacePath>`
   - `confluenceSpaceKey`: `<confluenceSpaceKey>`
   - `feedback`: `<feedback or "none">`

   Give the Agent these tools: `Read, Write, Bash, mcp__mcp-atlassian__confluence_create_page`

4. **Gate Check**: Read `<workspacePath>/hld_artifact.json`:
   - Validate against `schemas/hld_artifact.schema.json` (check required fields exist)
   - Verify `feasibility.verdict` is one of: feasible, feasible-with-risks, not-feasible
   - Verify `total_bandwidth_hours` equals sum of task effort_hours
   - If `guardrail_warnings` exist, print them
   - If required fields missing: print error, offer to re-run Phase 3

5. Update `pre_dev_state.json`:
   - `phases.hld_generation.status` = `"completed"`
   - `phases.hld_generation.summary` = `"<one-line summary of HLD>"`
   - `phases.hld_generation.guardrail_result` = `"PASS"` or `"PASS with warnings: <list>"`
   - `phases.hld_generation.confluence_url` = `"<url or null>"`
   - `artifacts.hld_artifact` = `"hld_artifact.json"`
   - `recovery.last_successful_phase` = `"hld_generation"`
   - `recovery.can_resume_from` = `"lld_generation"`
   - `resume_instructions` = `"Review HLD and proceed to LLD generation"`
   - `updated_at` = current ISO timestamp

6. **Journal Update**: Append to `<workspacePath>/session_journal.md`:
   ```markdown
   ## Phase 3: HLD Generation — COMPLETED at <ISO timestamp>
   - <1-line summary of HLD>
   - Feasibility: <verdict>
   - Bandwidth: <hours> hours
   - Output: hld_artifact.json
   ```

### HLD Checkpoint

7. Display the HLD summary in this format:

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

8. Ask the user:
   > **Review the HLD on Confluence (or above). Respond with one of:**
   > - `approved` — to continue the pipeline
   > - `feedback: <your feedback>` — to regenerate the HLD with your feedback
   > - `abort` — to stop the pipeline

9. Wait for the user's response.
   - If `approved`: Print `[Phase 3] HLD approved. Proceeding...`. Append to `<workspacePath>/requirements_context.md` under **Decisions & Notes**:
     ```markdown
     ### HLD Review — <ISO timestamp>
     - Decision: approved
     ```
     Append to `<workspacePath>/session_journal.md`:
     ```markdown
     ## Phase 3: HLD Review — APPROVED at <ISO timestamp>
     - User decision: approved
     - Confluence: <url or "Not published">
     ```
     Continue to Step 6.
   - If starts with `feedback:`: Extract the feedback text. Append to `<workspacePath>/requirements_context.md` under **Decisions & Notes**:
     ```markdown
     ### HLD Review — <ISO timestamp>
     - Decision: feedback
     - Feedback: <feedback text>
     ```
     Append to `<workspacePath>/session_journal.md`:
     ```markdown
     ## Phase 3: HLD Review — FEEDBACK at <ISO timestamp>
     - User decision: <feedback text>
     - Confluence: <url or "Not published">
     ```
     Re-run this Phase 3 from step 3, passing the feedback to the hld-generator agent. Append the feedback to `hld_artifact.json`'s `feedback_history` array.
   - If `abort`: Update `pre_dev_state.json` with `phases.hld_generation.status` = `"aborted"`. Append to `<workspacePath>/requirements_context.md` under **Decisions & Notes**:
     ```markdown
     ### HLD Review — <ISO timestamp>
     - Decision: abort
     - Reason: <user's reason if provided>
     ```
     Append to `<workspacePath>/session_journal.md`:
     ```markdown
     ## Phase 3: HLD Review — ABORTED at <ISO timestamp>
     - User decision: abort
     - Confluence: <url or "Not published">
     ```
     Print `Pipeline aborted by user at HLD review.` and **STOP**.

## Step 6 — Phase 4: Hand-off to LLD

Update `pre_dev_state.json` — set `phases.hld_generation.status` to `"approved"`, update `updated_at`.

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
