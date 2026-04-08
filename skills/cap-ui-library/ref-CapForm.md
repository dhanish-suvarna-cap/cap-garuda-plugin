# CapForm

**Import**: `import CapForm from '@capillarytech/cap-ui-library/CapForm';`

## Description
A customized form component that extends Ant Design's Form component with additional styling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the form |
| form | object | None | Decorated by Form.create() will be automatically set this.props.form property |
| hideRequiredMark | boolean | False | Hide required mark of all form items |
| layout | string | horizontal | Define form layout. Possible values: 'horizontal', 'vertical', 'inline' |
| onSubmit | function(e) | None | Defines a function will be called if form data validation is successful |
| mapPropsToFields | function(props) | None | Convert props to field value(e.g. reading the values from Redux store). And you must mark returned fields with Form.createFormField |
| name | string | None | Set the id prefix of fields under form |
| validateMessages | object | None | Default validate message. And its format is similar with newMessages's returned value |
| onFieldsChange | function(props, fields) | None | Specify a function that will be called when the value a Form.Item gets changed. Usage example: saving the field's value to Redux store |
| onValuesChange | function(props, changedValues, allValues) | None | A handler while value of any field is changed |
| colon | boolean | True | Configure the default value of colon for Form.Item. Indicates whether the colon after a label is displayed |
| labelAlign | string | right | The text align of label of all items. Possible values: 'left', 'right' |
| labelCol | object | None | The layout of label. You can set span offset to configure the column |
| wrapperCol | object | None | The layout for input controls. Same as labelCol |

## Usage Example
```jsx
import CapForm from "@capillarytech/cap-ui-library/CapForm";

<CapForm />
```
