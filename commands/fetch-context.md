---
description: Fetch task context from Jira, Confluence, Figma, and Google Docs into a context bundle
argument-hint: <jira-ticket-id> [--confluence=<page-id>] [--figma=<fileId:frameId>] [--transcript=<path-or-url>]
disable-model-invocation: true
allowed-tools: Agent, Read, Write, mcp__mcp-atlassian__jira_get_issue, mcp__mcp-atlassian__confluence_get_page, mcp__framelink-figma-mcp__get_figma_data, mcp__c1fc4002-5f49-5f9d-a4e5-93c4ef5d6a75__google_drive_fetch
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

1. Create `.claude/pre-dev-workspace/<jira-id>/` if not exists

2. Spawn agent: `prd-ingestion`

   Pass all parsed arguments and workspace path.

3. Wait for `context_bundle.json` to be written.

4. Spawn agent: `codebase-scout`

   Pass workspace path.

5. Wait for `context_bundle.json` to be updated with `codebase_context`.

6. Print summary:
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
