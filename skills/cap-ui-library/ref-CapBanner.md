# CapBanner

**Import**: `import CapBanner from '@capillarytech/cap-ui-library/CapBanner';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapBanner/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Info Banner
```jsx
import CapBanner from '@capillarytech/cap-ui-library/CapBanner';

<CapBanner
  type="info"
  message="Your loyalty program settings have been updated."
  closable
  onClose={handleClose}
/>
```

### Warning Banner with Description
```jsx
<CapBanner
  type="warning"
  message="Points Expiry Approaching"
  description="500 loyalty points will expire in 7 days. Notify your customers."
  closable
/>
```

### Error and Success Banners
```jsx
<CapBanner type="error" message="Failed to sync member data. Please retry." />
<CapBanner type="success" message="Campaign published successfully." />
```
