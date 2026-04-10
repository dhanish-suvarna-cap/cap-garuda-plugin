# CapAskAira

**Import**: `import CapAskAira from '@capillarytech/cap-ui-library/CapAskAira';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapAskAira/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic AI assistant widget
```jsx
import CapAskAira from '@capillarytech/cap-ui-library/CapAskAira';

<CapAskAira
  onQuery={(query) => handleAiraQuery(query)}
  placeholder="Ask Aira anything..."
/>
```

### With context and custom configuration
```jsx
import CapAskAira from '@capillarytech/cap-ui-library/CapAskAira';

<CapAskAira
  onQuery={handleAiraQuery}
  context={{ module: 'loyalty', page: 'tier-management' }}
  placeholder="Ask about tier configuration..."
  position="bottom-right"
  className="aira-widget"
/>
```

### Integrated with page layout
```jsx
import CapAskAira from '@capillarytech/cap-ui-library/CapAskAira';

const PageWithAira = () => (
  <div className="page-container">
    <div className="page-content">{/* page content */}</div>
    <CapAskAira
      onQuery={handleQuery}
      onResponse={(response) => setAiraResponse(response)}
      floating
    />
  </div>
);
```
