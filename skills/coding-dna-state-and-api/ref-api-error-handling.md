# API Error Handling

## Error Flow

```
API call fails
├── Network error / timeout → catch block → showError() + FAILURE dispatch
├── HTTP 401 → redirectIfUnauthenticated() → redirect to login
├── HTTP 4xx/5xx → checkStatus passes through → business logic handles
├── Response body has errors[] → showError() notification → saga checks res.success
└── Response body has success: false → showError() notification → saga dispatches FAILURE
```

## Notification System

```javascript
function showError(error, status) {
  const capNotificationSeverityType =
    Math.floor(status / 100) === 4
      ? CapNotification.info     // 4xx → info level
      : CapNotification.error;   // 5xx → error level

  let message = error.message;
  if (typeof error.message === 'object') {
    message = error.message.errorMessage;
  }
  message = message || 'An error occurred with the API';

  capNotificationSeverityType({ message });
}
```

- **4xx errors** → `CapNotification.info` (blue, informational)
- **5xx errors** → `CapNotification.error` (red, critical)
- Notifications use Ant Design's notification system via `@capillarytech/cap-ui-library`

## 401 Handling (Automatic Redirect)

```javascript
function redirectIfUnauthenticated(response) {
  const isUnauthorized = response.status === 401;
  if (isUnauthorized) {
    if (isProd) {
      removeAuthenticationDetais();
      window.location = `${originUrl}${config.production.logout_url}`;
    } else {
      removeAuthenticationDetais();
      window.location = `${config.development.login_url}`;
    }
  }
}
```

All auth data is cleared from localStorage before redirect.

## Saga-Level Error Handling

```javascript
export function* uploadBulkConfig({ bulkConfigFile, callback }) {
  try {
    const res = yield call(Api.uploadBulkConfig, { bulkConfigFile });
    if (res?.success) {
      yield put({ type: types.UPLOAD_BULK_CONFIG_SUCCESS, result: res.result });
    } else {
      yield put({
        type: types.UPLOAD_BULK_CONFIG_FAILURE,
        error: res?.error || res?.message,
      });
    }
    if (callback) callback(res);
  } catch (error) {
    notifyHandledException(error);  // Send to Bugsnag
    yield put({ type: types.UPLOAD_BULK_CONFIG_FAILURE, error });
  }
}
```

### Two Error Paths

1. **API returns `success: false`**: `else` branch dispatches FAILURE with error message from response
2. **Network/unexpected error**: `catch` block sends to Bugsnag + dispatches FAILURE

## Bugsnag Integration

```javascript
// utils/bugsnag.js
export const notifyHandledException = error => {
  bugsnagClient.notify(error, {
    user: { id: userId, name: userName, email: userEmail },
    metaData: { orgId, currentOrgName },
  });
};
```

- Bugsnag receives all caught exceptions from sagas
- Diagnostic data includes user ID, org ID, org name
- Skips reporting on nightly/non-production environments

## Error Boundary (Component Level)

```javascript
// utils/withErrorBoundary.js
export default (WrappedComponent, options) => {
  return (props) => (
    <ErrorBoundaryWrapper
      showImage={options?.showImage}
      useSlideBox={options?.useSlideBox}
      onError={notifyHandledException}
    >
      <WrappedComponent {...props} />
    </ErrorBoundaryWrapper>
  );
};
```

Wraps components to catch render errors. Falls back to error UI with refresh button.

## Timeout Handling

```javascript
function fetchWithTimeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject({
        message: 'Request timeout',
        errorLocation: window.location.href,
      });
    }, ms);
    promise.then(resolve, reject);
  });
}
```

Default timeout: 180,000ms (3 minutes). Custom per endpoint.

See also: [[06-api/client-setup]], [[06-api/response-handling]], [[10-error-handling/strategy]]
