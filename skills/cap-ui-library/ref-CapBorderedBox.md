# CapBorderedBox

**Import**: `import CapBorderedBox from '@capillarytech/cap-ui-library/CapBorderedBox';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapBorderedBox/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Bordered Box
```jsx
import CapBorderedBox from '@capillarytech/cap-ui-library/CapBorderedBox';

<CapBorderedBox>
  <p>Enclosed content with a visible border</p>
</CapBorderedBox>
```

### Bordered Box for Form Section
```jsx
import CapBorderedBox from '@capillarytech/cap-ui-library/CapBorderedBox';

<CapBorderedBox
  className="rule-config-section"
  style={{ padding: '16px', marginTop: '12px' }}
>
  <h4>Condition Group</h4>
  <p>Transaction amount greater than 500</p>
  <p>Purchase category: Electronics</p>
</CapBorderedBox>
```
