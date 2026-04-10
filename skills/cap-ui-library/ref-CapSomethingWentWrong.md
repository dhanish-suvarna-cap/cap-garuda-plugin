# CapSomethingWentWrong

**Import**: `import CapSomethingWentWrong from '@capillarytech/cap-ui-library/CapSomethingWentWrong';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSomethingWentWrong/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic "Something went wrong" page
```jsx
import CapSomethingWentWrong from '@capillarytech/cap-ui-library/CapSomethingWentWrong';

<CapSomethingWentWrong />
```

### With custom message and retry action
```jsx
import CapSomethingWentWrong from '@capillarytech/cap-ui-library/CapSomethingWentWrong';

<CapSomethingWentWrong
  message="We could not process your request."
  onRetry={() => window.location.reload()}
/>
```

### As error boundary fallback
```jsx
import CapSomethingWentWrong from '@capillarytech/cap-ui-library/CapSomethingWentWrong';

<ErrorBoundaryWrapper
  fallback={<CapSomethingWentWrong onRetry={() => window.location.reload()} />}
>
  <AppContent />
</ErrorBoundaryWrapper>
```
