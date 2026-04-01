---
description: Capillary UI coding DNA — state management, Redux-Saga, API integration, auth, form handling
triggers:
  - "state management"
  - "Redux pattern"
  - "Redux-Saga"
  - "Immutable.js"
  - "Reselect"
  - "API call"
  - "fetch data"
  - "server state"
  - "form handling"
  - "authentication"
  - "RBAC"
  - "protected route"
  - "request pattern"
  - "response handling"
  - "error handling API"
  - "caching"
  - "three-state pattern"
---

# Coding DNA: State Management & API

Capillary-wide standards for state management, Redux patterns, API integration, and authentication.

## State Decision Tree

```
Is it UI-only state (modal, toggle, form input)?
  └─ Single component? → useState
  └─ Shared between siblings? → lift to parent
  └─ Feature-wide? → React Context

Is it server/API data?
  └─ Redux + Saga (ALWAYS)

Needs to survive navigation?
  └─ Redux store

Needs to persist across sessions?
  └─ usePersistantState (localStorage-backed)

Derived from other state?
  └─ useMemo or Reselect selector

URL-driven (filters, pagination)?
  └─ Manual query parameters (React Router v5)
```

**NOT used**: React Query, SWR, Redux Toolkit, zustand, jotai/recoil, MobX, Formik, React Hook Form.

## Redux Three-State Pattern (Mandatory)

Every async operation MUST have REQUEST/SUCCESS/FAILURE:

```js
// constants.js
export const FETCH_DATA_REQUEST = 'garuda/MyOrg/FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'garuda/MyOrg/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'garuda/MyOrg/FETCH_DATA_FAILURE';

// reducer.js — handle all three
case FETCH_DATA_REQUEST:
  return state.set('loading', true).set('error', null);
case FETCH_DATA_SUCCESS:
  return state.set('loading', false).set('data', fromJS(action.payload));
case FETCH_DATA_FAILURE:
  return state.set('loading', false).set('error', action.error);
```

## Saga Pattern (Server State)

```js
// saga.js
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from 'services/api';
import { notifyHandledException } from 'utils/bugsnag';

function* fetchDataWorker(action) {
  try {
    const res = yield call(Api.fetchData, action.payload);
    if (res?.success) {
      yield put(fetchDataSuccess(res.data));
      if (action.callback) action.callback(res.data);
    } else {
      yield put(fetchDataFailure(res?.errors));
    }
  } catch (error) {
    notifyHandledException(error);
    yield put(fetchDataFailure(error));
  }
}

function* myOrgSaga() {
  yield all([takeLatest(FETCH_DATA_REQUEST, fetchDataWorker)]);
}
```

**Key rules:**
- `takeLatest` for fetches (cancels previous), `takeEvery` for fire-and-forget
- ALWAYS try-catch with `notifyHandledException`
- Check `res?.success` before dispatching SUCCESS
- Support callback pattern: `if (action.callback) action.callback(res.data)`

## API Client Setup

- **HTTP client**: Native fetch (whatwg-fetch polyfill), NOT axios
- **All API functions**: Single file `services/api.js`
- **Endpoint URLs**: `config/endpoints.js`
- **Request builder**: `getAPICallObject()` in `requestConstructor.js` — adds auth headers, org ID, user ID automatically
- **Timeout**: Default 3 minutes, custom per endpoint
- **Cache busting**: Every request appends `time=${Date.now()}`

### API Function Patterns

```js
// services/api.js
// GET single
export const getProgramById = (id) =>
  request(getAryaAPICallObject('GET', `${endpoints.PROGRAM}/${id}`));

// GET list with params
export const getPrograms = (queryParams) =>
  request(getAryaAPICallObject('GET', `${endpoints.PROGRAMS}?${buildQuery(queryParams)}`));

// POST create
export const createProgram = (payload) =>
  request(getAryaAPICallObject('POST', endpoints.PROGRAMS, payload));

// POST upload (FormData)
export const uploadConfig = ({ file }) =>
  request(getAryaAPICallObject('POST', endpoints.UPLOAD, file, true)); // isFileUpload=true
```

### Response Shape

```json
{
  "success": true,
  "result": { /* data */ },
  "status": { "code": 200, "message": "OK" },
  "errors": null
}
```

### Error Handling Flow

```
API returns → Status code check:
  401 → Auto-redirect to login (clearAuth + redirect)
  4xx → Pass through, saga dispatches FAILURE, UI shows info toast (blue)
  5xx → Pass through, saga dispatches FAILURE, UI shows error toast (red)
  Network error → Catch, Bugsnag notify, FAILURE dispatch
```

## Form State (Manual Pattern)

```js
const [formData, setFormData] = useState({ name: '', type: '' });
const [errors, setErrors] = useState({});

const handleFieldChange = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  setErrors(prev => ({ ...prev, [field]: undefined })); // clear field error
};

const validate = () => {
  const newErrors = {};
  if (!formData.name) newErrors.name = 'Required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (validate()) {
    dispatch(createAction(formData, (response) => {
      if (response.success) showSuccess();
    }));
  }
};
```

**NO Formik, NO React Hook Form** — manual useState + Ant Design Form components.

## Authentication

- **Token**: JWT Bearer in localStorage
- **Storage keys**: token, orgID, user, isLoggedIn, ouId
- **Auth headers**: Injected automatically by requestConstructor.js — NEVER add manually
- **401 handling**: Auto-redirect to login, clear localStorage
- **No token refresh**: On expiry, full re-auth required
- **Route protection**: `connectedRouterRedirect` from redux-auth-wrapper
- **RBAC**: `RoleBasedAuth` component checks `accessiblePermissions`

## Do-Nots

- Don't use React Query/SWR — use Redux-Saga
- Don't mutate Immutable.js state — always return `.set()` result
- Don't use useSelector/useDispatch — use connect + mapStateToProps
- Don't create global state for single-component data — use useState
- Don't skip three-state pattern — always REQUEST/SUCCESS/FAILURE
- Don't store derived state — use Reselect or useMemo
- Don't call API functions directly from components — use Saga
- Don't use axios in frontend — use fetch via request()
- Don't hardcode API URLs — use endpoint variables
- Don't add Authorization headers manually — injected automatically
- Don't store tokens in Redux state — use localStorage + authWrapper

## Reference Files

- `ref-state-decision-tree.md` — Full state management flowchart
- `ref-global-state.md` — Redux patterns, Immutable.js, Reselect, dynamic injection
- `ref-local-state.md` — useState patterns, common UI state
- `ref-server-state.md` — Saga pipeline, takeLatest/takeEvery, pagination
- `ref-form-state.md` — Manual form handling, validation, callbacks
- `ref-url-state.md` — Query params, React Router v5 params
- `ref-state-donts.md` — State anti-patterns
- `ref-api-client-setup.md` — HTTP client, request constructor, endpoints
- `ref-api-request-patterns.md` — GET/POST/PUT/DELETE patterns
- `ref-api-response-handling.md` — Response shape, status codes, JSON parsing
- `ref-api-error-handling.md` — Error flow, Bugsnag, notifications
- `ref-api-caching.md` — Cache strategies, de-duplication
- `ref-api-donts.md` — API anti-patterns
- `ref-auth-flow.md` — JWT auth, localStorage, login/logout
- `ref-role-access.md` — RBAC, permissions, conditional rendering
- `ref-protected-routes.md` — Route guards, permission pages
- `ref-auth-donts.md` — Auth anti-patterns
