# CapHeading

**Import**: `import CapHeading from '@capillarytech/cap-ui-library/CapHeading';`

## Description
A customized heading component for displaying titles and subtitles with consistent styling and typography.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the heading |
| level | number | 1 | Heading level. Possible values: 1, 2, 3, 4, 5 |
| type | string | primary | The type of the heading. Possible values: 'primary', 'secondary' |
| style | object | {} | Custom style object for the heading |
| color | string | None | Text color of the heading |
| fontWeight | string \| number | None | Font weight of the heading |
| fontSize | string \| number | None | Font size of the heading |
| ellipsis | boolean \| { rows: number, expandable?: boolean, suffix?: string, symbol?: React.ReactNode, onExpand?: function } | False | Display ellipsis when text overflows, can be a boolean or specific configuration |
| copyable | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: [ReactNode, ReactNode] } | False | Whether to show copy button, can be a boolean or object |
| delete | boolean | False | Whether the content is deleted/strikethrough |
| disabled | boolean | False | Whether the heading is disabled |
| mark | boolean | False | Whether the content is marked/highlighted |
| underline | boolean | False | Whether to show underline |
| italic | boolean | False | Whether the heading is italic |
| code | boolean | False | Whether to show the heading as code style |
| children | ReactNode | None | Content of the heading |
| onClick | function(event) | None | Callback executed when heading is clicked |

## Usage Example
```jsx
import CapHeading from "@capillarytech/cap-ui-library/CapHeading";

<CapHeading />
```
