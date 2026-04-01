# useEffect Patterns

## Mount-Only Effect (Empty Deps)

```javascript
useEffect(() => {
  // Initialize data, set up subscriptions
  dispatch(fetchInitialData());
}, []);
```

## Cleanup Pattern

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setPercent(prev => prev - step);
  }, intervalMs);

  return () => clearInterval(interval);
}, []);
```

## Dependency-Driven Effect

```javascript
useEffect(() => {
  if (programId) {
    dispatch(fetchProgramDetails(programId));
  }
}, [programId]);
```

## use-deep-compare-effect

For effects with object/array dependencies that change reference but not value:

```javascript
import useDeepCompareEffect from 'use-deep-compare-effect';

useDeepCompareEffect(() => {
  // Runs only when config deeply changes
  updateConfiguration(config);
}, [config]);
```

Package: `use-deep-compare-effect` v1.8.1

## Dependency Array Conventions

1. **Always include all dependencies** — ESLint `react-hooks/recommended` is enabled
2. **Primitive deps preferred** — Avoid objects/arrays as deps when possible
3. **Use `useDeepCompareEffect`** when object deps are unavoidable
4. **Null guard inside effect** — Check values before using:

```javascript
useEffect(() => {
  if (data && data.length > 0) {
    processData(data);
  }
}, [data]);
```

## Anti-Patterns to Avoid

### Do Not Fetch Data in useEffect

```javascript
// WRONG — use Redux-Saga instead
useEffect(() => {
  fetch('/api/data').then(res => setData(res.json()));
}, []);

// CORRECT — dispatch action, saga handles fetch
useEffect(() => {
  dispatch(fetchDataRequest(params));
}, [params]);
```

### Do Not Set State During Render

```javascript
// WRONG
if (condition) {
  setCount(count + 1); // Causes infinite loop
}

// CORRECT — use useEffect or useMemo
useEffect(() => {
  if (condition) setCount(count + 1);
}, [condition]);
```

See also: [[08-hooks/conventions]], [[08-hooks/inventory]]
