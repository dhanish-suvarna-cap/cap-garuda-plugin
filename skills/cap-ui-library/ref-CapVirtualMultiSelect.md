# CapVirtualMultiSelect

**Import**: `import CapVirtualMultiSelect from '@capillarytech/cap-ui-library/CapVirtualMultiSelect';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapVirtualMultiSelect/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Virtual Multi-Select (for Large Lists)
```jsx
import CapVirtualMultiSelect from '@capillarytech/cap-ui-library/CapVirtualMultiSelect';

const options = Array.from({ length: 500 }, (_, i) => ({
  label: `Store ${i + 1}`,
  value: `store_${i + 1}`,
}));

<CapVirtualMultiSelect
  options={options}
  placeholder="Select stores"
  showSearch
  value={selectedStores}
  onChange={handleChange}
  style={{ width: 400 }}
/>
```
