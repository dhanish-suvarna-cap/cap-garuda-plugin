# Shared Rules — Single Source of Truth

> All agents MUST reference this file instead of embedding these rules inline.
> These are non-negotiable patterns for the target codebase.

## 1. Organism 10-File Anatomy

Every organism MUST have exactly these 10 files in this dependency order:

| # | File | Purpose |
|---|------|---------|
| 1 | `constants.js` | Action type string constants |
| 2 | `actions.js` | Action creator functions |
| 3 | `reducer.js` | ImmutableJS reducer with initialState |
| 4 | `saga.js` | Saga workers + watchers |
| 5 | `selectors.js` | Reselect memoized selectors |
| 6 | `styles.js` | styled-components CSS with Cap UI tokens |
| 7 | `messages.js` | react-intl message definitions |
| 8 | `Component.js` | React functional component + compose chain + Redux connect |
| 9 | `index.js` | **ONLY** a barrel re-export: `export { default } from './ComponentName';` |
| 10 | `Loadable.js` | Lazy loading wrapper |

This order is also the **generation dependency order** — each file may import from files above it but never below.

**CRITICAL — index.js Rule**: The `index.js` file MUST contain ONLY a single re-export line. All compose chain logic, Redux connect, mapStateToProps, mapDispatchToProps, withSaga, withReducer, withStyles, injectIntl — ALL of this goes in `Component.js`, NOT in `index.js`.

```js
// index.js — CORRECT (the ONLY content allowed)
export { default } from './TierComparisonMatrix';

// index.js — WRONG (compose chain does NOT belong here)
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// ... mapStateToProps, mapDispatchToProps, compose(...)
// This must be in Component.js instead.
```

## 2. Action Type Naming Pattern

```
garuda/<OrganismName>/VERB_NOUN_REQUEST
garuda/<OrganismName>/VERB_NOUN_SUCCESS
garuda/<OrganismName>/VERB_NOUN_FAILURE
```

Every async operation MUST have the three-state pattern: REQUEST, SUCCESS, FAILURE.

Additional patterns: `SET_*`, `CLEAR_*`, `TOGGLE_*` for synchronous state changes.

## 3. Compose Chain Order (Exact) — Lives in Component.js

The compose chain, mapStateToProps, mapDispatchToProps, and all HOC wiring lives in `Component.js` (NOT in `index.js`).

```js
// Component.js — at the BOTTOM of the file, after the component definition

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ fetchData, updateData }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-slice-key`, saga });
const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-slice-key`, reducer });

export default compose(
  withSaga,       // outermost
  withReducer, 
  withConnect,
)(injectIntl(withStyles(ComponentName, styles)));  // innermost
```

Order: `withSaga → withReducer → withConnect` wrapping `injectIntl(withStyles(Component, styles))`.

**index.js** only re-exports: `export { default } from './ComponentName';`

## 4. Cap* Import Rule

```js
// CORRECT — individual file path
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';

// WRONG — barrel import (breaks tree-shaking)
import { CapButton, CapSelect } from '@capillarytech/cap-ui-library';
```

ALWAYS use individual file path imports. NEVER barrel import from cap-ui-library root.

## 5. Reducer: ImmutableJS Only

Allowed operations: `fromJS`, `set`, `get`, `merge`, `setIn`, `getIn`, `toJS`, `List`, `Map`.

```js
import { fromJS } from 'immutable';
export const initialState = fromJS({ data: [], loading: false, error: null });

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state.set('data', fromJS(action.payload)).set('loading', false);
    // NEVER: state.data = action.payload (direct mutation)
  }
}
```

## 6. Saga Error Handling (Bugsnag)

Every saga worker MUST have try/catch with `notifyHandledException`:

```js
function* fetchDataWorker(action) {
  try {
    const res = yield call(Api.fetchData, action.payload);
    if (res?.success) {
      yield put(fetchDataSuccess(res.data));
      if (action.callback) action.callback(res.data);
    } else {
      yield put(fetchDataFailure(res?.errors || res));
    }
  } catch (error) {
    notifyHandledException(error);
    yield put(fetchDataFailure(error));
  }
}
```

Key points:
- ALWAYS check `res?.success` before dispatching success
- ALWAYS catch with `notifyHandledException(error)` + failure action
- Support optional `action.callback` if the action creator includes it

## 7. Authorization Headers

