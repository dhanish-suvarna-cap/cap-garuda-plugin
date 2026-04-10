# CapSlider

**Import**: `import CapSlider from '@capillarytech/cap-ui-library/CapSlider';`

## Description
A customized slider component that extends Ant Design's Slider component with additional styling and functionality for selecting values within a range.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the slider |
| allowClear | boolean | True | Whether to allow clearing the value by clicking track |
| defaultValue | number \| [number, number] | 0 | Default value or default range value |
| disabled | boolean | False | Whether the slider is disabled |
| dots | boolean | False | Whether to show dots on the slider track |
| included | boolean | True | Whether to include the track between handles (for range slider) |
| marks | object | None | Tick marks on the slider, key as value and value as content |
| max | number | 100 | Maximum value of the slider |
| min | number | 0 | Minimum value of the slider |
| range | boolean \| { draggableTrack?: boolean } | False | Whether to use range mode or not, or whether to allow dragging the track |
| reverse | boolean | False | Whether to reverse the slider direction (right to left or top to bottom) |
| step | number \| null | 1 | Step size of the slider, or null for continuous sliding |
| tooltip | object | None | Configuration for tooltip when hovering slider handle. Properties include open, placement, formatter, etc. |
| value | number \| [number, number] | None | Current value or range value of the slider |
| vertical | boolean | False | Whether the slider is vertical |
| onAfterChange | function(value) | None | Callback function that is fired when onmouseup is triggered |
| onChange | function(value) | None | Callback function that is fired when the user changes the slider's value |
| trackStyle | object \| object[] | {} | Style of the slider track |
| railStyle | object | {} | Style of the slider rail (background) |
| handleStyle | object \| object[] | {} | Style of the slider handle |
| dotStyle | object \| object[] | {} | Style of the slider dots |
| activeDotStyle | object \| object[] | {} | Style of active slider dots |
| label | string \| ReactNode |  | Label text for the slider |
| labelPosition | string | top | Position of slider label. Possible values: 'top', 'left' |
| isRequired | boolean | False | Whether the field is required |
| errorMessage | string \| ReactNode |  | Error message to display |
| inductiveText | string \| ReactNode |  | Helper text to display below the slider |
| inline | boolean | False | Whether to display the component inline |
| showInputControls | boolean | False | Whether to show input controls alongside the slider |
| inputPosition | string | end | Position of the input controls. Possible values: 'start', 'end' |

## Usage Examples

### Basic Ratio Slider
```jsx
import CapSlider from '@capillarytech/cap-ui-library/CapSlider';

<CapSlider type="ratio" defaultValue={40} />
<CapSlider type="ratio" defaultValue={40} disabled />
```

### With Marks (Tick Points)
```jsx
const marks = [0, 1, 2, 3, 4, 5, 6, 7];

<CapSlider
  defaultValue={1}
  marks={marks}
  max={7}
  min={0}
  dots={false}
  included={false}
  onChange={handleChange}
  value={sliderValue}
/>
```

### Range Slider
```jsx
<CapSlider range defaultValue={[20, 50]} min={0} max={100} onChange={handleRangeChange} />
```

### With Label
```jsx
<CapSlider
  label="Discount Percentage"
  labelPosition="top"
  min={0}
  max={100}
  defaultValue={30}
  onChange={handleChange}
/>
```
