# CapUserProfile

**Import**: `import CapUserProfile from '@capillarytech/cap-ui-library/CapUserProfile';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapUserProfile/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic user profile display
```jsx
import CapUserProfile from '@capillarytech/cap-ui-library/CapUserProfile';

<CapUserProfile
  userName="John Doe"
  email="john.doe@capillary.com"
  orgName="Capillary Technologies"
/>
```

### With avatar, role info, and logout handler
```jsx
import CapUserProfile from '@capillarytech/cap-ui-library/CapUserProfile';

<CapUserProfile
  userName={currentUser.name}
  email={currentUser.email}
  orgName={currentUser.orgName}
  avatarUrl={currentUser.avatarUrl}
  role={currentUser.role}
  onLogout={() => dispatch(logoutRequest())}
  onProfileClick={() => history.push('/profile')}
/>
```
