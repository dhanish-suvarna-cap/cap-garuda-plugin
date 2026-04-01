# Accessibility — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Ignore ARIA Prop Errors

- **Anti-pattern**: Adding `// eslint-disable-next-line jsx-a11y/aria-props`
- **Why**: ARIA prop errors mean the attribute is invalid and may confuse assistive technology.
- **Instead**: Fix the ARIA attribute to use a valid value.

## Do Not Add Mouse-Only Interactions

- **Anti-pattern**: `onMouseEnter` without `onFocus`
- **Why**: ESLint rule `mouse-events-have-key-events` enforces keyboard equivalents.
- **Instead**: Add keyboard event handlers alongside mouse handlers.

## Do Not Use Non-Semantic Elements for Interactive UI

- **Anti-pattern**: `<div onClick={handleClick}>Click me</div>`
- **Why**: While the ESLint rule for this is disabled, divs lack keyboard/screen reader support.
- **Instead**: Use `<CapButton>` or `<button>` for clickable elements.

## Do Not Hardcode Text Strings

- **Anti-pattern**: `<label>Name</label>`
- **Why**: Breaks i18n and may not work for all languages.
- **Instead**: `<label>{formatMessage(messages.name)}</label>`
