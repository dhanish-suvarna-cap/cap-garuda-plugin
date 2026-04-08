# CapColumn

**Import**: `import CapColumn from '@capillarytech/cap-ui-library/CapColumn';`

## Description
A customized column component that extends Ant Design's Col component with additional styling for creating grid-based layouts.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the column |
| span | number | None | Number of cells to occupy out of 24 in a row, 0 corresponds to display: none |
| offset | number | 0 | Number of cells to offset from the left |
| order | number | 0 | Raster order, used in flex layout mode |
| pull | number | 0 | Number of cells that the column is moved to the left |
| push | number | 0 | Number of cells that the column is moved to the right |
| xs | number \| object | None | Screen < 576px and also default setting, could be a span value or an object containing above props |
| sm | number \| object | None | Screen ≥ 576px, could be a span value or an object containing above props |
| md | number \| object | None | Screen ≥ 768px, could be a span value or an object containing above props |
| lg | number \| object | None | Screen ≥ 992px, could be a span value or an object containing above props |
| xl | number \| object | None | Screen ≥ 1200px, could be a span value or an object containing above props |
| xxl | number \| object | None | Screen ≥ 1600px, could be a span value or an object containing above props |
| flex | string \| number | None | Flex layout style |
| prefixCls | string | ant-col | Prefix CSS class name |
| style | object | {} | Custom style object for the column |
| children | ReactNode | None | Content of the column |

## Usage Example
```jsx
import CapColumn from "@capillarytech/cap-ui-library/CapColumn";

<CapColumn />
```
