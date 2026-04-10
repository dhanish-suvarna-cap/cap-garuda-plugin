# CapStaticTemplates

**Import**: `import CapStaticTemplates from '@capillarytech/cap-ui-library/CapStaticTemplates';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapStaticTemplates/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic static template display
```jsx
import CapStaticTemplates from '@capillarytech/cap-ui-library/CapStaticTemplates';

<CapStaticTemplates
  templates={templateList}
  onSelect={(template) => handleTemplateSelect(template)}
/>
```

### With category filter and preview
```jsx
import CapStaticTemplates from '@capillarytech/cap-ui-library/CapStaticTemplates';

<CapStaticTemplates
  templates={emailTemplates}
  onSelect={handleTemplateSelect}
  categories={['Welcome', 'Reward', 'Notification', 'Promotion']}
  showPreview
  selectedTemplateId={currentTemplateId}
  className="template-gallery"
/>
```
