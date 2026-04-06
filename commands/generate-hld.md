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
- `confluenceSpaceKey` — value of `--confluence-space` flag (optional, default from `skills/config.md`)

## Step 2 — Validate Workspace

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jiraTicketId>/`
2. Use Read to check if `<workspacePath>/pre_dev_state.json` exists.
   - If it does not exist, print: `Error: No workspace found for <jiraTicketId>. Run /pre-dev <jiraTicketId> first to initialize the workspace and run PRD ingestion.` and **STOP**.
3. Use Read to check if `<workspacePath>/context_bundle.json` exists.
   - If it does not exist, print: `Error: No context bundle found. Run /pre-dev <jiraTicketId> first to complete PRD ingestion and codebase scout phases.` and **STOP**.
4. Read `context_bundle.json` and verify it has a `codebase_context` key.
   - If missing, print: `Warning: Codebase scout has not been run. The HLD will be generated without codebase context. Consider running /pre-dev first for better results.`
5. Read `pre_dev_state.json` to get the current state.
6. Read `<workspacePath>/session_journal.md` if it exists and print its content so context is restored.
7. Read `<workspacePath>/requirements_context.md` if it exists and print it — this restores Claude's understanding of WHAT the user is building and WHY.

## Step 3 — Generate HLD

1. Update `pre_dev_state.json` — set `phases.hld_generation.status` to `"in_progress"`, update `updated_at`.
2. If feedback is provided, print: `[HLD] Regenerating HLD with feedback: "<feedback>"`
   Otherwise, print: `[HLD] Generating HLD...`
3. Spawn the `hld-generator` agent (defined in `agents/hld-generator.md`) with these inputs:
   - `workspacePath`: `<workspacePath>`
   - `confluenceSpaceKey`: `<confluenceSpaceKey>`
   - `feedback`: `<feedback or "none">`
   - `previousVersion`: `<workspacePath>/hld_artifact.json` (if exists and feedback provided)

   Give the Agent these tools: `Read, Write, Bash, mcp__mcp-atlassian__confluence_create_page`

## Step 4 — Gate Check & Display Summary

1. **Gate Check**: Read `<workspacePath>/hld_artifact.json`:
   - Verify `feature_name` is non-empty
   - Verify `feasibility.verdict` is one of: feasible, feasible-with-risks, not-feasible
   - Verify `component_breakdown` has >= 1 item
   - If `guardrail_warnings` exist, print them
   - If critical fields missing: print error, offer to re-run

2. Update `pre_dev_state.json`:
   - `phases.hld_generation.status` = `"completed"`
   - `phases.hld_generation.summary` = `"<one-line summary of HLD>"`
   - `phases.hld_generation.guardrail_result` = `"PASS"` or `"PASS with warnings: <list>"`
   - `phases.hld_generation.confluence_url` = `"<url or null>"`
   - `artifacts.hld_artifact` = `"hld_artifact.json"`
   - `recovery.last_successful_phase` = `"hld_generation"`
   - `recovery.can_resume_from` = `"lld_generation"`
   - `resume_instructions` = `"Review HLD and proceed to LLD generation"`
   - `updated_at` = current ISO timestamp

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

5. **Journal Update**: Append to `<workspacePath>/session_journal.md`:
   ```markdown
   ## HLD Generation — COMPLETED at <ISO timestamp>
   - Feature: <feature_name>
   - Feasibility: <verdict>
   - Bandwidth: <total_bandwidth_hours> hours
   - Components: <number of components>
   - Confluence: <url or "Not published">
   - Feedback applied: <feedback or "none">
   ```

6. Print:
   > **Next steps:**
   > - Review the HLD on Confluence and in `<workspacePath>/hld_artifact.json`
   > - To regenerate with feedback: `/generate-hld <jiraTicketId> --feedback="<your feedback>"`
   > - To proceed to LLD: `/generate-lld <jiraTicketId> [--backend-hld=<confluence-page-id>] [--confluence-space=<SPACE>]`
