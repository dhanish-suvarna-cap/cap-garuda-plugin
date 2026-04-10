# CapTimePicker

**Import**: `import CapTimePicker from '@capillarytech/cap-ui-library/CapTimePicker';`

## Description
A customized time picker component that extends Ant Design's TimePicker component with additional styling and form integration capabilities.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the time picker |
| allowClear | boolean | True | Whether to show clear button |
| autoFocus | boolean | False | Whether to get focus when component is mounted |
| bordered | boolean | True | Whether to show border around picker |
| clearText | string | Clear | Clear tooltip of clear button |
| disabled | boolean | False | Whether the picker is disabled |
| disabledHours | function() | None | Function to disable specific hours |
| disabledMinutes | function(hour) | None | Function to disable specific minutes |
| disabledSeconds | function(hour, minute) | None | Function to disable specific seconds |
| format | string | HH:mm:ss | Format of the time displayed |
| hourStep | number | 1 | Interval between hours in the hour selection |
| minuteStep | number | 1 | Interval between minutes in the minute selection |
| secondStep | number | 1 | Interval between seconds in the second selection |
| hideDisabledOptions | boolean | False | Whether to hide disabled options |
| showNow | boolean | True | Whether to show 'Now' button at the bottom of the panel |
| placeholder | string | Select time | Display text when time is not selected |
| size | string | default | Size of the picker. Possible values: 'large', 'default', 'small' |
| use12Hours | boolean | False | Whether to use 12-hour format |
| value | Moment | None | Current time |
| onChange | function(time, timeString) | None | Callback when time is changed |
| onSelect | function(time) | None | Callback when a time is selected |
| open | boolean | False | Whether to show picker panel |
| onOpenChange | function(open) | None | Callback when panel open/close |
| label | string \| node |  | Time picker label |
| labelPosition | string | top | Position of time picker label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether to show required indication i.e '*' at the end of label |
| errorMessage | string \| node |  | Message to show as error |
| inductiveText | string \| node |  | Inductive text to show below time picker label |
| inline | boolean | False | If true, display property of time picker is set to inline-block |

## Usage Examples

### Basic with 12-hour format
```jsx
import CapTimePicker from '@capillarytech/cap-ui-library/CapTimePicker';

<CapTimePicker
  use12Hours
  format="h:mm a"
  placeholder="Select time"
  onChange={(time, timeString) => console.log(time, timeString)}
/>
```

### With label and validation (HOC props)
```jsx
<CapTimePicker
  label="Meeting Time"
  labelPosition="top"
  isRequired
  errorMessage="Please select a time"
  inductiveText="Choose a time slot for the meeting"
  use12Hours
  format="h:mm:ss A"
  onChange={handleTimeChange}
/>
```

### With disabled hours and custom steps
```jsx
<CapTimePicker
  label="Business Hours Only"
  format="HH:mm"
  minuteStep={15}
  disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]}
  onChange={handleTimeChange}
  inline
/>
```
