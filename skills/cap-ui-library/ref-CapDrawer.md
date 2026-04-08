# CapDrawer

**Import**: `import CapDrawer from '@capillarytech/cap-ui-library/CapDrawer';`

## Description
A customized drawer component that extends Ant Design's Drawer component with additional styling and functionality for creating sliding panels.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the drawer |
| bodyStyle | object | {} | Style for the drawer content part |
| closable | boolean | True | Whether to show a close button at the top-right of the drawer |
| closeIcon | ReactNode | None | Custom close icon |
| contentWrapperStyle | object | {} | Style for the drawer content wrapper |
| destroyOnClose | boolean | False | Whether to unmount child components on close |
| drawerStyle | object | {} | Style for the drawer container |
| footer | ReactNode | None | The footer content of the drawer |
| footerStyle | object | {} | Style for the drawer footer part |
| forceRender | boolean | False | Whether to pre-render drawer body content even if not visible |
| getContainer | HTMLElement \| () => HTMLElement \| Selectors \| false | document.body | Specify the container for the drawer |
| headerStyle | object | {} | Style for the drawer header part |
| height | string \| number | 256 | Placement is 'top' or 'bottom', height of the drawer |
| keyboard | boolean | True | Whether to support keyboard esc to close |
| mask | boolean | True | Whether to show mask |
| maskClosable | boolean | True | Whether to close the drawer when the mask is clicked |
| maskStyle | object | {} | Style for drawer mask |
| placement | string | right | Placement of the drawer. Possible values: 'top', 'right', 'bottom', 'left' |
| title | ReactNode | None | The title of the drawer |
| visible | boolean | False | Whether the drawer is visible |
| width | string \| number | 256 | Placement is 'left' or 'right', width of the drawer |
| zIndex | number | 1000 | Z-index of the drawer |
| onClose | function(e) | None | Callback when drawer is closed |
| afterVisibleChange | function(visible) | None | Callback after drawer visible state is changed |
| size | string | default | Preset size of the drawer. Possible values: 'default', 'large' |
| extra | ReactNode | None | Extra content in the drawer header |
| children | ReactNode | None | Content of the drawer |

## Usage Example
```jsx
import CapDrawer from "@capillarytech/cap-ui-library/CapDrawer";

<CapDrawer />
```
