# Performance Patterns

## Code Splitting & Lazy Loading

### Route-Level Splitting (Primary)

All page-level components are lazy-loaded via `loadable`:

```javascript
import { loadable } from '@capillarytech/cap-ui-utils';

const routes = [
  {
    component: loadable(() => import('../Dashboard')),
    path: `${publicPath}/`,
  },
  {
    component: loadable(() => import('../Promotions')),
    path: `${publicPath}/promotions/list`,
  },
];
```

### React.lazy with Suspense

For component-level lazy loading:

```javascript
const Capping = React.lazy(() => import('../CappingSlidebox'));

// Wrapped in Suspense
<Suspense fallback={<CenteredSkeleton width="90vw" height="90vh" />}>
  <Capping />
</Suspense>
```

### withDynamicLazyLoading HOC

```javascript
// utils/withDynamicLazyLoading.js
import { loadable } from '@capillarytech/cap-ui-utils';

export default (importFn) => {
  const LazyComponent = loadable(importFn);
  return (props) => (
    <Suspense fallback={<CenteredSkeleton width="90vw" height="90vh" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
```

Dedicated lazy-load wrappers exist:
- `PromotionListLazyLoad`
- `PromotionCalendarLazyLoad`

## Bundle Optimization

### Webpack Split Chunks

```javascript
// Production config
splitChunks: {
  cacheGroups: {
    vendor: {
      test: /node_modules/,
      // Special handling for @capillarytech packages
    },
    main: { minChunks: 5, reuseExistingChunk: true },
    common: { minChunks: 3, priority: -20, async: true },
  },
}
```

### Compression

- **Gzip**: `compression-webpack-plugin` for `.js`, `.css`, `.html`
- **Brotli**: `brotli-webpack-plugin` available
- **Runtime gzip**: nginx `gzip_static on`
- **API responses**: Pako decompression for compressed API responses

### Tree Shaking

- `sideEffects: true` in webpack prod config
- `concatenateModules: true` (scope hoisting)
- Lodash per-method imports + `babel-plugin-lodash`
- Ant Design component-level imports via `babel-plugin-import`

### Build Performance

- `esbuild-loader` for fast JS transpilation (target: es2015)
- `thread-loader` for parallel babel processing of @capillarytech packages
- `ESBuildPlugin` minimizer instead of Terser

## Memoization

### Reselect (Redux Selectors)

```javascript
const makeSelectData = () =>
  createSelector(selectDomain, substate => ({
    data: substate.get('data'),
    status: substate.get('status'),
  }));
```

All Redux selectors use Reselect for memoized derivation.

### React.memo (5 Components)

- `CustomTreeHelper.js`
- `ImageUploadMolecule.js`
- `ContentPreviews.js`
- `CustomTree.js`
- `AddPointsAllocationLimitDetails.js`

### useMemo (~95 Instances)

For expensive computations from props/state.

## Virtualization

### react-window

Used for long scrollable lists:

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

Found in: `CreatePromotionForm.js`, `ConfigureWorkflows.js`

### react-intersection-observer

Lazy rendering as elements enter viewport:

```javascript
import { useInView } from 'react-intersection-observer';

const { ref, inView } = useInView({ triggerOnce: true });

<div ref={ref}>
  {inView && <ExpensiveComponent />}
</div>
```

## Debounce/Throttle

### lodash debounce

```javascript
import debounce from 'lodash/debounce';

// In utils/commonUtils.js
export const debounceUtil = (fn, timeout) => debounce(fn, timeout);

// Usage in components
const debouncedSearch = debounce(handleSearch, 300);
```

Found in: `BulkConfigurations.js`, `PromotionsDetail.js`, `WorkflowConfigurationSection.js`, `AddPointsAllocationLimitSlider.js`

## Module Federation

Exposed as micro-frontend:

```javascript
// webpack ModuleFederationPlugin
name: 'LoyaltyUI_MFE',
filename: 'remoteEntry.js',
shared: {
  'react': { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
  'react-router-dom': { singleton: true, eager: true },
}
```

## Bundle Size Monitoring

- `size-limit` configured: main bundle must be < 2MB
- `webpack-bundle-analyzer` available via `npm run analyze`
- CircularDependencyPlugin warns about circular imports in dev

## No Web Workers

Web Workers are not used in this codebase.

## Image Handling

- SVG files loaded via `svg-url-loader` (inline as data URIs)
- Raster images via `url-loader` (inline below threshold) / `file-loader`
- AVIF format supported in webpack config
- No image optimization library (no sharp, no next/image)
