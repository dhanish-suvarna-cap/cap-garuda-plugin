# CapEmptyDivWithBorder

**Import**: `import CapEmptyDivWithBorder from '@capillarytech/cap-ui-library/CapEmptyDivWithBorder';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapEmptyDivWithBorder/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Empty Div with Border
```jsx
import CapEmptyDivWithBorder from '@capillarytech/cap-ui-library/CapEmptyDivWithBorder';

<CapEmptyDivWithBorder>
  <p>Drop content here or click to add</p>
</CapEmptyDivWithBorder>
```

### Styled Placeholder Area
```jsx
import CapEmptyDivWithBorder from '@capillarytech/cap-ui-library/CapEmptyDivWithBorder';

<CapEmptyDivWithBorder
  className="upload-zone"
  style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  <span>No benefits configured yet. Click to add one.</span>
</CapEmptyDivWithBorder>
```
