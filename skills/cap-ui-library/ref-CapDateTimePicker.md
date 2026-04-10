# CapDateTimePicker

**Import**: `import CapDateTimePicker from '@capillarytech/cap-ui-library/CapDateTimePicker';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapDateTimePicker/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Date + Time Picker
```jsx
import CapDateTimePicker from '@capillarytech/cap-ui-library/CapDateTimePicker';

<CapDateTimePicker
  label="Schedule Date & Time"
  placeholder="Select date and time"
  onChange={handleDateTimeChange}
/>
```

### With Validation
```jsx
<CapDateTimePicker
  label="Campaign Start"
  labelPosition="top"
  isRequired
  errorMessage="Please select date and time"
  inductiveText="Set when the campaign should begin"
  onChange={handleDateTimeChange}
/>
```
