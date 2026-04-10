# CapErrorStateIllustration

**Import**: `import CapErrorStateIllustration from '@capillarytech/cap-ui-library/CapErrorStateIllustration';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapErrorStateIllustration/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic error state illustration
```jsx
import CapErrorStateIllustration from '@capillarytech/cap-ui-library/CapErrorStateIllustration';

<CapErrorStateIllustration
  title="Unable to load data"
  description="We encountered an error while fetching your data. Please try again."
/>
```

### With refresh action button
```jsx
import CapErrorStateIllustration from '@capillarytech/cap-ui-library/CapErrorStateIllustration';

<CapErrorStateIllustration
  title="Something went wrong"
  description="An unexpected error occurred."
  buttonText="Retry"
  onButtonClick={() => dispatch(fetchDataRequest())}
/>
```

### Full-page error state
```jsx
import CapErrorStateIllustration from '@capillarytech/cap-ui-library/CapErrorStateIllustration';

{status === FAILURE && (
  <CapErrorStateIllustration
    title="Failed to load loyalty programs"
    description={errorMessage}
    buttonText="Go Back"
    onButtonClick={() => history.goBack()}
    className="full-page-error"
  />
)}
```
