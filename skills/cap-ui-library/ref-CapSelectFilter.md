# CapSelectFilter

**Import**: `import CapSelectFilter from '@capillarytech/cap-ui-library/CapSelectFilter';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSelectFilter/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Filter-Bar Style Select
```jsx
import CapSelectFilter from '@capillarytech/cap-ui-library/CapSelectFilter';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

<CapSelectFilter options={filters} value={activeFilter} onChange={handleFilterChange} />
```
