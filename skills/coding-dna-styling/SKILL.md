---
description: Capillary UI coding DNA — CSS approach, design tokens, class patterns, responsive, animations
triggers:
  - "styled-components"
  - "withStyles"
  - "design token"
  - "CAP_SPACE"
  - "CAP_G"
  - "FONT_SIZE"
  - "FONT_WEIGHT"
  - "class pattern"
  - "classnames"
  - "ant design override"
  - "responsive"
  - "CSS approach"
  - "style.js"
---

# Coding DNA: Styling

Capillary-wide standards for CSS, design tokens, class patterns, and responsive design.

## CSS Approach

**Primary**: styled-components (CSS-in-JS) via `style.js` + `withStyles` HOC.

### Pattern A — Default CSS Template (Most Common)

```js
// style.js
import { css } from 'styled-components';
import { CAP_SPACE_12, CAP_G05, FONT_SIZE_14 } from '@capillarytech/cap-ui-library/styled/variables';

export default css`
  .my-component-wrapper {
    padding: ${CAP_SPACE_12};
    background: ${CAP_G05};
    font-size: ${FONT_SIZE_14};
  }
`;
```

### Pattern B — Named Styled Components

```js
// style.js
import styled from 'styled-components';
import { css } from 'styled-components';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import { CAP_G08, CAP_SPACE_08 } from '@capillarytech/cap-ui-library/styled/variables';

export const StyledIcon = styled(CapIcon)`
  color: ${CAP_G08};
  margin-right: ${CAP_SPACE_08};
`;

export default css`
  .my-component-wrapper { /* ... */ }
`;
```

### Pattern C — Extending Cap-UI Components

```js
import styled from 'styled-components';
import CapButton from '@capillarytech/cap-ui-library/CapButton';

export const PrimaryButton = styled(CapButton)`
  min-width: 120px;
`;
```

## Design Token System

**ALL tokens from**: `@capillarytech/cap-ui-library/styled/variables`

### Spacing Scale
| Token | Value |
|-------|-------|
| CAP_SPACE_04 | 4px |
| CAP_SPACE_08 | 8px |
| CAP_SPACE_12 | 12px |
| CAP_SPACE_16 | 16px |
| CAP_SPACE_20 | 20px |
| CAP_SPACE_24 | 24px |
| CAP_SPACE_32 | 32px |
| CAP_SPACE_40 | 40px |
| CAP_SPACE_48 | 48px |
| CAP_SPACE_80 | 80px |

### Grayscale Colors
| Token | Usage |
|-------|-------|
| CAP_WHITE | White background |
| CAP_G01 | Lightest grey (borders) |
| CAP_G02–G04 | Light greys |
| CAP_G05 | Light background fills |
| CAP_G06 | Dividers |
| CAP_G07 | Disabled text |
| CAP_G08 | Secondary text |
| CAP_G09 | Primary text (darkest) |

### Typography
| Token | Usage |
|-------|-------|
| FONT_SIZE_S | Small text |
| FONT_SIZE_M | Body text |
| FONT_SIZE_L | Large text |
| FONT_SIZE_12–24 | Specific sizes (12px–24px) |
| FONT_WEIGHT_REGULAR | Normal weight (400) |
| FONT_WEIGHT_MEDIUM | Medium weight |
| FONT_COLOR_01–05 | Text colors |

### When Token Doesn't Exist
Use rem at base 14 (1rem = 14px) with comment:
```css
gap: 0.857rem; /* variable is absent — 12px */
```

## Class Naming

- **kebab-case** always
- **Component-prefixed**: `.audience-list-wrapper`, `.audience-list-header`
- **App-prefix for utilities**: `lp-` (loyalty plus)
- **Use classnames package** for conditional classes:

```js
import classnames from 'classnames';

<div className={classnames('my-wrapper', {
  'my-wrapper--active': isActive,
  'my-wrapper--disabled': isDisabled,
}, className)} />
```

## Ant Design Overrides

Override Ant Design styles within styled-components using nested selectors:

```js
export default css`
  .my-wrapper {
    .ant-table-thead > tr > th {
      background: ${CAP_WHITE};
    }
    .ant-btn {
      border-radius: 4px;
    }
  }
`;
```

## Responsive Design

- **Desktop-first** enterprise dashboard — minimal mobile
- **Flexbox only** — NO CSS Grid
- **No media queries** or breakpoint system
- Viewport calculations: `calc(100vh - 112px)`
- Percentage widths for fluid layouts
- `flex-wrap` for responsive reflow

## Do-Nots

- Don't hardcode colors — use CAP_* tokens
- Don't hardcode spacing — use CAP_SPACE_* tokens
- Don't create SCSS/CSS files — use style.js
- Don't use CSS Modules — use styled-components
- Don't use inline styles — use styled-components + classnames
- Don't use CSS Grid — use Flexbox
- Don't import CSS utility frameworks (Tailwind, Bootstrap)
- Don't use z-index arbitrarily — let Ant Design manage stacking
- No dark mode — single light theme

## Reference Files

- `ref-approach.md` — Full CSS approach with Pattern A/B/C examples
- `ref-tokens-and-theme.md` — Complete token inventory, Ant Design theme config
- `ref-class-patterns.md` — classnames usage, conditional styles, Ant overrides
- `ref-responsive.md` — Viewport calculations, Flexbox patterns
- `ref-animations.md` — Animation approach (minimal, CSS transitions only)
- `ref-css-donts.md` — Styling anti-patterns
