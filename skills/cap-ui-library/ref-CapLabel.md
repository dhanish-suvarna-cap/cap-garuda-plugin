# CapLabel

**Import**: `import CapLabel from '@capillarytech/cap-ui-library/CapLabel';`

## Description
A customized label component that provides a variety of predefined text styles with different font sizes, weights, colors, and line heights for consistent typography throughout the application.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | label1 | Predefined style type for the label. Determines font-size, font-weight, color, and line-height. |
| children | ReactNode | None | Content to be displayed inside the label |
| fontWeight | string \| number | None | Custom font weight to override the predefined weight from the type |
| lineHeight | string | None | Custom line height to override the predefined line height from the type |
| className | string |  | Additional CSS class for the label |
| style | object | {} | Custom style object for the label |

## Usage Examples

### Basic Label Types
```jsx
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';

<CapLabel type="label1">Primary Field Label</CapLabel>
<CapLabel type="label2">Secondary Description</CapLabel>
<CapLabel type="label3">Helper Text</CapLabel>
<CapLabel type="label4">Small Caption</CapLabel>
```

### With Custom Font Weight and Style
```jsx
<CapLabel type="label1" fontWeight={600} style={{ color: '#091e42' }}>
  Tier Name
</CapLabel>
<CapLabel type="label2" fontWeight={400} lineHeight="20px">
  Points balance: 1,250
</CapLabel>
```

### Inline Label with Other Components
```jsx
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapInput from '@capillarytech/cap-ui-library/CapInput';

<div>
  <CapLabel type="label1">Campaign Name</CapLabel>
  <CapInput placeholder="Enter campaign name" />
</div>
```
