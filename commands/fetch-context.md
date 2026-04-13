---
description: Fetch task context from Jira, Confluence, Figma, and Google Docs into a context bundle
argument-hint: <jira-ticket-id> [--confluence=<page-id>] [--figma=<fileId:frameId>] [--transcript=<path-or-url>]
disable-model-invocation: true
allowed-tools: Agent, Read, Write, mcp__claude_ai_Atlassian__getJiraIssue, mcp__claude_ai_Atlassian__getConfluencePage, mcp__claude_ai_Figma__get_design_context, mcp__claude_ai_Google_Drive__read_file_content
---

# /fetch-context

Standalone command to fetch and assemble task context. Can be used independently of either pipeline. Useful when you want to gather context without starting a full pipeline run.

## Pre-flight

Parse `$ARGUMENTS`:
- `jiraTicketId` — required
- `confluencePageId` — optional Confluence page ID for PRD/HLD/LLD
- `figmaRef` — optional Figma `fileId:frameId`
- `transcriptSource` — optional local file path or Google Doc URL

## Execution

1. Set `workspacePath` = `.claude/pre-dev-workspace/<jira-id>/`
2. Create `<workspacePath>` if not exists: `mkdir -p <workspacePath>`
3. Write a minimal state file `<workspacePath>/fetch_context_state.json` (if not exists):
   ```json
   {
     "jiraTicketId": "<jira-id>",
     "status": "in_progress",
     "phases": {
       "prd_ingestion": { "status": "not_started", "guardrail_result": null },
       "codebase_scout": { "status": "not_started", "guardrail_result": null }
     },
     "created_at": "<current ISO timestamp>",
     "updated_at": "<current ISO timestamp>"
   }
   ```

4. Spawn the `prd-ingestion` agent (defined in `agents/prd-ingestion.md`) with these inputs:
   - `jiraTicketId`: `<jiraTicketId>`
   - `transcriptSource`: `<transcriptSource or "none">`
   - `figmaRef`: `<figmaRef or "none">`
   - `confluencePageId`: `<confluencePageId or "none">`
   - `workspacePath`: `<workspacePath>`

   Give the Agent these tools: `Read, Write, Bash, WebFetch, mcp__claude_ai_Atlassian__getJiraIssue, mcp__claude_ai_Atlassian__getConfluencePage, mcp__claude_ai_Figma__get_design_context, mcp__claude_ai_Google_Drive__read_file_content`

5. **Gate Check**: Read `<workspacePath>/context_bundle.json`:
   - Verify `jira.id` matches `<jiraTicketId>`
   - If `jira.id` is empty or missing: print error and STOP

6. Update `fetch_context_state.json` — set `phases.prd_ingestion.status` = `"completed"`, update `updated_at`.

7. Spawn the `codebase-scout` agent (defined in `agents/codebase-scout.md`) with these inputs:
   - `workspacePath`: `<workspacePath>`
   - Context bundle at: `<workspacePath>/context_bundle.json`
   - Codebase root: current working directory

   Give the Agent these tools: `Read, Bash, Grep, Glob`

8. **Gate Check**: Read updated `<workspacePath>/context_bundle.json`:
   - Verify `codebase_context` key exists
   - If codebase_context is missing: print error and STOP

9. Update `fetch_context_state.json` — set `phases.codebase_scout.status` = `"completed"`, set `status` = `"completed"`, update `updated_at`.

10. Write `<workspacePath>/requirements_context.md` (if not exists):
    ```markdown
    # Requirements Context: <jira-id>

    > This file captures the user's requirements and decisions.

    ## Original Request
    - Command: `/fetch-context <full $ARGUMENTS as typed>`
    - Jira Ticket: <jira-id>
    - Confluence: <confluencePageId or "not provided">
    - Figma: <figmaRef or "not provided">
    - Transcript: <transcriptSource or "not provided">
    - Started: <current ISO timestamp>

    ## Functional Requirements
    Context-only fetch — requirements will be captured when pipeline starts.

    ## Decisions & Notes
    <updated by pipeline commands>
    ```

11. **Journal Update**: Write `<workspacePath>/session_journal.md` (append if exists):
    ```markdown
    ## Context Fetch — COMPLETED at <ISO timestamp>
    - Jira: <summary from context_bundle.json>
    - PRD source: <google_doc|confluence|jira_fallback>
    - Transcript: <processed|not provided>
    - Figma: <fetched|partial|unavailable>
    - Codebase: <N> organisms, <N> pages, <N> endpoints
    ```

12. Print summary:
```
Context fetched for <jira-id>
================================
Jira: <summary>
PRD source: <google_doc|confluence|jira_fallback>
Transcript: <processed|not provided>
Figma: <fetched|partial|unavailable>
Codebase: <N> organisms, <N> pages, <N> endpoints found

Context bundle: .claude/pre-dev-workspace/<jira-id>/context_bundle.json
================================
```
