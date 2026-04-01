# Hook Conventions

## Custom Hook Naming

All custom hooks follow React convention: `useXxx`

| Hook | File | Pattern |
|---|---|---|
| `usePersistantState` | `utils/usePersistantState.js` | `use` + Adjective + Noun |
| `useInterval` | `lib/CustomHooks/useInterval/useInterval.js` | `use` + Noun |
| `useDidMountEffect` | `components/organisms/Creatives/useDidMountEffect.js` | `use` + LifecycleEvent + Effect |

## Return Type Patterns

### Object Return (For Multiple Values)

```javascript
// usePersistantState returns an object
const { setValue, getValue, resetState, resetAll } = usePersistantState(initialState);
```

### Void Return (For Side Effects)

```javascript
// useInterval returns nothing — it just runs a side effect
useInterval(callback, 1000);

// useDidMountEffect returns nothing
useDidMountEffect(() => {
  console.log('deps changed');
}, [dep1, dep2]);
```

## Parameter Patterns

### Single Config Object

```javascript
const usePersistantState = (initialState) => { ... };
```

### Positional Arguments

```javascript
const useInterval = (callback, delay) => { ... };
const useDidMountEffect = (func, deps) => { ... };
```

## useEffect Patterns

### Cleanup Pattern

```javascript
// useInterval: interval with cleanup
useEffect(() => {
  if (delay !== null) {
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }
}, [delay]);
```

### Ref + Effect Pattern (Dan Abramov's useInterval)

```javascript
const savedCallback = useRef();

// Save latest callback to ref
useEffect(() => {
  savedCallback.current = callback;
}, [callback]);

// Set up interval using ref
useEffect(() => {
  function tick() {
    savedCallback.current();
  }
  if (delay !== null) {
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }
}, [delay]);
```

### Skip-First-Render Pattern

```javascript
// useDidMountEffect: skip initial mount, run only on subsequent changes
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
```

## Error Handling in Hooks

### Try-Catch for External Operations

```javascript
// usePersistantState: try-catch around localStorage
const getValue = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return undefined;
  }
};
```

### Null Guard for Optional Params

```javascript
// useInterval: null delay stops the interval
if (delay !== null) {
  const id = setInterval(tick, delay);
  return () => clearInterval(id);
}
```

## Hooks vs HOCs

This codebase **favors HOCs over custom hooks** for cross-cutting concerns:

| Concern | Pattern Used | Why |
|---|---|---|
| Styling | `withStyles` HOC | Applies CSS template to component |
| i18n | `injectIntl` HOC | Injects `intl` prop |
| Redux state | `connect()` HOC | Maps state/dispatch to props |
| Error boundary | `withErrorBoundary` HOC | Wraps in error boundary |
| Dynamic loading | `withDynamicLazyLoading` HOC | Suspense + skeleton |

Custom hooks are used sparingly, only for:
- Timer utilities (`useInterval`)
- Persistent state (`usePersistantState`)
- Lifecycle workarounds (`useDidMountEffect`)

See also: [[08-hooks/inventory]], [[08-hooks/effect-patterns]]
