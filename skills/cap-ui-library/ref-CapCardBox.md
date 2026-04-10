# CapCardBox

**Import**: `import CapCardBox from '@capillarytech/cap-ui-library/CapCardBox';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCardBox/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Card Box
```jsx
import CapCardBox from '@capillarytech/cap-ui-library/CapCardBox';

<CapCardBox>
  <h4>Tier Configuration</h4>
  <p>Configure tier upgrade and downgrade rules</p>
</CapCardBox>
```

### Card Box with Custom Styling
```jsx
import CapCardBox from '@capillarytech/cap-ui-library/CapCardBox';

<CapCardBox
  className="benefit-card-box"
  style={{ padding: '16px', marginBottom: '12px' }}
>
  <span>Benefit Name: Free Shipping</span>
  <span>Status: Active</span>
</CapCardBox>
```
