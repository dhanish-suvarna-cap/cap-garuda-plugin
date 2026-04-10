# CapList

**Import**: `import CapList from '@capillarytech/cap-ui-library/CapList';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapList/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic List with Header and Footer
```jsx
import CapList from '@capillarytech/cap-ui-library/CapList';

const data = [
  'Campaign A - 10,000 users targeted',
  'Campaign B - 5,000 users targeted',
  'Campaign C - 2,500 users targeted',
];

<CapList
  header={<div>Active Campaigns</div>}
  footer={<div>Total: 3 campaigns</div>}
  dataSource={data}
  renderItem={(item) => <CapList.Item>{item}</CapList.Item>}
/>
```

### With Bordered and Size
```jsx
<CapList
  bordered
  size="small"
  dataSource={data}
  renderItem={(item) => <CapList.Item>{item}</CapList.Item>}
/>
```
