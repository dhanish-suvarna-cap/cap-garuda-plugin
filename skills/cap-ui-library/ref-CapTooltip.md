# CapTooltip

**Import**: `import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';`

## Description
A customized tooltip component that extends Ant Design's Tooltip component with additional styling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| overlayClassName | string |  | Additional CSS class for the tooltip overlay |
| title | string \| ReactNode | None | The text or content shown in the tooltip |
| placement | string | top | The position of the tooltip relative to the target. Possible values: 'top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom' |
| trigger | string \| string[] | hover | Tooltip trigger mode. Possible values: 'hover', 'focus', 'click', 'contextMenu' or array of these values |
| visible | boolean | None | Whether the tooltip is visible or not |
| defaultVisible | boolean | False | Whether the tooltip is visible by default |
| onVisibleChange | function(visible) | None | Callback executed when visibility of the tooltip changes |
| mouseEnterDelay | number | 0.1 | Delay in seconds before tooltip is shown on mouse enter |
| mouseLeaveDelay | number | 0.1 | Delay in seconds before tooltip is hidden on mouse leave |
| overlayStyle | object | None | Additional style for the tooltip overlay |
| arrowPointAtCenter | boolean | False | Whether the arrow's position is determined by the center of the target |
| autoAdjustOverflow | boolean | True | Whether to adjust the popup placement automatically when it is near the edges of the screen |
| align | object | None | This value will be merged into placement's config, please refer to the settings of align |
| destroyTooltipOnHide | boolean | False | Whether to destroy tooltip dom when hidden |
| getPopupContainer | function(triggerNode) | () => document.body | The DOM container of the tip, the default behavior is to create a div element in body |

## Usage Example
```jsx
import CapTooltip from "@capillarytech/cap-ui-library/CapTooltip";

<CapTooltip />
```
