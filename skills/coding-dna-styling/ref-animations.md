# Animation Patterns

## Minimal Animation Usage

This codebase has very few custom animations. Most motion comes from Ant Design's built-in transitions.

### CSS Transforms (Occasional)

```scss
// From Creatives/index.scss
.scope-image-background {
  transform: scale(0.75);
  background-color: ${CAP_G07};
  border-radius: 18px;
}
```

### Ant Design Built-in Animations

- Carousel transitions
- Modal open/close
- Slide-in/out for `CapSlideBox`
- Tabs switching
- Dropdown/Select opening

### No Animation Library

- No Framer Motion
- No React Spring
- No GSAP
- No custom `@keyframes` definitions found
- No CSS `animation` property usage in styled-components

### Transition Pattern (When Used)

Simple CSS transitions on hover/state changes:

```css
transition: all 0.3s ease;
```

See also: [[03-css/approach]]
