# CapCheckbox

**Import**: `import CapCheckbox from '@capillarytech/cap-ui-library/CapCheckbox';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCheckbox/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic States
```jsx
import CapCheckbox from '@capillarytech/cap-ui-library/CapCheckbox';

<CapCheckbox onChange={handleChange}>Accept Terms</CapCheckbox>
<CapCheckbox checked>Already Checked</CapCheckbox>
<CapCheckbox defaultChecked disabled>Disabled & Checked</CapCheckbox>
<CapCheckbox autoFocus>Auto Focus</CapCheckbox>
```

### Indeterminate State (Select All Pattern)
```jsx
<CapCheckbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>
  Select All
</CapCheckbox>
```

### With Inductive Text & Suffix
```jsx
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

<CapCheckbox
  indeterminate
  suffix={<CapHeading.CapHeadingSpan type="label2">(custom suffix)</CapHeading.CapHeadingSpan>}
  inductiveText="Global settings can be overridden through advanced settings"
>
  Apply to all campaigns
</CapCheckbox>
```

### Checkbox Group
```jsx
const { Group } = CapCheckbox;

<Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} onChange={handleChange} />
```
