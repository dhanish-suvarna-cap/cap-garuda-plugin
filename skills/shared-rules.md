# Shared Rules — Single Source of Truth

> All agents MUST reference this file instead of embedding these rules inline.
> These are non-negotiable patterns for the target codebase.

---

## CONSTITUTION — Non-Negotiable Principles

> These principles override ALL other rules. Every agent that generates code MUST enforce them. No exceptions. No workarounds.

**Principle I: ALL UI is built from Cap-* components from @capillarytech/cap-ui-library.**
- Raw HTML tags (`<div>`, `<span>`, `<p>`, `<h1>`-`<h6>`, `<label>`, `<a>`, `<button>`, `<input>`, `<select>`, `<table>`, `<ul>`, `<li>`, `<ol>`, `<hr>`, `<nav>`, `<form>`, `<img>`) are NEVER acceptable in Component.js.
- For every UI element, consult `skills/cap-ui-composition-patterns.md` for the Cap* equivalent.
- Follow the Fallback Priority Chain: Cap* primitives → styled(Cap*) → styled.div in styles.js only → NEVER raw HTML.

**Principle II: ALL styling values use Cap UI design tokens.**
- No raw hex colors — use `CAP_G*`, `CAP_PRIMARY`, `FONT_COLOR_*`, etc. from `@capillarytech/cap-ui-library/styled/variables`
- No hardcoded px for spacing — use `CAP_SPACE_*` tokens
- No hardcoded font sizes — use `FONT_SIZE_*` tokens
- Exception: `1px` for borders, values with `/* no token */` comment

**Principle III: Cap* components are imported via individual file paths ONLY.**
- `import CapButton from '@capillarytech/cap-ui-library/CapButton'` — CORRECT
- `import { CapButton } from '@capillarytech/cap-ui-library'` — NEVER

---

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

**Detection (FG-02):** Count files in organism directory. Alert if != 10 for organisms.

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

**Detection (FG-14):** Grep for `import `, `const `, `compose`, `connect`, `mapState`, `withSaga`, `withReducer` in index.js files.

## 2. Action Type Naming Pattern

```
garuda/<OrganismName>/VERB_NOUN_REQUEST
garuda/<OrganismName>/VERB_NOUN_SUCCESS
garuda/<OrganismName>/VERB_NOUN_FAILURE
```

Every async operation MUST have the three-state pattern: REQUEST, SUCCESS, FAILURE.

Additional patterns: `SET_*`, `CLEAR_*`, `TOGGLE_*` for synchronous state changes.

**Detection (FG-09):** Grep constants.js for action type patterns not matching `garuda/<Name>/VERB_NOUN_STATUS`.

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

**Detection (FG-07):** Parse Component.js compose chain. Verify order matches withSaga → withReducer → withConnect.

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

**Detection (FG-01):** Grep for `from '@capillarytech/cap-ui-library'` (without individual component path).

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

**Detection (FG-03):** Grep for `...state`, `Object.assign(state`, `state.` followed by `=` in reducer files.

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

**Detection (FG-04):** Grep for `function*` in saga files. Verify `notifyHandledException` exists in catch block.

## 7. Authorization Headers

NEVER manually add `Authorization`, `X-CAP-REMOTE-USER`, or `X-CAP-API-AUTH-ORG-ID` headers.
These are injected by `requestConstructor.js`. Manual addition causes double-header bugs.

**Detection (FG-06):** Grep for `Authorization`, `X-CAP-REMOTE-USER`, `X-CAP-API-AUTH-ORG-ID` in generated code.

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

**Detection (FG-08):** Grep for `from '@testing-library/react'` in test files.

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

**Detection (FG-10):** Grep Component.js for hardcoded strings in JSX.

## 11. Selector Pattern

```js
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('sliceKey', initialState);
export const makeSelectField = () =>
  createSelector(selectDomain, substate => substate.get('field'));
```

Selectors that return objects/arrays MUST call `.toJS()` to prevent Immutable leaking into components.