NEVER manually add `Authorization`, `X-CAP-REMOTE-USER`, or `X-CAP-API-AUTH-ORG-ID` headers.
These are injected by `requestConstructor.js`. Manual addition causes double-header bugs.

## 8. Test Import Rule

```js
// CORRECT
import { render, screen, fireEvent } from 'app/utils/test-utils';

// WRONG
import { render, screen } from '@testing-library/react';
```

ALWAYS import from `app/utils/test-utils.js`. NEVER from `@testing-library/react` directly.

ALWAYS mock bugsnag in test files:
```js
jest.mock('utils/bugsnag', () => ({ notifyHandledException: jest.fn() }));
```

## 9. Coverage Targets

| Metric | Target | Applies To |
|--------|--------|------------|
| Line coverage | > 90% | All new code |
| Branch coverage | 100% | Reducers (every switch case) |
| Worker coverage | 100% | Sagas (every worker x 3 paths: success, failure, error) |
| Component coverage | > 80% | Component.js (render states + key interactions) |

## 10. i18n Message Scope

```js
export const scope = 'garuda.components.organisms.<OrganismName>';
```

All user-facing strings MUST use `formatMessage` from react-intl. Never hardcode display text.

## 11. Selector Pattern

```js
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('sliceKey', initialState);
export const makeSelectField = () =>
  createSelector(selectDomain, substate => substate.get('field'));
```

Selectors that return objects/arrays MUST call `.toJS()` to prevent Immutable leaking into components.

## 12. CSS Class Naming

- kebab-case, prefixed with organism name: `.tier-benefit-config-wrapper`
- Cap UI design tokens: `CAP_SPACE_*` for spacing, `CAP_G*` for greys, `FONT_SIZE_*`, `FONT_WEIGHT_*`
- When token doesn't exist: use `rem` at base 14 with comment `/* no token */`

## 13. Banned Packages

NEVER use: TypeScript, React Query, Redux Toolkit, Zustand, Tailwind, emotion, axios, Formik, React Hook Form, Enzyme (for new tests).

## 15. No Native HTML Elements

**NEVER use native HTML elements** (`<div>`, `<span>`, `<p>`, `<h1>`-`<h6>`, `<label>`, `<a>`, etc.) in Component.js. Use Cap UI Library equivalents instead:

| Native HTML | Cap UI Replacement | Import |
|---|---|---|
| `<div>` (layout) | `CapRow`, `CapColumn` | `@capillarytech/cap-ui-library/CapRow`, `CapColumn` |
| `<span>`, `<p>`, `<label>` | `CapLabel` | `@capillarytech/cap-ui-library/CapLabel` |
| `<h1>`-`<h6>` | `CapHeading` (type="h1" through "h6") | `@capillarytech/cap-ui-library/CapHeading` |
| `<a>` | `CapLink` | `@capillarytech/cap-ui-library/CapLink` |
| `<button>` | `CapButton` | `@capillarytech/cap-ui-library/CapButton` |
| `<input>` | `CapInput` | `@capillarytech/cap-ui-library/CapInput` |
| `<select>` | `CapSelect` | `@capillarytech/cap-ui-library/CapSelect` |
| `<table>` | `CapTable` | `@capillarytech/cap-ui-library/CapTable` |
| `<img>` | `CapIcon` (for icons) or `<img>` only for dynamic user content | — |
| `<hr>` | `CapDivider` | `@capillarytech/cap-ui-library/CapDivider` |

**Exceptions** (native HTML is acceptable):
- `<Fragment>` / `<>` — React fragments are fine
- Styled-components wrappers defined in `styles.js` (e.g., `const Wrapper = styled.div`) — these are in the styles file, not in Component.js JSX
- Inside render helpers that wrap Cap UI components for layout that Cap UI doesn't cover (rare — document with `/* no Cap UI equivalent */` comment)

**Why**: Cap UI components apply consistent Capillary design tokens (spacing, colors, typography). Native HTML elements bypass the design system and create visual inconsistencies.

## 14. Import Order

1. React & core (`react`, `react-dom`)
2. Third-party (`redux`, `reselect`, `immutable`, `react-intl`, `styled-components`)
3. Cap-UI (`@capillarytech/cap-ui-library/*`)
4. Internal components (`components/organisms/*`, `components/molecules/*`)
5. Utilities (`utils/*`, `services/*`)
6. Local files (`./constants`, `./actions`, `./reducer`, `./saga`, `./selectors`, `./styles`, `./messages`)
