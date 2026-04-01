# URL State

## Approach: Manual Query Parameter Construction

No URL state management library is used. Query parameters are built manually in API functions.

### Reading URL Params

```javascript
// Via React Router match.params
const { programId, mode } = match.params;

// Via connected-react-router location
const { search } = location;
```

### Constructing Query Parameters for API Calls

```javascript
// Simple params
export const getOrgKpiConfig = programId => {
  const queryParam = programId ? `PROGRAM&programId=${programId}` : 'OVERALL';
  const url = `${API_ENDPOINT}/kpi-config/org?type=${queryParam}`;
  return request(url, getAPICallObject('GET'));
};

// Dynamic params from object
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

### Route Parameters

Routes use React Router v5 path params:

```javascript
`${publicPath}/promotions/:mode/:programId/:promotionId`
`${publicPath}/program/:programId/:mode`
`${publicPath}/bulk-configurations/edit/:id`
```

### Cache Busting

Every API request gets a `time` query parameter appended automatically:

```javascript
// In request() function
fetchUrl = url.indexOf('?') !== -1
  ? `${url}&time=${Date.now()}`
  : `${url}?time=${Date.now()}`;
```

See also: [[05-state/decision-tree]], [[06-api/client-setup]]
