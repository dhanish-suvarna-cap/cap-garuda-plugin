# CapNavigation

**Import**: `import CapNavigation from '@capillarytech/cap-ui-library/CapNavigation';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapNavigation/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Navigation
```jsx
import CapNavigation from '@capillarytech/cap-ui-library/CapNavigation';

<CapNavigation>
  <a href="/dashboard">Dashboard</a>
  <a href="/programs">Programs</a>
  <a href="/members">Members</a>
</CapNavigation>
```

### Navigation with Custom Styling
```jsx
import CapNavigation from '@capillarytech/cap-ui-library/CapNavigation';

<CapNavigation
  className="main-nav"
  style={{ borderBottom: '1px solid #e8e8e8', padding: '0 24px' }}
>
  <a href="/loyalty/ui/v3/tiers">Tiers</a>
  <a href="/loyalty/ui/v3/benefits">Benefits</a>
  <a href="/loyalty/ui/v3/rules">Rules</a>
</CapNavigation>
```
