# CapMenu

**Import**: `import CapMenu from '@capillarytech/cap-ui-library/CapMenu';`

## Description
A customized menu component that extends Ant Design's Menu component with additional styling and functionality for navigation and application menus.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the menu |
| defaultOpenKeys | string[] | [] | Array of keys of default opened sub-menus |
| defaultSelectedKeys | string[] | [] | Array of keys of default selected menu items |
| expandIcon | ReactNode \| function({ isOpen, eventKey }) | None | Custom expand icon of submenu |
| forceSubMenuRender | boolean | False | Whether to render submenu even if it's not visible |
| inlineCollapsed | boolean | False | Whether the menu is collapsed in inline mode |
| inlineIndent | number | 24 | Indentation of inline menu items in pixels |
| items | array | [] | Array of menu items in object format |
| mode | string | vertical | Menu display mode. Possible values: 'vertical', 'horizontal', 'inline' |
| multiple | boolean | False | Whether to allow selection of multiple items |
| openKeys | string[] | [] | Array of keys of currently opened sub-menus |
| overflowedIndicator | ReactNode | None | Customized icon when menu is collapsed in horizontal mode |
| selectable | boolean | True | Whether menu items can be selected |
| selectedKeys | string[] | [] | Array of keys of currently selected menu items |
| style | object | {} | Style for the root menu element |
| subMenuCloseDelay | number | 0.1 | Delay time to close submenu (in seconds) |
| subMenuOpenDelay | number | 0 | Delay time to open submenu (in seconds) |
| theme | string | light | Color theme of the menu. Possible values: 'light', 'dark' |
| triggerSubMenuAction | string | hover | Which action can trigger submenu open/close. Possible values: 'hover', 'click' |
| onClick | function({ item, key, keyPath, domEvent }) | None | Callback executed when a menu item is clicked |
| onDeselect | function({ item, key, keyPath, selectedKeys, domEvent }) | None | Callback executed when a menu item is deselected (only available when multiple is true) |
| onOpenChange | function(openKeys) | None | Callback executed when sub-menus open or close |
| onSelect | function({ item, key, keyPath, selectedKeys, domEvent }) | None | Callback executed when a menu item is selected |

## Usage Example
```jsx
import CapMenu from "@capillarytech/cap-ui-library/CapMenu";

<CapMenu />
```
