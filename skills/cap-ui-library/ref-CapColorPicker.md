# CapColorPicker

**Import**: `import CapColorPicker from '@capillarytech/cap-ui-library/CapColorPicker';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapColorPicker/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Color Picker
```jsx
import CapColorPicker from '@capillarytech/cap-ui-library/CapColorPicker';

<CapColorPicker color="#d42020" setColor={handleColorChange} />
```

### With Hex Selector
```jsx
<CapColorPicker
  color={selectedColor}
  setColor={setSelectedColor}
  hexSelector
/>
```
