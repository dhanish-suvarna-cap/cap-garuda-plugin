# CapCustomSelect

**Import**: `import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCustomSelect/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Via CapSelect (Preferred)
```jsx
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
const { CapCustomSelect } = CapSelect;

<CapCustomSelect
  showSearch
  options={[{ label: 'Opt A', value: 'a' }, { label: 'Opt B', value: 'b' }]}
  value={selected}
  onChange={handleChange}
  selectPlaceholder="Select option"
  width="250px"
/>
```

### Direct Import
```jsx
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';

<CapCustomSelect
  label="Organization"
  errorMessage="Required"
  showSearch
  options={orgsList}
  value={selectedOrg}
  onChange={handleChange}
  width="300px"
/>
```
