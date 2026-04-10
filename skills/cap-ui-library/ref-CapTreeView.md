# CapTreeView

**Import**: `import CapTreeView from '@capillarytech/cap-ui-library/CapTreeView';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapTreeView/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Tree View Display
```jsx
import CapTreeView from '@capillarytech/cap-ui-library/CapTreeView';

const treeData = [
  { title: 'Root', key: '0', children: [
    { title: 'Branch A', key: '0-0' },
    { title: 'Branch B', key: '0-1' },
  ]},
];

<CapTreeView treeData={treeData} defaultExpandAll />
```
