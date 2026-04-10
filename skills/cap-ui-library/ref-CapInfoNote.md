# CapInfoNote

**Import**: `import CapInfoNote from '@capillarytech/cap-ui-library/CapInfoNote';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapInfoNote/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Info Note
```jsx
import CapInfoNote from '@capillarytech/cap-ui-library/CapInfoNote';

<CapInfoNote message="Points will be credited after the return window closes." />
```

### Warning Info Note
```jsx
<CapInfoNote
  type="warning"
  message="Editing this rule will affect all active campaigns using it."
/>
```

### Info Note with Custom Content
```jsx
<CapInfoNote
  type="info"
  message={
    <span>
      Members in the <strong>Gold</strong> tier earn 2x points on weekends.
    </span>
  }
  className="tier-info-note"
/>
```
