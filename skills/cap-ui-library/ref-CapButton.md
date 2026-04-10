# CapButton

**Import**: `import CapButton from '@capillarytech/cap-ui-library/CapButton';`

## Description
A customized button component that extends Ant Design's Button component with additional styling and functionality like add button support and prefix/suffix icons.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | primary | Type of button. Possible values: 'primary', 'secondary', 'flat' |
| className | string |  | Additional CSS class for the button |
| isAddBtn | boolean | False | Whether the button is an add button (with plus icon) |
| prefix | string \| element | None | Content to be displayed before the button text |
| suffix | string \| element | None | Content to be displayed after the button text |
| disabled | boolean | False | Whether the button is disabled |
| loading | boolean \| { delay: number } | False | Set the loading status of button |
| onClick | function(event) | - | Called when the button is clicked |
| size | string | default | Button size. Possible values: 'large', 'default', 'small' |
| shape | string | None | Can be set to 'circle', 'round' or omitted |
| ghost | boolean | False | Make background transparent and invert text and border colors |
| block | boolean | False | Option to fit button width to its parent width |
| htmlType | string | button | Set the original html type of button. Possible values: 'submit', 'button', 'reset' |
| icon | string \| ReactNode | None | Set the icon component of button |
| href | string | None | Redirect url of link button |
| target | string | None | Same as target attribute of a, works when href is specified |

## Usage Examples

### Basic Variants
```jsx
import CapButton from '@capillarytech/cap-ui-library/CapButton';

<CapButton type="primary" onClick={handleSubmit}>Submit</CapButton>
<CapButton type="secondary">Cancel</CapButton>
<CapButton type="flat">Flat</CapButton>
<CapButton type="dashed">Dashed</CapButton>
<CapButton type="oval">Oval</CapButton>
```

### Disabled & Loading
```jsx
<CapButton type="primary" disabled>Disabled</CapButton>
<CapButton type="primary" loading>Saving...</CapButton>
```

### With Icons (Prefix / Suffix)
```jsx
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

<CapButton type="flat" prefix={<CapIcon size="s" type="add" color="#091e42" />}>Add Item</CapButton>
<CapButton type="flat" suffix={<CapIcon size="s" type="add" color="#091e42" />}>With Suffix</CapButton>
```

### Add Button Variant
```jsx
<CapButton type="flat" isAddBtn>Add New</CapButton>
```

### Disabled Button with Tooltip
```jsx
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';

{/* NOTE: Wrap disabled button with span.button-disabled-tooltip-wrapper for tooltip to work */}
<CapTooltip title="You don't have permission">
  <span className="button-disabled-tooltip-wrapper">
    <CapButton disabled>Submit</CapButton>
  </span>
</CapTooltip>
```
