# CapProgress

**Import**: `import CapProgress from '@capillarytech/cap-ui-library/CapProgress';`

## Description
A customized progress component that extends Ant Design's Progress component with additional styling and functionality for displaying progress indicators.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the progress |
| format | function(percent, successPercent) | percent => `${percent}%` | Custom text format function |
| percent | number | 0 | Progress percentage (0-100) |
| showInfo | boolean | True | Whether to display the progress info |
| status | string | normal | Status of the progress. Possible values: 'success', 'exception', 'normal', 'active' |
| strokeColor | string \| { from: string; to: string; direction: string } \| string[] | None | Color of progress bar, can be a string, gradient object, or array of colors for steps |
| strokeLinecap | string | round | Style of the progress linecap. Possible values: 'round', 'square', 'butt' |
| success | { percent: number, strokeColor: string } | None | Success segment configuration with percent and strokeColor |
| trailColor | string | None | Color of unfilled part |
| type | string | line | Type of progress. Possible values: 'line', 'circle', 'dashboard' |
| size | number \| [number, number] \| 'small' \| 'default' | default | Size of the progress bar or circle, can be a number, array [width, height], or preset sizes |
| strokeWidth | number | None | Width of the progress bar or circle outline |
| width | number | 120 | Width of circular progress (only for 'circle' and 'dashboard' types) |
| gapDegree | number | 75 | The gap degree of half circle (only for 'dashboard' type) |
| gapPosition | string | bottom | Gap position of half circle (only for 'dashboard' type). Possible values: 'top', 'bottom', 'left', 'right' |
| steps | number | None | Total number of steps for segmented progress (only for 'line' type) |
| style | object | {} | Custom style object for the progress component |
| title | string \| ReactNode | None | Title text to display above the progress |
| description | string \| ReactNode | None | Description text to display below the progress |
| animation | boolean | True | Whether to apply animation effect |
| gradient | boolean | False | Whether to use gradient color effect |

## Usage Examples

### Circle Progress
```jsx
import CapProgress from '@capillarytech/cap-ui-library/CapProgress';

<CapProgress type="circle" percent={75}>Email</CapProgress>
```

### Line Progress with Custom Format
```jsx
<CapProgress percent={75} size="small" format={(percent) => `${percent}% 3,46,234`}>Email</CapProgress>
<CapProgress percent={90} size="small" format={(percent) => `${percent}% 2,46,234`}>SMS</CapProgress>
<CapProgress percent={50} size="small" format={(percent) => `${percent}% 1,12,234`}>Push</CapProgress>
```

### Status Variants
```jsx
<CapProgress percent={100} status="success" />
<CapProgress percent={70} status="active" />
<CapProgress percent={50} status="exception" />
```
