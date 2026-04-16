# Live Dashboard Template

> This skill defines the live HTML dashboard that updates after every phase in the GIX pipeline.
> The dashboard is a human-readable HTML file viewable in any browser at any time.
>
> **Location**: `.claude/workspace/<jira-id>/live-dashboard.html`

## When to Create

During Phase 0 (Workspace Init) of `/gix`, ask the user:
```
Live Dashboard (recommended):
  Do you want a live HTML dashboard? (Y/N)
  It updates after every phase with progress, diagrams, and artifacts.
```

If Y: create `live-dashboard.html` using the template below. Set `dashboard_enabled: true` in pipeline_state.json.
If N: skip. Set `dashboard_enabled: false`.

After creating, print: `Dashboard created. Open in browser: <workspacePath>/live-dashboard.html`

## Initial Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="10">
  <title>GIX Pipeline — TICKET_ID</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <style>
    :root {
      --bg-primary: #1a1a2e;
      --bg-secondary: #16213e;
      --bg-card: #0f3460;
      --text-primary: #e0e0e0;
      --text-secondary: #a0a0a0;
      --accent: #00d4ff;
      --success: #00e676;
      --warning: #ffc107;
      --error: #ff5252;
      --border: #2a2a4a;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--bg-primary); color: var(--text-primary); display: flex; min-height: 100vh; }

    /* Sidebar */
    .sidebar { width: 260px; background: var(--bg-secondary); border-right: 1px solid var(--border); padding: 20px 0; position: fixed; height: 100vh; overflow-y: auto; }
    .sidebar h2 { padding: 0 20px; margin-bottom: 20px; color: var(--accent); font-size: 16px; }
    .sidebar a { display: block; padding: 10px 20px; color: var(--text-secondary); text-decoration: none; font-size: 14px; border-left: 3px solid transparent; transition: all 0.3s; }
    .sidebar a:hover { background: var(--bg-card); color: var(--text-primary); }
    .sidebar a.complete { color: var(--success); border-left-color: var(--success); }
    .sidebar a.complete::before { content: "\2713 "; }
    .sidebar a.active { color: var(--accent); border-left-color: var(--accent); background: var(--bg-card); }
    .sidebar a.active::before { content: "\25B6 "; }
    .sidebar a.skipped { color: var(--text-secondary); border-left-color: var(--warning); }
    .sidebar a.skipped::before { content: "\2014 "; }
    .sidebar a.pending { color: var(--text-secondary); }
    .sidebar a.pending::before { content: "\25CB "; }

    /* Main */
    .main { margin-left: 260px; padding: 30px; flex: 1; }
    .header { margin-bottom: 30px; }
    .header h1 { color: var(--accent); margin-bottom: 8px; }
    .header .meta { color: var(--text-secondary); font-size: 14px; }
    .auto-refresh-note { color: var(--text-secondary); font-size: 12px; font-style: italic; margin-top: 4px; }

    /* Progress Bar */
    .progress-bar { background: var(--bg-secondary); border-radius: 8px; height: 24px; margin: 20px 0; overflow: hidden; }
    .progress-bar .fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--success)); border-radius: 8px; transition: width 0.5s; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; color: #000; min-width: 40px; }
    .progress-stats { display: flex; gap: 30px; margin-bottom: 30px; flex-wrap: wrap; }
    .stat-item { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; padding: 12px 20px; }
    .stat-value { color: var(--accent); font-weight: bold; font-size: 18px; }
    .stat-label { color: var(--text-secondary); font-size: 12px; }

    /* Phase Sections */
    .phase-section { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .phase-section.collapsed .phase-content { display: none; }
    .phase-header { display: flex; align-items: center; gap: 12px; cursor: pointer; }
    .phase-header h2 { margin: 0; font-size: 18px; }
    .phase-badge { font-size: 12px; padding: 3px 10px; border-radius: 12px; font-weight: normal; white-space: nowrap; }
    .phase-badge.complete { background: var(--success); color: #000; }
    .phase-badge.active { background: var(--accent); color: #000; animation: pulse 2s infinite; }
    .phase-badge.pending { background: var(--border); color: var(--text-secondary); }
    .phase-badge.skipped { background: var(--warning); color: #000; }
    .phase-badge.failed { background: var(--error); color: #fff; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
    .phase-time { color: var(--text-secondary); font-size: 13px; margin: 8px 0 12px; }
    .phase-content { margin-top: 16px; }

    /* Key Numbers */
    .key-numbers { display: flex; gap: 20px; margin: 16px 0; flex-wrap: wrap; }
    .key-number { background: var(--bg-card); padding: 16px; border-radius: 8px; text-align: center; min-width: 100px; }
    .key-number .value { font-size: 24px; font-weight: bold; color: var(--accent); }
    .key-number .label { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }

    /* Tables */
    .data-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    .data-table th { background: var(--bg-card); padding: 10px; text-align: left; font-size: 13px; color: var(--accent); }
    .data-table td { padding: 10px; border-bottom: 1px solid var(--border); font-size: 13px; }

    /* Mermaid */
    .mermaid { background: var(--bg-card); padding: 16px; border-radius: 8px; margin: 12px 0; }

    /* Artifact List */
    .artifact-list { list-style: none; margin: 8px 0; }
    .artifact-list li { padding: 4px 0; color: var(--text-secondary); font-size: 13px; }
    .artifact-list li::before { content: "\1F4C4 "; }

    /* Visual QA Specific */
    .vqa-iteration { background: var(--bg-card); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid var(--border); }
    .vqa-iteration.improved { border-left-color: var(--success); }
    .vqa-iteration.degraded { border-left-color: var(--error); }
    .vqa-iteration .iter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .vqa-iteration .iter-header h4 { color: var(--accent); font-size: 14px; }
    .vqa-mismatch { font-size: 24px; font-weight: bold; }
    .vqa-mismatch.high { color: var(--error); }
    .vqa-mismatch.medium { color: var(--warning); }
    .vqa-mismatch.low { color: var(--success); }
    .vqa-improvement { font-size: 13px; padding: 2px 8px; border-radius: 4px; }
    .vqa-improvement.positive { background: rgba(0,230,118,0.15); color: var(--success); }
    .vqa-improvement.negative { background: rgba(255,82,82,0.15); color: var(--error); }
    .vqa-fixes { margin: 8px 0; }
    .vqa-fix { padding: 6px 12px; margin: 4px 0; background: var(--bg-secondary); border-radius: 4px; font-size: 13px; display: flex; gap: 8px; align-items: center; }
    .vqa-fix .severity { font-size: 11px; padding: 1px 6px; border-radius: 4px; font-weight: bold; }
    .vqa-fix .severity.CRITICAL { background: var(--error); color: #fff; }
    .vqa-fix .severity.MAJOR { background: var(--warning); color: #000; }
    .vqa-fix .severity.MINOR { background: var(--border); color: var(--text-secondary); }
    .vqa-progress-bar { background: var(--bg-primary); border-radius: 4px; height: 8px; margin: 8px 0; overflow: hidden; }
    .vqa-progress-bar .fill { height: 100%; border-radius: 4px; transition: width 0.5s; }
    .vqa-progress-bar .fill.high { background: var(--error); }
    .vqa-progress-bar .fill.medium { background: var(--warning); }
    .vqa-progress-bar .fill.low { background: var(--success); }
    .fidelity-badge { font-size: 14px; padding: 4px 16px; border-radius: 8px; font-weight: bold; }
    .fidelity-badge.HIGH { background: var(--success); color: #000; }
    .fidelity-badge.MEDIUM { background: var(--warning); color: #000; }
    .fidelity-badge.LOW { background: var(--error); color: #fff; }

    /* Discrepancy summary */
    .disc-summary { display: flex; gap: 16px; margin: 12px 0; }
    .disc-count { text-align: center; }
    .disc-count .num { font-size: 28px; font-weight: bold; }
    .disc-count .lbl { font-size: 11px; color: var(--text-secondary); }
    .disc-count.critical .num { color: var(--error); }
    .disc-count.major .num { color: var(--warning); }
    .disc-count.minor .num { color: var(--text-secondary); }

    /* Completed indicator */
    .pipeline-complete { background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary)); border: 2px solid var(--success); border-radius: 12px; padding: 24px; margin: 20px 0; text-align: center; }
    .pipeline-complete h2 { color: var(--success); margin-bottom: 8px; }
  </style>
</head>
<body>
  <nav class="sidebar" id="sidebar">
    <h2>GIX Pipeline</h2>
    <a href="#phase-0" class="complete">Phase 0: Init</a>
    <a href="#phase-1" id="nav-1" class="pending">Phase 1: PRD Ingestion</a>
    <a href="#phase-2" id="nav-2" class="pending">Phase 2: Codebase Scout</a>
    <a href="#phase-3" id="nav-3" class="pending">Phase 3: HLD</a>
    <a href="#phase-4" id="nav-4" class="pending">Phase 4: Backend Handoff</a>
    <a href="#phase-5" id="nav-5" class="pending">Phase 5: LLD</a>
    <a href="#phase-6" id="nav-6" class="pending">Phase 6: Test Cases</a>
    <a href="#phase-7" id="nav-7" class="pending">Phase 7: Comprehension</a>
    <a href="#phase-8" id="nav-8" class="pending">Phase 8: Planning (3-Pass)</a>
    <a href="#phase-9" id="nav-9" class="pending">Phase 9: Code Gen (3-Pass)</a>
    <a href="#phase-10" id="nav-10" class="pending">Phase 10: Build + Runtime</a>
    <a href="#phase-11" id="nav-11" class="pending">Phase 11: Visual QA (MANDATORY)</a>
    <a href="#phase-12" id="nav-12" class="pending">Phase 12: Tests</a>
    <a href="#phase-13" id="nav-13" class="pending">Phase 13: Evaluation</a>
    <a href="#phase-14" id="nav-14" class="pending">Phase 14: Summary</a>
  </nav>

  <div class="main">
    <div class="header">
      <h1>GIX — TICKET_ID</h1>
      <div class="meta">Feature: FEATURE_NAME | Started: START_DATE</div>
      <div class="auto-refresh-note">Auto-refreshes every 10 seconds</div>
    </div>

    <div class="progress-bar"><div class="fill" id="progress-fill" style="width: 0%">0%</div></div>
    <div class="progress-stats" id="progress-stats">
      <div class="stat-item"><span class="stat-value" id="stat-phases">0</span> <span class="stat-label">/ 14 phases</span></div>
      <div class="stat-item"><span class="stat-value" id="stat-artifacts">0</span> <span class="stat-label">artifacts</span></div>
      <div class="stat-item"><span class="stat-value" id="stat-decisions">0</span> <span class="stat-label">decisions</span></div>
      <div class="stat-item"><span class="stat-value" id="stat-files">0</span> <span class="stat-label">files generated</span></div>
    </div>

    <!-- Phase 0: Init (always complete on creation) -->
    <section class="phase-section" id="phase-0">
      <div class="phase-header">
        <h2>Phase 0: Init</h2>
        <span class="phase-badge complete">Complete</span>
      </div>
      <p class="phase-time">Completed: START_DATE</p>
      <div class="phase-content">
        <p>Pipeline initialized. Workspace created at WORKSPACE_PATH.</p>
      </div>
    </section>

    <!-- Phase 1: PRD Ingestion -->
    <section class="phase-section" id="phase-1">
      <div class="phase-header">
        <h2>Phase 1: PRD Ingestion</h2>
        <span class="phase-badge pending" id="badge-1">Pending</span>
      </div>
      <div class="phase-content" id="content-1">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 2: Codebase Scout -->
    <section class="phase-section" id="phase-2">
      <div class="phase-header">
        <h2>Phase 2: Codebase Scout</h2>
        <span class="phase-badge pending" id="badge-2">Pending</span>
      </div>
      <div class="phase-content" id="content-2">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 3: HLD -->
    <section class="phase-section" id="phase-3">
      <div class="phase-header">
        <h2>Phase 3: HLD Generation</h2>
        <span class="phase-badge pending" id="badge-3">Pending</span>
      </div>
      <div class="phase-content" id="content-3">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 4: Backend Handoff -->
    <section class="phase-section" id="phase-4">
      <div class="phase-header">
        <h2>Phase 4: Backend Handoff</h2>
        <span class="phase-badge pending" id="badge-4">Pending</span>
      </div>
      <div class="phase-content" id="content-4">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 5: LLD -->
    <section class="phase-section" id="phase-5">
      <div class="phase-header">
        <h2>Phase 5: LLD Generation</h2>
        <span class="phase-badge pending" id="badge-5">Pending</span>
      </div>
      <div class="phase-content" id="content-5">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 6: Test Cases -->
    <section class="phase-section" id="phase-6">
      <div class="phase-header">
        <h2>Phase 6: Test Case Generation</h2>
        <span class="phase-badge pending" id="badge-6">Pending</span>
      </div>
      <div class="phase-content" id="content-6">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 7: Dev Context -->
    <section class="phase-section" id="phase-7">
      <div class="phase-header">
        <h2>Phase 7: Codebase Comprehension</h2>
        <span class="phase-badge pending" id="badge-7">Pending</span>
      </div>
      <div class="phase-content" id="content-7">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 8: Comprehension -->
    <section class="phase-section" id="phase-8">
      <div class="phase-header">
        <h2>Phase 8: Planning (3-Pass)</h2>
        <span class="phase-badge pending" id="badge-8">Pending</span>
      </div>
      <div class="phase-content" id="content-8">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 9: Planning -->
    <section class="phase-section" id="phase-9">
      <div class="phase-header">
        <h2>Phase 9: Code Generation (3-Pass)</h2>
        <span class="phase-badge pending" id="badge-9">Pending</span>
      </div>
      <div class="phase-content" id="content-9">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 10: Code Generation -->
    <section class="phase-section" id="phase-10">
      <div class="phase-header">
        <h2>Phase 10: Build Verification + Runtime Check</h2>
        <span class="phase-badge pending" id="badge-10">Pending</span>
      </div>
      <div class="phase-content" id="content-10">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 11: Build Verification -->
    <section class="phase-section" id="phase-11">
      <div class="phase-header">
        <h2>Phase 11: Visual QA + Runtime Fix (MANDATORY)</h2>
        <span class="phase-badge pending" id="badge-11">Pending</span>
      </div>
      <div class="phase-content" id="content-11">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 12: Visual QA (detailed iteration tracker) -->
    <section class="phase-section" id="phase-12">
      <div class="phase-header">
        <h2>Phase 12: Test Writing</h2>
        <span class="phase-badge pending" id="badge-12">Pending</span>
      </div>
      <div class="phase-content" id="content-12">
        <p class="phase-time">Waiting...</p>
        <!-- VISUAL QA ITERATION TRACKER — updated by orchestrator after visual-qa agent completes -->
        <!-- The orchestrator reads visual_qa_report.json and populates this section with iteration-by-iteration data -->
      </div>
    </section>

    <!-- Phase 13: Test Writing -->
    <section class="phase-section" id="phase-13">
      <div class="phase-header">
        <h2>Phase 13: Test Evaluation</h2>
        <span class="phase-badge pending" id="badge-13">Pending</span>
      </div>
      <div class="phase-content" id="content-13">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>

    <!-- Phase 14: Test Evaluation -->
    <section class="phase-section" id="phase-14">
      <div class="phase-header">
        <h2>Phase 14: Final Summary + Blueprint</h2>
        <span class="phase-badge pending" id="badge-14">Pending</span>
      </div>
      <div class="phase-content" id="content-14">
        <p class="phase-time">Waiting...</p>
      </div>
    </section>
  </div>

  <script>mermaid.initialize({ startOnLoad: true, theme: 'dark' });</script>
</body>
</html>
```

## Update Protocol

After EVERY phase completes, the `/gix` orchestrator MUST (if `dashboard_enabled: true`):

1. Read the current `live-dashboard.html`
2. **Update progress bar**: set `style="width: <completed_phases / 15 * 100>%"` on `#progress-fill`, update text
3. **Update sidebar**: set completed phase link class to `complete`, next phase to `active`, remove `active` from previous
4. **Update stats**: update `#stat-phases`, `#stat-artifacts`, `#stat-decisions`, `#stat-files` values
5. **Update phase badge**: change `#badge-N` class from `pending` to `complete` (or `skipped`/`failed`), update text
6. **Replace phase content**: replace `#content-N` innerHTML with phase-specific content (see below)
7. Write the updated HTML back to `live-dashboard.html`

The `<meta http-equiv="refresh" content="10">` tag in the `<head>` causes the browser to auto-reload every 10 seconds, picking up changes written by the orchestrator.

## Phase-Specific Content Templates

### Phase 1 (PRD Ingestion)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value">JIRA_STATUS</div><div class="label">Jira</div></div>
  <div class="key-number"><div class="value">PRD_STATUS</div><div class="label">PRD</div></div>
  <div class="key-number"><div class="value">TRANSCRIPT_STATUS</div><div class="label">Transcript</div></div>
  <div class="key-number"><div class="value">FIGMA_STATUS</div><div class="label">Figma</div></div>
</div>
```

### Phase 2 (Codebase Scout)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value">N</div><div class="label">Organisms Found</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Endpoints</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Redux Slices</div></div>
</div>
```

### Phase 3 (HLD)
```html
<p class="phase-time">Completed: TIMESTAMP | <a href="CONFLUENCE_URL" style="color:var(--accent)">View on Confluence</a></p>
<div class="key-numbers">
  <div class="key-number"><div class="value">FEASIBILITY</div><div class="label">Feasibility</div></div>
  <div class="key-number"><div class="value">N hrs</div><div class="label">Bandwidth</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Components</div></div>
</div>
```

### Phase 9 (Planning)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value">N</div><div class="label">Files Planned</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Risk Items</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Uncertain Items</div></div>
</div>
```

### Phase 10 (Code Generation)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value">N</div><div class="label">Files Created</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Files Modified</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Guardrail Warnings</div></div>
</div>
```

### Phase 11 (Build Verification)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value">PASS/FAIL</div><div class="label">Build Status</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Attempts</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Errors Fixed</div></div>
</div>
```

### Phase 12 (Visual QA) — Iteration-by-Iteration Tracker

This is the most detailed phase section. The orchestrator reads `visual_qa_report.json` and generates this content:

```html
<p class="phase-time">Completed: TIMESTAMP | Mode: COMPARISON_MODE</p>

<!-- Fidelity + Discrepancy Summary -->
<div style="display:flex; align-items:center; gap:20px; margin:16px 0;">
  <span class="fidelity-badge FIDELITY_LEVEL">FIDELITY_LEVEL Fidelity</span>
  <div class="disc-summary">
    <div class="disc-count critical"><div class="num">N</div><div class="lbl">Critical</div></div>
    <div class="disc-count major"><div class="num">N</div><div class="lbl">Major</div></div>
    <div class="disc-count minor"><div class="num">N</div><div class="lbl">Minor</div></div>
  </div>
</div>

<!-- Mismatch Progress: shows improvement across iterations -->
<h4 style="color:var(--accent); margin:16px 0 8px;">Pixel Mismatch Across Iterations</h4>
<table class="data-table">
  <thead>
    <tr><th>Iteration</th><th>Mismatch %</th><th>Improvement</th><th>Fixes Applied</th><th>Remaining</th></tr>
  </thead>
  <tbody>
    <!-- One row per iteration — example: -->
    <tr>
      <td>1</td>
      <td><span class="vqa-mismatch high">12.5%</span></td>
      <td>-</td>
      <td>3 fixes</td>
      <td>4 issues</td>
    </tr>
    <tr>
      <td>2</td>
      <td><span class="vqa-mismatch medium">5.1%</span></td>
      <td><span class="vqa-improvement positive">-7.4%</span></td>
      <td>2 fixes</td>
      <td>1 issue</td>
    </tr>
    <tr>
      <td>3</td>
      <td><span class="vqa-mismatch low">2.3%</span></td>
      <td><span class="vqa-improvement positive">-2.8%</span></td>
      <td>1 fix</td>
      <td>0 issues</td>
    </tr>
  </tbody>
</table>

<!-- Iteration Details (expandable) -->
<!-- Repeat this block for each iteration: -->
<div class="vqa-iteration improved">
  <div class="iter-header">
    <h4>Iteration N</h4>
    <span class="vqa-mismatch LEVEL">N%</span>
  </div>
  <div class="vqa-progress-bar"><div class="fill LEVEL" style="width: N%"></div></div>
  <div class="vqa-fixes">
    <!-- One fix block per fix applied: -->
    <div class="vqa-fix">
      <span class="severity SEVERITY">SEVERITY</span>
      <span>ELEMENT: CHANGE_DESCRIPTION (FILE)</span>
    </div>
  </div>
</div>

<!-- Remaining Discrepancies (after all iterations) -->
<h4 style="color:var(--accent); margin:16px 0 8px;">Remaining Discrepancies</h4>
<table class="data-table">
  <thead>
    <tr><th>Element</th><th>Expected</th><th>Actual</th><th>Severity</th><th>Category</th></tr>
  </thead>
  <tbody>
    <!-- One row per remaining discrepancy -->
  </tbody>
</table>
```

**Mismatch level CSS classes:**
- `high` = mismatch > 10%
- `medium` = mismatch 5-10%
- `low` = mismatch < 5%

**Iteration border color:**
- `improved` (green border) = mismatch decreased from previous iteration
- `degraded` (red border) = mismatch increased

### Phase 13 (Test Writing)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value">N</div><div class="label">Test Files</div></div>
  <div class="key-number"><div class="value">N</div><div class="label">Test Cases</div></div>
</div>
```

### Phase 14 (Test Evaluation)
```html
<p class="phase-time">Completed: TIMESTAMP</p>
<div class="key-numbers">
  <div class="key-number"><div class="value" style="color:var(--success)">N</div><div class="label">Passed</div></div>
  <div class="key-number"><div class="value" style="color:var(--error)">N</div><div class="label">Failed</div></div>
  <div class="key-number"><div class="value">N%</div><div class="label">Line Coverage</div></div>
  <div class="key-number"><div class="value">N%</div><div class="label">Branch Coverage</div></div>
</div>
```

### Pipeline Complete Banner

When all phases are done (Phase 14 / Final Summary), prepend this after the progress stats:

```html
<div class="pipeline-complete">
  <h2>Pipeline Complete</h2>
  <p>All N phases finished. Blueprint generated.</p>
  <p style="margin-top:8px;"><a href="TICKET_ID-blueprint.html" style="color:var(--accent);">View Full Blueprint</a></p>
</div>
```

And remove the `<meta http-equiv="refresh">` tag (no more auto-refresh needed).
