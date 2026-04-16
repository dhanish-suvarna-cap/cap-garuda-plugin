---
description: LLD document structure and template for Confluence pages
triggers:
  - "create LLD"
  - "low level design"
  - "LLD template"
  - "LLD structure"
  - "generate LLD"
  - "tech detailing"
---

# LLD Template — Design Specification (No Code)

> **CRITICAL**: The LLD is a design specification document. It describes WHAT to build, HOW components are structured, and WHICH Cap* components to use — but it NEVER contains actual code implementations. The code-generator agent writes all code.

Use this template when generating Low Level Design documents for Confluence.

## Confluence Page Structure

---

### 1. Overview
- **Feature**: [Feature name from HLD]
- **HLD Reference**: [Confluence link to HLD]
- **Jira Ticket**: [CAP-XXXXX](link)
- **Author**: AI-generated, reviewed by [Developer Name]
- **Date**: [ISO date]
- **Version**: [v1, v2, etc.]
- **Knowledge Sources Used**: context_bundle.json, figma_decomposition.json (if available), prototype_analysis.json (if available)

### 2. Page Layout Diagram (ASCII)

Full-page ASCII wireframe showing all organisms, their Cap* components, nesting, and conditional rendering:

```
┌────────────────────────────────────────────────────────────┐
│ Page: [PageName]                                            │
│ Route: /loyalty/ui/v3/[path]                                │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Organism: [HeaderOrganism]                               ││
│ │ CapRow (justify="space-between", align="middle")         ││
│ │ ├── CapHeading (h3) "Page Title"                         ││
│ │ └── CapButton (primary) "Create New"                     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Organism: [ListOrganism]                                 ││
│ │ ┌── CapRow (filters, gutter=16)                        ─┐││
│ │ │   CapInput.Search    CapSelect (filter)               │││
│ │ └──────────────────────────────────────────────────────┘││
│ │ ┌── CapTable                                           ─┐││
│ │ │   Columns: Name | Value | Status | Actions            │││
│ │ │   Pagination: pageSize=20                             │││
│ │ └──────────────────────────────────────────────────────┘││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌── CapModal (conditional: showModal === true) ───────────┐│
│ │   CapInput (label: "Name")                               ││
│ │   CapSelect (label: "Type")                              ││
│ │   CapRow (footer): CapButton "Cancel" + "Save"           ││
│ └─────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────┘
```

### 3. Component Inventory (Verified Against Figma)

For each organism, a table of every Cap* component with verified props:

| # | Cap* Component | Purpose | Key Props | Design Tokens | Verification Source |
|---|---------------|---------|-----------|--------------|-------------------|
| 1 | CapHeading | Page title | type="h3" | FONT_SIZE_VL, FONT_WEIGHT_MEDIUM | get_design_context node:XXX |
| 2 | CapButton | Create CTA | type="primary" | — | screenshot node:XXX |
| 3 | CapTable | Data list | columns=[...], pagination | — | get_design_context node:XXX |

**Every component MUST have a Verification Source** — no guessed mappings.

### 4. Organism Specifications (Design Only — No Code)

For each organism:

#### 4.1 Identity
- **Name**: OrganismName
- **Path**: `app/components/organisms/OrganismName/`
- **Redux Slice Key**: `organismName`
- **10 Files**: constants.js, actions.js, reducer.js, saga.js, selectors.js, styles.js, messages.js, Component.js, index.js, Loadable.js

#### 4.2 State Design

| State Key | Type | Default | Updated By Action | Description |
|-----------|------|---------|------------------|-------------|
| data | List | [] | FETCH_DATA_SUCCESS | Items from API |
| loading | boolean | false | REQUEST → true, SUCCESS/FAILURE → false | Loading indicator |
| error | any | null | FETCH_DATA_FAILURE | Error from API |

#### 4.3 Action Types

| Action Type | Trigger | Payload Shape | Purpose |
|------------|---------|--------------|---------|
| FETCH_DATA_REQUEST | Component mount | { params } | Start API fetch |
| FETCH_DATA_SUCCESS | API success | { data, count } | Store results |
| FETCH_DATA_FAILURE | API error | { error } | Store error |

#### 4.4 Saga Workers

