# CapIcon

**Import**: `import CapIcon from '@capillarytech/cap-ui-library/CapIcon';`

## Description
A customized icon component that extends Ant Design's Icon component with additional features like SVG support, size options, and background wrapping.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | None | Type of icon. This can be either an Ant Design icon type or a custom SVG icon type |
| size | string | m | Size of the icon |
| className | string |  | Additional CSS class for the icon |
| disabled | boolean | False | Whether the icon is disabled |
| withBackground | boolean | False | Whether to wrap the icon with a background |
| backgroundProps | object | {} | Props for the background wrapper when withBackground is true |
| svgProps | object | {} | Props passed to the SVG component if an SVG icon is used |
| allowSvg | boolean | True | Whether to allow SVG icons (if false, will use Ant Design icons only) |
| textLabel | ReactNode | <></> | Text label to be displayed alongside the icon |
| percent | number | None | Percentage value for progress-type icons |
| style | object | {} | Inline style for the icon |
| component | ReactNode | None | The component used for the icon |
| spin | boolean | False | Whether the icon should have a spinning animation |
| rotate | number | None | Rotation angle (in degrees) of the icon |
| onClick | function(event) | None | Callback when the icon is clicked |

## Sub-Components
- CapIcon.AntIcon
- CapIcon.CapIconAvatar

## Usage Example
```jsx
import CapIcon from "@capillarytech/cap-ui-library/CapIcon";

<CapIcon />
```
