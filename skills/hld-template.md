---
description: HLD document structure and template for Confluence pages
triggers:
  - "create HLD"
  - "high level design"
  - "HLD template"
  - "HLD structure"
  - "generate HLD"
---

# HLD Template — garuda-ui

Use this template when generating High Level Design documents for Confluence.

## Confluence Page Structure

The HLD Confluence page must follow this exact structure:

---

### 1. Feature Overview
- **Feature Name**: [Name from Jira epic]
- **Jira Ticket**: [CAP-XXXXX](link)
- **Author**: AI-generated, reviewed by [Tech Lead Name]
- **Date**: [ISO date]
- **Version**: [v1, v2, etc.]

### 2. Feasibility Assessment
| Aspect | Verdict |
|--------|---------|
| Overall | Feasible / Feasible with Caveats / Not Feasible |
| Frontend | [assessment] |
| Backend Dependency | [assessment] |
| Design Completeness | [assessment] |

**Caveats** (if any):
- [caveat 1]
- [caveat 2]

**Blockers** (if any):
- [blocker 1]

### 3. Bandwidth Estimation
| Task | Person-Days | Parallelizable? | Assigned To |
|------|------------|-----------------|-------------|
| [task name] | [days] | Yes/No | [TBD] |
| **Total** | **[sum]** | | |

### 4. Epic Breakdown
Break the epic into sprint-sized tasks that can be worked on in parallel:

| # | Task | Description | Dependencies | Can Parallel With | Est. Days |
|---|------|-------------|-------------|-------------------|-----------|
| 1 | [task] | [desc] | None | 2, 3 | [days] |
| 2 | [task] | [desc] | 1 | 3 | [days] |

### 5. Technical Impact

#### 5.1 New Components
| Type | Name | Purpose |
|------|------|---------|
| Organism | [name] | [purpose] |
| Page | [name] | [purpose] |
| Molecule | [name] | [purpose] |

#### 5.2 Modified Components
| Component | Current Purpose | What Changes |
|-----------|----------------|-------------|
| [name] | [current] | [change] |

#### 5.3 New API Integrations
| API | Method | Purpose | Backend Status |
|-----|--------|---------|---------------|
| [endpoint] | POST | [purpose] | Ready / In Progress / Not Started |

#### 5.4 New Routes
| Route | Page | Description |
|-------|------|-------------|
| `/loyalty/ui/v3/[path]` | [PageName] | [desc] |

#### 5.5 State Management Changes
- New Redux slices: [list]
- Modified slices: [list]

### 6. Component Architecture (High Level)
```
PageName
  ├── OrganismA (new)
  │   ├── MoleculeX (existing cap-ui)
  │   └── MoleculeY (new)
  └── OrganismB (existing, modified)
```

### 7. API Dependencies
| API | Owner | Status | Signature Available? |
|-----|-------|--------|---------------------|
| [endpoint] | Backend Team | [status] | Yes/No |

### 8. Open Questions
- [ ] [question 1]
- [ ] [question 2]

### 9. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| [risk] | High/Medium/Low | [mitigation] |

---

## Rules for HLD Generation

1. **Keep it high level** — no code, no method signatures, no state shapes. Those belong in LLD.
2. **Always assess feasibility** — check if similar features exist in the codebase that can be reused.
3. **Bandwidth must be realistic** — base estimates on complexity, not optimism. Add 20% buffer for unknowns.
4. **Epic breakdown must enable parallelism** — identify which tasks can be worked on simultaneously.
5. **API dependencies must be explicit** — if backend API isn't ready, flag it as a blocker.
6. **Use codebase context** — reference existing organisms, pages, and endpoints from the codebase scan.
7. **Component names follow garuda convention** — PascalCase for components, kebab-case for routes.
