# CapReorderComponent

**Import**: `import CapReorderComponent from '@capillarytech/cap-ui-library/CapReorderComponent';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapReorderComponent/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic reorderable list
```jsx
import CapReorderComponent from '@capillarytech/cap-ui-library/CapReorderComponent';

const items = [
  { key: 'benefits', label: 'Benefits' },
  { key: 'restrictions', label: 'Restrictions' },
  { key: 'validity', label: 'Validity' },
];

<CapReorderComponent
  items={items}
  onReorder={(newOrder) => setFieldOrder(newOrder)}
/>
```

### With custom rendering and disabled items
```jsx
import CapReorderComponent from '@capillarytech/cap-ui-library/CapReorderComponent';

<CapReorderComponent
  items={sectionList}
  onReorder={handleSectionReorder}
  renderItem={(item) => (
    <div className="section-item">
      <span>{item.label}</span>
      <span className="item-description">{item.description}</span>
    </div>
  )}
  disabledItems={['locked-section']}
  className="section-reorder"
/>
```
