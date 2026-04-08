# CapDropdown

**Import**: `import CapDropdown from '@capillarytech/cap-ui-library/CapDropdown';`

## Description
A customized dropdown component that extends Ant Design's Dropdown component with additional styling.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the dropdown |
| overlayClassName | string |  | Additional CSS class for the dropdown overlay |
| overlay | ReactNode | None | The dropdown menu, typically a Menu component |
| trigger | string \| string[] | ['hover'] | The trigger mode. Possible values: 'click', 'hover', 'contextMenu'. Can be an array of trigger modes |
| visible | boolean | None | Whether the dropdown menu is visible |
| disabled | boolean | False | Whether the dropdown is disabled |
| onVisibleChange | function(visible) | None | Called when the visible state is changed |
| placement | string | bottomLeft | Placement of popup menu. Possible values: 'bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight' |
| getPopupContainer | function(triggerNode) | () => document.body | To set the container of the dropdown menu. The default is to create a div element in body, but you can reset it to the scrolling area and make a relative position |
| overlayStyle | object | None | Style of the dropdown menu |
| arrow | boolean | False | Whether the dropdown arrow should be visible |
| autoAdjustOverflow | boolean | True | Whether to adjust dropdown placement automatically when dropdown is off screen |

## Sub-Components
- CapDropdown.Button

## Usage Example
```jsx
import CapDropdown from "@capillarytech/cap-ui-library/CapDropdown";

<CapDropdown />
```
