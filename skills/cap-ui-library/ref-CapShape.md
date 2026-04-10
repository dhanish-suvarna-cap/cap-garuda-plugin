# CapShape

**Import**: `import CapShape from '@capillarytech/cap-ui-library/CapShape';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapShape/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Circle Shape
```jsx
import CapShape from '@capillarytech/cap-ui-library/CapShape';

<CapShape type="circle" size={40} color="#1890ff" />
```

### Square and Rectangle Shapes
```jsx
<CapShape type="square" size={32} color="#52c41a" />
<CapShape type="rectangle" width={80} height={40} color="#faad14" />
```

### Shape as Status Indicator
```jsx
import CapShape from '@capillarytech/cap-ui-library/CapShape';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';

<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <CapShape type="circle" size={8} color="#52c41a" />
  <CapLabel type="label2">Active</CapLabel>
</div>
```
