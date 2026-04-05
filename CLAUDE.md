# cap-garuda-plugin — Claude Code Conventions

## 1. Project Identity

- **Plugin name:** cap-garuda-plugin
- **Target app:** garuda-ui (Capillary Loyalty Frontend)
- **Stack:** React 18, Redux + Redux-Saga, ImmutableJS, Ant Design via `@capillarytech/cap-ui-library`
- **URL prefix:** `/loyalty/ui/v3`
- **Dev port:** 8000

## 2. Two Independent Pipelines

### Pre-Dev Pipeline (`/pre-dev`)
PRD + Transcript + Figma → HLD (Confluence) → LLD (Confluence) + Test Cases

### Dev Pipeline (`/dev-execute`)
LLD + Figma + Context → Plan → Code → Visual QA → Tests

Pipelines are **fully independent** — separate workspaces, no shared state.

## 3. Workspace Layout

```
.claude/pre-dev-workspace/<jira-id>/    # Pre-Dev (per ticket)
.claude/dev-workspace/<session-id>/      # Dev (per session)
```

Both are gitignored. Safe to delete between runs.

## 4. Agent Communication

Agents communicate via **JSON files in the workspace directory**. Each agent:
1. Reads its input JSON files
2. Does its work
3. Writes its output JSON file
4. The orchestrator command reads the output and spawns the next agent

## 5. Context Overflow Recovery

- Code-generator writes files incrementally and updates generation_report.json after each file
- Orchestrators detect partial completion and resume from where the agent left off
- Transcripts are chunked (5k words) and summarized (3k words max)
- Codebase-scout scans names only, never reads full files

## 6. Atomic Design Rules

| Layer | Path | Redux? |
|-------|------|--------|
| Atoms | `app/components/atoms/` | Never |
| Molecules | `app/components/molecules/` | Never |
| Organisms | `app/components/organisms/` | Yes — own slice |
| Pages | `app/components/pages/` | Minimal — route-level only |
| Templates | `app/components/templates/` | Never |

## 7. Organism 10-File Anatomy

Every organism: constants.js, actions.js, reducer.js, saga.js, selectors.js, styles.js, messages.js, Component.js, index.js, Loadable.js

## 8. Key Patterns

- Constants: `garuda/<OrganismName>/VERB_NOUN_REQUEST|SUCCESS|FAILURE`
- Reducer: ImmutableJS only (fromJS, set, get)
- Saga: Always catch with `notifyHandledException(error)`
- Imports: Cap* components from individual file paths only
- Tests: Always from `app/utils/test-utils.js`, never `@testing-library/react`
- Auth: Never manually add — injected by `requestConstructor.js`

## 9. Shared Rules & Config

- **`skills/shared-rules.md`** — Single source of truth for all non-negotiable coding patterns (organism anatomy, compose chain, action types, Cap* imports, ImmutableJS, bugsnag, test imports, coverage targets, etc.). Agents reference this instead of embedding rules inline.
- **`skills/config.md`** — All configurable values (ports, URLs, Confluence space, coverage thresholds, retry limits, chunk sizes, etc.). Never hardcode these in agent or command files.

## 10. Guardrails

Every agent has an **Exit Checklist** — a set of conditions it MUST verify before writing its final output. If any check fails, the agent fixes the issue before proceeding. Unresolvable issues are logged to a `guardrail_warnings` array in the output JSON.

Every command has a **Gate Check** after each agent completes — the orchestrator validates the output before spawning the next agent. If validation fails, the orchestrator reports the issue and offers to re-run the failed phase.

## 11. Session Journal & Persistent Memory

Each pipeline writes a **session journal** (`session_journal.md` in the workspace) that records what happened in each phase. This enables:

- **Resume after quota/disconnect**: A new Claude session reads the journal to restore full context
- **Resume after terminal close**: All state is on disk (JSON + journal), nothing in-memory
- **Audit trail**: Human-readable log of every decision and artifact

State files (`pre_dev_state.json`, `dev_state.json`) track:
- Phase status, summaries, guardrail results
- `recovery.last_successful_phase` and `recovery.can_resume_from`
- `resume_instructions` — exact text for what to do next

To resume: just re-run the command (e.g., `/pre-dev CAP-12345`) — it detects existing state and picks up where it stopped.
