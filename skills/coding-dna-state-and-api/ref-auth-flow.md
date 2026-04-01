# Authentication Flow

## Token Type: JWT Bearer

## Token Storage: localStorage

Keys stored:
- `token` — JWT access token
- `orgID` — Organization ID
- `user` — JSON serialized user object (id, firstName, lastName, loginName, accessiblePermissions)
- `isLoggedIn` — Boolean flag
- `ouId` — Organizational Unit ID
- `currentOrgName` — Current org display name

### Storage Wrapper

`webapp/app/services/localStorageApi.js`:

```javascript
export const loadItem = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveItem = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const clearItem = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // Ignore
  }
};
```

## Authentication Setup

`webapp/app/utils/authWrapper.js`:

```javascript
export const setAuthenticationDetails = ({ token, orgID, user, isLoggedIn, ouId }) => {
  saveItem('token', token);
  saveItem('orgID', orgID);
  saveItem('user', JSON.stringify(user));
  saveItem('isLoggedIn', isLoggedIn);
  if (ouId !== undefined) saveItem('ouId', ouId);
};

export const getAuthenticationDetails = () => ({
  token: loadItem('token'),
  orgID: loadItem('orgID'),
  user: loadItem('user'),
  ouId: loadItem('ouId'),
});

export const removeAuthenticationDetais = () => {
  clearItem('token');
  clearItem('orgID');
  clearItem('user');
  clearItem('isLoggedIn');
  clearItem('ouId');
  clearItem('currentOrgName');
};
```

## Request Headers

From `webapp/app/services/requestConstructor.js`:

| Header | Value | Condition |
|---|---|---|
| `Authorization` | `Bearer ${token}` | Development environment only |
| `X-CAP-REMOTE-USER` | `user.refID` | When `allowUserId = true` |
| `X-CAP-API-AUTH-ORG-ID` | `orgID` | Non-production OR `allowOrgInProd = true` |
| `x-cap-api-auth-ou-id` | `ouId` | When `ouId` is defined |
| `X-CAP-CT` | `token` | IRIS API calls only |
| `credentials` | `'same-origin'` | Production only |

**Note**: In production, auth uses `same-origin` credentials (httpOnly cookies set by the platform), NOT the Bearer token header. The Bearer token is development-only.

## Login Flow

1. User navigates to login URL (configurable per environment)
2. Platform handles authentication (external to this app)
3. On success, `setAuthenticationDetails()` stores credentials
4. `isLoggedIn()` check returns `true`
5. `connectedRouterRedirect` allows access to protected routes

## Logout Flow

```javascript
export const logoutUser = () => {
  const url = `${API_AUTH_ENDPOINT}/auth/logout`;
  return request(url, getAPICallObject('GET'));
};
```

1. Call logout API endpoint
2. `removeAuthenticationDetais()` clears all localStorage keys
3. Redirect to login URL

## 401 Auto-Redirect

On any 401 response from any API call:

```javascript
function redirectIfUnauthenticated(response) {
  if (response.status === 401) {
    removeAuthenticationDetais();
    window.location = isProd
      ? `${originUrl}${config.production.logout_url}`
      : config.development.login_url;
  }
}
```

## No Token Refresh

There is **no automatic token refresh** mechanism. When a token expires:
1. API returns 401
2. `checkStatus()` calls `redirectIfUnauthenticated()`
3. User is redirected to login page
4. Full re-authentication required

See also: [[07-auth/protected-routes]], [[07-auth/role-access]]
