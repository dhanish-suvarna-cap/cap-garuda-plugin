# CapRadioButton

**Import**: `import CapRadioButton from '@capillarytech/cap-ui-library/CapRadioButton';`

## Description
A customized radio button component that extends Ant Design's Radio.Button component with additional styling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the radio button |
| value | any | None | Value of the radio button, used in Radio Group |
| disabled | boolean | False | Whether the radio button is disabled |
| checked | boolean | False | Whether the radio button is checked |
| defaultChecked | boolean | False | Whether the radio is checked by default |
| onChange | function(e) | - | Callback when radio button state changes |
| autoFocus | boolean | False | Whether the radio button gets focus when component mounted |
| name | string | - | Name property used in radio group |

## Usage Example
```jsx
import CapRadioButton from "@capillarytech/cap-ui-library/CapRadioButton";

<CapRadioButton />
```
