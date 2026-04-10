# CapSecondaryTopBar

**Import**: `import CapSecondaryTopBar from '@capillarytech/cap-ui-library/CapSecondaryTopBar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSecondaryTopBar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Secondary Top Bar
```jsx
import CapSecondaryTopBar from '@capillarytech/cap-ui-library/CapSecondaryTopBar';

<CapSecondaryTopBar>
  <span>Tier Management</span>
</CapSecondaryTopBar>
```

### Secondary Top Bar with Breadcrumb and Actions
```jsx
import CapSecondaryTopBar from '@capillarytech/cap-ui-library/CapSecondaryTopBar';

<CapSecondaryTopBar
  className="page-sub-header"
  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px' }}
>
  <div className="breadcrumb">Programs &gt; Loyalty &gt; Tiers</div>
  <div className="actions">
    <button>Add Tier</button>
    <button>Export</button>
  </div>
</CapSecondaryTopBar>
```
