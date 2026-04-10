# CapInput

**Import**: `import CapInput from '@capillarytech/cap-ui-library/CapInput';`

## Description
A customized text input component that extends Ant Design's Input component with additional functionality like error states, validation indicators, and integrated label handling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string \| node |  | Input label |
| labelPosition | string | top | Position of input label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether to show required indication i.e '*' or not at the end of label |
| errorMessage | string \| node |  | Message to show as error below input field |
| isVerified | boolean | False | Whether to show confirmed icon as suffix to input or not |
| inductiveText | string \| node |  | Inductive text to show below input label |
| inline | boolean | False | If true, display property of input is set to inline-block |
| alwaysShowFocus | boolean | False | Whether to always show focus on the input field |
| suffix | node | None | The suffix icon for the Input |
| showSuffix | boolean | True | Whether to show the suffix icon |
| size | string | large | Size of the input box. Possible values: 'large', 'default', 'small' |
| value | string | - | The input content value |
| onChange | function(e) | - | Callback when user input |
| onPressEnter | function(e) | - | The callback function that is triggered when Enter key is pressed |
| allowClear | boolean | False | If allow to remove input content with clear icon |
| disabled | boolean | False | Whether the input is disabled |
| placeholder | string |  | Placeholder text for the input |
| prefix | node | None | The prefix icon for the Input |
| addonBefore | node | None | The label text displayed before (on the left side of) the input field |
| addonAfter | node | None | The label text displayed after (on the right side of) the input field |
| maxLength | number | - | The max length of the input |

## Usage Examples

### Basic with Left Label
```jsx
import CapInput from '@capillarytech/cap-ui-library/CapInput';

<CapInput labelPosition="left" label="Input field" inline />
<CapInput labelPosition="left" label="Required Input" isRequired />
```

### With Top Label, Validation & Inductive Text
```jsx
<CapInput
  labelPosition="top"
  label="Email Address"
  isRequired
  errorMessage="Please enter a valid email"
  inductiveText="We'll send a confirmation to this address"
/>
```

### Verified State & Custom Suffix
```jsx
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

<CapInput labelPosition="top" label="Username" isVerified />
<CapInput
  labelPosition="top"
  label="Custom Suffix"
  suffix={<CapIcon type="check-circle" size="s" />}
/>
```

### Disabled
```jsx
<CapInput labelPosition="top" label="Disabled Input" disabled inductiveText="This field cannot be edited" />
```

### CapInput.Search (with Clear Icon)
```jsx
const { Search } = CapInput;

<Search value="My Default Value" onClear={() => {}} labelPosition="top" label="Search" />
<Search labelPosition="top" label="Search Without Clear" allowClear={false} />
```

### CapInput.TextArea
```jsx
const { TextArea } = CapInput;

<TextArea
  maxLength={300}
  value={textAreaValue}
  onChange={(e) => setTextAreaValue(e.target.value)}
  labelPosition="top"
  label="Description"
/>
```

### CapInput.Number
```jsx
const { Number } = CapInput;

<Number min={0} max={100} value={count} onChange={setCount} />
```
