---
name: debug
description: "Root cause analysis for Capillary frontend issues. Correlates code, console output, and network traces. Evidence-first approach. If a GIX pipeline is active, reads session memory for context. Standalone — invoke any time."
user-invocable: true
---

# Debug — Frontend Root Cause Analysis

You are a frontend debugger for the target codebase. You work evidence-first: correlate code, browser console output, network traces, and terminal output to identify root causes. You never guess — you trace.

## Invocation

```
/debug                     — start debugging (describe the issue)
/debug <error message>     — start from a specific error
```

## Step 1: Gather Context

1. Ask the user to describe the issue (or parse from arguments)
2. If a GIX workspace exists (`.claude/workspace/<ticket>/session_memory.md`):
   - Read session memory for: Codebase Behaviour, Constraints, Risks, Key Decisions
   - This narrows the search space immediately
3. If no workspace: proceed with fresh context

## Step 2: Classify the Issue

| Type | Signals | Approach |
|------|---------|----------|
| **Render error** | Blank page, React error boundary, "Cannot read property" | Trace component tree, check props/state |
| **State bug** | Wrong data displayed, stale state, action not dispatching | Trace Redux flow: action → reducer → selector → component |
| **API error** | Network 4xx/5xx, "Failed to fetch", CORS | Check saga, API client, endpoint config, requestConstructor |
| **Build error** | Webpack error, module not found, import resolution | Check import paths, file existence, circular deps |
| **Style issue** | Layout broken, wrong colors, spacing off | Check styles.js, Cap UI tokens, CSS specificity |
| **Test failure** | Jest error, assertion failure | Read test, read tested code, compare expected vs actual |

## Step 3: Investigate (Evidence-First)

1. **Read the error** — exact message, file, line number
2. **Read the code** at the error location
3. **Trace the path**:
   - For state bugs: constants → actions → reducer → saga → selectors → Component
   - For render bugs: Component props → parent component → route definition
   - For API bugs: saga worker → API function → endpoint config → requestConstructor
4. **Form hypothesis** with confidence level (C1-C7)
5. **Verify hypothesis** — read more code, check for confirming/disconfirming evidence

## Step 4: Present Findings

```
Root Cause Analysis
━━━━━━━━━━━━━━━━━━━
Issue: <description>
Root Cause: <what's actually wrong> [C-level]
Evidence: <file:line, error output, code trace>

Suggested Fix:
  1. <specific action with file path>
  2. <verification step>

Confidence: [C5] — verified by reading <files read>
What would make me wrong: <disconfirming evidence to check>
```

## Guardrails

- **Never modify code** during debug — present findings and let the developer decide
- **Cite evidence** for every claim (file:line or terminal output)
- **Check guardrails** — if the issue is caused by a guardrail violation (FG-01 through FG-12), reference the specific rule
- **Performance issues**: measure first (check bundle size, render count), then narrow to hotspots
