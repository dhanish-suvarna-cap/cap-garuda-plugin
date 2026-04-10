# CapLink

**Import**: `import CapLink from '@capillarytech/cap-ui-library/CapLink';`

## Description
A customized link component that extends React Router's Link component with additional styling and behavior options.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the link |
| to | string \| object | None | The path to link to, either a string or a location object |
| replace | boolean | False | When true, clicking the link will replace the current entry in the history stack instead of adding a new one |
| target | string | _self | Specifies where to open the linked document. Possible values: '_blank', '_self', '_parent', '_top' |
| onClick | function(event) | None | Event handler called when the link is clicked |
| disabled | boolean | False | Whether the link is disabled |
| active | boolean | False | Whether the link is in active state |
| underline | boolean | True | Whether to show underline on hover |
| color | string | None | Text color of the link |
| hoverColor | string | None | Text color of the link on hover |
| activeColor | string | None | Text color of the link when active |
| icon | ReactNode | None | Icon element to display before the link text |
| iconPosition | string | left | Position of the icon. Possible values: 'left', 'right' |
| children | ReactNode | None | The content of the link |
| external | boolean | False | Whether the link points to an external resource |
| rel | string | None | The relationship of the linked URL. When external is true, defaults to 'noopener noreferrer' |

## Usage Examples

### Basic Internal Link
```jsx
import CapLink from '@capillarytech/cap-ui-library/CapLink';

<CapLink to="/loyalty/ui/v3/tiers">
  View All Tiers
</CapLink>
```

### External Link with Icon
```jsx
import CapLink from '@capillarytech/cap-ui-library/CapLink';

<CapLink
  to="https://docs.capillary.com"
  external
  target="_blank"
  icon={<ExternalLinkIcon />}
  iconPosition="right"
>
  Documentation
</CapLink>
```

### Disabled and Styled Link
```jsx
import CapLink from '@capillarytech/cap-ui-library/CapLink';

<CapLink
  to="/loyalty/ui/v3/benefits/edit"
  disabled={!hasEditPermission}
  color="#1890ff"
  hoverColor="#40a9ff"
  underline={false}
  onClick={(e) => handleLinkClick(e)}
>
  Edit Benefit
</CapLink>
```
