# CapLabel

**Import**: `import CapLabel from '@capillarytech/cap-ui-library/CapLabel';`

## Description
A customized label component that provides a variety of predefined text styles with different font sizes, weights, colors, and line heights for consistent typography throughout the application.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | label1 | Predefined style type for the label. Determines font-size, font-weight, color, and line-height. |
| children | ReactNode | None | Content to be displayed inside the label |
| fontWeight | string \| number | None | Custom font weight to override the predefined weight from the type |
| lineHeight | string | None | Custom line height to override the predefined line height from the type |
| className | string |  | Additional CSS class for the label |
| style | object | {} | Custom style object for the label |

## Usage Example
```jsx
import CapLabel from "@capillarytech/cap-ui-library/CapLabel";

<CapLabel />
```
