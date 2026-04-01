# CSS Class Patterns

## Class Merging: `classnames` Package

Primary utility for conditional and composed class names:

```javascript
import classnames from 'classnames';

// Simple composition
className={classnames(styles.heading, className)}

// Conditional with object syntax
className={classnames('tag-label-group', {
  last: isLast,
})}

// Multiple conditions
className={classnames(
  'truncate-text',
  'align-items-center',
  'tag-label-group',
  paddingClassName,
  {
    last: isLast,
  },
)}

// With component className prop
className={classNames(className, 'action-expression-tag')}
```

## Conditional Style Patterns

### Via classnames Object Syntax (Dominant)

```javascript
className={classnames('base-class', {
  'active-class': isActive,
  'error-class': hasError,
  'disabled-class': isDisabled,
})}
```

### Via Ternary in className

```javascript
className={trackerNameExistsError ? 'error-border' : ''}
```

### Via Styled Component Props

```javascript
// In style.js
export const ColorBlock = styled.div`
  align-items: ${props => (props.align === 'center' ? 'center' : 'flex-start')};
  height: ${props => (props.height ? props.height : '100%')};
`;

// In component
<ColorBlock align="center" height="200px" />
```

### Via Inline Spread with Conditions

```javascript
{...tagPrefixBgColor && { background: tagPrefixBgColor }}
{...tagPrefixTextColor && { font: tagPrefixTextColor }}
```

## Class Naming Conventions

### kebab-case (Standard)

```css
.search-program-row { }
.search-filter-head { }
.searchBar-program { }
.create-draft-row { }
.create-draft-button { }
```

### `lp-` Prefix (Loyalty Plus App-Specific)

```css
.lp-btn-bulkconfig-delete-program { }
.lp-btn-bulkconfig-remove-invalid-prog { }
.lp-menu-config-points { }
```

### Utility Classes

```css
.truncate-text { }
.align-items-center { }
.pointer-cursor { }
.row-inner-divider { }
```

## Ant Design Class Overrides

When overriding Ant Design styles, use nested selectors within styled-components:

```javascript
export default css`
  .ant-card.cap-custom-card {
    .ant-card-meta-description {
      .truncate-text-with-image {
        -webkit-line-clamp: 2;
      }
    }
  }

  .ant-select-dropdown {
    z-index: 1050;
  }
`;
```

See also: [[03-css/approach]], [[03-css/tokens-and-theme]]
