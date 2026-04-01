# Role & Permission Checking

## Permission Model

Permissions are stored in the `user` object in localStorage as `accessiblePermissions` array.

## Checking Permissions

### In Components (via RBAC Context)

```javascript
import { RBACContext } from '../../pages/Cap/context';

const MyComponent = () => {
  const rbacConfig = RBACContext();
  const hasEditPermission = rbacConfig.includes('LOYALTY_UPDATE_PROGRAM');

  return hasEditPermission ? <EditButton /> : <ViewOnlyBadge />;
};
```

### In Route Guards

```javascript
<RoleBasedAuth
  permission="LOYALTY_UPDATE_PROMOTION"
  enabledRBACConfigurations={rbacConfig}
  component={PromotionEditor}
/>
```

### User Role Utilities

```javascript
// utils/userUtils.js
export const getUserRoles = () => {
  const user = loadItem('user');
  return user?.roles || [];
};

export const isUserAdmin = () => {
  const roles = getUserRoles();
  return roles.includes('ADMIN');
};
```

## Permission Hierarchy

| Permission | Grants |
|---|---|
| `OM` | Organization Manager — full access |
| `ENABLE_LOYALTY_NEW_UI_ACCESS_VERIFICATION` | Gate for new UI features |
| `LOYALTY_UPDATE_PROGRAM` | Edit program configurations |
| `LOYALTY_UPDATE_PROMOTION` | Edit promotions |

## Conditional Rendering Based on Permissions

```javascript
// Show edit button only for authorized users
{hasPermission && (
  <CapButton onClick={handleEdit}>
    {formatMessage(messages.edit)}
  </CapButton>
)}

// Show read-only view for unauthorized users
{isEditable ? (
  <CapInput value={value} onChange={handleChange} />
) : (
  <span>{value}</span>
)}
```

See also: [[07-auth/auth-flow]], [[07-auth/protected-routes]]
