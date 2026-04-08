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

## Initial Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    .sidebar a { display: block; padding: 10px 20px; color: var(--text-secondary); text-decoration: none; font-size: 14px; border-left: 3px solid transparent; }
    .sidebar a:hover { background: var(--bg-card); color: var(--text-primary); }
    .sidebar a.complete { color: var(--success); border-left-color: var(--success); }
    .sidebar a.active { color: var(--accent); border-left-color: var(--accent); background: var(--bg-card); }
    .sidebar a.pending { color: var(--text-secondary); }

    /* Main */
    .main { margin-left: 260px; padding: 30px; flex: 1; }
    .header { margin-bottom: 30px; }
    .header h1 { color: var(--accent); margin-bottom: 8px; }
    .header .meta { color: var(--text-secondary); font-size: 14px; }

    /* Progress Bar */
    .progress-bar { background: var(--bg-secondary); border-radius: 8px; height: 24px; margin: 20px 0; overflow: hidden; }
    .progress-bar .fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--success)); border-radius: 8px; transition: width 0.5s; }
    .progress-stats { display: flex; gap: 30px; margin-bottom: 30px; }
    .stat-value { color: var(--accent); font-weight: bold; font-size: 18px; }

    /* Phase Sections */
    .phase-section { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .phase-section h2 { margin-bottom: 12px; }
    .phase-badge { font-size: 12px; padding: 3px 10px; border-radius: 12px; font-weight: normal; }
    .phase-badge.complete { background: var(--success); color: #000; }
    .phase-badge.active { background: var(--accent); color: #000; }
    .phase-badge.pending { background: var(--border); color: var(--text-secondary); }
    .phase-time { color: var(--text-secondary); font-size: 13px; margin-bottom: 12px; }

    /* Key Numbers */
    .key-numbers { display: flex; gap: 20px; margin: 16px 0; }
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
    .artifact-list li::before { content: "📄 "; }
  </style>
</head>
<body>
  <nav class="sidebar">
    <h2>🚀 GIX Pipeline</h2>
    <a href="#phase-0" class="complete">Phase 0: Init</a>
    <a href="#phase-1" class="pending">Phase 1: PRD Ingestion</a>
    <a href="#phase-2" class="pending">Phase 2: Codebase Scout</a>
    <a href="#phase-3" class="pending">Phase 3: HLD</a>
    <a href="#phase-4" class="pending">Phase 4: Backend Handoff</a>
    <a href="#phase-5" class="pending">Phase 5: LLD</a>
    <a href="#phase-6" class="pending">Phase 6: Test Cases</a>
    <a href="#phase-7" class="pending">Phase 7: Dev Context</a>
    <a href="#phase-8" class="pending">Phase 8: Comprehension</a>
    <a href="#phase-9" class="pending">Phase 9: Planning</a>
    <a href="#phase-10" class="pending">Phase 10: Code Gen</a>
    <a href="#phase-11" class="pending">Phase 11: Build Verify</a>
    <a href="#phase-12" class="pending">Phase 12: Visual QA</a>
    <a href="#phase-13" class="pending">Phase 13: Tests</a>
    <a href="#phase-14" class="pending">Phase 14: Evaluation</a>
  </nav>

  <div class="main">
    <div class="header">
      <h1>GIX — TICKET_ID</h1>
      <div class="meta">Feature: FEATURE_NAME | Started: START_DATE</div>
    </div>

    <div class="progress-bar"><div class="fill" style="width: 0%"></div></div>
    <div class="progress-stats">
      <span><span class="stat-value">0</span> / 15 phases</span>
      <span><span class="stat-value">0</span> artifacts</span>
      <span><span class="stat-value">0</span> decisions</span>
      <span><span class="stat-value">0</span> files generated</span>
    </div>

    <section class="phase-section" id="phase-0">
      <h2>Phase 0: Init <span class="phase-badge complete">Complete</span></h2>
      <p class="phase-time">Completed: START_DATE</p>
      <p>Pipeline initialized. Workspace created.</p>
    </section>

    <!-- Phases 1-14: sections pre-created with pending badges -->
    <!-- Updated by orchestrator after each phase completes -->
  </div>

  <script>mermaid.initialize({ startOnLoad: true, theme: 'dark' });</script>
</body>
</html>
```

## Update Protocol

After EVERY phase completes, the `/gix` orchestrator MUST (if `dashboard_enabled: true`):

1. **Update progress bar**: `completed_phases / 15 * 100`%
2. **Update sidebar**: mark completed phase as `complete` (green), next phase as `active`
3. **Update phase section**: replace pending badge with complete badge, add summary + key numbers + diagrams
4. **Update stats bar**: increment artifacts, decisions, files counts

## Phase-Specific Content

| Phase | Required Dashboard Content |
|-------|---------------------------|
| Phase 1 (PRD) | Context sources table (Jira, PRD, Transcript, Figma — loaded/skipped) |
| Phase 2 (Scout) | Codebase scan results (organisms found, endpoints, slices), cross-repo trace results |
| Phase 3 (HLD) | Feasibility verdict, bandwidth hours, component breakdown, Confluence link |
| Phase 5 (LLD) | Organism designs, API contracts table, state design, Confluence link |
| Phase 9 (Plan) | File plan table (10 files with descriptions), risk items, uncertain items |
| Phase 10 (Code) | Files created/modified list, guardrail check results, ProductEx verification |
| Phase 11 (Build) | Build status (PASS/FAIL), attempt count, errors fixed, environment warnings |
| Phase 12 (Visual QA) | Fidelity rating, iteration count, discrepancy chart, before/after |
| Phase 14 (Tests) | Test results (passed/failed/skipped), coverage chart |
