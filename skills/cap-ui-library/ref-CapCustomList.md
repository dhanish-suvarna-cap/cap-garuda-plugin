# CapCustomList

**Import**: `import CapCustomList from '@capillarytech/cap-ui-library/CapCustomList';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCustomList/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Custom List
```jsx
import CapCustomList from '@capillarytech/cap-ui-library/CapCustomList';

const items = [
  { label: 'Campaign A', value: 'a' },
  { label: 'Campaign B', value: 'b' },
  { label: 'Campaign C', value: 'c' },
];

<CapCustomList options={items} value={selected} onChange={handleChange} />
```
