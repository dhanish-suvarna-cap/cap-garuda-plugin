# CapCSVFileUploader

**Import**: `import CapCSVFileUploader from '@capillarytech/cap-ui-library/CapCSVFileUploader';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCSVFileUploader/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic CSV File Upload
```jsx
import CapCSVFileUploader from '@capillarytech/cap-ui-library/CapCSVFileUploader';

<CapCSVFileUploader
  onUpload={handleCSVUpload}
  accept=".csv"
  maxFileSize={5 * 1024 * 1024}
/>
```
