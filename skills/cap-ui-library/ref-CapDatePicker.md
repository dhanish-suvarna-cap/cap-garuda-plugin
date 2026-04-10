# CapDatePicker

**Import**: `import CapDatePicker from '@capillarytech/cap-ui-library/CapDatePicker';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapDatePicker/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Date Picker
```jsx
import CapDatePicker from '@capillarytech/cap-ui-library/CapDatePicker';

<CapDatePicker onChange={handleDateChange} />
```

### With Label, Inductive Text & Timezone
```jsx
<CapDatePicker
  onChange={handleDateChange}
  label="Start Date"
  inductiveText="Select the campaign start date"
  showTimezone
  timezone="Asia/Kolkata"
  showToday={false}
/>
```

### With Validation
```jsx
<CapDatePicker
  label="Due Date"
  labelPosition="top"
  isRequired
  errorMessage="Date is required"
  onChange={handleDateChange}
/>
```
