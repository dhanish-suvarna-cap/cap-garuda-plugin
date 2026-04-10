# CapAdvancedIcon

**Import**: `import CapAdvancedIcon from '@capillarytech/cap-ui-library/CapAdvancedIcon';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapAdvancedIcon/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Advanced Icon
```jsx
import CapAdvancedIcon from '@capillarytech/cap-ui-library/CapAdvancedIcon';

<CapAdvancedIcon type="reward" size="m" />
<CapAdvancedIcon type="loyalty" size="l" />
```

### With Custom Color and Click Handler
```jsx
<CapAdvancedIcon
  type="settings"
  size="m"
  color="#1890ff"
  onClick={handleSettingsClick}
  className="clickable-icon"
/>
```

### With Tooltip Wrapper
```jsx
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';

<CapTooltip title="Edit campaign settings">
  <span>
    <CapAdvancedIcon type="edit" size="s" />
  </span>
</CapTooltip>
```
