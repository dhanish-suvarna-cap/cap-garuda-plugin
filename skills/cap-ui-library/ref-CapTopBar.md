# CapTopBar

**Import**: `import CapTopBar from '@capillarytech/cap-ui-library/CapTopBar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapTopBar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Top Bar
```jsx
import CapTopBar from '@capillarytech/cap-ui-library/CapTopBar';

<CapTopBar>
  <div className="logo">Capillary</div>
  <div className="nav-items">
    <span>Dashboard</span>
    <span>Programs</span>
    <span>Settings</span>
  </div>
</CapTopBar>
```

### Top Bar with Branding and Actions
```jsx
import CapTopBar from '@capillarytech/cap-ui-library/CapTopBar';

<CapTopBar
  className="app-top-bar"
  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}
>
  <div className="brand">Loyalty Platform</div>
  <div className="actions">
    <span>Notifications</span>
    <span>Profile</span>
  </div>
</CapTopBar>
```
