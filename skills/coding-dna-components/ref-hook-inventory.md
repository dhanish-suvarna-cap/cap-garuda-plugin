# Custom Hook Inventory

## Complete List

| Hook | Location | Purpose | Returns |
|---|---|---|---|
| `usePersistantState` | `webapp/app/utils/usePersistantState.js` | Syncs React state with localStorage | `{ setValue, getValue, resetState, resetAll }` |
| `useInterval` | `webapp/app/lib/CustomHooks/useInterval/useInterval.js` | Declarative setInterval with cleanup | `void` |
| `useDidMountEffect` | `webapp/app/components/organisms/Creatives/useDidMountEffect.js` | Runs effect only after initial mount | `void` |

## Detailed Descriptions

### usePersistantState

**Purpose**: Maintains state that persists across browser refreshes via localStorage.

**Usage**:
```javascript
import usePersistantState from 'utils/usePersistantState';

const { setValue, getValue, resetState, resetAll } = usePersistantState({
  filters: { status: 'active' },
  page: 1,
});

// Set a value (persists to localStorage)
setValue('filters', { status: 'inactive' });

// Get a value
const currentFilters = getValue('filters');

// Reset single key
resetState('filters');

// Reset all
resetAll();
```

### useInterval

**Purpose**: Declarative interval that properly handles callback updates and cleanup.

**Usage**:
```javascript
import useInterval from 'lib/CustomHooks/useInterval';

// Run every 1000ms
useInterval(() => {
  setCount(c => c + 1);
}, 1000);

// Pass null to stop
useInterval(callback, isRunning ? 1000 : null);
```

### useDidMountEffect

**Purpose**: Like `useEffect` but skips the initial render. Useful when you want to react to changes but not the initial mount.

**Usage**:
```javascript
import useDidMountEffect from './useDidMountEffect';

useDidMountEffect(() => {
  // This runs only when deps change AFTER initial mount
  fetchData(searchTerm);
}, [searchTerm]);
```

## Standard React Hooks Usage

Beyond custom hooks, the codebase uses standard React hooks:

| Hook | Usage Count (approx) | Pattern |
|---|---|---|
| `useState` | 1200+ instances | Local UI state |
| `useEffect` | 800+ instances | Side effects, data initialization |
| `useMemo` | 95+ instances | Derived/computed values |
| `useCallback` | 30+ instances | Callback stabilization |
| `useRef` | 50+ instances | DOM refs, mutable values |
| `useContext` | 20+ instances | Feature-specific contexts |

See also: [[08-hooks/conventions]], [[08-hooks/effect-patterns]]
