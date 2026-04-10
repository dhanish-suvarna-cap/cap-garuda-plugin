# CapSteps

**Import**: `import CapSteps from '@capillarytech/cap-ui-library/CapSteps';`

## Description
A customized steps component that extends Ant Design's Steps component with additional styling and functionality for displaying sequential steps in a process.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the steps |
| current | number | 0 | Current step index, counting from 0 |
| direction | string | horizontal | Direction of the steps. Possible values: 'horizontal', 'vertical' |
| initial | number | 0 | Initial step index, counting from 0 |
| labelPlacement | string | horizontal | Placement of step title. Possible values: 'horizontal', 'vertical' |
| percent | number | None | Progress percentage of the current step (0-100) |
| progressDot | boolean \| function(iconDot, { index, status, title, description }) | False | Whether to use dot styling for the step icon, or customize the dot |
| responsive | boolean | True | Whether to display responsive steps that adapt to screen width |
| size | string | default | Size of the steps. Possible values: 'default', 'small' |
| status | string | process | Status of the current step. Possible values: 'wait', 'process', 'finish', 'error' |
| type | string | default | Type of steps. Possible values: 'default', 'navigation' |
| onChange | function(current) | None | Callback function called when step is changed |
| items | array | [] | Array of step items, each containing title, description, status, icon, etc. |
| style | object | {} | Custom style object for the steps container |
| icons | object | None | Custom icons for different statuses. Properties include finish, error, etc. |
| clickable | boolean | False | Whether steps can be clicked to navigate |
| startIndex | number | 0 | Starting number for numbered steps |
| showStepIndexes | boolean | True | Whether to show step numbers/indexes |

## Usage Examples

### Basic Steps with Items
```jsx
import CapSteps from '@capillarytech/cap-ui-library/CapSteps';

<CapSteps
  current={1}
  items={[
    { title: 'Basic Info', description: 'Name and description' },
    { title: 'Configuration', description: 'Set thresholds' },
    { title: 'Benefits', description: 'Assign benefits' },
    { title: 'Review', description: 'Confirm and publish' },
  ]}
/>
```

### Clickable Steps with Change Handler
```jsx
import CapSteps from '@capillarytech/cap-ui-library/CapSteps';

<CapSteps
  current={currentStep}
  clickable
  onChange={(step) => setCurrentStep(step)}
  size="small"
  items={[
    { title: 'Select Program' },
    { title: 'Define Rules' },
    { title: 'Preview' },
  ]}
/>
```

### Vertical Steps with Status
```jsx
import CapSteps from '@capillarytech/cap-ui-library/CapSteps';

<CapSteps
  direction="vertical"
  current={2}
  status="error"
  items={[
    { title: 'Created', description: 'Tier created on Jan 1' },
    { title: 'Configured', description: 'Rules assigned' },
    { title: 'Validation', description: 'Threshold conflict detected', status: 'error' },
    { title: 'Published', description: 'Pending' },
  ]}
/>
```
