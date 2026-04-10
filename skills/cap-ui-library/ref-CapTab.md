# CapTab

**Import**: `import CapTab from '@capillarytech/cap-ui-library/CapTab';`

## Description
A customized tab component that extends Ant Design's Tabs component with additional styling and functionality.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the tabs container |
| activeKey | string | None | Current active TabPane's key |
| defaultActiveKey | string | 1 | Initial active TabPane's key, if activeKey is not provided |
| centered | boolean | False | Centers tabs |
| hideAdd | boolean | False | Hide plus icon or not, when type='editable-card' |
| size | string | default | Size of tabs. Possible values: 'large', 'default', 'small' |
| tabBarGutter | number | None | Gap between tabs |
| tabBarStyle | object | {} | Tab bar style object |
| tabPosition | string | top | Position of tabs. Possible values: 'top', 'right', 'bottom', 'left' |
| destroyInactiveTabPane | boolean | False | Whether destroy content in inactive tabs |
| type | string | line | Type of tabs. Possible values: 'line', 'card', 'editable-card' |
| onChange | function(activeKey) | None | Callback executed when active tab is changed |
| onEdit | function(targetKey, action) | None | Callback when tab is added or removed, only works for type='editable-card' |
| onTabClick | function(key, event) | None | Callback when tab is clicked |
| onTabScroll | function({ direction }) | None | Callback when tab is scrolled |
| keyboard | boolean | True | Whether to activate tabs by keyboard navigation |
| moreIcon | ReactNode | None | Custom More icon when tabs don't fit in the screen |
| addIcon | ReactNode | None | Custom Add icon when type='editable-card' |
| animated | boolean \| { inkBar: boolean, tabPane: boolean } | { inkBar: true, tabPane: false } | Whether to use animation for tabs |
| items | array | [] | Array of tab items with label, key, children and other properties |

## Usage Examples

### Basic Tabs with Panes
```jsx
import CapTab from '@capillarytech/cap-ui-library/CapTab';

const panes = [
  { tab: 'Overview', key: 'tab1', content: <OverviewPanel /> },
  { tab: 'Details', key: 'tab2', content: <DetailsPanel /> },
  { tab: 'History', key: 'tab3', content: 'History content here' },
];

<CapTab panes={panes} />
```

### Disabled Tabs
```jsx
const panes = [
  { tab: 'Active', key: 'tab1', content: 'Active content' },
  { tab: 'Disabled', key: 'tab2', content: 'Disabled content', disabled: true },
];

<CapTab panes={panes} />
```

### With Tab Content as Card
```jsx
import CapCard from '@capillarytech/cap-ui-library/CapCard';

const card = (
  <CapCard title="Campaign Stats" style={{ width: 300 }}>
    <p>Total sent: 10,000</p>
    <p>Opened: 3,500</p>
  </CapCard>
);

const panes = [
  { tab: 'Stats', key: 'stats', content: card },
  { tab: 'Settings', key: 'settings', content: 'Settings panel' },
];

<CapTab panes={panes} onChange={handleTabChange} />
```
