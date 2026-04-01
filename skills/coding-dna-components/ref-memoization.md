# Memoization Patterns

## React.memo (Rare — 5 Components)

Used sparingly for components that re-render frequently with the same props:

```javascript
// From ContentPreviews.js
export const ContentPreviews = React.memo(props => {
  // expensive rendering logic
  return <div>...</div>;
});
```

Known `React.memo` wrapped components:
- `CustomTreeHelper.js`
- `ImageUploadMolecule.js`
- `ContentPreviews.js`
- `CustomTree.js`
- `AddPointsAllocationLimitDetails.js`

### When to Use React.memo

- Component renders frequently due to parent re-renders
- Props are stable (primitives or memoized objects)
- Rendering is expensive (large lists, complex calculations)

## useMemo (~95 Instances)

Heavily used for derived/computed values:

```javascript
// Computing derived state
const isSaveDisabled = useMemo(
  () => {
    return upgradeCriteria.every(c => c.isValid) && thresholdValues.length > 0;
  },
  [upgradeCriteria, thresholdValues]
);

// Filtering/transforming data
const filteredItems = useMemo(
  () => items.filter(item => item.name.includes(searchTerm)),
  [items, searchTerm]
);
```

### When to Use useMemo

- Expensive array/object transformations
- Derived state from multiple sources
- Values passed as props to child components (to prevent unnecessary re-renders)

## useCallback (Used Alongside useMemo)

Less common than `useMemo`, used for callback stabilization:

```javascript
const handleItemClick = useCallback(
  (item) => {
    onSelect(item.id);
  },
  [onSelect]
);
```

## Reselect Selectors (Primary Memoization Strategy)

The main memoization tool is Reselect for Redux state derivation:

```javascript
import { createSelector } from 'reselect';

const selectCreateTrackerDomain = (state = fromJS({})) =>
  state.get('createTracker', initialState);

const makeSelectExtendedFields = () =>
  createSelector(selectCreateTrackerDomain, (substate = fromJS({})) => ({
    extendedFields: substate && substate.get('extendedFields'),
    getExtendedFieldStatus: substate && substate.get('getExtendedFieldStatus'),
  }));
```

Used with `createStructuredSelector` in connected components:

```javascript
const mapStateToProps = createStructuredSelector({
  extendedFieldsData: makeSelectExtendedFields(),
});
```

## Memoization Decision Tree

```
Need memoization?
├── Redux state derivation?
│   └── Reselect createSelector (always)
├── Expensive computation from props?
│   └── useMemo with dependency array
├── Callback passed to child component?
│   └── useCallback (only if child uses React.memo or is in a list)
├── Entire component re-rendering unnecessarily?
│   └── React.memo (rare — prove it's needed first)
└── Simple prop or state value?
    └── No memoization needed
```

## Do Not Over-Memoize

The codebase does NOT memoize aggressively. Simple operations are left unmemoized. Only use memoization when:
- You can measure a performance improvement
- The computation is genuinely expensive
- The value is passed as a dependency to effects or child components

See also: [[04-components/anatomy]], [[13-performance/patterns]]
