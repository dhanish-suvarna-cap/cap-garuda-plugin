# CapRadioGroup

**Import**: `import CapRadioGroup from '@capillarytech/cap-ui-library/CapRadioGroup';`

## Description
A radio group component that extends Ant Design's Radio.Group component with additional styling and integration with form layouts.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the radio group |
| defaultValue | any | None | Default selected value |
| disabled | boolean | False | Whether all radio buttons are disabled |
| name | string |  | The name property of all input[type='radio'] children |
| options | string[] \| Array<{ label: string, value: string, disabled?: boolean, className?: string }> | [] | Options for generating radio buttons |
| optionType | string | default | Option type, options: 'default' | 'button' |
| size | string | default | Size of radio button when optionType is 'button'. Options: 'large', 'default', 'small' |
| value | any | None | Currently selected value |
| onChange | function(e) | None | Callback function when radio group value changes |
| buttonStyle | string | outline | Style type of radio button. Options: 'outline' | 'solid' |
| label | string \| node |  | Group label |
| labelPosition | string | top | Position of group label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether to show required indication i.e '*' at the end of label |
| errorMessage | string \| node |  | Message to show as error |
| inductiveText | string \| node |  | Inductive text to show below group label |
| inline | boolean | False | If true, display property of radio group is set to inline-block |
| direction | string | horizontal | Direction of radio buttons arrangement. Options: 'horizontal' | 'vertical' |

## Usage Example
```jsx
import CapRadioGroup from "@capillarytech/cap-ui-library/CapRadioGroup";

<CapRadioGroup />
```
