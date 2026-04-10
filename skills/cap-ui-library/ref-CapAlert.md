# CapAlert

**Import**: `import CapAlert from '@capillarytech/cap-ui-library/CapAlert';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapAlert/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Alert Types
```jsx
import CapAlert from '@capillarytech/cap-ui-library/CapAlert';

<CapAlert message="Success! Record saved." type="success" />
<CapAlert message="Info: Review pending." type="info" />
<CapAlert message="Warning: Limit approaching." type="warning" />
<CapAlert message="Error: Failed to save." type="error" />
```

### With Description & Closable
```jsx
<CapAlert
  message="Campaign Published"
  description="Your campaign has been published successfully and is now live."
  type="success"
  closable
  onClose={handleClose}
/>
```
