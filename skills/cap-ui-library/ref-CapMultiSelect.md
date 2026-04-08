# CapMultiSelect

**Import**: `import CapMultiSelect from '@capillarytech/cap-ui-library/CapMultiSelect';`

## Description
A customized multi-select component that extends Ant Design's Select component with additional functionality for selecting multiple options with improved UX.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the multi-select |
| allowClear | boolean | True | Whether to show clear button |
| autoClearSearchValue | boolean | True | Whether to clear search input after selecting an option |
| bordered | boolean | True | Whether to show border around the select box |
| defaultValue | string[] \| number[] | [] | Default selected values |
| disabled | boolean | False | Whether the select is disabled |
| dropdownClassName | string |  | Additional className for dropdown menu |
| dropdownMatchSelectWidth | boolean \| number | True | Whether dropdown width should match select width |
| dropdownStyle | object | {} | Style of dropdown menu |
| filterOption | boolean \| function(inputValue, option) | True | Whether to filter options by input value or custom filter function |
| listHeight | number | 256 | Height of dropdown menu scroll area |
| loading | boolean | False | Whether to show loading state |
| maxTagCount | number \| 'responsive' | None | Maximum number of tags to show, 'responsive' will adjust based on width |
| maxTagPlaceholder | ReactNode \| function(omittedValues) | None | Placeholder for hidden tags |
| maxTagTextLength | number | None | Maximum text length of a tag |
| mode | string | multiple | Selection mode, fixed to 'multiple' |
| notFoundContent | ReactNode | Not Found | Content to show when no result matches |
| options | { label, value }[] | [] | Select options with label and value properties |
| optionFilterProp | string | value | Which property to filter on |
| optionLabelProp | string | children | Which property to render for selected option label |
| placeholder | string | Please select | Placeholder text |
| placement | string | bottomLeft | Dropdown position. Possible values: 'bottomLeft', 'bottomRight', 'topLeft', 'topRight' |
| removeIcon | ReactNode | None | Custom remove icon for selected tags |
| searchValue | string |  | Controlled search input value |
| showArrow | boolean | True | Whether to show dropdown arrow |
| showSearch | boolean | True | Whether to show search input in dropdown |
| size | string | default | Size of select input. Possible values: 'large', 'default', 'small' |
| status | string | None | Status of select. Possible values: 'error', 'warning' |
| suffixIcon | ReactNode | None | Custom suffix icon |
| tagRender | function(props) | None | Custom tag render function |
| tokenSeparators | string[] | [] | Separator character to auto-tokenize input |
| value | string[] \| number[] | None | Current selected values |
| virtual | boolean | True | Whether to use virtual scrolling |
| onBlur | function() | None | Called when select loses focus |
| onChange | function(value, option) | None | Called when value changes |
| onClear | function() | None | Called when clear icon is clicked |
| onDeselect | function(value, option) | None | Called when an option is deselected |
| onDropdownVisibleChange | function(open) | None | Called when dropdown visibility changes |
| onFocus | function() | None | Called when select gains focus |
| onInputKeyDown | function(e) | None | Called when key is pressed in search input |
| onMouseEnter | function(e) | None | Called when mouse enters select area |
| onMouseLeave | function(e) | None | Called when mouse leaves select area |
| onPopupScroll | function(e) | None | Called when dropdown menu is scrolled |
| onSearch | function(value) | None | Called when search value changes |
| onSelect | function(value, option) | None | Called when an option is selected |
| label | string \| ReactNode |  | Label text for the select |
| labelPosition | string | top | Position of the label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether the field is required |
| errorMessage | string \| ReactNode |  | Error message to display |
| inductiveText | string \| ReactNode |  | Helper text to display below the select |
| inline | boolean | False | Whether to display the component inline |
| selectAllOption | boolean \| object | False | Whether to show a select all option, or customize the select all option |

## Usage Example
```jsx
import CapMultiSelect from "@capillarytech/cap-ui-library/CapMultiSelect";

<CapMultiSelect />
```
