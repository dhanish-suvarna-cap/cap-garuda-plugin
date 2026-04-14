# Frontend Guardrails — Detailed Rules

## FG-01: Cap UI Import Rules

**Priority**: CRITICAL

### FG-01.1: Always use individual file path imports

```js
// CORRECT
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';

// WRONG — barrel import breaks tree-shaking, bloats bundle
import { CapButton, CapSelect } from '@capillarytech/cap-ui-library';
```

### FG-01.2: Import design tokens from styled/variables

```js
// CORRECT
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

// WRONG
import { CAP_SPACE_12 } from '@capillarytech/cap-ui-library';
```

### FG-01.3: Never create custom components for Cap UI equivalents

Before creating any button, input, select, table, modal, or similar UI element, check `skills/cap-ui-library/SKILL.md` for the Cap UI equivalent. Use the Cap component, not a custom implementation.

**Detection**: Grep for `from '@capillarytech/cap-ui-library'` (without individual component path).

---

## FG-02: Organism Anatomy

**Priority**: CRITICAL

### FG-02.1: Every organism MUST have exactly 10 files

| # | File | Purpose |
|---|------|---------|
| 1 | constants.js | Action type string constants |
| 2 | actions.js | Action creator functions |
| 3 | reducer.js | ImmutableJS reducer with initialState |
| 4 | saga.js | Saga workers + watchers |
| 5 | selectors.js | Reselect memoized selectors |
| 6 | styles.js | styled-components with Cap UI tokens |
| 7 | messages.js | react-intl message definitions |
| 8 | Component.js | React functional component |
| 9 | index.js | Barrel export with compose chain |
| 10 | Loadable.js | Lazy loading wrapper |

### FG-02.2: Files MUST follow dependency order

Each file may import from files above it in the list but never below. This is also the generation order.

### FG-02.3: Atoms and molecules MUST NOT have Redux files

Atoms: only Component.js, styles.js, index.js
Molecules: only Component.js, styles.js, index.js, messages.js (optional)

**Detection**: Count files in organism directory. Alert if != 10 for organisms.

---

## FG-03: ImmutableJS Patterns

**Priority**: CRITICAL

### FG-03.1: Reducers MUST use ImmutableJS only

Allowed operations: `fromJS`, `set`, `get`, `merge`, `setIn`, `getIn`, `toJS`, `List`, `Map`.

```js
// CORRECT
import { fromJS } from 'immutable';
export const initialState = fromJS({ data: [], loading: false, error: null });

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state.set('data', fromJS(action.payload)).set('loading', false);
  }
}

// WRONG — direct mutation
state.data = action.payload;
state['loading'] = false;
return { ...state, data: action.payload }; // spread operator on Immutable
```

### FG-03.2: Selectors MUST call .toJS() for object/array returns

```js
// CORRECT
export const makeSelectData = () =>
  createSelector(selectDomain, substate => substate.get('data').toJS());

// WRONG — leaks Immutable objects into components
export const makeSelectData = () =>
  createSelector(selectDomain, substate => substate.get('data'));
```

**Detection**: Grep for `...state`, `Object.assign(state`, `state.` followed by `=` in reducer files.

---

## FG-04: Saga Error Handling

**Priority**: CRITICAL

### FG-04.1: Every saga worker MUST have try/catch with notifyHandledException

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

### FG-04.2: Always check res?.success before dispatching success

### FG-04.3: Support optional action.callback

**Detection**: Grep for `function*` in saga files. For each, verify `notifyHandledException` exists in catch block.

---

## FG-05: Banned Packages

**Priority**: CRITICAL

NEVER use any of these in generated code:

| Package | Why Banned |
|---------|-----------|
| TypeScript | Codebase is JavaScript-only |
| React Query / TanStack Query | Use Redux-Saga for server state |
| Redux Toolkit | Use vanilla Redux + ImmutableJS |
| Zustand | Use Redux |
| Tailwind CSS | Use styled-components + Cap UI tokens |
| emotion | Use styled-components |
| axios | Use the project's internal API client |
| Formik | Use controlled components with Redux state |
| React Hook Form | Use controlled components with Redux state |
| Enzyme | Use React Testing Library via app/utils/test-utils.js |

**Detection**: Grep for `import.*from` patterns matching banned package names.

---

## FG-06: Auth Headers

**Priority**: HIGH

### FG-06.1: NEVER manually add auth headers

```js
// WRONG — causes double-header bugs
headers: {
  'Authorization': `Bearer ${token}`,
  'X-CAP-REMOTE-USER': userId,
  'X-CAP-API-AUTH-ORG-ID': orgId
}

// CORRECT — auth injected automatically by requestConstructor.js
// Just make the API call; headers are added by the interceptor
```

**Detection**: Grep for `Authorization`, `X-CAP-REMOTE-USER`, `X-CAP-API-AUTH-ORG-ID` in generated code.

---

## FG-07: Compose Chain

**Priority**: HIGH

### FG-07.1: Exact compose chain order in index.js

```js
export default compose(
  withSaga({ key: 'sliceKey', saga }),       // outermost
  withReducer({ key: 'sliceKey', reducer }),
  withConnect(mapStateToProps, mapDispatchToProps),
)(injectIntl(withStyles(Component, styles)));  // innermost
```

Order: `withSaga → withReducer → withConnect` wrapping `injectIntl(withStyles(Component, styles))`.

**Detection**: Parse index.js compose chain. Verify order matches pattern.

---

## FG-08: Test Imports

**Priority**: HIGH

### FG-08.1: Always import from app/utils/test-utils.js

```js
// CORRECT
import { render, screen, fireEvent } from 'app/utils/test-utils';

// WRONG
import { render, screen } from '@testing-library/react';
```

