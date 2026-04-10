# CapMediaPreview

**Import**: `import CapMediaPreview from '@capillarytech/cap-ui-library/CapMediaPreview';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapMediaPreview/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Image Preview
```jsx
import CapMediaPreview from '@capillarytech/cap-ui-library/CapMediaPreview';

<CapMediaPreview
  src="https://cdn.example.com/campaign-banner.jpg"
  alt="Campaign Banner"
  type="image"
/>
```

### Video Preview
```jsx
<CapMediaPreview
  src="https://cdn.example.com/promo-video.mp4"
  type="video"
  width={320}
  height={180}
  alt="Promotion video"
/>
```

### With Fallback and Custom Style
```jsx
<CapMediaPreview
  src={mediaUrl}
  type="image"
  alt="Reward media"
  fallback="/assets/placeholder.png"
  className="media-preview-card"
  style={{ borderRadius: 8, overflow: 'hidden' }}
/>
```
