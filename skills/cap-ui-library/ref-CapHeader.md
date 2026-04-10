# CapHeader

**Import**: `import CapHeader from '@capillarytech/cap-ui-library/CapHeader';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapHeader/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Page-level header with title and description
```jsx
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';

<CapHeader
  title="Tier Management"
  description="Configure loyalty program tiers and benefits"
/>
```

### Small header for table columns
```jsx
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';

const columns = [
  {
    title: <CapHeader size="small" title="Campaign name" description="Marketing objective" />,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <CapHeader size="small" title="Performance" />,
    children: [
      { title: <CapHeader size="small" description="Unique users" />, dataIndex: 'u_user' },
      { title: <CapHeader size="small" description="Message Sent" />, dataIndex: 'm_sent' },
    ],
  },
];
```

### Header with description only (used in nested table columns)
```jsx
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';

<CapHeader size="small" description="Total points earned" />
```
