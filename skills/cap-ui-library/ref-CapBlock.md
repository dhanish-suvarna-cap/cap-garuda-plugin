# CapBlock

**Import**: `import CapBlock from '@capillarytech/cap-ui-library/CapBlock';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapBlock/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Block
```jsx
import CapBlock from '@capillarytech/cap-ui-library/CapBlock';

<CapBlock>
  <p>Loyalty program configuration content goes here</p>
</CapBlock>
```

### Styled Block Section
```jsx
import CapBlock from '@capillarytech/cap-ui-library/CapBlock';

<CapBlock
  className="tier-settings-block"
  style={{ padding: '24px', marginBottom: '16px' }}
>
  <h3>Upgrade Rules</h3>
  <p>Define conditions for tier upgrades</p>
</CapBlock>
```
