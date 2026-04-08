# CapRadioCard

**Import**: `import CapRadioCard from '@capillarytech/cap-ui-library/CapRadioCard';`

## Description
A radio card component that extends the functionality of CapRadio with a card-like appearance, suitable for radio options with rich content.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the radio card |
| value | any | None | Value of the radio card, used in Radio Group |
| checked | boolean | False | Whether the radio card is checked |
| disabled | boolean | False | Whether the radio card is disabled |
| onChange | function(e) | None | Callback when radio card state changes |
| title | string \| ReactNode |  | Title text or element for the card |
| description | string \| ReactNode |  | Description text or element for the card |
| icon | ReactNode | None | Icon to display in the radio card |
| size | string | default | Size of the radio card. Possible values: 'large', 'default', 'small' |
| style | object | {} | Custom style object for the radio card |
| bordered | boolean | True | Whether to show border around the radio card |
| hoverable | boolean | True | Whether the card should have hover effect |

## Usage Example
```jsx
import CapRadioCard from "@capillarytech/cap-ui-library/CapRadioCard";

<CapRadioCard />
```
