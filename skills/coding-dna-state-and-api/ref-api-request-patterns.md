# API Request Patterns

## All API Functions Live in One File

`webapp/app/services/api.js` — a single large file containing ALL API endpoint functions.

## Pattern by HTTP Method

### GET (Single Resource)

```javascript
export const getProgramById = programId => {
  const url = `${API_ENDPOINT}/programs/${programId}`;
  return request(url, getAPICallObject('GET'));
};
```

### GET (List)

```javascript
export const getPrograms = () => {
  const url = `${API_ENDPOINT}/programs`;
  return request(url, getAPICallObject('GET'), 180000);
};
```

### GET (With Query Params)

```javascript
export const getTier = (programId, includeNewChannels = true) => {
  const url = `${API_ENDPOINT}/strategy/tier/${programId}${
    includeNewChannels ? '?includeNewChannels=true' : ''
  }`;
  return request(url, getAPICallObject('GET'));
};
```

### GET (Paginated — Dynamic Params)

```javascript
export const getPaginatedTargetGroups = (queryParams = {}) => {
  let url = `${API_AUTH_ENDPOINT}/org-settings/target-groups/targets`;
  Object.keys(queryParams).map((item, index) => {
    url +=
      queryParams[item] != null
        ? `${index === 0 ? '?' : '&'}${item}=${queryParams[item]}`
        : '';
  });
  return request(url, getAPICallObject('GET'));
};
```

### POST (Create)

```javascript
export const createProgram = (program, isUpdateMode) => {
  const url = `${API_ENDPOINT}/programs`;
  const method = isUpdateMode ? 'PUT' : 'POST';
  return request(url, getAPICallObject(method, program));
};
```

### POST (Upsert with Path Param)

```javascript
export const upsertPointStrategy = ({ payload, programId }) => {
  const url = `${API_ENDPOINT}/strategy/points/${programId}`;
  return request(url, getAPICallObject('POST', payload));
};
```

### POST (File Upload)

```javascript
export const uploadBulkConfig = ({ bulkConfigFile }) => {
  const formData = new FormData();
  formData.append('file', bulkConfigFile);
  const url = `${API_ENDPOINT}/bulk-config/uploadBulkConfig`;
  return request(url, getAPICallObject('POST', formData, true));
};
```

### GET (Compressed Response)

```javascript
export const getCompressedTargetGroupsWithTargets = ({ limit, type, requiredPeriod }) => {
  const url = `${API_AUTH_ENDPOINT}/org-settings/target-groups/v2/targets?...`;
  const compressedData = request(url, getAPICallObject('GET'));
  return compressedData.then(data => {
    const { response = '' } = data || {};
    return { ...data, response: decompressJsonObject(response) };
  });
};
```

### GET (Cache Clear)

```javascript
export const clearRulesetsCache = ({ programId, eventType }) => {
  const url = `${API_ENDPOINT}/workflows/clear-rulesets-cache/${programId}/${eventType}`;
  return request(url, getAPICallObject('GET'));
};
```

## How API Functions Are Called (From Sagas)

```javascript
// In saga.js
import * as Api from 'services/api';

export function* getExtendedFields({ extendedField, programId, callback }) {
  try {
    const res = yield call(Api.getExtendedFields, extendedField, programId);
    if (res?.success) {
      yield put({ type: SUCCESS, result: res.result });
    } else {
      yield put({ type: FAILURE, error: res?.message });
    }
    if (callback) callback(res);
  } catch (error) {
    yield put({ type: FAILURE, error });
  }
}
```

**Key**: API functions are NEVER called directly from components. They're always invoked from sagas via `yield call()`.

See also: [[06-api/client-setup]], [[06-api/response-handling]], [[05-state/server-state]]
