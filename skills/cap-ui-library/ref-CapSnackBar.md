# CapSnackBar

**Import**: `import CapSnackBar from '@capillarytech/cap-ui-library/CapSnackBar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSnackBar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Success Snackbar
```jsx
import CapSnackBar from '@capillarytech/cap-ui-library/CapSnackBar';

CapSnackBar.success({
  content: 'Reward configuration saved successfully.',
  duration: 3,
});
```

### Error Snackbar with Action
```jsx
CapSnackBar.error({
  content: 'Failed to update tier settings.',
  duration: 0,
  onClose: handleDismiss,
});
```

### Info and Warning Variants
```jsx
CapSnackBar.info({ content: 'Processing your request...', duration: 2 });
CapSnackBar.warning({ content: 'Unsaved changes will be lost.', duration: 5 });
```
