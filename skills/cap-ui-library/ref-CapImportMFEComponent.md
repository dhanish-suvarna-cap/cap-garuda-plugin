# CapImportMFEComponent

**Import**: `import CapImportMFEComponent from '@capillarytech/cap-ui-library/CapImportMFEComponent';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapImportMFEComponent/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic micro-frontend component loader
```jsx
import CapImportMFEComponent from '@capillarytech/cap-ui-library/CapImportMFEComponent';

<CapImportMFEComponent
  url="https://cdn.example.com/mfe/rewards-widget/remoteEntry.js"
  scope="rewardsWidget"
  module="./RewardsWidget"
/>
```

### With loading fallback and error handling
```jsx
import CapImportMFEComponent from '@capillarytech/cap-ui-library/CapImportMFEComponent';

<CapImportMFEComponent
  url={mfeConfig.remoteEntryUrl}
  scope={mfeConfig.scope}
  module={mfeConfig.module}
  fallback={<CapSkeleton />}
  onError={(error) => notifyHandledException(error)}
  props={{ orgId, userId, locale }}
/>
```

### Loading a remote MFE with custom props
```jsx
import CapImportMFEComponent from '@capillarytech/cap-ui-library/CapImportMFEComponent';

<CapImportMFEComponent
  url="https://cdn.example.com/mfe/tier-badge/remoteEntry.js"
  scope="tierBadge"
  module="./TierBadge"
  props={{ tierId: currentTier.id, tierName: currentTier.name }}
  className="mfe-container"
/>
```
