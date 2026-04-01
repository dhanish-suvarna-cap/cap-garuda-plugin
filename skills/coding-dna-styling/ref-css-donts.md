# CSS — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Hardcode Colors

- **Anti-pattern**: `color: #091E42;` or `background: rgba(71, 175, 70, 0.5);`
- **Why**: The design system provides all colors via `CAP_*` tokens. Hardcoding creates maintenance burden.
- **Instead**: `color: ${CAP_G07};` or `background: ${CAP_WHITE};`

## Do Not Hardcode Spacing

- **Anti-pattern**: `padding: 12px;` or `margin-bottom: 16px;`
- **Why**: The spacing scale (`CAP_SPACE_*`) ensures consistency. Arbitrary values break the rhythm.
- **Instead**: `padding: ${CAP_SPACE_12};` or `margin-bottom: ${CAP_SPACE_16};`

## Do Not Create SCSS or CSS Files

- **Anti-pattern**: Creating new `.scss`, `.css`, or `.module.css` files
- **Why**: The codebase uses styled-components exclusively for new code. SCSS files exist only as legacy.
- **Instead**: Create `style.js` with `css` template literal or `styled()` components.

## Do Not Use CSS Modules

- **Anti-pattern**: `import styles from './Component.module.css'`
- **Why**: Not configured in webpack. Styled-components is the styling solution.
- **Instead**: Use `style.js` with `withStyles` HOC.

## Do Not Use Inline Styles

- **Anti-pattern**: `style={{ color: 'red', padding: '10px' }}`
- **Why**: Inline styles bypass the styled-components system and are harder to maintain.
- **Instead**: Use styled-components props or classnames for dynamic styles.
- **Exception**: Spread-based conditional styles for single properties: `{...bgColor && { background: bgColor }}`

## Do Not Use CSS Grid

- **Anti-pattern**: `display: grid;`
- **Why**: The entire codebase uses Flexbox. CSS Grid would be inconsistent.
- **Instead**: Use Flexbox with `flex-wrap`, percentage widths, and `gap`.

## Do Not Import Global CSS Libraries

- **Anti-pattern**: Adding Tailwind, Bootstrap, or similar utility frameworks
- **Why**: Styled-components + cap-ui-library tokens is the established pattern.
- **Instead**: Use design tokens from `@capillarytech/cap-ui-library/styled`.

## Do Not Use Z-Index Arbitrarily

- **Anti-pattern**: `z-index: 9999;`
- **Why**: Ant Design manages z-index stacking for modals, dropdowns, etc.
- **Instead**: Let Ant Design's component hierarchy handle stacking. If you must set z-index, use Ant Design's z-index scale.
