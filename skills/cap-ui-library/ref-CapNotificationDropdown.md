# CapNotificationDropdown

**Import**: `import CapNotificationDropdown from '@capillarytech/cap-ui-library/CapNotificationDropdown';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapNotificationDropdown/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Notification Dropdown
```jsx
import CapNotificationDropdown from '@capillarytech/cap-ui-library/CapNotificationDropdown';

<CapNotificationDropdown
  notifications={[
    { id: 1, title: 'Campaign approved', description: 'Summer Sale campaign is live.', time: '2 min ago' },
    { id: 2, title: 'New member enrolled', description: 'John Doe joined the loyalty program.', time: '10 min ago' },
  ]}
  onNotificationClick={(notification) => handleNotificationClick(notification)}
/>
```

### With Unread Count and Clear All
```jsx
<CapNotificationDropdown
  notifications={notificationsList}
  unreadCount={5}
  onNotificationClick={handleClick}
  onClearAll={handleClearAll}
  onMarkAllRead={handleMarkAllRead}
  placement="bottomRight"
/>
```

### Custom Trigger Icon
```jsx
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

<CapNotificationDropdown
  notifications={notificationsList}
  unreadCount={unreadCount}
  triggerIcon={<CapIcon type="notification" size="m" />}
  onNotificationClick={handleClick}
/>
```
