# CapCard

**Import**: `import CapCard from '@capillarytech/cap-ui-library/CapCard';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCard/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Card
```jsx
import CapCard from '@capillarytech/cap-ui-library/CapCard';

<CapCard>
  <h3>Loyalty Program Overview</h3>
  <p>Total members: 12,450</p>
</CapCard>
```

### Styled Card with Custom Class
```jsx
import CapCard from '@capillarytech/cap-ui-library/CapCard';

<CapCard
  className="dashboard-stat-card"
  style={{ padding: '24px', borderRadius: '8px' }}
>
  <div>Active Campaigns: 5</div>
  <div>Pending Approvals: 3</div>
</CapCard>
```
