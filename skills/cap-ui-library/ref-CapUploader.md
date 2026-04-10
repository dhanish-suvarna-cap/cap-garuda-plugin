# CapUploader

**Import**: `import CapUploader from '@capillarytech/cap-ui-library/CapUploader';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapUploader/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic File Upload with Button
```jsx
import CapUploader from '@capillarytech/cap-ui-library/CapUploader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

<CapUploader action="/api/upload" onChange={handleUploadChange}>
  <CapButton>
    <CapIcon type="upload" /> Upload
  </CapButton>
</CapUploader>
```

### With File Type & Size Restrictions
```jsx
<CapUploader
  action="/api/upload"
  accept=".csv,.xlsx"
  beforeUpload={(file) => file.size / 1024 / 1024 < 5}
  onChange={handleChange}
>
  <CapButton type="secondary">Upload File (Max 5MB)</CapButton>
</CapUploader>
```
