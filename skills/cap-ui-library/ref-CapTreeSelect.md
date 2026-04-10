# CapTreeSelect

**Import**: `import CapTreeSelect from '@capillarytech/cap-ui-library/CapTreeSelect';`

## Description
A customized tree select component that extends Ant Design's TreeSelect component with additional styling and functionality for selecting hierarchical data.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the tree select |
| allowClear | boolean | True | Whether to show clear button |
| autoClearSearchValue | boolean | True | Whether to auto clear search value when selecting an item |
| bordered | boolean | True | Whether to show border around the select box |
| defaultValue | string \| string[] | None | Default selected value |
| disabled | boolean | False | Whether disabled select |
| dropdownClassName | string |  | Additional className for dropdown menu |
| dropdownMatchSelectWidth | boolean \| number | True | Determine whether the dropdown menu and the select input are the same width |
| dropdownStyle | object | {} | Style of dropdown menu |
| fieldNames | object | { label: 'title', value: 'value', children: 'children' } | Custom field names for label, value, and children fields |
| filterTreeNode | boolean \| function(inputValue, treeNode) | True | Whether to filter treeNodes by input value or custom function |
| listHeight | number | 256 | Height of the dropdown menu |
| loadData | function(node) | None | Load data asynchronously |
| maxTagCount | number | None | Maximum number of displayed tags, responsive mode when set to 'responsive' |
| maxTagPlaceholder | ReactNode \| function(omittedValues) | None | Placeholder for hidden tags |
| multiple | boolean | False | Support multiple selection |
| placeholder | string | Please select | Placeholder of the select input |
| placement | string | bottomLeft | Placement of dropdown. Possible values: 'bottomLeft', 'bottomRight', 'topLeft', 'topRight' |
| searchValue | string | None | Current search value |
| showArrow | boolean | True | Whether to show the drop-down arrow |
| showCheckedStrategy | string | SHOW_CHILD | Specifies how to display selected items when multiple selection is enabled. Possible values: 'SHOW_ALL', 'SHOW_PARENT', 'SHOW_CHILD' |
| showSearch | boolean | True | Whether to display a search input in the dropdown menu |
| size | string | default | Size of the select input. Possible values: 'large', 'default', 'small' |
| status | string | None | Set validation status. Possible values: 'error', 'warning' |
| suffixIcon | ReactNode | None | Custom suffix icon |
| switcherIcon | ReactNode \| function(props) | None | Custom switcher icon |
| tagRender | function(props) | None | Custom tag render function |
| treeCheckable | boolean | False | Whether to show checkbox on the treeNodes |
| treeCheckStrictly | boolean | False | Whether to check nodes precisely (without parent-child relationship) |
| treeData | array | [] | Data of the tree. Each item contains label, value, children fields, and possible other custom fields |
| treeDataSimpleMode | boolean \| object | False | Enable simple mode of treeData |
| treeDefaultExpandAll | boolean | False | Whether to expand all treeNodes by default |
| treeDefaultExpandedKeys | string[] | [] | Default expanded treeNodes |
| treeExpandedKeys | string[] | [] | Set expanded keys |
| treeIcon | boolean | False | Whether to show icon before a TreeNode's title |
| treeLoadedKeys | string[] | [] | Keys of nodes that have been loaded |
| treeNodeFilterProp | string | value | Property name on the treeNode used for filtering |
| treeNodeLabelProp | string | title | Property name on the treeNode used for display |
| value | string \| string[] | None | Current selected value |
| virtual | boolean | True | Whether to use virtual scroll |
| onChange | function(value, labelList, extra) | None | Callback when selected treeNodes or input value change |
| onDropdownVisibleChange | function(open) | None | Callback when dropdown open/close |
| onSearch | function(value) | None | Callback when search input changes |
| onSelect | function(value, node, extra) | None | Callback when a treeNode is selected |
| onTreeExpand | function(expandedKeys) | None | Callback when tree is expanded or collapsed |
| label | string \| ReactNode |  | Label text for the tree select |
| labelPosition | string | top | Position of the label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether the field is required |
| errorMessage | string \| ReactNode |  | Error message to display |
| inductiveText | string \| ReactNode |  | Helper text to display below the input |
| inline | boolean | False | Whether to display the component inline |

## Usage Examples

### Basic Tree Select
```jsx
import CapTreeSelect from '@capillarytech/cap-ui-library/CapTreeSelect';

const treeData = [
  {
    title: 'Customer',
    value: 'customer',
    children: [
      { title: 'First Name', value: 'first_name' },
      { title: 'Last Name', value: 'last_name' },
      { title: 'Email', value: 'email' },
    ],
  },
  {
    title: 'Store',
    value: 'store',
    children: [
      { title: 'Store Name', value: 'store_name' },
      { title: 'Store Location', value: 'store_location' },
    ],
  },
];

<CapTreeSelect
  treeData={treeData}
  style={{ width: '35%' }}
  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
  placeholder="Please select"
  size="large"
/>
```

### With Header, Side Label & Info Note
```jsx
<CapTreeSelect
  treeData={treeData}
  style={{ width: '400px' }}
  placeholder="Please select"
  size="large"
  headerTitle="Scope of message"
  headerDescription="Target users in a particular Loyalty program or Card series."
  infoNote="Loyalty attributes unavailable if program is None."
  treeSelectSideLabel="Loyalty program / Card series"
  disabledTooltip="Select a program first"
/>
```

### Multi-Select with Checkboxes
```jsx
<CapTreeSelect
  treeData={treeData}
  treeCheckable
  showCheckedStrategy="SHOW_CHILD"
  placeholder="Select attributes"
  label="Customer Attributes"
  labelPosition="top"
  isRequired
  onChange={handleChange}
/>
```