## 12. CSS Class Naming & Token Enforcement

- kebab-case, prefixed with organism name: `.tier-benefit-config-wrapper`

**Detection (FG-11):** Grep styles.js for hardcoded pixel values or hex colors.

### 12.1 Mandatory Token Usage (Constitution Principle II)

ALL styling values MUST use Cap UI design tokens from `@capillarytech/cap-ui-library/styled/variables`:

```js
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
```

| Category | NEVER Use | ALWAYS Use | Examples |
|---|---|---|---|
| **Colors** | Raw hex (`#091e42`, `#fff`) | Token variables | `styledVars.CAP_G01`, `styledVars.CAP_PRIMARY.base`, `styledVars.FONT_COLOR_01` |
| **Spacing** | Raw px (`16px`, `24px`) | `CAP_SPACE_*` tokens | `styledVars.CAP_SPACE_04`, `CAP_SPACE_08`, `CAP_SPACE_12`, `CAP_SPACE_16`, `CAP_SPACE_20`, `CAP_SPACE_24`, `CAP_SPACE_32` |
| **Font Size** | Raw px (`14px`, `16px`) | `FONT_SIZE_*` tokens | `styledVars.FONT_SIZE_VS` (10px), `FONT_SIZE_S` (12px), `FONT_SIZE_M` (14px), `FONT_SIZE_L` (16px), `FONT_SIZE_VL` (24px) |
| **Font Weight** | Raw numbers (`400`, `500`) | `FONT_WEIGHT_*` tokens | `styledVars.FONT_WEIGHT_REGULAR` (400), `FONT_WEIGHT_MEDIUM` (500) |
| **Border** | `1px` is acceptable | Use token for color | `border: 1px solid ${styledVars.CAP_G05}` |

**Exceptions**:
- `1px` for border widths (no token equivalent)
- Values with explicit `/* no token */` comment + `rem` at base 14
- `0` (zero values need no token)
- Percentage values (`100%`, `50%`)
- `auto`, `inherit`, `none`

## 13. Banned Packages

NEVER use: TypeScript, React Query, Redux Toolkit, Zustand, Tailwind, emotion, axios, Formik, React Hook Form, Enzyme (for new tests).

**Detection (FG-05):** Grep for `import.*from` patterns matching banned package names.

## 15. No Native HTML Elements

**NEVER use native HTML elements** (`<div>`, `<span>`, `<p>`, `<h1>`-`<h6>`, `<label>`, `<a>`, etc.) in Component.js. Use Cap UI Library equivalents instead. See `skills/cap-ui-composition-patterns.md` for the full HTML-to-Cap* replacement lookup table and composition recipes.

**Exceptions** (native HTML is acceptable):
- `<Fragment>` / `<>` — React fragments are fine
- Styled-components wrappers defined in `styles.js` (e.g., `const Wrapper = styled.div`) — these are in the styles file, not in Component.js JSX
- Inside render helpers that wrap Cap UI components for layout that Cap UI doesn't cover (rare — document with `/* no Cap UI equivalent */` comment)

**Why**: Cap UI components apply consistent Capillary design tokens (spacing, colors, typography). Native HTML elements bypass the design system and create visual inconsistencies.

**Detection (FG-13):** Grep for `<(div|span|p|h[1-6]|label|a |button|input|select|table|ul|ol|li|hr|nav|form|img)[ >/]` in Component.js files. Also grep for `styled\.(div|span|p)` in Component.js (must be in styles.js only).

## 14. Import Order

1. React & core (`react`, `react-dom`)
2. Third-party (`redux`, `reselect`, `immutable`, `react-intl`, `styled-components`)
3. Cap-UI (`@capillarytech/cap-ui-library/*`)
4. Internal components (`components/organisms/*`, `components/molecules/*`)
5. Utilities (`utils/*`, `services/*`)
6. Local files (`./constants`, `./actions`, `./reducer`, `./saga`, `./selectors`, `./styles`, `./messages`)
