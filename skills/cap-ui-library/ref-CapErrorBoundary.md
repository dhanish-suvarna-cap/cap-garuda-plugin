# CapErrorBoundary

**Import**: `import CapErrorBoundary from '@capillarytech/cap-ui-library/CapErrorBoundary';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapErrorBoundary/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic error boundary wrapping a component
```jsx
import CapErrorBoundary from '@capillarytech/cap-ui-library/CapErrorBoundary';

<CapErrorBoundary
  onError={(error) => notifyHandledException(error)}
  fallback={<div>Something went wrong. Please refresh.</div>}
>
  <MyComponent />
</CapErrorBoundary>
```

### With image illustration and refresh button
```jsx
import CapErrorBoundary from '@capillarytech/cap-ui-library/CapErrorBoundary';

<CapErrorBoundary
  showImage
  onError={(error) => notifyHandledException(error)}
  onRefreshClick={() => window.location.reload()}
>
  <TierConfigurationPanel />
</CapErrorBoundary>
```

### Used via ErrorBoundaryWrapper (common pattern)
```jsx
import CapErrorBoundary from '@capillarytech/cap-ui-library/CapErrorBoundary';

// Typically wrapped in an ErrorBoundaryWrapper molecule:
const ErrorBoundaryWrapper = ({ children, showImage, onError }) => (
  <CapErrorBoundary
    showImage={showImage}
    onError={onError}
  >
    {children}
  </CapErrorBoundary>
);
```
