# CapSelect

**Import**: `import CapSelect from '@capillarytech/cap-ui-library/CapSelect';`

## Description
A customized select component that extends Ant Design's Select component with custom styling, icons, and integrated label handling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string \| node |  | Label of the select component |
| labelPosition | string | top | Position of select label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether to show required indication i.e '*' or not at the end of label |
| errorMessage | string \| node |  | Message to show as error below select field |
| inductiveText | string \| node |  | Inductive text to show below select label |
| inline | boolean | False | If true, display property of select is set to inline-block |
| componentClassName | string |  | Additional CSS class for the select component |
| dropdownClassName | string |  | Additional CSS class for the dropdown menu |
| options | Array<{label: string, value: string, key?: string, [key: string]: any}> | [] | Select options. Note: value of select options should be unique |
| propToBeMadeLabel | string |  | Property from the option object that should be used as the label |
| getMenuOptionsProps | function(option) | () => ({}) | Function that returns additional props for menu options |
| size | string | large | Size of the select component. Possible values: 'large', 'default', 'small' |
| value | string \| string[] | - | Current selected option value(s) |
| defaultValue | string \| string[] | - | Initial selected option value(s) |
| onChange | function(value, option \| options) | - | Called when select option changes |
| onSelect | function(value, option) | - | Called when an option is selected |
| onDeselect | function(value, option) | - | Called when an option is deselected in multiple mode |
| onFocus | function() | - | Called when the select gains focus |
| onBlur | function() | - | Called when the select loses focus |
| onSearch | function(value: string) | - | Called when input value changes for search |
| mode | string | None | Mode of Select. Possible values: 'multiple', 'tags' |
| allowClear | boolean | False | Show clear button |
| disabled | boolean | False | Whether the select is disabled |
| placeholder | string | Select Option | Placeholder of select |
| showSearch | boolean | False | Whether to show search input in single mode |
| filterOption | boolean \| function(inputValue, option) | True | If true, filter options by input, if function, filter options against it |
| optionFilterProp | string | value | Which prop value of option will be used for filter if filterOption is true |
| notFoundContent | ReactNode | Not Found | Specify content to show when no result matches |
| loading | boolean | False | Indicate loading state |
| maxTagCount | number | None | Max tag count to show in multiple/tags mode |
| maxTagTextLength | number | None | Max tag text length to show |
| tokenSeparators | string[] | None | Separator used to tokenize in tags mode |
| dropdownStyle | object | None | Style of dropdown menu |

## Sub-Components
- CapSelect.CapCustomSelect

## Usage Examples

### Basic Select
```jsx
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

<CapSelect
  options={options}
  placeholder="Select a person"
  defaultValue="option1"
  style={{ width: 200 }}
/>
```

### With Label, Validation & Inductive Text
```jsx
<CapSelect
  options={options}
  label="Organization"
  labelPosition="top"
  isRequired
  errorMessage="Please select an organization"
  inductiveText="Choose the target organization"
  placeholder="Select organization"
  style={{ width: 300 }}
/>
```

### Tags Mode (Multiple Values as Tags)
```jsx
<CapSelect
  mode="tags"
  options={options}
  label="Permissions"
  inductiveText="Select multiple permissions"
  labelPosition="top"
  style={{ width: 480 }}
/>
```

### Disabled
```jsx
<CapSelect options={options} placeholder="Select a person" disabled style={{ width: 300 }} />
```

### CapCustomSelect (Search Inside Dropdown)
```jsx
const { CapCustomSelect } = CapSelect;

const orgsList = [
  { label: 'Purples', value: 'purples' },
  { label: 'Buckle', value: 'buckle' },
  { label: 'Metro', value: 'metro' },
];

<CapCustomSelect
  label="Organization"
  errorMessage="Selection required"
  width="250px"
  selectPlaceholder="Select organizations"
  showSearch
  options={orgsList}
  value={selectedOrg}
  onChange={handleOrgChange}
/>
```

### CapCustomSelect with Virtual Scrolling (Large Lists)
```jsx
<CapCustomSelect
  showSearch
  virtual
  options={largeOptionsList}
  value={selectedValue}
  onChange={setSelectedValue}
/>
```
