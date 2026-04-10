# CapAppNotEnabled

**Import**: `import CapAppNotEnabled from '@capillarytech/cap-ui-library/CapAppNotEnabled';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapAppNotEnabled/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic app not enabled page
```jsx
import CapAppNotEnabled from '@capillarytech/cap-ui-library/CapAppNotEnabled';

<CapAppNotEnabled />
```

### With custom module name and contact info
```jsx
import CapAppNotEnabled from '@capillarytech/cap-ui-library/CapAppNotEnabled';

<CapAppNotEnabled
  moduleName="Loyalty+"
  message="This module is not enabled for your organization."
  contactEmail="support@capillary.com"
/>
```

### Conditionally rendered based on feature flag
```jsx
import CapAppNotEnabled from '@capillarytech/cap-ui-library/CapAppNotEnabled';

{!isModuleEnabled('loyalty-tiers') ? (
  <CapAppNotEnabled
    moduleName="Tier Management"
    message="Contact your administrator to enable Tier Management."
  />
) : (
  <TierManagementPage />
)}
```
