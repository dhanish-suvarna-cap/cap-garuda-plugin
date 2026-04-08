# CapColoredTag

**Import**: `import CapColoredTag from '@capillarytech/cap-ui-library/CapColoredTag';`

## Description
A customizable colored tag component that extends the Tag component with additional styling options for colors, borders, and font size.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the tag |
| disabled | boolean | False | Whether the tag is disabled |
| type | string |  | Type of the tag. Possible value: 'static' |
| tagColor | string | white | Background color of the tag |
| tagTextColor | string | white | Text color of the tag |
| tagBorderColor | string | none | Border color of the tag |
| closable | boolean | False | Whether the tag can be closed |
| tagCloseIconColor | string | white (if closable is true) | Color of the close icon |
| tagFontSize | string | 12px | Font size of the tag text |
| tagHeight | string | 24px | Height of the tag |
| onClose | function(e) | None | Callback executed when tag is closed |
| visible | boolean | True | Whether the tag is visible |
| style | object | None | Custom style object |

## Sub-Components
- CapColoredTag.CheckableTag

## Usage Example
```jsx
import CapColoredTag from "@capillarytech/cap-ui-library/CapColoredTag";

<CapColoredTag />
```
