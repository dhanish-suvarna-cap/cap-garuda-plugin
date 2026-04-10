# CapDnDGraph

**Import**: `import CapDnDGraph from '@capillarytech/cap-ui-library/CapDnDGraph';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapDnDGraph/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Drag-and-Drop Graph (Flow Builder)
```jsx
import CapDnDGraph from '@capillarytech/cap-ui-library/CapDnDGraph';

<CapDnDGraph
  nodes={graphNodes}
  edges={graphEdges}
  onNodeClick={handleNodeClick}
  onEdgeConnect={handleConnect}
/>
```
