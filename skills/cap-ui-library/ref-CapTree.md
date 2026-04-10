# CapTree

**Import**: `import CapTree from '@capillarytech/cap-ui-library/CapTree';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapTree/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Tree
```jsx
import CapTree from '@capillarytech/cap-ui-library/CapTree';

const treeData = [
  {
    title: 'Parent 1',
    key: '0-0',
    children: [
      { title: 'Child 1', key: '0-0-0' },
      { title: 'Child 2', key: '0-0-1' },
    ],
  },
  { title: 'Parent 2', key: '0-1' },
];

<CapTree treeData={treeData} defaultExpandAll onSelect={handleSelect} />
```

### Checkable Tree
```jsx
<CapTree treeData={treeData} checkable onCheck={handleCheck} checkedKeys={checkedKeys} />
```
