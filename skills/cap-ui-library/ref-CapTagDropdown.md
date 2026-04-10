# CapTagDropdown

**Import**: `import CapTagDropdown from '@capillarytech/cap-ui-library/CapTagDropdown';`

## Description
A dropdown component for managing a list of tags, providing functionality to add and remove tags.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the tag dropdown |
| content | string |  | Content of the input field |
| list | Array<{id: string \| number, tag: string}> | [] | Array of tag objects with id and tag properties |
| handleRemoveTagCallback | function(id, event) | () => {} | Callback function when removing a tag |
| handleKeyDownCallback | function(event) | () => {} | Callback function for keydown events |
| renderOptionRow | function | None | Custom render function for dropdown options |
| inputProps | object | { suffix: <CapIcon type="enter" /> } | Additional props which can be passed to CapInput |
| dropdownProps | object | { placement: 'bottomLeft', trigger: ['click'] } | Additional props which can be passed to CapDropdown |
| width | string | 24.571rem | Width of the dropdown component |

## Usage Examples

### Tag Input with Dropdown
```jsx
import CapTagDropdown from '@capillarytech/cap-ui-library/CapTagDropdown';

const tags = [
  { id: 1, tag: 'VIP' },
  { id: 2, tag: 'Premium' },
];

<CapTagDropdown
  list={tags}
  content={inputValue}
  handleRemoveTagCallback={(id) => removeTag(id)}
  handleKeyDownCallback={handleKeyDown}
  width="300px"
/>
```
```
