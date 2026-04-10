# CapMultiplePath

**Import**: `import CapMultiplePath from '@capillarytech/cap-ui-library/CapMultiplePath';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapMultiplePath/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic multiple path selector
```jsx
import CapMultiplePath from '@capillarytech/cap-ui-library/CapMultiplePath';

const paths = [
  { id: 'path1', label: 'Earn Path', steps: ['Purchase', 'Review', 'Reward'] },
  { id: 'path2', label: 'Burn Path', steps: ['Select', 'Redeem', 'Confirm'] },
];

<CapMultiplePath
  paths={paths}
  onPathChange={(updatedPaths) => setPaths(updatedPaths)}
/>
```

### With add/remove path controls
```jsx
import CapMultiplePath from '@capillarytech/cap-ui-library/CapMultiplePath';

<CapMultiplePath
  paths={rulePaths}
  onPathChange={handlePathUpdate}
  onAddPath={() => addNewPath()}
  onRemovePath={(pathId) => removePath(pathId)}
  maxPaths={5}
  className="rule-path-builder"
/>
```
