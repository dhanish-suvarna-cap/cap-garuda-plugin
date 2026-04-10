# CapListLayout

**Import**: `import CapListLayout from '@capillarytech/cap-ui-library/CapListLayout';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapListLayout/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### List Layout Wrapper
```jsx
import CapListLayout from '@capillarytech/cap-ui-library/CapListLayout';

<CapListLayout
  header={<h3>Campaign List</h3>}
  footer={<span>Showing 10 of 50</span>}
>
  {campaigns.map(item => <div key={item.id}>{item.name}</div>)}
</CapListLayout>
```
