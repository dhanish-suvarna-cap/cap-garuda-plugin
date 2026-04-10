# CapTable

**Import**: `import CapTable from '@capillarytech/cap-ui-library/CapTable';`

## Description
A customized table component that extends Ant Design's Table component with additional features like infinite scrolling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the table |
| id | string | None | ID for the table DOM element, required for infinite scroll functionality |
| infinteScroll | boolean | False | Enable infinite scrolling for the table |
| dataSource | array | [] | Data record array to be displayed |
| pagination | object \| false | None | Pagination configuration or false to disable pagination |
| columns | array | [] | Columns of the table |
| ColumnGroup | array | None | Group of columns, can be used to create multi-level headers |
| offset_limit | object | { offset: 0, limit: 10 } | Pagination configuration for infinite scroll, with offset and limit properties |
| setPagination | function(offsetLimit) | None | Callback to set pagination when using infinite scroll |
| showLoader | boolean | False | Whether to show a loading indicator at the bottom of the table when fetching more data |
| loadMoreData | string | Loading... | Text to display when loading more data in infinite scroll mode |
| scroll | object | None | Configuration of table's scrollable area |
| rowKey | string \| function(record, index) | key | Row's key, if rowKey is string, using record[rowKey] as key, else if it's a function, using its return value |
| rowClassName | string \| function(record, index) | None | Row's className, if rowClassName is function, the return value will be applied to the row class |
| expandedRowRender | function(record, index, indent, expanded) | None | Expanded content render function |
| defaultExpandAllRows | boolean | False | Expand all rows initially |
| expandedRowKeys | string[] | None | Current expanded row keys |
| defaultExpandedRowKeys | string[] | None | Initial expanded row keys |
| expandIconAsCell | boolean | False | Show expand icon as a separate column |
| expandIconColumnIndex | number | 0 | The index of the column which contains the expand icon |
| expandRowByClick | boolean | False | Whether to expand row by clicking anywhere in the row |
| onExpand | function(expanded, record) | None | Callback executed when the row expand icon is clicked |
| onExpandedRowsChange | function(expandedRows) | None | Callback executed when the expanded rows change |
| loading | boolean \| object | False | Loading status of table |
| locale | object | None | Localization configuration |
| bordered | boolean | False | Whether to show all borders of the table |
| size | string | default | Size of the table. Possible values: 'default', 'middle', 'small' |
| onChange | function(pagination, filters, sorter, extra) | None | Callback executed when pagination, filters or sorter is changed |
| onRowClick | function(record, index, event) | None | Callback executed when a row is clicked |
| onRow | function(record, index) | None | Set props on each row |
| onHeaderRow | function(columns, index) | None | Set props on the table header row |

## Usage Examples

### Basic Table with Columns and Data
```jsx
import CapTable from '@capillarytech/cap-ui-library/CapTable';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
];

<CapTable columns={columns} dataSource={dataSource} />
```

### With Sorting
```jsx
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
];

<CapTable columns={columns} dataSource={dataSource} />
```

### With Nested Column Groups (using CapHeader)
```jsx
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';

const columns = [
  {
    title: <CapHeader size="small" title="Campaign name" description="Marketing objective" />,
    dataIndex: 'name',
    key: 'name',
    width: '30%',
  },
  {
    title: <CapHeader size="small" title="Performance" />,
    className: "table-parent",
    children: [
      { title: <CapHeader size="small" description="Unique users" />, dataIndex: 'u_user', className: "table-children" },
      { title: <CapHeader size="small" description="Message Sent" />, dataIndex: 'm_sent', className: "table-children" },
    ],
  },
];

<CapTable id="capTable_1" columns={columns} dataSource={dataSource} />
```

### With Infinite Scroll
```jsx
<CapTable
  id="capTable_scroll"
  columns={columns}
  dataSource={dataSource}
  infinteScroll
  pagination={{ offset: 0, limit: 10 }}
  setPagination={handleLoadMore}
  showLoader={loading}
/>
```
