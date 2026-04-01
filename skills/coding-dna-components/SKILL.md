---
description: Capillary UI coding DNA — component anatomy, composition, props, hooks, conditional rendering, memoization
triggers:
  - "component anatomy"
  - "component structure"
  - "props design"
  - "composition pattern"
  - "conditional rendering"
  - "memoization"
  - "useMemo"
  - "useCallback"
  - "React.memo"
  - "HOC composition"
  - "useEffect pattern"
  - "custom hook"
  - "defaultProps"
  - "propTypes"
  - "withStyles"
  - "injectIntl"
---

# Coding DNA: Components & Hooks

Capillary-wide standards for React component design, composition patterns, hooks, and performance.

## Component Anatomy (Top-to-Bottom Order)

```js
// 1. React & core imports
import React, { useState, useEffect, useMemo } from 'react';

// 2. Third-party imports
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// 3. Cap-UI imports (one per line)
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapTable from '@capillarytech/cap-ui-library/CapTable';

// 4. Internal component imports
import FilterBar from '../../molecules/FilterBar';

// 5. Utility imports
import { formatDate } from 'utils/dateUtils';

// 6. Local file imports
import styles from './style';
import messages from './messages';
import { FETCH_DATA_REQUEST } from './constants';

// 7. Destructuring (if needed)
const { Option } = CapSelect;

// 8. Component declaration (arrow function)
const MyComponent = ({
  data,
  loading,
  error,
  fetchDataRequest,
  intl: { formatMessage },
  className,
}) => {
  // hooks
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDataRequest();
  }, []);

  // handlers (handleXxx naming)
  const handleSearch = (value) => setSearchTerm(value);

  // render
  if (loading) return <CapSpin />;
  if (error) return <div>{formatMessage(messages.errorMessage)}</div>;

  return (
    <div className={classnames('my-component-wrapper', className)}>
      {/* content */}
    </div>
  );
};

// 9. defaultProps (BEFORE propTypes)
MyComponent.defaultProps = {
  className: '',
  data: [],
  loading: false,
  error: null,
};

// 10. propTypes
MyComponent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  fetchDataRequest: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

// 11. Export with HOC composition
export default MyComponent;
```

## HOC Composition Order

Inside-out application (withStyles is innermost):

```js
export default compose(
  withSaga,           // outermost
  withReducer,
  withConnect,
  withRouter,         // (if needed)
)(injectIntl(withStyles(MyComponent, styles)));  // innermost
```

**HOC Inventory:**
- `withStyles` — injects CSS from style.js
- `injectIntl` — provides intl.formatMessage
- `connect` — Redux mapStateToProps/mapDispatchToProps
- `injectReducer` — dynamic reducer injection
- `injectSaga` — dynamic saga injection
- `withRouter` — React Router props
- `withErrorBoundary` — error boundary wrapper
- `withDynamicLazyLoading` — lazy loading HOC

## Props Rules

- **Always destructure in function signature** (not inside body)
- **defaultProps before propTypes** (static properties)
- **Every component accepts `className`** prop for parent customization
- **Boolean props**: `isXxx`, `hasXxx` naming
- **Handler props from parent**: `onXxx` naming
- **Internal handlers**: `handleXxx` naming
- **intl prop**: `intl: { formatMessage }` destructured, propType `intlShape.isRequired`
- **Spread props: RARE** — only for generic wrapper components

## Conditional Rendering Patterns

| Scenario | Pattern |
|----------|---------|
| Loading/error guard | Early return at top |
| Two branches | Ternary operator |
| Single branch | Logical AND (&&) |
| 3+ variants | Switch statement |
| Complex logic | Render helper function |

```js
// Early return for loading/error
if (loading) return <CapSpin />;
if (error) return <ErrorState />;

// Ternary for two branches
return isEditing ? <EditForm /> : <ViewDisplay />;

// Logical AND for single branch
return <div>{hasPermission && <EditButton />}</div>;
```

## Hooks Conventions

### useState
- Most common hook (~1200 instances)
- Use for: modal toggles, form inputs, local UI state
- Initialize from props with function initializer: `useState(() => computeInitial(props))`

### useEffect
- Mount-only: `useEffect(() => { ... }, [])`
- **ALWAYS return cleanup**: `return () => clearInterval(id)`
- **NEVER fetch data in useEffect** — use Redux-Saga instead
- Use `useDeepCompareEffect` for object/array deps

### useMemo
- For expensive computations and derived state
- **Don't over-memoize** — only when performance benefit is measurable
- ~95 instances in codebase

### useCallback
- For stabilizing callbacks passed to memoized children
- Less common than useMemo (~30 instances)

### Custom Hooks (only 3 exist)
1. `usePersistantState` — localStorage-backed state
2. `useInterval` — declarative setInterval with cleanup
3. `useDidMountEffect` — skip first render effect

## Memoization Decision Tree

```
Redux state derivation? → Reselect createSelector
Expensive computation in render? → useMemo
Callback passed to React.memo child? → useCallback
Full component re-render expensive? → React.memo (prove it first)
None of the above? → Don't memoize
```

## Do-Nots

- Don't use class components — use functional + hooks
- Don't skip withStyles HOC — it's how styles are injected
- Don't put logic in index.js — only re-exports
- Don't use useEffect for data fetching — use Redux-Saga
- Don't skip PropTypes — they're the type documentation
- Don't nest components inside components — breaks reconciliation
- Don't mix useSelector/useDispatch with connect — use connect pattern
- Don't create hooks that replace Redux — no custom data-fetching hooks
- Don't omit cleanup in effects — always return cleanup function

## Reference Files

- `ref-anatomy.md` — Full component anatomy with examples
- `ref-composition.md` — HOC composition, render helpers, compound components
- `ref-props.md` — Props patterns, defaultProps, callback patterns
- `ref-conditional-rendering.md` — All rendering patterns with examples
- `ref-memoization.md` — React.memo, useMemo, useCallback, Reselect guidance
- `ref-component-donts.md` — Component anti-patterns
- `ref-hook-conventions.md` — Custom hook design patterns
- `ref-hook-inventory.md` — All hooks used in codebase
- `ref-effect-patterns.md` — useEffect patterns and cleanup
- `ref-hook-donts.md` — Hook anti-patterns
