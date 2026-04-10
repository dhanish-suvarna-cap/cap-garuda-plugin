# CapError

**Import**: `import CapError from '@capillarytech/cap-ui-library/CapError';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapError/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Inline form validation error
```jsx
import CapError from '@capillarytech/cap-ui-library/CapError';

<CapInput
  value={name}
  onChange={(e) => setName(e.target.value)}
  className={errors.name ? 'error-border' : ''}
/>
{errors.name && <CapError>{errors.name}</CapError>}
```

### With custom error message content
```jsx
import CapError from '@capillarytech/cap-ui-library/CapError';

<CapError>
  {formatMessage(messages.tierNameRequired)}
</CapError>
```

### Conditional error display after API failure
```jsx
import CapError from '@capillarytech/cap-ui-library/CapError';

{status === FAILURE && (
  <CapError>{errorMessage || 'Something went wrong. Please try again.'}</CapError>
)}
```
