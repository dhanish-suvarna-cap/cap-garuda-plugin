# CapConditionPreview

**Import**: `import CapConditionPreview from '@capillarytech/cap-ui-library/CapConditionPreview';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapConditionPreview/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic condition preview
```jsx
import CapConditionPreview from '@capillarytech/cap-ui-library/CapConditionPreview';

const conditionData = {
  operator: 'AND',
  conditions: [
    { field: 'Transaction Amount', operator: 'greater_than', value: '500' },
    { field: 'Customer Tier', operator: 'equals', value: 'Gold' },
  ],
};

<CapConditionPreview data={conditionData} />
```

### With custom labels and nested groups
```jsx
import CapConditionPreview from '@capillarytech/cap-ui-library/CapConditionPreview';

<CapConditionPreview
  data={loyaltyRuleConditions}
  fieldLabels={{ transactionAmount: 'Purchase Value', customerTier: 'Membership Level' }}
  operatorLabels={{ greater_than: 'is more than', equals: 'is' }}
  className="rule-preview"
/>
```
