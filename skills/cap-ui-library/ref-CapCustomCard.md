# CapCustomCard

**Import**: `import CapCustomCard from '@capillarytech/cap-ui-library/CapCustomCard';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapCustomCard/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Custom Card
```jsx
import CapCustomCard from '@capillarytech/cap-ui-library/CapCustomCard';

<CapCustomCard>
  <div>Reward Catalog Item</div>
  <p>Points required: 500</p>
</CapCustomCard>
```

### Custom Card with Styling
```jsx
import CapCustomCard from '@capillarytech/cap-ui-library/CapCustomCard';

<CapCustomCard
  className="promotion-card"
  style={{ width: '320px', padding: '20px', border: '1px solid #e8e8e8' }}
>
  <h4>Summer Promotion</h4>
  <p>Double points on all purchases</p>
  <span>Valid: Jun 1 - Aug 31</span>
</CapCustomCard>
```
