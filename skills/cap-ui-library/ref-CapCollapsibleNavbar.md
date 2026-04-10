# CapCollapsibleNavbar

**Import**: `import CapCollapsibleNavbar from '@capillarytech/cap-ui-library/CapCollapsibleNavbar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCollapsibleNavbar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Collapsible Navbar
```jsx
import CapCollapsibleNavbar from '@capillarytech/cap-ui-library/CapCollapsibleNavbar';

<CapCollapsibleNavbar>
  <div>Home</div>
  <div>Programs</div>
  <div>Reports</div>
  <div>Settings</div>
</CapCollapsibleNavbar>
```

### Collapsible Navbar with Styling
```jsx
import CapCollapsibleNavbar from '@capillarytech/cap-ui-library/CapCollapsibleNavbar';

<CapCollapsibleNavbar
  className="module-navbar"
  style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
>
  <a href="/loyalty/ui/v3/overview">Overview</a>
  <a href="/loyalty/ui/v3/tiers">Tiers</a>
  <a href="/loyalty/ui/v3/benefits">Benefits</a>
  <a href="/loyalty/ui/v3/rules">Rules</a>
</CapCollapsibleNavbar>
```
