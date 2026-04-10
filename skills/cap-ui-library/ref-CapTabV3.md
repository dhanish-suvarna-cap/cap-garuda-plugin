# CapTabV3

**Import**: `import CapTabV3 from '@capillarytech/cap-ui-library/CapTabV3';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapTabV3/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Tab Component
```jsx
import CapTabV3 from '@capillarytech/cap-ui-library/CapTabV3';

<CapTabV3>
  <CapTabV3.TabPane tab="Overview" key="overview">
    <p>Program overview content</p>
  </CapTabV3.TabPane>
  <CapTabV3.TabPane tab="Configuration" key="config">
    <p>Configuration settings</p>
  </CapTabV3.TabPane>
  <CapTabV3.TabPane tab="Analytics" key="analytics">
    <p>Analytics dashboard</p>
  </CapTabV3.TabPane>
</CapTabV3>
```

### Tab with Active Key and Change Handler
```jsx
import CapTabV3 from '@capillarytech/cap-ui-library/CapTabV3';

<CapTabV3
  className="tier-detail-tabs"
  style={{ marginTop: '16px' }}
>
  <CapTabV3.TabPane tab="Basic Info" key="basic">
    <div>Tier name, description, and thresholds</div>
  </CapTabV3.TabPane>
  <CapTabV3.TabPane tab="Benefits" key="benefits">
    <div>Associated benefits list</div>
  </CapTabV3.TabPane>
  <CapTabV3.TabPane tab="Rules" key="rules">
    <div>Upgrade and downgrade rules</div>
  </CapTabV3.TabPane>
</CapTabV3>
```
