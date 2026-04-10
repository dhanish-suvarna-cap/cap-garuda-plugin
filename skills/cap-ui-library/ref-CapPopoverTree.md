# CapPopoverTree

**Import**: `import CapPopoverTree from '@capillarytech/cap-ui-library/CapPopoverTree';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapPopoverTree/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Popover Tree
```jsx
import CapPopoverTree from '@capillarytech/cap-ui-library/CapPopoverTree';

const treeData = [
  {
    title: 'Loyalty Programs',
    key: 'loyalty',
    children: [
      { title: 'Points Program', key: 'points' },
      { title: 'Tier Program', key: 'tiers' },
    ],
  },
  {
    title: 'Promotions',
    key: 'promos',
    children: [
      { title: 'Cashback Offers', key: 'cashback' },
      { title: 'Bonus Points', key: 'bonus' },
    ],
  },
];

<CapPopoverTree
  treeData={treeData}
  onSelect={(selectedKeys) => handleSelect(selectedKeys)}
  trigger="click"
  placement="bottomLeft"
>
  <CapButton type="secondary">Select Category</CapButton>
</CapPopoverTree>
```

### With Checkable Nodes
```jsx
<CapPopoverTree
  treeData={treeData}
  checkable
  checkedKeys={selectedKeys}
  onCheck={(checkedKeys) => setSelectedKeys(checkedKeys)}
  trigger="click"
>
  <span>Choose items</span>
</CapPopoverTree>
```
