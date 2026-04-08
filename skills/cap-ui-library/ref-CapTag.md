# CapTag

**Import**: `import CapTag from '@capillarytech/cap-ui-library/CapTag';`

## Description
A customized tag component that extends Ant Design's Tag component with additional styling and types.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the tag |
| disabled | boolean | False | Whether the tag is disabled |
| type | string |  | Type of the tag. Possible values: 'outline', 'static' |
| closable | boolean | False | Whether the Tag can be closed |
| color | string | None | Color of the tag |
| visible | boolean | True | Whether the Tag is visible |
| onClose | function(e) | None | Callback executed when tag is closed |
| afterClose | function() | None | Callback executed after close animation ends |
| style | object | None | Custom style object |
| icon | ReactNode | None | Set the icon component of tag |

## Sub-Components
- CapTag.CheckableTag

## Usage Example
```jsx
import CapTag from "@capillarytech/cap-ui-library/CapTag";

<CapTag />
```
