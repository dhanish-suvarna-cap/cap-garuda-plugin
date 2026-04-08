# CapDivider

**Import**: `import CapDivider from '@capillarytech/cap-ui-library/CapDivider';`

## Description
A customized divider component that extends Ant Design's Divider component to separate content sections with horizontal or vertical lines.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the divider |
| type | string | horizontal | Direction type of the divider. Possible values: 'horizontal', 'vertical' |
| orientation | string | center | Position of the title inside the divider. Possible values: 'left', 'right', 'center' |
| orientationMargin | string \| number | None | The margin of title, only works when orientation is 'left' or 'right' |
| dashed | boolean | False | Whether the divider line is dashed |
| variant | string | solid | Variant of divider. Possible values: 'dashed', 'dotted', 'solid' |
| plain | boolean | False | Whether the title is plain text or not (when not plain, the title will have a more prominent styling) |
| style | object | {} | Custom style object for the divider |
| children | ReactNode | None | Content to be displayed inside the divider (only works when type is 'horizontal') |

## Usage Example
```jsx
import CapDivider from "@capillarytech/cap-ui-library/CapDivider";

<CapDivider />
```
