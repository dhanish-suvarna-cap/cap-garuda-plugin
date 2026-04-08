# CapSwitch

**Import**: `import CapSwitch from '@capillarytech/cap-ui-library/CapSwitch';`

## Description
A customized switch component that extends Ant Design's Switch component with additional styling and integrated label handling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string \| node |  | Switch label |
| labelPosition | string | top | Position of switch label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether to show required indication i.e '*' or not at the end of label |
| errorMessage | string \| node |  | Message to show as error below switch |
| inductiveText | string \| node |  | Inductive text to show below switch label |
| inline | boolean | False | If true, display property of switch is set to inline-block |
| className | string |  | Additional CSS class for the switch |
| checked | boolean | False | Determine whether the Switch is checked |
| defaultChecked | boolean | False | To set the initial state |
| disabled | boolean | False | Whether the switch is disabled |
| loading | boolean | False | Loading state of switch |
| size | string | default | Size of the switch. Possible values: 'default', 'small' |
| onChange | function(checked, event) | - | Trigger when the checked state is changing |
| checkedChildren | ReactNode | - | The content to be shown when the state is checked |
| unCheckedChildren | ReactNode | - | The content to be shown when the state is unchecked |

## Usage Example
```jsx
import CapSwitch from "@capillarytech/cap-ui-library/CapSwitch";

<CapSwitch />
```
