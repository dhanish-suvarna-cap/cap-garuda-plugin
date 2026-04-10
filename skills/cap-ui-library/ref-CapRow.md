# CapRow

**Import**: `import CapRow from '@capillarytech/cap-ui-library/CapRow';`

## Description
A customized row component that extends Ant Design's Row component with additional layout styling and flexibility for creating grid systems.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the row |
| align | string | top | Vertical alignment of elements. Possible values: 'top', 'middle', 'bottom', 'stretch' |
| gutter | number \| object \| array | 0 | Space between grid items. Can be a number, object with responsive values, or array [horizontal, vertical] |
| justify | string | start | Horizontal arrangement. Possible values: 'start', 'end', 'center', 'space-around', 'space-between', 'space-evenly' |
| wrap | boolean | True | Whether to wrap elements if there's not enough space |
| children | ReactNode | None | Content of the row, typically CapCol components |
| style | object | {} | Custom style object for the row |
| prefixCls | string | ant-row | Prefix CSS class name |
| type | string | None | Row type, adding extra behavior. Possible value: 'flex' |
| flex | boolean \| string \| number | False | Flex layout style |
| gap | number \| [number, number] | None | Gap between grid items, same as gutter but uses CSS gap property |
| height | string \| number | None | Height of the row |
| width | string \| number | None | Width of the row |
| fullWidth | boolean | False | Whether the row should take 100% width |
| fullHeight | boolean | False | Whether the row should take 100% height |
| fillSpace | boolean | False | Whether the row should fill available space |
| padding | string \| number | None | Padding for the row |
| margin | string \| number | None | Margin for the row |
| noWrap | boolean | False | Whether to prevent wrapping of items (shorthand for wrap=false) |
| responsive | boolean | True | Whether to enable responsive behavior |
| vertical | boolean | False | Whether to stack items vertically |

## Usage Examples

### Basic Row with Justified Columns
```jsx
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapColumn from '@capillarytech/cap-ui-library/CapColumn';

<CapRow gutter={16} justify="space-between" align="middle">
  <CapColumn span={8}>Left section</CapColumn>
  <CapColumn span={8}>Center section</CapColumn>
  <CapColumn span={8}>Right section</CapColumn>
</CapRow>
```

### Vertical Layout with Full Width
```jsx
import CapRow from '@capillarytech/cap-ui-library/CapRow';

<CapRow vertical fullWidth padding="16px" gap={12}>
  <div>First row item</div>
  <div>Second row item</div>
  <div>Third row item</div>
</CapRow>
```

### Flex Row with Custom Sizing
```jsx
import CapRow from '@capillarytech/cap-ui-library/CapRow';

<CapRow
  type="flex"
  justify="center"
  align="middle"
  height="200px"
  fullWidth
  gutter={[16, 24]}
  style={{ background: '#f5f5f5' }}
>
  {children}
</CapRow>
```
