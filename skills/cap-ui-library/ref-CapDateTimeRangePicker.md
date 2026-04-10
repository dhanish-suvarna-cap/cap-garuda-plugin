# CapDateTimeRangePicker

**Import**: `import CapDateTimeRangePicker from '@capillarytech/cap-ui-library/CapDateTimeRangePicker';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapDateTimeRangePicker/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Date+Time Range Picker
```jsx
import CapDateTimeRangePicker from '@capillarytech/cap-ui-library/CapDateTimeRangePicker';

<CapDateTimeRangePicker
  label="Campaign Schedule"
  onChange={handleDateTimeRangeChange}
  placeholder={['Start date & time', 'End date & time']}
/>
```
