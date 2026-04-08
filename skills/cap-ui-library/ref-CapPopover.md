# CapPopover

**Import**: `import CapPopover from '@capillarytech/cap-ui-library/CapPopover';`

## Description
A customized popover component that extends Ant Design's Popover component with additional styling and flexibility in content presentation.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the popover |
| content | ReactNode | None | Content of the popover |
| title | ReactNode | None | Title of the popover |
| trigger | string \| string[] | hover | Popover trigger mode. Possible values: 'hover', 'focus', 'click' |
| visible | boolean | False | Whether the popover is visible |
| onVisibleChange | function(visible) | None | Callback executed when visibility of the popover changes |
| placement | string | top | The position of the popover. Possible values: 'top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom' |
| color | string | None | Background color of the popover |
| overlayClassName | string |  | Additional CSS class for the popover overlay |
| overlayStyle | object | {} | Style of the popover overlay |
| overlayInnerStyle | object | {} | Inner style of the popover overlay |
| destroyTooltipOnHide | boolean \| { keepParent?: boolean } | False | Whether to destroy popover when hidden |
| mouseEnterDelay | number | 0.1 | Delay in seconds before popover is shown on mouse enter |
| mouseLeaveDelay | number | 0.1 | Delay in seconds before popover is hidden on mouse leave |
| getPopupContainer | function(triggerNode) | () => document.body | The container of the popover |
| arrow | boolean \| { pointAtCenter: boolean } | True | Whether the popover has an arrow, or adjust placement by point |
| autoAdjustOverflow | boolean | True | Whether to adjust popover placement automatically when popover is off screen |

## Usage Example
```jsx
import CapPopover from "@capillarytech/cap-ui-library/CapPopover";

<CapPopover />
```
