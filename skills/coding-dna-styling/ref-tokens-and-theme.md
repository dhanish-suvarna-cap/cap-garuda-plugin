# Design Tokens & Theme

## Token Source: @capillarytech/cap-ui-library/styled

ALL design tokens come from the Capillary UI library. **Never hardcode hex colors or pixel values.**

### Import Pattern

```javascript
// Import entire object and destructure
import StyledVars from '@capillarytech/cap-ui-library/styled';
const { CAP_SPACE_12, CAP_SPACE_16, CAP_G07, FONT_SIZE_M } = StyledVars;

// Or import specific variables
import {
  CAP_G07,
  CAP_SPACE_20,
  FONT_SIZE_M,
  CAP_SPACE_12,
  CAP_SPACE_16,
  CAP_SPACE_04,
  CAP_SPACE_08,
} from '@capillarytech/cap-ui-library/styled/variables';
```

## Token Categories

### Spacing Scale (`CAP_SPACE_*`)

| Token | Typical Value | Usage |
|---|---|---|
| `CAP_SPACE_04` | 4px | Tight gaps, icon margins |
| `CAP_SPACE_08` | 8px | Small padding, list gaps |
| `CAP_SPACE_12` | 12px | Input padding, card gaps |
| `CAP_SPACE_16` | 16px | Section padding |
| `CAP_SPACE_20` | 20px | Component margins |
| `CAP_SPACE_24` | 24px | Card padding |
| `CAP_SPACE_28` | 28px | Large gaps |
| `CAP_SPACE_32` | 32px | Section margins |
| `CAP_SPACE_40` | 40px | Major spacing |
| `CAP_SPACE_48` | 48px | Page-level spacing |
| `CAP_SPACE_80` | 80px | Hero/large spacing |

### Grayscale Colors (`CAP_G*`)

| Token | Usage |
|---|---|
| `CAP_G01` – `CAP_G09` | Grayscale palette from light to dark |
| `CAP_WHITE` | Pure white backgrounds |

### Named Colors

| Token | Usage |
|---|---|
| `CAP_PURPLE01` | Accent/highlight |
| Other `CAP_*` colors | Various UI states |

### Typography

| Token | Usage |
|---|---|
| `FONT_SIZE_S` | Small text (captions, labels) |
| `FONT_SIZE_M` | Body text |
| `FONT_SIZE_L` | Headings |
| `FONT_WEIGHT_REGULAR` | Normal text |
| `FONT_WEIGHT_MEDIUM` | Emphasized text |
| `FONT_COLOR_01` – `FONT_COLOR_05` | Text color hierarchy |

### Icon Sizes

| Token | Usage |
|---|---|
| `ICON_SIZE_*` | Consistent icon sizing |

## Ant Design Theme

Configured in `webapp/ant-theme-vars.js`:

```javascript
{
  'primary-color': '#47AF46',          // Green primary
  'font-family': 'Roboto, open-sans, sans-serif',
  'font-size-base': '14px',
  'text-color': '#091E42',             // Dark navy text
  'link-color': '#2466ea',             // Blue links
  'input-hover-border-color': '#7a869a',
  'input-border-color': '#b3bac5',
  'input-placeholder-color': '#b3bac5',
}
```

## Usage in styled-components

```javascript
import { css } from 'styled-components';
import StyledVars from '@capillarytech/cap-ui-library/styled';

const { CAP_SPACE_08, CAP_SPACE_16, CAP_G07, FONT_SIZE_M, CAP_WHITE } = StyledVars;

export default css`
  .card-header {
    padding: ${CAP_SPACE_16};
    background: ${CAP_WHITE};
    font-size: ${FONT_SIZE_M};
    border-bottom: 1px solid ${CAP_G07};
  }

  .card-body {
    padding: ${CAP_SPACE_08} ${CAP_SPACE_16};
  }
`;
```

## Dark Mode

**Not supported.** The codebase has:
- No CSS variables for theme switching
- No theme context provider
- Single light theme based on Capillary design system
- All colors come from `CAP_*` tokens (light theme only)

See also: [[03-css/approach]], [[03-css/class-patterns]]
