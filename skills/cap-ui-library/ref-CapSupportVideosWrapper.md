# CapSupportVideosWrapper

**Import**: `import CapSupportVideosWrapper from '@capillarytech/cap-ui-library/CapSupportVideosWrapper';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapSupportVideosWrapper/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic support videos display
```jsx
import CapSupportVideosWrapper from '@capillarytech/cap-ui-library/CapSupportVideosWrapper';

<CapSupportVideosWrapper
  videos={[
    { id: '1', title: 'Getting Started with Loyalty', url: 'https://example.com/video1' },
    { id: '2', title: 'Setting Up Tiers', url: 'https://example.com/video2' },
  ]}
/>
```

### With module-specific videos and custom styling
```jsx
import CapSupportVideosWrapper from '@capillarytech/cap-ui-library/CapSupportVideosWrapper';

<CapSupportVideosWrapper
  videos={moduleVideos}
  module="loyalty-programs"
  onVideoClick={(video) => trackVideoView(video.id)}
  className="help-videos-panel"
  style={{ maxHeight: '400px' }}
/>
```
