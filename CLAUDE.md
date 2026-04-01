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
