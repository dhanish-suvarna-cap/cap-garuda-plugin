---
description: Atomic design pattern rules for Capillary UI component hierarchy
triggers:
  - "atomic design"
  - "atom molecule organism"
  - "component hierarchy"
  - "which layer"
  - "where should this component go"
  - "page vs organism"
---

# Atomic Design Rules

## Layer Definitions

### Atoms (`app/components/atoms/`)
- **What**: Smallest UI building blocks — single-purpose, stateless
- **Redux**: NEVER. No Redux connection, no actions, no selectors.
- **State**: Only local React state for UI concerns (hover, focus, toggle)
- **Props**: All data comes via props from parent
- **Examples**: CustomIcon, FormLabel, StatusBadge
- **Cap* Usage**: Atoms often wrap a single Cap* component with custom styling
- **Test**: Render test only — does it render with given props?

### Molecules (`app/components/molecules/`)
- **What**: Composed from atoms and/or Cap* components — still presentational
- **Redux**: NEVER. No Redux connection.
- **State**: Only local React state for UI composition (accordion open/close, internal form state)
- **Props**: All data and callbacks come from parent organism/page
- **Examples**: SearchBar (CapInput + CapButton), FilterGroup (multiple CapSelects), DataCard
- **Test**: Render test + interaction test (click handlers, input changes)

### Organisms (`app/components/organisms/`)
- **What**: Feature-level components — own their data and business logic
- **Redux**: YES. Each organism has its own Redux slice (reducer, saga, selectors, actions, constants)
- **State**: ImmutableJS Redux state + minimal local UI state
- **File Anatomy**: Exactly 10 files (see below)
- **Examples**: AudienceList, EnrolmentConfig, CampaignBuilder
- **Test**: Component test + reducer test + saga test (3 test files minimum)

### Pages (`app/components/pages/`)
- **What**: Route-level containers — compose organisms into a view
- **Redux**: Only for page-level concerns (route params, layout state). Most Redux lives in organisms.
- **Routing**: Mapped to URL under `/loyalty/ui/v3/`
- **Logic**: Route param parsing, organism layout, tab switching
- **Examples**: CampaignPage, AudiencePage, SettingsPage
- **Test**: Render test with router — does it render the right organisms for given routes?

### Templates (`app/components/templates/`)
- **What**: Layout wrappers — header, sidebar, content area structure
- **Redux**: NEVER.
- **Examples**: MainLayout, SidebarLayout
- **Usage**: Pages render inside templates

## Decision Flowchart

```
Does it connect to Redux (actions/selectors)?
  ├─ YES → Is it a route entry point?
  │          ├─ YES → PAGE
  │          └─ NO  → ORGANISM
  └─ NO  → Does it compose multiple atoms/cap-components?
             ├─ YES → MOLECULE
             └─ NO  → ATOM
```

## Organism 10-File Anatomy

Every organism MUST have exactly these 10 files:

```
MyOrganism/
  constants.js      # Action type string constants
  actions.js        # Action creators (import constants)
  reducer.js        # ImmutableJS reducer (import constants, fromJS)
  saga.js           # Redux-Saga workers + watchers (import constants, actions, Api)
  selectors.js      # Reselect selectors (import initialState from reducer)
  styles.js         # styled-components CSS template
  messages.js       # react-intl message definitions
  Component.js      # React component (functional or class)
  index.js          # compose chain: withSaga → withReducer → withConnect → injectIntl → withStyles
  Loadable.js       # React.lazy + loadable() wrapper
  tests/            # Unit tests directory
    Component.test.js
    reducer.test.js
    saga.test.js
```

## Import Rules

### Within an organism (internal imports):
```js
// constants.js → no imports from other organism files
// actions.js → imports from ./constants
// reducer.js → imports from ./constants
// saga.js → imports from ./constants, ./actions, services/api
// selectors.js → imports from ./reducer (initialState)
// Component.js → imports from ./messages, can import molecules/atoms
// index.js → imports from ./reducer, ./saga, ./styles, ./selectors, ./Component
// Loadable.js → imports from ./index (default export)
```

### Cross-organism imports:
- NEVER import actions/constants/reducers from another organism
- If organisms need to communicate, use:
  1. Parent page passes props down
  2. Shared Redux slice in the page
  3. URL params / query strings
  4. Custom events (rare, avoid if possible)

### Cap* component imports:
```js
// CORRECT — individual file path
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';

// WRONG — barrel import (causes bundle bloat)
import { CapButton, CapSelect } from '@capillarytech/cap-ui-library';
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Organism directory | PascalCase | `AudienceList/` |
| Redux slice key | camelCase | `audienceList` |
| Action constant | SCREAMING_SNAKE | `FETCH_AUDIENCE_REQUEST` |
| Action constant prefix | `garuda/<OrganismName>/` | `garuda/AudienceList/FETCH_AUDIENCE_REQUEST` |
| CSS class | kebab-case | `.audience-list-wrapper` |
| Message scope | dot.separated | `garuda.components.organisms.AudienceList` |
| Route | kebab-case | `/loyalty/ui/v3/audience-list` |
| API endpoint key | SCREAMING_SNAKE | `FETCH_AUDIENCE_LIST` |
