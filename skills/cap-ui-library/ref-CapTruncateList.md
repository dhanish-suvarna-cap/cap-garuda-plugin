# CapTruncateList

**Import**: `import CapTruncateList from '@capillarytech/cap-ui-library/CapTruncateList';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapTruncateList/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Truncated List with "Show More"
```jsx
import CapTruncateList from '@capillarytech/cap-ui-library/CapTruncateList';

<CapTruncateList
  items={allItems}
  maxItems={5}
  renderItem={(item) => <span>{item.name}</span>}
  moreText="Show more"
/>
```
