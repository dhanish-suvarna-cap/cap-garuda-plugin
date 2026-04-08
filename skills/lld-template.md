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

# LLD Template

Use this template when generating Low Level Design documents for Confluence.

## Confluence Page Structure

The LLD Confluence page must follow this exact structure:

---

### 1. Overview
- **Feature**: [Feature name from HLD]
- **HLD Reference**: [Confluence link to HLD]
- **Jira Ticket**: [CAP-XXXXX](link)
- **Author**: AI-generated, reviewed by [Developer Name]
- **Date**: [ISO date]
- **Version**: [v1, v2, etc.]

### 2. Component Design

#### 2.1 Atoms (from cap-ui-library)
| Cap* Component | Import Path | Usage |
|---------------|-------------|-------|
| CapButton | `@capillarytech/cap-ui-library/CapButton` | Submit form action |
| CapSelect | `@capillarytech/cap-ui-library/CapSelect` | Dropdown for filter selection |

#### 2.2 Molecules
For each molecule:

**MoleculeName**
- **Path**: `app/components/molecules/MoleculeName/`
- **Props**:
  | Prop | Type | Required | Description |
  |------|------|----------|-------------|
  | data | array | yes | List of items to render |
  | onSelect | func | yes | Callback when item selected |
- **Renders**: CapButton, CapIcon, CapText
- **State**: None (molecules are stateless)

#### 2.3 Organisms
For each organism (this is the most detailed section):

**OrganismName**
- **Path**: `app/components/organisms/OrganismName/`
- **Redux Slice Key**: `organismName`

**Initial State** (ImmutableJS):
```js
fromJS({
  data: [],
  loading: false,
  error: null,
  filters: {},
  pagination: { page: 1, pageSize: 10, total: 0 },
})
```

**Action Types**:
| Constant | Purpose |
|----------|---------|
| `garuda/OrganismName/FETCH_DATA_REQUEST` | Trigger data fetch |
| `garuda/OrganismName/FETCH_DATA_SUCCESS` | Store fetched data |
| `garuda/OrganismName/FETCH_DATA_FAILURE` | Store error |
| `garuda/OrganismName/SET_FILTERS` | Update filter state |
| `garuda/OrganismName/CLEAR_DATA` | Reset to initial state |

**Saga Workers**:
| Worker | Trigger | API Call | Success Action | Failure Action |
|--------|---------|----------|---------------|---------------|
| fetchDataWorker | takeLatest FETCH_DATA_REQUEST | Api.fetchOrganismData | FETCH_DATA_SUCCESS | FETCH_DATA_FAILURE |

**Selectors**:
| Selector | Returns | Type |
|----------|---------|------|
| makeSelectData | data array | toJS() |
| makeSelectLoading | boolean | primitive |
| makeSelectError | error object or null | toJS() |
| makeSelectFilters | filters object | toJS() |

**Cap* Components Used**:
| Component | Purpose |
|-----------|---------|
| CapTable | Main data table |
| CapButton | Action buttons |
| CapSelect | Filter dropdowns |

**Component Methods**:
| Method | Purpose | Params |
|--------|---------|--------|
| handleFetchData | Dispatch fetch with current filters | none |
| handleFilterChange | Update filters and refetch | (filterKey, value) |
| handlePageChange | Update pagination and refetch | (page, pageSize) |

**Files** (all 10 required):
1. `constants.js` — Action type constants
2. `actions.js` — Action creators
3. `reducer.js` — ImmutableJS reducer
4. `saga.js` — Redux-Saga workers + watchers
5. `selectors.js` — Reselect selectors
6. `styles.js` — styled-components CSS
7. `messages.js` — react-intl messages
8. `Component.js` — React component
9. `index.js` — Compose chain (withSaga, withReducer, withConnect)
10. `Loadable.js` — React.lazy wrapper

#### 2.4 Pages
**PageName**
- **Path**: `app/components/pages/PageName/`
- **Route**: `/loyalty/ui/v3/[path]`
- **Organisms Rendered**: OrganismA, OrganismB
- **Page-Level Logic**: Route params parsing, layout orchestration

### 3. API Handling

For each API endpoint:

**EndpointName**
- **Endpoint Key**: `ENDPOINT_KEY` (in `app/config/endpoints.js`)
- **URL**: `/api/v1/path/`
- **Method**: POST
- **Request Builder**: `getAryaAPICallObject`
- **Request Payload**:
  ```json
  { "field1": "string", "field2": 0 }
  ```
- **Response Shape**:
  ```json
  { "success": true, "data": [], "errors": null }
  ```
- **Error Handling**: Display error toast via `notifyHandledException`

### 4. State Management

#### New Redux Slices
| Key | Injected In | Initial State Summary |
|-----|------------|----------------------|
| organismName | OrganismName/index.js | data, loading, error, filters, pagination |

#### Modified Slices
| Key | What Changes | Impact |
|-----|-------------|--------|
| [existing key] | [change description] | [downstream impact] |

### 5. Data Flow
```
User Action → dispatch(action) → Saga takeLatest
  → API call (httpRequest) → Success/Failure
  → Reducer updates ImmutableJS state
  → Selector reads state → Component re-renders
```

[Describe specific data flows for this feature]

### 6. Integration Points
| Component | Integrates With | How |
|-----------|----------------|-----|
| [component] | [other component/service] | [mechanism: props, Redux, URL params] |

---

## Rules for LLD Generation

1. **Every organism must specify all 10 files** — no exceptions. Follow the anatomy in CLAUDE.md.
2. **Initial state must use ImmutableJS** — `fromJS({})` for the state shape.
3. **Action type format**: `garuda/<OrganismName>/VERB_NOUN_REQUEST/SUCCESS/FAILURE`
4. **Saga workers must use `call` for API calls** and `put` for dispatching actions.
5. **Selectors use `createSelector` from reselect** and return `.toJS()` for complex types.
6. **Cap* component imports must be individual file paths** — never barrel imports.
7. **Request builders**: Use `getAryaAPICallObject` for Arya APIs, `getIRISAPICallObject` for IRIS, etc.
8. **Cross-reference the HLD** — every component listed in HLD must appear in LLD with full details.
9. **Cross-reference backend API signatures** — request/response shapes must match backend contracts.
10. **Methods section must be complete** — list every handler, callback, and lifecycle method the component uses.
