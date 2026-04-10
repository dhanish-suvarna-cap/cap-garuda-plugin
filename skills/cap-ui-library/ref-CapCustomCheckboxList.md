# CapCustomCheckboxList

**Import**: `import CapCustomCheckboxList from '@capillarytech/cap-ui-library/CapCustomCheckboxList';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCustomCheckboxList/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Checkbox List
```jsx
import CapCustomCheckboxList from '@capillarytech/cap-ui-library/CapCustomCheckboxList';

const options = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Push Notification', value: 'push' },
];

<CapCustomCheckboxList
  options={options}
  value={selectedChannels}
  onChange={handleChange}
  label="Communication Channels"
/>
```
