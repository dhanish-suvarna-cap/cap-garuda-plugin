# Performance — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Import Entire Libraries

- **Anti-pattern**: `import _ from 'lodash'` or `import { Button } from 'antd'`
- **Why**: Pulls in the entire library, bloating the bundle.
- **Instead**: Per-module imports: `import debounce from 'lodash/debounce'`, `import CapButton from '@capillarytech/cap-ui-library/CapButton'`

## Do Not Skip Lazy Loading for Pages

- **Anti-pattern**: Statically importing a page component in routes
- **Why**: All pages should be code-split to reduce initial bundle size.
- **Instead**: Use `loadable(() => import('../PageComponent'))` in route definitions.

## Do Not Render Large Lists Without Virtualization

- **Anti-pattern**: `.map()` over 100+ items rendering DOM nodes for each
- **Why**: Causes scroll jank and high memory usage.
- **Instead**: Use `react-window` (`FixedSizeList` or `VariableSizeList`).

## Do Not Add Heavy Dependencies Without Checking Bundle Impact

- **Anti-pattern**: `npm install moment-with-locales` or adding large charting libraries
- **Why**: Bundle limit is 2MB. Every KB counts.
- **Instead**: Run `npm run analyze` after adding dependencies. Check tree-shaking compatibility.

## Do Not Memoize Simple Operations

- **Anti-pattern**: `useMemo(() => a + b, [a, b])`
- **Why**: Memoization has overhead. Only worth it for expensive computations.
- **Instead**: Compute inline. Reserve `useMemo` for array transforms, object constructions, or values passed to child component props.

## Do Not Create Synchronous Blocking Operations

- **Anti-pattern**: Deep recursive calculations in render path
- **Why**: Blocks the main thread, causing UI freezes.
- **Instead**: Use `useMemo` for heavy computations, or move to a web worker if truly CPU-intensive.
