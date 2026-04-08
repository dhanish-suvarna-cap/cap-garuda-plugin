# CapTooltipWithInfo

**Import**: `import CapTooltipWithInfo from '@capillarytech/cap-ui-library/CapTooltipWithInfo';`

## Description
A tooltip component with an info icon that shows information on hover or click.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the tooltip component |
| infoIconProps | object | {} | Props to be passed to the info icon |
| ariaLabel | string | None | Accessibility label for the info icon |
| title | string \| ReactNode | None | The text or content shown in the tooltip |
| placement | string | top | The position of the tooltip relative to the target. Possible values: 'top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom' |
| trigger | string \| string[] | hover | Tooltip trigger mode. Possible values: 'hover', 'focus', 'click', 'contextMenu' or array of these values |
| overlayClassName | string |  | Additional CSS class for the tooltip overlay |
| overlayStyle | object | None | Additional style for the tooltip overlay |
| visible | boolean | None | Whether the tooltip is visible or not |
| onVisibleChange | function(visible) | None | Callback executed when visibility of the tooltip changes |

## Usage Example
```jsx
import CapTooltipWithInfo from "@capillarytech/cap-ui-library/CapTooltipWithInfo";

<CapTooltipWithInfo />
```
