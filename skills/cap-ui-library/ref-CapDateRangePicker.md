# CapDateRangePicker

**Import**: `import CapDateRangePicker from '@capillarytech/cap-ui-library/CapDateRangePicker';`

## Description
A customized date range picker component that wraps around react-dates DateRangePicker with additional styling and functionality for selecting a range of dates.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | string | default | Size of the date picker. Possible values: 'large', 'default', 'small' |
| className | string |  | Additional CSS class for the date range picker |
| initialStartDate | momentObj | None | Initial start date for the date range picker |
| initialEndDate | momentObj | None | Initial end date for the date range picker |
| onChange | function([startDate, endDate]) | - | Callback function that is called when dates are changed |
| onFocusChange | function(focusedInput) | - | Callback function that is called when focus changes |
| startDateId | string | startDate | Unique ID for the start date input |
| endDateId | string | endDate | Unique ID for the end date input |
| startDatePlaceholderText | string | Start Date | Placeholder text for the start date input |
| endDatePlaceholderText | string | End Date | Placeholder text for the end date input |
| showCalendarOnly | boolean | False | Whether to show only the calendar without inputs |
| allowYearNavigation | boolean | False | Whether to allow navigation between years |
| disabled | boolean | False | Whether the date range picker is disabled |
| required | boolean | False | Whether the date range picker is required |
| readOnly | boolean | True | Whether the date range picker is read-only |
| showClearDates | boolean | False | Whether to show the clear dates button |
| showDefaultInputIcon | boolean | True | Whether to show the default input icon |
| customInputIcon | node | None | Custom input icon to display |
| customArrowIcon | node | None | Custom arrow icon to display between the inputs |
| customCloseIcon | node | None | Custom close icon for the clear dates button |
| block | boolean | False | Whether the inputs should take up the full width of their container |
| orientation | string | horizontal | Orientation of the calendar. Possible values: 'horizontal', 'vertical' |
| anchorDirection | string | left | Direction the calendar opens. Possible values: 'left', 'right' |
| numberOfMonths | number | 2 | Number of visible months in the calendar |
| hideKeyboardShortcutsPanel | boolean | True | Whether to hide the keyboard shortcuts panel |
| firstDayOfWeek | number | 0 | First day of the week (0: Sunday, 1: Monday, etc.) |
| minDate | string | 1970-01-01 | Minimum selectable date in YYYY-MM-DD format |
| isOutsideRange | function(day) | - | Function to determine if a day is outside the valid range |
| isDayBlocked | function(day) | - | Function to determine if a day is blocked |
| isDayHighlighted | function(day) | - | Function to determine if a day should be highlighted |
| monthFormat | string | MMMM YYYY | Format for the month displayed in the calendar header |
| weekDayFormat | string | ddd | Format for the week days displayed in the calendar |
| displayFormat | string | DD MMM YYYY | Format for displaying the selected dates in the inputs |
| minimumNights | number | 1 | Minimum number of nights required in a selected range |
| enableOutsideDays | boolean | False | Whether days outside the current month are visible |
| reopenPickerOnClearDates | boolean | False | Whether to reopen the calendar when dates are cleared |
| hideCalendar | boolean | False | Whether to hide the calendar completely |
| rootClass | string | None | Additional class to be applied to the root element |
| label | string \| ReactNode |  | Label text for the date range picker (provided by ComponentWithLabelHOC) |
| labelPosition | string | top | Position of the label. Possible values: 'top', 'left' (provided by ComponentWithLabelHOC) |
| isRequired | boolean | False | Whether the field is required (provided by ComponentWithLabelHOC) |
| errorMessage | string \| ReactNode |  | Error message to display (provided by ComponentWithLabelHOC) |
| inductiveText | string \| ReactNode |  | Helper text to display below the picker (provided by ComponentWithLabelHOC) |
| onPrevMonthClick | function() | - | Callback function that is called when previous month button is clicked |
| onNextMonthClick | function() | - | Callback function that is called when next month button is clicked |
| onClose | function() | - | Callback function that is called when the calendar is closed |
| renderMonthText | function(month) | - | Function to render custom month text in the calendar header |
| renderCalendarDay | function(day) | - | Function to render custom calendar day |
| renderDayContents | function(day) | - | Function to render the contents of the day cells |
| renderMonthElement | function({ month, onMonthSelect, onYearSelect }) | - | Function to render custom month element in the calendar header |
| navPrev | node | - | Custom previous month navigation icon |
| navNext | node | - | Custom next month navigation icon |
| withPortal | boolean | False | Whether to display the calendar in a portal |
| withFullScreenPortal | boolean | False | Whether to display the calendar in a full-screen portal |
| daySize | number | 32 | Size of the calendar day cells in pixels |
| initialVisibleMonth | function() | - | Function that returns the initially visible month |

## Usage Examples

### Basic Date Range Picker
```jsx
import CapDateRangePicker from '@capillarytech/cap-ui-library/CapDateRangePicker';

<CapDateRangePicker
  startDateId="campaignStart"
  endDateId="campaignEnd"
  startDatePlaceholderText="Start Date"
  endDatePlaceholderText="End Date"
  onChange={([startDate, endDate]) => handleDateChange(startDate, endDate)}
/>
```

### With Label & Validation
```jsx
<CapDateRangePicker
  label="Campaign Duration"
  labelPosition="top"
  isRequired
  errorMessage="Please select a date range"
  inductiveText="Select the start and end dates"
  startDateId="start"
  endDateId="end"
  displayFormat="DD MMM YYYY"
  numberOfMonths={2}
  onChange={handleDateChange}
/>
```

### With Restricted Date Range
```jsx
import moment from 'moment';

<CapDateRangePicker
  startDateId="start"
  endDateId="end"
  isOutsideRange={(day) => day.isBefore(moment().startOf('day'))}
  minimumNights={1}
  onChange={handleDateChange}
/>
```
