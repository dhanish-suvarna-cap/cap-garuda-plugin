# CapFormItem

**Import**: `import CapFormItem from '@capillarytech/cap-ui-library/CapFormItem';`

## Description
A customized form item component that extends Ant Design's Form.Item component with additional styling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the form item |
| label | string \| ReactNode | None | Label text |
| labelCol | object | None | The layout of label, same as labelCol in Form but only affect this item |
| wrapperCol | object | None | The layout for input controls, same as wrapperCol in Form but only affect this item |
| help | string \| ReactNode | None | The prompt message. If not provided, the validation message will be displayed instead |
| extra | string \| ReactNode | None | The extra prompt message |
| validateStatus | string | None | The validation status. Possible values: 'success', 'warning', 'error', 'validating' |
| hasFeedback | boolean | False | Used with validateStatus, this option specifies the validation status icon. Recommended to use only with Input |
| required | boolean | False | Whether the field is required |
| colon | boolean | True | Override the default colon value from Form. Indicates whether the colon after a label is displayed |
| htmlFor | string | None | Set sub label htmlFor |
| labelAlign | string | right | Text align of label. Possible values: 'left', 'right' |
| getValueFromEvent | function(..args) | None | Specify how to get value from event or other onChange arguments |
| getValueProps | function(value) | None | Get the component props according to field value |
| normalize | function(value, prevValue, allValues) | None | Normalize value to form component |
| trigger | string | onChange | When to collect the value of children node. Default to onChange |
| validateTrigger | string \| string[] | onChange | When to validate the value of children node |
| rules | object[] | None | Validation rules for form item |

## Usage Example
```jsx
import CapFormItem from "@capillarytech/cap-ui-library/CapFormItem";

<CapFormItem />
```