### FG-08.2: Always mock bugsnag

```js
jest.mock('utils/bugsnag', () => ({ notifyHandledException: jest.fn() }));
```

**Detection**: Grep for `from '@testing-library/react'` in test files.

---

## FG-09: Action Type Naming

**Priority**: HIGH

### FG-09.1: Follow the three-state pattern

```
garuda/<OrganismName>/VERB_NOUN_REQUEST
garuda/<OrganismName>/VERB_NOUN_SUCCESS
garuda/<OrganismName>/VERB_NOUN_FAILURE
```

Synchronous actions: `SET_*`, `CLEAR_*`, `TOGGLE_*`.

**Detection**: Grep constants.js for action type patterns.

---

## FG-10: i18n

**Priority**: HIGH

### FG-10.1: All user-facing strings via formatMessage

```js
// CORRECT
const { formatMessage } = intl;
<span>{formatMessage(messages.title)}</span>

// WRONG
<span>Dashboard</span>
```

### FG-10.2: Message scope format

```js
export const scope = 'garuda.components.organisms.<OrganismName>';
```

**Detection**: Grep Component.js for hardcoded strings in JSX.

---

## FG-11: CSS Naming

**Priority**: HIGH

### FG-11.1: kebab-case class names, prefixed with organism name

```css
.tier-benefit-config-wrapper { }
.tier-benefit-config-header { }
```

### FG-11.2: Use Cap UI design tokens

```js
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

const Wrapper = styled.div`
  padding: ${styledVars.CAP_SPACE_12};
  color: ${styledVars.CAP_G80};
  font-size: ${styledVars.FONT_SIZE_14};
`;
```

When no token exists: use `rem` at base 14 with comment `/* no token */`.

**Detection**: Grep styles.js for hardcoded pixel values or hex colors.

---

## FG-12: AI-Specific Coding Guardrails

**Priority**: CRITICAL

### FG-12.1: Read existing code before writing new code

Search for existing utilities, patterns, naming conventions before generating.

### FG-12.2: Follow the project's existing patterns

If the project uses a pattern, follow it. Don't introduce "better" patterns from training data.

### FG-12.3: Verify every import exists

Every generated import must reference a file or package that actually exists.

### FG-12.4: Generate the simplest solution

No speculative abstractions. YAGNI applies.

### FG-12.5: Never silently change existing behaviour

When adding a feature, don't refactor surrounding code.

### FG-12.6: AI-generated tests must test behaviour, not implementation

```js
// WRONG
verify(repo).findById(1); // proves mock was called

// CORRECT
expect(screen.getByText('Dashboard')).toBeInTheDocument(); // proves UI renders
```

### FG-12.7: All AI changes must pass existing tests before commit

### FG-12.8: Do not introduce new dependencies without explicit approval

---

## FG-13: No Native HTML Elements — Constitution Principle I

**Priority**: CRITICAL

### FG-13.1: ZERO raw HTML tags in Component.js

```js
// WRONG — raw HTML
<div className="header">
  <span>{title}</span>
  <p>{description}</p>
</div>

// CORRECT — Cap* components
<CapRow type="flex" justify="space-between" align="middle">
  <CapLabel type="label1">{formatMessage(messages.title)}</CapLabel>
  <CapLabel type="label2">{formatMessage(messages.description)}</CapLabel>
</CapRow>
```

**Banned tags**: `<div>`, `<span>`, `<p>`, `<h1>`-`<h6>`, `<label>`, `<a>`, `<button>`, `<input>`, `<select>`, `<table>`, `<ul>`, `<ol>`, `<li>`, `<hr>`, `<nav>`, `<form>`, `<img>`

**Replacements**: See `skills/cap-ui-composition-patterns.md` for complete lookup table.

**Detection**: Grep for `<(div|span|p|h[1-6]|label|a |a>|button|input|select|table|ul|ol|li|hr|nav|form|img)[ >/]` in Component.js files.

### FG-13.2: No styled.* definitions in Component.js

```js
// WRONG — styled definition in Component.js
const Wrapper = styled.div`padding: 16px;`;

// CORRECT — import from styles.js
import { Wrapper } from './styles';
// In styles.js: export const Wrapper = styled(CapRow)`padding: ${CAP_SPACE_16};`;
```

**Detection**: Grep for `styled\.(div|span|p|section|header|footer)` in Component.js files.

### FG-13.3: styled.div in styles.js requires justification

```js
// WRONG — unjustified styled.div
export const Overlay = styled.div`position: absolute;`;

// CORRECT — justified with comment
export const GradientOverlay = styled.div`
  /* No Cap* equivalent — gradient overlay for image backgrounds */
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  position: absolute;
  inset: 0;
`;

// BETTER — use styled(Cap*) when possible
export const Overlay = styled(CapRow)`position: absolute;`;
```

**Detection**: Grep for `styled\.(div|span|p)` in styles.js. Each must have `/* No Cap* equivalent` comment.

**Exceptions**: `<Fragment>`, `<>`, `<React.Fragment>`, named styled-components imported from styles.js.

---

## FG-14: index.js Purity

**Priority**: CRITICAL

### FG-14.1: index.js contains ONLY a single re-export line

```js
// CORRECT — the ONLY content allowed in index.js
export { default } from './ComponentName';

// WRONG — compose chain, Redux wiring, imports do NOT belong in index.js
import { connect } from 'react-redux';
import { compose } from 'redux';
const mapStateToProps = ...;
export default compose(withSaga, withReducer, withConnect)(...);
// All of this must be in Component.js
```

**Detection**: Grep for `import `, `const `, `function `, `compose`, `connect`, `mapState`, `mapDispatch`, `withSaga`, `withReducer` in index.js files.
