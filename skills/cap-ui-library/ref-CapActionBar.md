# CapActionBar

**Import**: `import CapActionBar from '@capillarytech/cap-ui-library/CapActionBar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapActionBar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic action bar with buttons
```jsx
import CapActionBar from '@capillarytech/cap-ui-library/CapActionBar';

<CapActionBar>
  <CapButton type="secondary" onClick={handleCancel}>Cancel</CapButton>
  <CapButton type="primary" onClick={handleSave}>Save</CapButton>
</CapActionBar>
```

### Fixed bottom action bar with multiple actions
```jsx
import CapActionBar from '@capillarytech/cap-ui-library/CapActionBar';

<CapActionBar
  fixed
  className="tier-action-bar"
>
  <CapButton onClick={handleDiscard}>Discard</CapButton>
  <CapButton type="secondary" onClick={handleSaveDraft}>Save Draft</CapButton>
  <CapButton type="primary" onClick={handlePublish} disabled={!isValid}>
    Publish
  </CapButton>
</CapActionBar>
```
