# CapVirtualList

**Import**: `import CapVirtualList from '@capillarytech/cap-ui-library/CapVirtualList';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapVirtualList/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Virtualized List (Large Data Sets)
```jsx
import CapVirtualList from '@capillarytech/cap-ui-library/CapVirtualList';

<CapVirtualList
  data={largeDataArray}
  rowHeight={40}
  height={400}
  renderItem={(item, index) => <div key={index}>{item.name}</div>}
/>
```
