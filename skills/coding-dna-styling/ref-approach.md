# CSS Approach

## Primary Method: Styled Components (CSS-in-JS)

**Package**: `styled-components` v6.1.2

Every component has a `style.js` file that exports CSS using one of two patterns:

### Pattern A: CSS Template Literal (Most Common)

Used when component is wrapped with `withStyles` HOC:

```javascript
// ComponentName/style.js
import { css } from 'styled-components';
import StyledVars from '@capillarytech/cap-ui-library/styled';

const { CAP_SPACE_12, CAP_SPACE_16, CAP_G07, FONT_SIZE_M } = StyledVars;

export default css`
  .header-container {
    margin-bottom: ${CAP_SPACE_08};
    display: flex;
    align-items: center;
  }

  .content-wrapper {
    padding: ${CAP_SPACE_16};
    font-size: ${FONT_SIZE_M};
    color: ${CAP_G07};
  }
`;
```

Component wrapping:
```javascript
export default withStyles(ComponentName, styles);
```

### Pattern B: Styled Components (For Reusable Styled Elements)

Used when you need styled elements exported for use within the component:

```javascript
// ComponentName/style.js
import styled, { css } from 'styled-components';
import StyledVars from '@capillarytech/cap-ui-library/styled';
import CapCard from '@capillarytech/cap-ui-library/CapCard';

const { CAP_SPACE_12, CAP_WHITE } = StyledVars;

// Styled components (named exports)
export const ColorBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${props => (props.align === 'center' ? 'center' : 'flex-start')};
  padding: ${CAP_SPACE_12};
  height: ${props => (props.height ? props.height : '100%')};
`;

export const CardFixedSize = styled(CapCard)`
  width: 200px;
  background: ${CAP_WHITE};
`;

// CSS export for withStyles
export const styles = css`
  .additional-classes {
    margin-top: ${CAP_SPACE_12};
  }
`;
```

### Pattern C: Extending Capillary Components

```javascript
import styled from 'styled-components';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';

export const InlineLabel = styled(CapLabel)`
  display: inline-block;
  margin-right: 8px;
`;

export const MoreLabel = styled(InlineLabel)`
  font-weight: bold;
`;
```

## Secondary Methods

### LESS (for Ant Design Only)

LESS is used exclusively for Ant Design theme customization:

```javascript
// ant-theme-vars.js
module.exports = {
  'primary-color': '#47AF46',
  'font-family': 'Roboto, open-sans, sans-serif',
  'font-size-base': '14px',
  'text-color': '#091E42',
  'link-color': '#2466ea',
  'input-hover-border-color': '#7a869a',
  'input-border-color': '#b3bac5',
  'input-placeholder-color': '#b3bac5',
};
```

### SCSS (Legacy — 2 Files Only)

Found only in:
- `_coupons.scss` — Legacy coupon styles
- `index.scss` — Legacy creatives styles

**Do not create new SCSS files.** Use styled-components for all new code.

## The `withStyles` HOC

Located at `webapp/app/utils/withStyles.js`:

```javascript
import styled from 'styled-components';

export default (WrappedComponent, styles) => {
  const StyledComponent = styled(WrappedComponent)`
    ${styles};
  `;
  StyledComponent.defaultProps = WrappedComponent.defaultProps;
  return StyledComponent;
};
```

This HOC takes a component and a `css` template literal, creates a styled wrapper, and preserves defaultProps.

## Style File Decision Tree

```
Need styles for a component?
├── Component needs class-based styles?
│   └── Pattern A: export default css`...` + withStyles HOC
├── Need reusable styled HTML elements?
│   └── Pattern B: export const Wrapper = styled.div`...`
├── Need to extend a cap-ui-library component?
│   └── Pattern C: styled(CapComponent)`...`
└── Need Ant Design theme overrides?
    └── Modify ant-theme-vars.js (rare, affects all of antd)
```

See also: [[03-css/tokens-and-theme]], [[03-css/class-patterns]]
