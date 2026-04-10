# CapCollapsibleLeftNavigation

**Import**: `import CapCollapsibleLeftNavigation from '@capillarytech/cap-ui-library/CapCollapsibleLeftNavigation';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCollapsibleLeftNavigation/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Collapsible Left Navigation
```jsx
import CapCollapsibleLeftNavigation from '@capillarytech/cap-ui-library/CapCollapsibleLeftNavigation';

<CapCollapsibleLeftNavigation>
  <div>Dashboard</div>
  <div>Members</div>
  <div>Campaigns</div>
  <div>Analytics</div>
</CapCollapsibleLeftNavigation>
```

### Collapsible Left Navigation with Custom Width
```jsx
import CapCollapsibleLeftNavigation from '@capillarytech/cap-ui-library/CapCollapsibleLeftNavigation';

<CapCollapsibleLeftNavigation
  className="main-left-nav"
  style={{ width: '260px', minHeight: '100vh' }}
>
  <div className="nav-group">
    <h4>Loyalty</h4>
    <a href="/tiers">Tiers</a>
    <a href="/benefits">Benefits</a>
  </div>
  <div className="nav-group">
    <h4>Engage</h4>
    <a href="/campaigns">Campaigns</a>
    <a href="/journeys">Journeys</a>
  </div>
</CapCollapsibleLeftNavigation>
```
