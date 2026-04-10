# CapIllustration

**Import**: `import CapIllustration from '@capillarytech/cap-ui-library/CapIllustration';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapIllustration/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Illustration
```jsx
import CapIllustration from '@capillarytech/cap-ui-library/CapIllustration';

<CapIllustration name="empty-state" />
```

### With Custom Size and Alt Text
```jsx
<CapIllustration
  name="no-data"
  width={200}
  height={200}
  alt="No data available"
  className="empty-state-illustration"
/>
```

### Empty State with Description
```jsx
import CapIllustration from '@capillarytech/cap-ui-library/CapIllustration';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

<div style={{ textAlign: 'center', padding: '40px 0' }}>
  <CapIllustration name="no-results" width={160} height={160} />
  <CapHeading type="h4">No campaigns found</CapHeading>
</div>
```
