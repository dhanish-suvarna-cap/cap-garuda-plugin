# Error Handling Strategy

## Error Layers

```
Layer 1: API Client (request function)
├── Timeout → reject with { message: 'Request timeout' }
├── HTTP 401 → redirect to login
├── HTTP 4xx/5xx → pass through + show notification
└── Network error → catch block + show notification

Layer 2: Redux-Saga
├── res.success === false → dispatch FAILURE action + optional notification
├── Exception caught → notifyHandledException (Bugsnag) + dispatch FAILURE
└── Callback to component → if (callback) callback(res)

Layer 3: Component
├── FAILURE status → show error UI (inline error, error state component)
├── Error boundary → catch render errors → show fallback UI
└── Validation errors → inline error messages

Layer 4: Global
├── Error boundaries → catch uncaught render errors
└── Bugsnag → capture and report all handled exceptions
```

## Error Boundary Components

### ErrorBoundaryWrapper

Located at `webapp/app/components/molecules/ErrorBoundaryWrapper/ErrorBoundaryWrapper.js`:

- Wraps `CapErrorBoundary` from cap-ui-library
- Props: `showImage`, `useSlideBox`, `isApiError`, `onRefreshClick`, `onCloseSlideBox`
- On error: calls `notifyHandledException` (Bugsnag)
- Fallback: Error illustration with refresh button

### withErrorBoundary HOC

Located at `webapp/app/utils/withErrorBoundary.js`:

```javascript
export default (WrappedComponent, options) => (props) => (
  <ErrorBoundaryWrapper
    showImage={options?.showImage}
    useSlideBox={options?.useSlideBox}
    onError={notifyHandledException}
  >
    <WrappedComponent {...props} />
  </ErrorBoundaryWrapper>
);
```

Usage:
```javascript
export default withErrorBoundary(injectIntl(withStyles(Component, styles)));
```

## Error Logging: Bugsnag

```javascript
// utils/bugsnag.js
import bugsnag from '@bugsnag/js';

const bugsnagClient = bugsnag({
  apiKey: BUGSNAG_API_KEY,
  appVersion: BUGSNAG_APP_VERSION,
  releaseStage: cluster,
});

export const notifyHandledException = error => {
  try {
    const { id, firstName, lastName, loginName } = JSON.parse(
      window.localStorage.getItem('user'),
    );
    bugsnagClient.notify(error, {
      user: { id, name: `${firstName} ${lastName}`, email: loginName },
      metaData: { orgId, currentOrgName },
    });
  } catch {
    bugsnagClient.notify(error);
  }
};
```

- Reports to Bugsnag with user context (ID, name, email, org)
- Skips nightly/non-production environments
- Called from saga catch blocks and error boundaries

## User-Facing Error Patterns

### Toast Notifications (CapNotification)

```javascript
// 4xx errors → info level (blue)
CapNotification.info({ message: 'Validation failed' });

// 5xx errors → error level (red)
CapNotification.error({ message: 'Server error occurred' });
```

### Error State Components

```javascript
// LdsErrorState — full-page error with SVG illustration
<LdsErrorState message="Something went wrong" />

// LdsNoDataState — empty state
<LdsNoDataState message="No data found" />
```

### Inline Validation Errors

```javascript
<CapInput
  className={hasError ? 'error-border' : ''}
  value={value}
/>
{hasError && <CapError>{errorMessage}</CapError>}
```

### Loading States

Three-state pattern in selectors:

```javascript
const { data, status, error } = useConnect(makeSelectData());

if (status === REQUEST) return <CustomSkeleton />;
if (status === FAILURE) return <LdsErrorState message={error} />;
return <DataView data={data} />;
```

See also: [[06-api/error-handling]], [[10-error-handling/error-types]], [[10-error-handling/user-feedback]]
