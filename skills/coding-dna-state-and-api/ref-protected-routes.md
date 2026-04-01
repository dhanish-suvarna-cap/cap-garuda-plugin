# Protected Routes

## Auth Wrapper: redux-auth-wrapper

Protected routes use `connectedRouterRedirect` from `redux-auth-wrapper`:

```javascript
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: config.development.login_url,
  authenticatedSelector: () => isLoggedIn(),
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAuthenticated',
});
```

`isLoggedIn()` checks localStorage for the `isLoggedIn` key.

## Route Configuration

From `webapp/app/components/pages/Cap/routes.js`:

```javascript
import { loadable } from '@capillarytech/cap-ui-utils';

const routes = [
  {
    component: loadable(() => import('../Dashboard')),
    path: `${publicPath}/`,
    exact: true,
  },
  {
    component: loadable(() => import('../Promotions')),
    path: `${publicPath}/promotions/list`,
  },
  {
    component: loadable(() => import('../AccessForbidden')),
    path: `${publicPath}/accessForbidden`,
  },
  // ...more routes
];
```

## RBAC (Role-Based Access Control)

### RoleBasedAuth Component

```javascript
// From components/atoms/RoleBasedAuth
const RoleBasedAuth = ({ enabledRBACConfigurations, permission, ...rest }) => {
  if (!enabledRBACConfigurations.includes(config)) {
    return <RenderRoute {...rest} />;
  }
  return enabledRBACConfigurations.includes(permission)
    ? <RenderRoute {...rest} />
    : <PermissionDeniedPage />;
};
```

### Permission Constants

```javascript
const RBAC_CONFIGURATION_PARAMETERS = {
  OM: 'OM',
  ENABLE_LOYALTY_NEW_UI_ACCESS_VERIFICATION: 'ENABLE_LOYALTY_NEW_UI_ACCESS_VERIFICATION',
  LOYALTY_UPDATE_PROGRAM: 'LOYALTY_UPDATE_PROGRAM',
  LOYALTY_UPDATE_PROMOTION: 'LOYALTY_UPDATE_PROMOTION',
};
```

### Permission Extraction

```javascript
export const getRBACConfigurationData = () => {
  const userData = loadItem('user');
  try {
    return JSON.parse(userData)?.accessiblePermissions || [];
  } catch {
    return [];
  }
};
```

### RBAC Context

```javascript
// pages/Cap/context.js
const store = createContext();
export const RBACConfigProvider = store.Provider;
export const RBACContext = () => useContext(store);
```

Provided at the app level, consumed by any component needing permission checks.

## Access Denied Pages

- `AccessForbidden` — Route-level access denied
- `PermissionDeniedPage` — RBAC permission denied

See also: [[07-auth/auth-flow]], [[07-auth/role-access]]
