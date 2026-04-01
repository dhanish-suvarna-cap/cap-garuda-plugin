# Auth — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Store Tokens in Memory or State

- **Anti-pattern**: Storing auth token in Redux or React state
- **Why**: localStorage is the established storage mechanism. Platform handles httpOnly cookies in production.
- **Instead**: Use `setAuthenticationDetails()` / `getAuthenticationDetails()` from `authWrapper.js`.

## Do Not Add Token Refresh Logic

- **Anti-pattern**: Implementing automatic token refresh with interceptors
- **Why**: The current flow redirects to login on 401. Token refresh is handled by the platform in production.
- **Instead**: Let `redirectIfUnauthenticated()` handle expired tokens.

## Do Not Check Auth in Individual Components

- **Anti-pattern**: `if (!isLoggedIn()) redirect('/login')` in a component
- **Why**: Auth is handled at the route level via `connectedRouterRedirect` and `RoleBasedAuth`.
- **Instead**: Use the route-level auth wrappers. Use `RBACContext` for permission checks.

## Do Not Hardcode Permission Strings

- **Anti-pattern**: `if (permissions.includes('LOYALTY_UPDATE_PROGRAM'))`
- **Why**: Permission strings should come from `RBAC_CONFIGURATION_PARAMETERS` constants.
- **Instead**: Use the constants defined in `authWrapper.js`.
