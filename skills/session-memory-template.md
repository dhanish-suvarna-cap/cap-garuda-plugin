# Session Memory Template

> This file defines the structure of `session_memory.md` — the shared context document updated incrementally by every phase in the pipeline. Each phase reads it at start and writes updates at end.
>
> **Location**: `.claude/workspace/<jira-id>/session_memory.md`

## Template

```markdown
# Session Memory: <jira-ticket-id>

> Updated incrementally after every phase. Each entry includes the phase that wrote it.

## Domain Terminology

_Agreed terms used consistently in all code, names, and docs._

| Term | Definition | Source |
|------|-----------|--------|
<!-- Updated by: PRD Ingestion, HLD, LLD -->

## Codebase Behaviour

_What exists and how it's set up. Evidence-based observations._

<!-- Updated by: Codebase Scout, Codebase Comprehension -->

## Component Decisions

_Which Cap UI Library components were chosen and why._

| Figma Element | Cap Component | Why | Phase |
|--------------|---------------|-----|-------|
<!-- Updated by: Dev Context Loader, LLD, Planning -->

## Figma Mapping

_Figma elements mapped to Cap components during context loading._

<!-- Updated by: Dev Context Loader -->

## Key Decisions

_Technical decisions with rationale. Each entry tagged with phase._

| Decision | Rationale | Alternatives Considered | Phase |
|----------|-----------|------------------------|-------|
<!-- Updated by: HLD, LLD, Planning, Code Gen -->

## Constraints

_Business and technical constraints. All phases must respect these._

<!-- Updated by: PRD Ingestion, HLD, LLD -->

## Risks & Concerns

_Flagged risks, tracked to resolution._

| Risk | Severity | Status | Resolution | Phase |
|------|----------|--------|-----------|-------|
<!-- Updated by: All phases -->

## Open Questions

_Unresolved items: [ ] open, [x] resolved._

<!-- Updated by: Any phase -->

## Rework Log

_Tracks rework cycles triggered by downstream phases._

| Target Phase | Triggered By | Reason | Round | Resolution | Timestamp |
|-------------|-------------|--------|-------|-----------|-----------|
<!-- Updated by: Orchestrator -->
```

## Update Rules

1. **Read at start**: Every agent MUST read session_memory.md before starting work.
2. **Write at end**: Every agent MUST append its updates before writing its output artifact.
3. **Incremental updates**: Add new entries — never remove or overwrite existing entries.
4. **Tag with phase**: Every entry must indicate which phase wrote it.
5. **Evidence-based**: Codebase Behaviour entries must cite file paths and line numbers.
6. **Domain consistency**: Use terms from Domain Terminology in all code and variable names.
