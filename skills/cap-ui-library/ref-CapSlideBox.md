# CapSlideBox

**Import**: `import CapSlideBox from '@capillarytech/cap-ui-library/CapSlideBox';`

## Description
A customized slide-in panel component that provides a modal-like experience with customizable header, content, and footer sections. It can slide in from the left or right side of the screen.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| show | boolean | False | Flag to show/hide the slide box |
| size | string | size-r | Size of the slide box. Possible values: 'size-s', 'size-r', 'size-l', 'size-xl' |
| header | string \| element | - | Content to be displayed in the header section of the slide box |
| content | element | - | Content to be displayed in the main body of the slide box |
| footer | string \| element | None | Content to be displayed in the footer section of the slide box |
| className | string |  | Additional CSS class for the slide box |
| handleClose | function | - | Callback function called when the close icon is clicked |
| position | string | right | Position from which the slide box appears. Possible values: 'left', 'right' |
| closeIconSize | string | m | Size of the close icon. Possible values: 's', 'm', 'l' |
| closeIconPosition | string | right | Position of the close icon in the header. Possible values: 'left', 'right' |
| closeIconType | string | close | Type of the close icon. Possible values: 'close', 'back' |

## Usage Examples

### Basic Right-Side Slide Panel
```jsx
import CapSlideBox from '@capillarytech/cap-ui-library/CapSlideBox';

<CapSlideBox
  show={isSlideBoxVisible}
  header="Tier Details"
  content={<div>Gold Tier — 5000 points required</div>}
  handleClose={() => setIsSlideBoxVisible(false)}
/>
```

### Large Slide Panel with Footer
```jsx
import CapSlideBox from '@capillarytech/cap-ui-library/CapSlideBox';

<CapSlideBox
  show={showPanel}
  size="size-l"
  position="right"
  header="Edit Benefit Configuration"
  content={
    <div>
      <p>Benefit Name: Free Shipping</p>
      <p>Applicable Tiers: Gold, Platinum</p>
    </div>
  }
  footer={
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  }
  handleClose={handleCancel}
  closeIconPosition="right"
  closeIconSize="m"
/>
```

### Left-Side Slide Panel
```jsx
import CapSlideBox from '@capillarytech/cap-ui-library/CapSlideBox';

<CapSlideBox
  show={showFilters}
  size="size-s"
  position="left"
  header="Filter Options"
  content={<FilterForm />}
  handleClose={() => setShowFilters(false)}
  closeIconType="back"
  closeIconPosition="left"
/>
```
