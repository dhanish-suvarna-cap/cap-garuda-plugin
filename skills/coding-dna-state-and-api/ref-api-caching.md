# API Caching

## No Library-Based Caching

This codebase does NOT use React Query, SWR, or RTK Query. There are no query keys or stale time configurations.

## Caching Strategies Used

### 1. Request De-duplication (StatusController)

Prevents duplicate in-flight requests:

```javascript
class StatusController {
  constructor() {
    this.currentApiStatus = {};
    this.ApiFailureCount = {};
  }

  executablePermission(requestConstant) {
    if (this.setApiStatus(requestConstant)) return true;
    return false;
  }

  setApiStatus(requestConstant) {
    if (this.currentApiStatus[requestConstant]) return false;
    this.currentApiStatus[requestConstant] = true;
    return true;
  }

  removeApiStatus(requestConstant) {
    delete this.currentApiStatus[requestConstant];
  }
}

export const Status = new StatusController();
```

Usage in sagas:
```javascript
const executablePermission = Api.Status.executablePermission(types.RECONFIGURE_REQUEST);
if (executablePermission) {
  try {
    const res = yield call(Api.reconfigureProgram, params);
    // ...
  } finally {
    Api.Status.removeApiStatus(types.RECONFIGURE_REQUEST);
  }
}
```

### 2. Cache Busting via Timestamp

Every request gets a timestamp query parameter:

```javascript
fetchUrl = url.indexOf('?') !== -1
  ? `${url}&time=${Date.now()}`
  : `${url}?time=${Date.now()}`;
```

This prevents browser-level HTTP caching.

### 3. Redux Store as Cache

Data fetched from APIs lives in the Redux store for the duration of the session. Components check if data exists before re-fetching:

```javascript
// Saga checks status before fetching
if (state.get('listStatus') !== SUCCESS) {
  // Fetch from API
}
```

### 4. Server-Side Cache Invalidation

```javascript
export const clearRulesetsCache = ({ programId, eventType }) => {
  const url = `${API_ENDPOINT}/workflows/clear-rulesets-cache/${programId}/${eventType}`;
  return request(url, getAPICallObject('GET'));
};
```

Explicit cache-clearing API calls when data is known to be stale.

### 5. Failure Count Tracking

```javascript
setApiFailureCount(requestConstant) {
  this.ApiFailureCount[requestConstant] =
    this.ApiFailureCount[requestConstant] + 1 || 1;
}
```

Tracks how many times a specific API call has failed, enabling conditional retry logic.

See also: [[06-api/client-setup]], [[05-state/server-state]]
