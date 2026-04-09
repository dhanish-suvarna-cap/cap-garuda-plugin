# Blueprint Template

> Generated at Phase 15 (Final Summary) of the GIX pipeline. This is a read-only stakeholder document — a comprehensive HTML summary of the entire pipeline run.
>
> **Output**: `.claude/workspace/<jira-id>/<ticket>-blueprint.html`

## When to Generate

During Phase 15 (Final Summary), after all phases complete, generate the blueprint HTML. This is the culminating artifact — shareable via browser without Confluence or repo access.

## Blueprint HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GIX Blueprint — TICKET_ID</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <style>
    :root {
      --bg: #1a1a2e; --bg2: #16213e; --card: #0f3460;
      --text: #e0e0e0; --muted: #a0a0a0; --accent: #00d4ff;
      --ok: #00e676; --warn: #ffc107; --err: #ff5252; --border: #2a2a4a;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:var(--bg); color:var(--text); }
    .sidebar { width:240px; background:var(--bg2); border-right:1px solid var(--border); position:fixed; height:100vh; overflow-y:auto; padding:20px 0; }
    .sidebar h2 { padding:0 16px; color:var(--accent); font-size:15px; margin-bottom:16px; }
    .sidebar a { display:block; padding:8px 16px; color:var(--muted); text-decoration:none; font-size:13px; }
    .sidebar a:hover { background:var(--card); color:var(--text); }
    .main { margin-left:240px; padding:32px; max-width:1000px; }
    h1 { color:var(--accent); margin-bottom:8px; }
    h2 { color:var(--accent); margin:32px 0 12px; border-bottom:1px solid var(--border); padding-bottom:8px; }
    .meta { color:var(--muted); font-size:14px; margin-bottom:24px; }
    .stats { display:flex; gap:16px; margin:24px 0; flex-wrap:wrap; }
    .stat { background:var(--card); padding:16px; border-radius:8px; text-align:center; min-width:120px; }
    .stat .val { font-size:28px; font-weight:bold; color:var(--accent); }
    .stat .lbl { font-size:12px; color:var(--muted); margin-top:4px; }
    table { width:100%; border-collapse:collapse; margin:12px 0; }
    th { background:var(--card); padding:10px; text-align:left; font-size:13px; color:var(--accent); }
    td { padding:10px; border-bottom:1px solid var(--border); font-size:13px; }
    .badge { font-size:11px; padding:2px 8px; border-radius:10px; }
    .badge.pass { background:var(--ok); color:#000; }
    .badge.fail { background:var(--err); color:#fff; }
    .badge.warn { background:var(--warn); color:#000; }
    .mermaid { background:var(--card); padding:16px; border-radius:8px; margin:12px 0; }
    .decision { background:var(--bg2); border-left:3px solid var(--accent); padding:12px 16px; margin:8px 0; border-radius:0 8px 8px 0; }
    .decision .who { color:var(--accent); font-size:12px; }
  </style>
</head>
<body>
  <nav class="sidebar">
    <h2>TICKET_ID Blueprint</h2>
    <a href="#overview">Overview</a>
    <a href="#stats">Pipeline Stats</a>
    <a href="#decisions">Key Decisions</a>
    <a href="#hld">HLD Summary</a>
    <a href="#lld">LLD Summary</a>
    <a href="#components">Component Inventory</a>
    <a href="#code">Code Generation</a>
    <a href="#build">Build Verification</a>
    <a href="#visual">Visual QA</a>
    <a href="#tests">Test Results</a>
    <a href="#verification">ProductEx Verification</a>
    <a href="#guardrails">Guardrail Compliance</a>
    <a href="#crossrepo">Cross-Repo Trace</a>
    <a href="#timeline">Timeline</a>
  </nav>
  <div class="main">
    <h1>GIX Blueprint</h1>
    <div class="meta">TICKET_ID — FEATURE_NAME | Generated: TIMESTAMP</div>

    <section id="overview">
      <h2>Overview</h2>
      <p>FEATURE_DESCRIPTION</p>
    </section>

    <section id="stats">
      <h2>Pipeline Stats</h2>
      <div class="stats">
        <div class="stat"><div class="val">N</div><div class="lbl">Phases</div></div>
        <div class="stat"><div class="val">N</div><div class="lbl">Artifacts</div></div>
        <div class="stat"><div class="val">N</div><div class="lbl">Files Generated</div></div>
        <div class="stat"><div class="val">N</div><div class="lbl">Decisions Made</div></div>
        <div class="stat"><div class="val">N%</div><div class="lbl">Test Coverage</div></div>
        <div class="stat"><div class="val">FIDELITY</div><div class="lbl">Visual QA</div></div>
      </div>
    </section>

    <section id="decisions">
      <h2>Key Decisions</h2>
      <!-- Pulled from approach_log.md -->
    </section>

    <section id="hld">
      <h2>HLD Summary</h2>
      <!-- Feasibility, bandwidth, components, Mermaid diagrams -->
    </section>

    <section id="lld">
      <h2>LLD Summary</h2>
      <!-- Organisms, API contracts, state design, Mermaid diagrams -->
    </section>

    <section id="components">
      <h2>Component Inventory</h2>
      <!-- Cap UI components used, Figma mapping results -->
    </section>

    <section id="code">
      <h2>Code Generation</h2>
      <!-- Files created/modified, deviations -->
    </section>

    <section id="build">
      <h2>Build Verification</h2>
      <!-- Pass/fail, attempts, fixes applied -->
    </section>

    <section id="visual">
      <h2>Visual QA</h2>
      <!-- Fidelity, iterations, remaining discrepancies -->
    </section>

    <section id="tests">
      <h2>Test Results</h2>
      <!-- Passed/failed/skipped, coverage -->
    </section>

    <section id="verification">
      <h2>ProductEx Verification</h2>
      <!-- Fulfilled/missing/conflicts per phase -->
    </section>

    <section id="guardrails">
      <h2>Guardrail Compliance</h2>
      <!-- CRITICAL/HIGH violations found and resolved -->
    </section>

    <section id="crossrepo">
      <h2>Cross-Repo Trace</h2>
      <!-- Existing implementations found, migration recommendations -->
    </section>

    <section id="timeline">
      <h2>Timeline</h2>
      <!-- Phase-by-phase with timestamps from session_journal.md -->
    </section>
  </div>
  <script>mermaid.initialize({startOnLoad:true,theme:'dark'});</script>
</body>
</html>
```

## Content Population

The orchestrator reads these workspace files to populate the blueprint:

| Section | Source File |
|---------|-----------|
| Overview | requirements_context.md |
| Stats | pipeline_state.json (count phases, artifacts, files) |
| Decisions | approach_log.md |
| HLD | hld_artifact.json |
| LLD | lld_artifact.json |
| Components | dev_context.json (component_mapping) |
| Code | generation_report.json |
| Build | build_report.json |
| Visual QA | visual_qa_report.json |
| Tests | test_report.json |
| Verification | verification_reports/*.json |
| Guardrails | verification_reports/verify-code.json |
| Cross-Repo | cross_repo_trace.json |
| Timeline | session_journal.md |
