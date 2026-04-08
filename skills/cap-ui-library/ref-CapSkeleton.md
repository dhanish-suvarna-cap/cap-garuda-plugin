# CapSkeleton

**Import**: `import CapSkeleton from '@capillarytech/cap-ui-library/CapSkeleton';`

## Description
A customized skeleton component that extends Ant Design's Skeleton component to display placeholder loading states for UI elements and content.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the skeleton |
| active | boolean | False | Whether to show the skeleton with animation |
| avatar | boolean \| object | False | Show avatar placeholder. If set to object, can customize size, shape, etc. |
| loading | boolean | True | Whether to show skeleton. If false, children content is displayed |
| paragraph | boolean \| object | True | Show paragraph placeholder. If set to object, can customize rows, width, etc. |
| round | boolean | False | Whether to show the skeleton with rounded corners |
| title | boolean \| object | True | Show title placeholder. If set to object, can customize width |
| children | ReactNode | None | Content to be rendered when loading is false |
| style | object | {} | Custom style object for the skeleton |
| delay | number | 0 | Delay in milliseconds before showing the skeleton |
| shape | string | default | Shape of the skeleton. Possible values: 'default', 'circle', 'square', 'rounded' |
| size | string | default | Size of the skeleton. Possible values: 'default', 'large', 'small' |
| width | number \| string | None | Width of the skeleton |
| height | number \| string | None | Height of the skeleton |
| color | string | None | Base color of the skeleton |
| highlightColor | string | None | Highlight color of the skeleton animation |
| rows | number | 4 | Number of rows to show in paragraph skeleton |
| rowWidths | number[] \| string[] | None | Widths of each row in paragraph skeleton (as percentages or pixels) |
| rowHeight | number \| string | None | Height of each row in paragraph skeleton |
| block | boolean | False | Whether to render as block element (full width) |
| buttonShape | string | default | Shape of button skeleton. Possible values: 'default', 'circle', 'round' |
| imageShape | string | square | Shape of image skeleton. Possible values: 'square', 'circle', 'rounded' |
| avatarShape | string | circle | Shape of avatar skeleton. Possible values: 'circle', 'square' |
| buttonProps | object | {} | Custom props for button skeleton |
| avatarProps | object | {} | Custom props for avatar skeleton |
| titleProps | object | {} | Custom props for title skeleton |
| imageProps | object | {} | Custom props for image skeleton |
| paragraphProps | object | {} | Custom props for paragraph skeleton |

## Usage Example
```jsx
import CapSkeleton from "@capillarytech/cap-ui-library/CapSkeleton";

<CapSkeleton />
```
