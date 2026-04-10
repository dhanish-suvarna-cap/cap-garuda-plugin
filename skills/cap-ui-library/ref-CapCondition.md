# CapCondition

**Import**: `import CapCondition from '@capillarytech/cap-ui-library/CapCondition';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCondition/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic condition builder
```jsx
import CapCondition from '@capillarytech/cap-ui-library/CapCondition';

const conditionConfig = {
  fields: [
    { key: 'transactionAmount', label: 'Transaction Amount', type: 'number' },
    { key: 'customerTier', label: 'Customer Tier', type: 'select', options: ['Silver', 'Gold', 'Platinum'] },
  ],
  operators: ['equals', 'not_equals', 'greater_than', 'less_than'],
};

<CapCondition
  config={conditionConfig}
  value={conditionData}
  onChange={(updatedCondition) => setConditionData(updatedCondition)}
/>
```

### With nested condition groups (AND/OR)
```jsx
import CapCondition from '@capillarytech/cap-ui-library/CapCondition';

<CapCondition
  config={conditionConfig}
  value={ruleConditions}
  onChange={handleConditionChange}
  allowGroups
  groupOperators={['AND', 'OR']}
  maxDepth={3}
  className="loyalty-rule-condition"
/>
```
