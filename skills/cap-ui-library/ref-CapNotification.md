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

## Usage Examples

### Success / Error Notifications
```jsx
import CapNotification from '@capillarytech/cap-ui-library/CapNotification';

// Success notification
CapNotification.success({
  message: 'Campaign Saved',
  duration: 3,
});

// Error notification with description
CapNotification.error({
  message: 'Save Failed',
  description: 'Unable to save campaign. Please check your network and try again.',
  duration: 0, // won't auto-close
});
```

### Default Notification with Custom Icon
```jsx
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapButton from '@capillarytech/cap-ui-library/CapButton';

CapNotification.open({
  message: 'New Feature Available',
  description: (
    <div>
      <div>Check out the new campaign builder.</div>
      <CapButton style={{ marginTop: '24px' }}>Try Now</CapButton>
    </div>
  ),
  icon: <CapIcon type="gallery" />,
  duration: 0,
  key: 'feature_notification',
});

// Close by key
CapNotification.close('feature_notification');
```

### API Methods
```jsx
CapNotification.success(config)
CapNotification.error(config)
CapNotification.info(config)
CapNotification.warning(config)
CapNotification.open(config)
CapNotification.close(key)
CapNotification.destroy()
```
