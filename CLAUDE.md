# cap-garuda-plugin — Claude Code Conventions

## 1. Project Identity

- **Plugin name:** cap-garuda-plugin
- **Target app:** Capillary Loyalty Frontend
- **Stack:** React 18, Redux + Redux-Saga, ImmutableJS, Ant Design via `@capillarytech/cap-ui-library`
- **URL prefix:** `/loyalty/ui/v3`
- **Dev port:** 8000

## 2. GIX Pipeline (`/gix`)

Single unified pipeline with 15 phases and 5 modes:

| Mode | What It Runs |
|------|-------------|
| Full Pipeline | All 15 phases: PRD + Design (parallel) → Scout → HLD → LLD → Tests → Comprehension → Plan → Code → Build → Visual QA → Tests |
| Pre-Dev Only | Phases 1-6: PRD + Design → Codebase Scout → HLD → LLD → Test Cases |
| Dev Only | Phases 7-15: Comprehension → Plan → Code → Build → Visual QA → Write Tests → Evaluate |
| Resume | Continues from last completed phase |
| Status | Shows current pipeline progress |

## 3. Workspace Layout

```
.claude/workspace/<jira-id>/    # Unified workspace (per ticket)
```

Gitignored. Safe to delete between runs.

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

## 7. Organism 10-File Anatomy & Key Patterns

See `skills/shared-rules.md` for the complete 10-file organism anatomy (Section 1), compose chain (Section 3), action types (Section 2), ImmutableJS patterns (Section 5), saga error handling (Section 6), Cap* imports (Section 4), test imports (Section 8), and all other non-negotiable coding patterns.

## 8. Shared Rules & Config

- **`skills/shared-rules.md`** — Single source of truth for all non-negotiable coding patterns and guardrail detection hints (FG-01 through FG-14). Agents reference this instead of embedding rules inline.
- **`skills/config.md`** — All configurable values (ports, URLs, Confluence space, coverage thresholds, retry limits, chunk sizes, etc.). Never hardcode these in agent or command files.

## 9. Guardrails

Every agent has an **Exit Checklist** — a set of conditions it MUST verify before writing its final output. If any check fails, the agent fixes the issue before proceeding. Unresolvable issues are logged to a `guardrail_warnings` array in the output JSON.

Every command has a **Gate Check** after each agent completes — the orchestrator validates the output before spawning the next agent. If validation fails, the orchestrator reports the issue and offers to re-run the failed phase.

## 10. Session Journal & Persistent Memory

The pipeline writes persistence files in the workspace:

- **`requirements_context.md`** — captures the user's original prompt, functional requirements, use cases, and all checkpoint decisions. This ensures Claude understands WHAT is being built across sessions.
- **`session_journal.md`** — records what happened in each phase (execution log).

Together these enable:

- **Resume after quota/disconnect**: A new Claude session reads the journal to restore full context
- **Resume after terminal close**: All state is on disk (JSON + journal), nothing in-memory
- **Audit trail**: Human-readable log of every decision and artifact

On resume, `/gix` reads THREE files:
1. `pipeline_state.json` — WHERE to resume (which phase)
2. `session_journal.md` — WHAT happened (phase-by-phase execution log)
3. `requirements_context.md` — WHY we're doing this (user's requirements + decisions)

`pipeline_state.json` tracks:
- Phase status, summaries, guardrail results
- `recovery.last_successful_phase` and `recovery.can_resume_from`
- `resume_instructions` — exact text for what to do next

To resume: run `/gix` and select mode [2] Resume — it detects existing state and picks up where it stopped.
