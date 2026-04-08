# CapNotification

**Import**: `import CapNotification from '@capillarytech/cap-ui-library/CapNotification';`

## Description
A customized notification component that extends Ant Design's notification component with additional styling and functionality for displaying system notifications.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the notification |
| closeIcon | ReactNode | None | Custom close icon |
| description | string \| ReactNode | None | The content of notification box |
| duration | number | 4.5 | Time in seconds before notification closes automatically, 0 means it won't close automatically |
| icon | ReactNode | None | Custom icon |
| key | string | None | Unique identifier of the notification |
| message | string \| ReactNode | None | The title of notification box |
| placement | string | topRight | Position of notification. Possible values: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' |
| style | object | {} | Custom style of notification |
| onClick | function() | None | Callback executed when notification is clicked |
| onClose | function() | None | Callback executed when notification is closed |
| btn | ReactNode | None | Custom action button within the notification |
| type | string | None | Type of notification. Possible values: 'success', 'info', 'warning', 'error' |

## Usage Example
```jsx
import CapNotification from "@capillarytech/cap-ui-library/CapNotification";

<CapNotification />
```