| Worker | Watch Pattern | API Endpoint | On Success | On Failure |
|--------|-------------|-------------|-----------|-----------|
| fetchDataWorker | takeLatest(REQUEST) | GET /api/path | dispatch SUCCESS | notifyHandledException + dispatch FAILURE |

#### 4.5 Selectors

| Selector | Returns | Calls .toJS()? | Consumed By |
|----------|---------|---------------|------------|
| makeSelectData | data list | Yes | Component — table dataSource |
| makeSelectLoading | boolean | No | Component — CapSpin spinning |

#### 4.6 User Interactions

| User Action | Component | Dispatches | Result |
|------------|-----------|-----------|--------|
| Page loads | mount | FETCH_DATA_REQUEST | Table shows data |
| Clicks row | CapTable onRow | navigate to detail | Route change |
| Clicks "Create" | CapButton onClick | SET_SHOW_MODAL(true) | Modal opens |

#### 4.7 Styled Components (Tokens Only)

| Styled Name | Base Component | Tokens | Purpose |
|------------|---------------|--------|---------|
| HeaderRow | CapRow | padding: CAP_SPACE_16, border-bottom: 1px solid CAP_G05 | Header wrapper |
| FilterRow | CapRow | margin-bottom: CAP_SPACE_16, gap: CAP_SPACE_12 | Filters wrapper |

#### 4.8 i18n Messages

| Key | Default Text | Where Used |
|-----|-------------|-----------|
| pageTitle | "Feature Name" | CapHeading |
| createBtn | "Create New" | CapButton |

### 5. Molecule Specifications (if any)

For each molecule:
- **Name & Path**
- **Props Interface**: name, type, required, description
- **Cap* Components it renders** (from inventory table)
- **Note**: Molecules are STATELESS — no Redux, no saga

### 6. Page Specifications

For each page:
- **Route**: exact path with params
- **Route Params**: which params, how extracted
- **Organisms Rendered**: which organisms, in what layout
- **Page-Level Concerns**: param parsing, tab switching, org-level data passing

### 7. API Contracts (No Code)

For each API endpoint:

| Field | Value |
|-------|-------|
| Endpoint Key | FETCH_DATA |
| URL | /v2/api/path |
| Method | GET |
| Query/Body Params | param1 (required, string), param2 (optional, number) |
| Headers | Auto-injected by requestConstructor.js |
| Success Response Shape | `{ success: true, data: [...], totalCount: N }` |
| Error Response Shape | `{ success: false, errors: [{ code, message }] }` |
| Used By | fetchDataWorker in OrganismName/saga.js |
| UI Error Handling | Toast via CapNotification |

### 8. State Management Summary

**New Slices:**

| Slice Key | Organism | State Keys | Notes |
|-----------|----------|-----------|-------|
| organismName | OrganismName | data, loading, error, filters | New |

**Modified Slices:** (if any)

| Slice Key | Changes | Impact |
|-----------|---------|--------|
| — | — | — |

### 9. Data Flow Diagrams (ASCII)

One diagram per major user flow:

```
FETCH FLOW:
  Component Mount → dispatch(REQUEST) → Saga(takeLatest)
       → API call → Success? → dispatch(SUCCESS) → Reducer → Selector → Re-render
                  → Failure? → notifyHandledException → dispatch(FAILURE) → Error state
```

### 10. Integration Points

| Component | Integrates With | Mechanism |
|-----------|----------------|-----------|
| [organism] | [other organism/page] | [props / Redux / URL params / route navigation] |

---

## Rules for LLD Generation

1. **NO CODE in the LLD** — only design tables, ASCII diagrams, and structural specifications
2. **Every organism must specify all 10 files** — follow anatomy in `skills/shared-rules.md`
3. **Every Cap* component must be Figma-verified** — include verification source in inventory
4. **State design uses tables** — not fromJS() code blocks
5. **Action type format**: `garuda/<OrganismName>/VERB_NOUN_REQUEST/SUCCESS/FAILURE`
6. **Selectors must note .toJS()** — for complex return types
7. **API contracts must match backend signatures** — cross-reference every field
8. **Use prototype_analysis.json** for interaction flows — don't guess user behavior
9. **ASCII diagrams are mandatory** — page layout + data flow diagrams minimum
10. **Design tokens only** — never raw px/hex values in styled component specs
