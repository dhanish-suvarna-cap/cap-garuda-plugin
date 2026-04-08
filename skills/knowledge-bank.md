# Knowledge Bank

> **Purpose**: Human-populated pre-session context that persists across pipeline runs.
> Add epic-level context, product domain knowledge, team decisions, and constraints
> that aren't captured in Jira tickets or PRDs.
>
> **This file is read by all GIX pipeline phases** at startup, before session memory.
> It provides stable, long-lived context that doesn't change between pipeline runs.

## How to Use

Before starting a pipeline run, add relevant context below. The pipeline reads this
file during Phase 0 (workspace init) and makes it available to all agents via session memory.

---

## Product Context

<!-- Add product-level context that applies across features -->
<!-- Example:
- Loyalty platform serves 500+ enterprise brands
- The target repo is the v3 frontend, replacing cap-loyalty-ui gradually
- Feature flags controlled via Capillary dashboard, not code-level
-->

## Domain Terminology

<!-- Add domain terms that might not be in Jira tickets -->
<!-- Example:
- "Slab" = tier configuration with min/max points range
- "EMF" = Earn-Management-Framework (points engine)
- "MLP" = Member Loyalty Program
-->

## Team Decisions

<!-- Add architectural or process decisions made outside of pipelines -->
<!-- Example:
- 2026-03: All new features must use organisms (no standalone pages)
- 2026-02: API contracts are defined by backend team first (frontend adapts)
- 2026-01: No new Ant Design direct imports — always use Cap UI wrapper
-->

## Known Constraints

<!-- Add constraints that affect all features -->
<!-- Example:
- Max bundle size increase per feature: 50KB gzipped
- All API calls must go through requestConstructor.js
- No SSR — client-side rendering only
- IE11 support dropped as of 2025
-->

## Cross-Repo Notes

<!-- Add notes about other repos that frontend features often reference -->
<!-- Example:
- cap-loyalty-ui/webapp/app/components/ has legacy organisms to reference
- API endpoint definitions: see backend team's Swagger docs at <URL>
- Design tokens source of truth: cap-ui-library/components/styled/variables.js
-->

## Active Epics

<!-- Add currently active epics for context -->
<!-- Example:
- LOYALTY-456: Tier Benefits Redesign (Q2 2026)
  - New benefits config UI, replacing legacy PointsConfig
  - Backend HLD at Confluence page 12345
  - Figma: fileId:frameId
-->
