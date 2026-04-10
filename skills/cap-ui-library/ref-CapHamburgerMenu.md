# CapHamburgerMenu

**Import**: `import CapHamburgerMenu from '@capillarytech/cap-ui-library/CapHamburgerMenu';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapHamburgerMenu/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Hamburger Menu
```jsx
import CapHamburgerMenu from '@capillarytech/cap-ui-library/CapHamburgerMenu';

<CapHamburgerMenu>
  <div>Dashboard</div>
  <div>Programs</div>
  <div>Members</div>
  <div>Settings</div>
</CapHamburgerMenu>
```

### Hamburger Menu with Custom Styling
```jsx
import CapHamburgerMenu from '@capillarytech/cap-ui-library/CapHamburgerMenu';

<CapHamburgerMenu
  className="mobile-nav-menu"
  style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
>
  <a href="/loyalty/ui/v3/tiers">Tier Management</a>
  <a href="/loyalty/ui/v3/benefits">Benefit Configuration</a>
  <a href="/loyalty/ui/v3/rules">Rule Engine</a>
  <a href="/loyalty/ui/v3/reports">Reports</a>
</CapHamburgerMenu>
```
