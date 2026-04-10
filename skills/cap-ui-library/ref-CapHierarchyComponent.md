# CapHierarchyComponent

**Import**: `import CapHierarchyComponent from '@capillarytech/cap-ui-library/CapHierarchyComponent';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapHierarchyComponent/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic hierarchy display
```jsx
import CapHierarchyComponent from '@capillarytech/cap-ui-library/CapHierarchyComponent';

const hierarchyData = {
  name: 'Loyalty Program',
  children: [
    { name: 'Silver Tier', children: [] },
    { name: 'Gold Tier', children: [
      { name: 'Gold Plus', children: [] },
    ]},
    { name: 'Platinum Tier', children: [] },
  ],
};

<CapHierarchyComponent
  data={hierarchyData}
  onNodeClick={(node) => handleNodeSelect(node)}
/>
```

### With custom node rendering and expanded state
```jsx
import CapHierarchyComponent from '@capillarytech/cap-ui-library/CapHierarchyComponent';

<CapHierarchyComponent
  data={orgHierarchy}
  renderNode={(node) => (
    <div className="hierarchy-node">
      <span>{node.name}</span>
      <span className="node-count">({node.children.length})</span>
    </div>
  )}
  defaultExpandedKeys={['root', 'level-1']}
  className="org-hierarchy"
/>
```
