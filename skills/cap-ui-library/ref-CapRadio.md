# CapRadio

**Import**: `import CapRadio from '@capillarytech/cap-ui-library/CapRadio';`

## Description
A customized radio component that extends Ant Design's Radio component with additional styling and integration with form layouts.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the radio |
| value | any | None | Value of the radio, used in Radio Group |
| disabled | boolean | False | Whether the radio is disabled |
| checked | boolean | False | Whether the radio is checked |
| defaultChecked | boolean | False | Whether the radio is checked by default |
| onChange | function(e) | None | Callback when radio state changes |
| autoFocus | boolean | False | Whether the radio gets focus when component mounted |
| label | string \| node |  | Radio label |
| labelPosition | string | right | Position of radio label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether to show required indication i.e '*' at the end of label |
| errorMessage | string \| node |  | Message to show as error |
| inductiveText | string \| node |  | Inductive text to show below radio label |
| inline | boolean | False | If true, display property of radio is set to inline-block |
| name | string |  | Name property used in radio group |

## Usage Example
```jsx
import CapRadio from "@capillarytech/cap-ui-library/CapRadio";

<CapRadio />
```
