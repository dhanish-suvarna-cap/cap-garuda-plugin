# CapCalendarDatePicker

**Import**: `import CapCalendarDatePicker from '@capillarytech/cap-ui-library/CapCalendarDatePicker';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCalendarDatePicker/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Calendar Date Picker
```jsx
import CapCalendarDatePicker from '@capillarytech/cap-ui-library/CapCalendarDatePicker';

<CapCalendarDatePicker
  label="Select Date"
  onChange={handleDateChange}
  placeholder="Pick a date"
/>
```

### With Label & Validation
```jsx
<CapCalendarDatePicker
  label="Event Date"
  labelPosition="top"
  isRequired
  errorMessage="Date is required"
  inductiveText="Select the event date from the calendar"
  onChange={handleDateChange}
/>
```
