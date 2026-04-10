# CapSplit

**Import**: `import CapSplit from '@capillarytech/cap-ui-library/CapSplit';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSplit/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Split Layout
```jsx
import CapSplit from '@capillarytech/cap-ui-library/CapSplit';

<CapSplit>
  <div>Left pane content</div>
  <div>Right pane content</div>
</CapSplit>
```

### Split with Custom Styling
```jsx
import CapSplit from '@capillarytech/cap-ui-library/CapSplit';

<CapSplit
  className="tier-detail-split"
  style={{ height: '400px' }}
>
  <div>Tier list sidebar</div>
  <div>Selected tier configuration</div>
</CapSplit>
```
