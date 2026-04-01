---
description: Capillary UI coding DNA — error handling, git workflow, accessibility, performance optimization
triggers:
  - "error handling"
  - "error boundary"
  - "Bugsnag"
  - "notifyHandledException"
  - "toast notification"
  - "CapNotification"
  - "git workflow"
  - "branch naming"
  - "commit message"
  - "pre-commit hook"
  - "accessibility"
  - "ARIA"
  - "a11y"
  - "performance"
  - "code splitting"
  - "lazy loading"
  - "bundle size"
  - "virtualization"
  - "react-window"
---

# Coding DNA: Quality — Errors, Git, Accessibility, Performance

Capillary-wide standards for error handling, git workflow, accessibility, and performance.

## Error Handling Strategy

### Four Error Layers

1. **API Client Layer** (services/api.js)
   - Timeout → reject promise
   - 401 → auto-redirect to login (clearAuth)
   - 4xx/5xx → pass through to saga
   - Network error → catch, return error

2. **Redux-Saga Layer**
   - Check `res?.success` → dispatch SUCCESS or FAILURE
   - Exception catch → `notifyHandledException(error)` + FAILURE dispatch

3. **Component Layer**
   - FAILURE state → show error UI (toast, inline error, empty state)
   - Error boundary → catches render errors, shows fallback

4. **Global Layer**
   - Error boundaries at feature level
   - Bugsnag captures all exceptions (production)

### User Feedback Decision Table

| Scenario | UI Pattern |
|----------|-----------|
| API fails (4xx) | Toast: `CapNotification.info()` (blue) |
| API fails (5xx) | Toast: `CapNotification.error()` (red) |
| Form validation | Inline: error border + CapError text |
| Render error | Error boundary: fallback UI + refresh button |
| Empty data | Empty state illustration (LdsNoDataState) |
| Loading | Skeleton (CustomSkeleton) or spinner (CapSpin) |
| Permission denied | Full page: PermissionDeniedPage |
| 404 | Full page: NotFoundPage |
| 401 | Auto-redirect to login |

### Bugsnag Integration

```js
import { notifyHandledException } from 'utils/bugsnag';

// In saga catch blocks (ALWAYS):
catch (error) {
  notifyHandledException(error);
  yield put(fetchFailure(error));
}
```

- Reports to Bugsnag with user/org metadata
- Skips non-production environments
- NEVER use `console.error` in production — use `notifyHandledException`

### Error Boundary Pattern

```js
import withErrorBoundary from 'components/atoms/ErrorBoundaryWrapper';

// Wrap component:
export default withErrorBoundary(MyComponent);
```

## Git Workflow

### Branch Naming
- `CAP-XXXXXX` — ticket-based (most common)
- `Feature/CAP-XXXXXX` — feature branches
- `Bug/CAP-XXXXXX` — bug fix branches
- `CAP-XXXXXX/ownerName` — with author

### Commit Messages
- Format: `CAP-XXXXXX | Descriptive subject (#PR-number)`
- Tag pushes: `Tag push MAJOR MINOR PATCH`

### Pre-Commit Hooks
- **Gitleaks**: Scans for secrets (BLOCKS commit if found)
- **Husky + lint-staged**: ESLint fix + Prettier write on staged files
- **NEVER skip**: `--no-verify` defeats security scanning

### CI/CD
- GitHub Actions: Gitleaks on PRs
- Dependabot: Weekly npm updates
- SonarQube: Code quality analysis

## Accessibility

### ESLint-Enforced Rules
- `aria-props`: error (valid ARIA attributes)
- `label-has-associated-control`: error (form labels)
- `mouse-events-have-key-events`: error (keyboard parity)

### Patterns
- Semantic HTML via Cap* components (CapButton, CapInput, CapLabel)
- All text via `react-intl formatMessage` (internationalization = accessibility)
- Focus management handled by Ant Design (modals, drawers)
- Keyboard navigation via Ant Design components

### Known Gaps
- `click-events-have-key-events` is disabled
- No skip-to-content links
- No focus management on route changes

## Performance

### Code Splitting
- **Route-level**: `loadable()` for all pages (mandatory)
- **Component-level**: `React.lazy()` + `Suspense` for heavy components
- **HOC**: `withDynamicLazyLoading` for conditional heavy components

### Bundle Optimization
- **Size limit**: 2MB (enforced by size-limit)
- **Webpack split chunks**: vendor, main, common
- **Tree shaking**: enabled via sideEffects + concatenateModules
- **Lodash**: per-method imports + `babel-plugin-lodash`
- **Ant Design**: component imports + `babel-plugin-import`
- **Esbuild**: esbuild-loader for faster builds

### Memoization
- **Reselect**: All Redux selectors (primary memoization)
- **useMemo**: Expensive computations (~95 instances)
- **React.memo**: Rare (5 components) — prove need first

### Virtualization
- **react-window**: `FixedSizeList`, `VariableSizeList` for 100+ items
- **react-intersection-observer**: Lazy render on viewport entry

### Debounce/Throttle
- `lodash/debounce` for search inputs, type-ahead
- Typically 300ms delay

## Do-Nots

### Error Handling
- Don't swallow errors silently — at minimum, Bugsnag
- Don't show raw error messages — use i18n messages
- Don't use console.error in production — use notifyHandledException
- Don't throw errors from reducers — return state instead

### Git
- Don't commit secrets — Gitleaks blocks it
- Don't commit console.log — ESLint warns
- Don't skip pre-commit hooks — security and quality enforcement

### Accessibility
- Don't add mouse-only interactions — add keyboard equivalents
- Don't use non-semantic elements for buttons — use CapButton
- Don't hardcode text strings — use formatMessage

### Performance
- Don't import entire libraries — per-method imports
- Don't skip lazy loading for pages — use loadable()
- Don't render 100+ items without virtualization — use react-window
- Don't add heavy deps without bundle analysis — check size-limit
- Don't memoize simple operations — only expensive computations

## Reference Files

- `ref-error-strategy.md` — Full error handling architecture
- `ref-error-types.md` — Error shapes, status codes
- `ref-user-feedback.md` — Toast, skeleton, empty state patterns
- `ref-error-donts.md` — Error handling anti-patterns
- `ref-git-workflow.md` — Branch naming, commits, CI/CD, release
- `ref-git-donts.md` — Git anti-patterns
- `ref-a11y-patterns.md` — Accessibility ESLint rules, semantic HTML
- `ref-a11y-donts.md` — Accessibility anti-patterns
- `ref-perf-patterns.md` — Code splitting, virtualization, bundle optimization
- `ref-perf-donts.md` — Performance anti-patterns
