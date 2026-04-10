# CapProductSelection

**Import**: `import CapProductSelection from '@capillarytech/cap-ui-library/CapProductSelection';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapProductSelection/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic product selection
```jsx
import CapProductSelection from '@capillarytech/cap-ui-library/CapProductSelection';

<CapProductSelection
  products={productList}
  selectedProducts={selectedProductIds}
  onSelectionChange={(selected) => setSelectedProductIds(selected)}
  searchPlaceholder="Search products..."
/>
```

### With category filter and multi-select
```jsx
import CapProductSelection from '@capillarytech/cap-ui-library/CapProductSelection';

<CapProductSelection
  products={catalogProducts}
  selectedProducts={rewardProducts}
  onSelectionChange={handleProductSelection}
  categories={['Electronics', 'Fashion', 'Food & Beverage']}
  enableSearch
  multiSelect
  maxSelections={10}
  className="reward-product-selector"
/>
```
