# CapDragReorder

**Import**: `import CapDragReorder from '@capillarytech/cap-ui-library/CapDragReorder';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapDragReorder/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic drag-to-reorder list
```jsx
import CapDragReorder from '@capillarytech/cap-ui-library/CapDragReorder';

const items = [
  { id: '1', content: 'Tier 1 - Silver' },
  { id: '2', content: 'Tier 2 - Gold' },
  { id: '3', content: 'Tier 3 - Platinum' },
];

<CapDragReorder
  items={items}
  onReorder={(reorderedItems) => handleReorder(reorderedItems)}
  renderItem={(item) => <div>{item.content}</div>}
/>
```

### With custom drag handle and className
```jsx
import CapDragReorder from '@capillarytech/cap-ui-library/CapDragReorder';

<CapDragReorder
  items={priorityList}
  onReorder={updatePriority}
  renderItem={(item, index) => (
    <div className="reorder-item">
      <span className="drag-handle">&#x2630;</span>
      <span>{index + 1}. {item.name}</span>
    </div>
  )}
  className="priority-reorder-list"
/>
```
