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
