# CapDragAndDrop

**Import**: `import CapDragAndDrop from '@capillarytech/cap-ui-library/CapDragAndDrop';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapDragAndDrop/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic File Upload with MIME Types
```jsx
import CapDragAndDrop from '@capillarytech/cap-ui-library/CapDragAndDrop';

<CapDragAndDrop
  accept="image/png, image/jpeg, image/gif"
  maxfilesize={5}
  setacceptedfiles={(files) => handleFilesAccepted(files)}
  dropboxwidth="100%"
/>
```

### CSV File Upload
```jsx
<CapDragAndDrop
  accept="text/csv, application/vnd.ms-excel"
  maxfilesize={10}
  setacceptedfiles={(files) => handleCSVUpload(files)}
  dropboxwidth="400px"
/>
```

### PDF Upload with Custom Width
```jsx
<CapDragAndDrop
  accept="application/pdf"
  maxfilesize={20}
  setacceptedfiles={(files) => handlePDFUpload(files)}
  dropboxwidth="500px"
  className="pdf-upload-zone"
/>
```
