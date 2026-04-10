# CapSpin

**Import**: `import CapSpin from '@capillarytech/cap-ui-library/CapSpin';`

## Description
A customized spin component that extends Ant Design's Spin component with additional styling and functionality for displaying loading states.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the spin |
| delay | number | None | Specifies a delay in milliseconds for loading state (prevent flush) |
| indicator | ReactNode | None | React node of the spinning indicator |
| size | string | default | Size of the spinning indicator. Possible values: 'small', 'default', 'large' |
| spinning | boolean | True | Whether the spin is visible |
| tip | string \| ReactNode | None | Customize description content when the spin has children |
| wrapperClassName | string |  | Additional CSS class for the spinning wrapper |
| fullscreen | boolean | False | Whether to display the spin as a fullscreen overlay |
| color | string | None | Custom color for the spinning indicator |

## Usage Examples

### Sizes
```jsx
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';

<CapSpin size="small" />
<CapSpin />             {/* default size */}
<CapSpin size="large" />
```

### Embedded Mode (Wrapping Content)
```jsx
<CapSpin spinning={loading} delay={500}>
  <div className="content-area">
    <p>This content will show a spinner overlay while loading.</p>
  </div>
</CapSpin>
```

### With Tip Text
```jsx
<CapSpin spinning={loading} tip="Loading data...">
  <div className="content-area">{children}</div>
</CapSpin>
```
