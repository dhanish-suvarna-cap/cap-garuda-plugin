# CapEventCalendar

**Import**: `import CapEventCalendar from '@capillarytech/cap-ui-library/CapEventCalendar';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapEventCalendar/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Event Calendar
```jsx
import CapEventCalendar from '@capillarytech/cap-ui-library/CapEventCalendar';

const events = [
  { title: 'Campaign Launch', date: '2024-03-15' },
  { title: 'Promo End', date: '2024-03-20' },
];

<CapEventCalendar events={events} onEventClick={handleEventClick} />
```
