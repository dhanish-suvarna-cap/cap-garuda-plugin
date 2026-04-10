# CapImage

**Import**: `import CapImage from '@capillarytech/cap-ui-library/CapImage';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapImage/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Image
```jsx
import CapImage from '@capillarytech/cap-ui-library/CapImage';

<CapImage src="/assets/logo.png" alt="Company Logo" />
```

### With Dimensions and Click Handler
```jsx
<CapImage
  src={rewardImageUrl}
  alt="Reward thumbnail"
  width={120}
  height={80}
  className="reward-thumbnail"
  onClick={handleImageClick}
/>
```

### As an Icon-Style Image
```jsx
import CapImage from '@capillarytech/cap-ui-library/CapImage';
import deleteIcon from 'assets/images/delete-icon.svg';

<CapImage
  className="pointer-cursor"
  src={deleteIcon}
  alt="Delete"
  style={{ width: 16, height: 16 }}
/>
```
