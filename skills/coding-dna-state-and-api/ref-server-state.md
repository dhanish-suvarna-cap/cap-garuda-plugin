# Server State

## Pattern: Redux-Saga (NOT React Query)

All server data flows through this pipeline:

```
Component dispatches REQUEST action
  → Saga catches with takeLatest
    → Saga calls API function
      → API response goes to SUCCESS/FAILURE action
        → Reducer updates Immutable.js state
          → Selector reads from store
            → Component receives via connect/mapStateToProps
```

## Saga Pattern

```javascript
// saga.js
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from 'services/api';
import * as types from './constants';
import { notifyHandledException } from 'utils/bugsnag';

export function* getExtendedFields({ extendedField, programId, callback }) {
  try {
    const res = yield call(Api.getExtendedFields, extendedField, programId);
    if (res?.success) {
      yield put({
        type: types.GET_EXTENDED_FIELDS_SUCCESS,
        result: res?.result[extendedField],
      });
    } else {
      yield put({
        type: types.GET_EXTENDED_FIELDS_FAILURE,
        error: res?.status?.message || res?.message,
      });
    }
    if (callback) callback(res);
  } catch (error) {
    notifyHandledException(error);
    yield put({ type: types.GET_EXTENDED_FIELDS_FAILURE, error });
  }
}

export function* watchGetExtendedField() {
  yield takeLatest(types.GET_EXTENDED_FIELDS_REQUEST, getExtendedFields);
}

export default function*() {
  yield all([watchGetExtendedField()]);
}
```

### Saga Conventions

1. **Worker generator**: Named after the action (`getExtendedFields`)
2. **Watcher generator**: `watchXxx` with `takeLatest`
3. **Default export**: Anonymous generator with `yield all([...watchers])`
4. **Error handling**: try/catch with `notifyHandledException` (Bugsnag) + FAILURE dispatch
5. **Callback invocation**: `if (callback) callback(res)` for component-level handling
6. **Response check**: `if (res?.success)` — API responses have a `success` boolean

### Saga Effects Used

| Effect | Usage |
|---|---|
| `takeLatest` | Standard — cancels previous if new request comes in |
| `call` | Invoke API functions |
| `put` | Dispatch Redux actions |
| `all` | Run multiple watchers in parallel |
| `select` | Read from Redux store within a saga (less common) |

## Request De-duplication

Via `StatusController` singleton:

```javascript
// In saga
const executablePermission = Api.Status.executablePermission(types.REQUEST_TYPE);
if (executablePermission) {
  try {
    const res = yield call(Api.someEndpoint, params);
    // ...
  } finally {
    Api.Status.removeApiStatus(types.REQUEST_TYPE);
  }
}
```

This prevents duplicate in-flight requests for the same action type.

## Pagination Pattern

### Offset-Based (Lazy Loading)

```javascript
// Reducer tracks pagination state
case types.GET_ALL_DATA_REQUEST: {
  if (action.isLazyLoading) {
    return state.set('lazyLoading', REQUEST);
  }
  return state
    .set('listStatus', REQUEST)
    .set('pageDetails', fromJS([]));
}

case types.GET_ALL_DATA_SUCCESS: {
  return state
    .set('listStatus', SUCCESS)
    .set('listData', fromJS(action.data))
    .set('pageDetails', fromJS(action.pageDetails))
    .set('stopPagination', isEmpty(action.data))
    .set('lazyLoading', SUCCESS);
}
```

### Saga Pagination Loop

```javascript
export function* getAuditLogs({ payload }) {
  let offset = 0;
  let currentLogs = [];
  do {
    const newPayload = { ...payload, offset };
    const res = yield call(Api.getAuditLogs, newPayload);
    currentLogs = res?.result || [];
    offset += 1;
  } while (currentLogs.length > 0 && currentLogs.length % (limit - 1) === 0);
}
```

## No React Query / SWR

Server state is managed entirely through Redux-Saga. There are no query keys, stale times, or cache invalidation patterns from data-fetching libraries.

See also: [[05-state/global-state]], [[06-api/client-setup]], [[06-api/caching]]
