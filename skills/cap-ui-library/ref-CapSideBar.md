# CapSideBar

**Import**: `import CapSideBar from '@capillarytech/cap-ui-library/CapSideBar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSideBar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Sidebar
```jsx
import CapSideBar from '@capillarytech/cap-ui-library/CapSideBar';

<CapSideBar>
  <div>Dashboard</div>
  <div>Programs</div>
  <div>Members</div>
  <div>Reports</div>
</CapSideBar>
```

### Sidebar with Custom Styling
```jsx
import CapSideBar from '@capillarytech/cap-ui-library/CapSideBar';

<CapSideBar
  className="loyalty-sidebar"
  style={{ width: '240px', height: '100vh', borderRight: '1px solid #e8e8e8' }}
>
  <div className="sidebar-section">Tier Management</div>
  <div className="sidebar-section">Benefit Configuration</div>
  <div className="sidebar-section">Rule Engine</div>
</CapSideBar>
```
