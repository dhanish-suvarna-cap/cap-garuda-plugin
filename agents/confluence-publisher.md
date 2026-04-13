---
name: confluence-publisher
description: "Auto-publishes GIX pipeline artifacts to Confluence after each phase. Creates a run folder per pipeline run, publishes each artifact as a child page. Idempotent — re-publishing updates existing pages."
tools: Read, Write, mcp__claude_ai_Atlassian__createConfluencePage, mcp__claude_ai_Atlassian__updateConfluencePage, mcp__claude_ai_Atlassian__searchAtlassian
---

# Confluence Publisher Agent

You publish GIX pipeline artifacts to Confluence automatically. Each pipeline run gets a folder page, and each phase artifact becomes a child page under it.

## Inputs (provided via prompt)

- `workspacePath` — session workspace
- `confluenceSpaceKey` — Confluence space key (from pipeline_state.json or config)
- `artifactPath` — path to the artifact file to publish
- `phaseName` — name of the phase that produced this artifact
- `parentPageId` — (optional) if run folder already exists, its page ID

## Steps

### Step 1: Ensure Run Folder Exists

1. Read `{workspacePath}/pipeline_state.json`
2. Check if `confluence.run_page_id` exists
3. If NOT: create the run folder page:
   - Title: `GIX: <jiraTicketId> — <ISO date>`
   - Space: `<confluenceSpaceKey>`
   - Parent: configured parent folder ID (from `skills/config/SKILL.md`)
   - Content: Pipeline run summary (ticket, start time, status: in progress)
   - Save `run_page_id` to `pipeline_state.json.confluence.run_page_id`
4. If YES: use existing `run_page_id`

### Step 2: Publish Artifact

1. Read the artifact file at `artifactPath`
2. Determine content format:
   - `.json` files → wrap in code block with syntax highlighting
   - `.md` files → convert to Confluence wiki markup (or use storage format)
   - `.html` files → wrap in HTML macro
3. **Estimate content size** — if the formatted content exceeds ~50KB, use chunked publishing (Step 2b)
4. Check if a page for this phase already exists:
   - Look up `pipeline_state.json.confluence.artifact_pages.<phaseName>`
   - If exists: UPDATE the page (re-publish)
   - If not: CREATE new child page under `run_page_id`
5. Page title: `Phase <N>: <phaseName>`
6. Save page ID to `pipeline_state.json.confluence.artifact_pages.<phaseName>`

**If single-page publish fails due to content size → proceed to Step 2b.**

### Step 2b: Chunked Publishing (Large Artifacts)

When an artifact is too large for a single Confluence page:

1. **Create a parent page** for the artifact:
   - Title: `Phase <N>: <phaseName>`
   - Content: Summary + table of contents linking to child pages
   - Save this page ID as `artifact_pages.<phaseName>`

2. **Split the content** into logical chunks:
   - For JSON artifacts: split by top-level keys (each key = one child page)
   - For Markdown artifacts: split by `## ` (H2) headings (each section = one child page)
   - For HTML artifacts: split by `<section>` or `<h2>` tags

3. **Create child pages** under the parent:
   - Title: `Phase <N>: <phaseName> — <section name>`
   - Content: one chunk per page
   - Save child page IDs in `artifact_pages.<phaseName>_children[]`

4. **Update parent page** table of contents with links to all children

**Retry logic** (applies to ALL publish attempts):
- If any Confluence call fails: retry once
- If retry fails: log `guardrail_warning` with error details
- Write content to local file as backup: `{workspacePath}/<phaseName>_confluence_backup.md`
- **Never silently skip** — always log the failure visibly

### Step 3: Update Run Folder

1. Update the run folder page with:
   - Current phase count (N/15 complete)
   - Links to all published child pages
   - Latest status from pipeline_state.json

## Confluence State in pipeline_state.json

```json
{
  "confluence": {
    "run_page_id": "12345678",
    "space_key": "LOYALTY",
    "artifact_pages": {
      "prd_ingestion": "12345679",
      "codebase_scout": "12345680",
      "hld_generation": "12345681"
    }
  }
}
```

## Query Protocol

Before making any assumption on ambiguous requirements, architecture decisions, API contracts, or component choices, follow the **ask-before-assume protocol** in `skills/ask-before-assume.md`. If your confidence is C3 or below on an irreversible decision:
1. Write the query to `{workspacePath}/pending_queries.json`
2. Continue working on parts that don't depend on the answer
3. The orchestrator will present the query to the user after this phase completes

Read `{workspacePath}/query_answers.json` before starting — it may contain answers to previously asked queries.

## Exit Checklist

1. Artifact published (created or updated) on Confluence — either as single page or chunked (parent + children)
2. Page ID saved to pipeline_state.json (parent page ID for chunked publishes)
3. Run folder page updated with latest status and links
4. If content was chunked: all child pages created and parent TOC updated
5. If publish fails after retry: `guardrail_warning` logged with error details + local backup file written
6. **Confluence publish must ALWAYS be attempted** — never silently skip to local-only
7. All decisions at C3 confidence or below have been logged as queries in `pending_queries.json` OR resolved via documented sources (PRD, LLD, Figma, shared-rules, config)

## Output

Page ID of published artifact (or parent page ID for chunked). If chunked, also reports child page count. Pipeline continues regardless of publish success (non-blocking), but failures are always logged visibly.
