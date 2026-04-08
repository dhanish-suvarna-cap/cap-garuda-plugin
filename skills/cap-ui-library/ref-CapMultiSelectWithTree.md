# CapMultiSelectWithTree

**Import**: `import CapMultiSelectWithTree from '@capillarytech/cap-ui-library/CapMultiSelectWithTree';`

## Description
A customized component that combines multi-select functionality with tree structure selection, allowing for hierarchical data selection with improved UX.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the component |
| style | object | {} | Custom style object for the component |
| treeData | array | [] | Tree data for display and selection, each node containing title, value, key, children fields |
| value | string[] \| number[] | [] | Currently selected values |
| defaultValue | string[] \| number[] | [] | Default selected values |
| placeholder | string | Please select | Placeholder text when no selection |
| disabled | boolean | False | Whether the component is disabled |
| loading | boolean | False | Whether to show loading state |
| maxTagCount | number \| 'responsive' | None | Maximum number of tags to show, 'responsive' will adjust based on width |
| maxTagPlaceholder | ReactNode \| function(omittedValues) | None | Placeholder for hidden tags |
| maxTagTextLength | number | None | Maximum text length of a tag |
| dropdownStyle | object | {} | Style of dropdown menu |
| dropdownClassName | string |  | Additional className for dropdown menu |
| dropdownMatchSelectWidth | boolean \| number | True | Whether dropdown width should match select width |
| open | boolean | False | Whether dropdown is visible |
| showSearch | boolean | True | Whether to show search input in dropdown |
| showArrow | boolean | True | Whether to show dropdown arrow |
| allowClear | boolean | True | Whether to show clear button |
| size | string | default | Size of the component. Possible values: 'large', 'default', 'small' |
| bordered | boolean | True | Whether to show border |
| treeLine | boolean | False | Whether to show connecting lines for tree nodes |
| treeIcon | boolean | False | Whether to show icons for tree nodes |
| treeCheckable | boolean | True | Whether to show checkbox for tree nodes |
| treeCheckStrictly | boolean | False | Whether to check nodes strictly (without parent-child relationship) |
| treeDefaultExpandAll | boolean | False | Whether to expand all tree nodes by default |
| treeDefaultExpandedKeys | string[] | [] | Default expanded keys |
| treeExpandedKeys | string[] | None | Currently expanded keys |
| virtual | boolean | True | Whether to use virtual scrolling |
| listHeight | number | 256 | Height of dropdown list |
| placement | string | bottomLeft | Dropdown position. Possible values: 'bottomLeft', 'bottomRight', 'topLeft', 'topRight' |
| showCheckedStrategy | string | SHOW_ALL | How to display selected items. Possible values: 'SHOW_ALL', 'SHOW_PARENT', 'SHOW_CHILD' |
| searchValue | string |  | Current search input value |
| filterTreeNode | boolean \| function(inputValue, treeNode) | True | Whether to filter tree nodes by input value or custom function |
| status | string | None | Status of the component. Possible values: 'error', 'warning' |
| suffixIcon | ReactNode | None | Custom suffix icon |
| tagRender | function(props) | None | Custom tag render function |
| onChange | function(value, labelList, extra) | None | Called when selection changes |
| onTreeExpand | function(expandedKeys) | None | Called when tree is expanded or collapsed |
| onDropdownVisibleChange | function(open) | None | Called when dropdown visibility changes |
| onSearch | function(value) | None | Called when search input changes |
| onSelect | function(value, node, extra) | None | Called when a tree node is selected |
| onClear | function() | None | Called when clear button is clicked |
| label | string \| ReactNode |  | Label text for the component |
| labelPosition | string | top | Position of the label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether the field is required |
| errorMessage | string \| ReactNode |  | Error message to display |
| inductiveText | string \| ReactNode |  | Helper text to display below the component |
| inline | boolean | False | Whether to display the component inline |
| selectAllOption | boolean \| object | False | Whether to show a select all option and its configuration |
| loadData | function(node) | None | Load data asynchronously for tree nodes |

## Usage Example
```jsx
import CapMultiSelectWithTree from "@capillarytech/cap-ui-library/CapMultiSelectWithTree";

<CapMultiSelectWithTree />
```
