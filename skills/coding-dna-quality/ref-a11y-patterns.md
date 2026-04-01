# Accessibility Patterns

## ESLint Enforcement

From `eslint-plugin-jsx-a11y`:

| Rule | Level | Meaning |
|---|---|---|
| `jsx-a11y/aria-props` | 2 (error) | ARIA attributes must be valid |
| `jsx-a11y/label-has-associated-control` | 2 (error) | Labels must link to form controls |
| `jsx-a11y/mouse-events-have-key-events` | 2 (error) | Mouse handlers need keyboard equivalents |
| `jsx-a11y/role-has-required-aria-props` | 2 (error) | Roles must have required ARIA props |
| `jsx-a11y/role-supports-aria-props` | 2 (error) | ARIA props must be valid for the role |
| `jsx-a11y/click-events-have-key-events` | 0 (off) | Relaxed — not enforced |
| `jsx-a11y/interactive-supports-focus` | 0 (off) | Relaxed — not enforced |
| `jsx-a11y/no-static-element-interactions` | 0 (off) | Relaxed — not enforced |
| `jsx-a11y/heading-has-content` | 0 (off) | Relaxed |
| `jsx-a11y/label-has-for` | 0 (off) | Deprecated rule, replaced |

## Semantic HTML

Components use Capillary UI library components that render semantic HTML:

- `CapHeading` → `<h1>` – `<h6>`
- `CapButton` → `<button>`
- `CapInput` → `<input>`
- `CapLabel` → `<label>`
- `CapTable` → `<table>`

## ARIA Usage

ARIA attributes found in components:
- Role attributes: `role="refresh-icon"` (custom roles)
- ARIA props validated by ESLint rules
- Ant Design components include built-in ARIA support

## Internationalization as Accessibility

All user-facing text goes through `react-intl`:

```javascript
<CapHeading>{formatMessage(messages.title)}</CapHeading>
```

This enables multi-language support and ensures text is programmatically available.

## Screen Reader Text

- No explicit `sr-only` utility class pattern found
- Ant Design components provide built-in screen reader support
- `FormattedMessage` from react-intl provides accessible text content

## Focus Management

- Ant Design modals, drawers, and slide boxes handle focus trapping
- No custom focus management patterns found
- `CapSlideBox` handles focus when opening/closing

## Keyboard Navigation

- Enforced via `jsx-a11y/mouse-events-have-key-events` (error level)
- Some rules relaxed (`click-events-have-key-events: off`) for pragmatic reasons
- Ant Design components include keyboard support by default

## Known Gaps

- `click-events-have-key-events` is disabled — some clickable divs may lack keyboard handlers
- `interactive-supports-focus` is disabled — some interactive elements may not be focusable
- `no-static-element-interactions` is disabled — `<div onClick>` is allowed without role/tabIndex
- No explicit focus management for route changes
- No skip-to-content links found
