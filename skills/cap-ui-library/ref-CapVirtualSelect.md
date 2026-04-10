# CapVirtualSelect

**Import**: `import CapVirtualSelect from '@capillarytech/cap-ui-library/CapVirtualSelect';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapVirtualSelect/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Virtual Select (for Large Lists 100+ Options)
```jsx
import CapVirtualSelect from '@capillarytech/cap-ui-library/CapVirtualSelect';

const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1,
}));

<CapVirtualSelect
  options={largeOptions}
  placeholder="Search from 1000 options"
  showSearch
  onChange={handleChange}
  style={{ width: 300 }}
/>
```

### With Label
```jsx
<CapVirtualSelect
  options={largeOptions}
  label="Select Store"
  labelPosition="top"
  placeholder="Search stores..."
  showSearch
  onChange={handleChange}
/>
```
