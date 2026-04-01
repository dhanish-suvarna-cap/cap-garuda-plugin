# Responsive Patterns

## Approach: Fixed Layouts with Viewport Calculations

This is a **desktop-first enterprise dashboard** application. Mobile responsiveness is minimal.

### Primary Techniques

#### Viewport Calculations

```css
height: calc(100vh - 112px);
width: calc(100% - 40px);
```

#### Percentage Widths

```javascript
// From CommunicationTable/style.js
export const ChannelContainer = styled.div`
  width: 20%;
`;

export const ContentContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;
```

#### Flexbox for Layout Adaptability

```css
display: flex;
flex-wrap: wrap;
justify-content: space-between;
```

### No Breakpoint System

- No `@media` queries in a standard pattern
- No breakpoint tokens or variables
- No mobile-first approach
- Ant Design's responsive grid (antd `Row`/`Col`) used occasionally

### Layout Patterns

**Flexbox Dominant** — CSS Grid is NOT used:

```javascript
// Standard flex container
export const Flex = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${CAP_SPACE_12};
`;

// Space-between layout
display: flex;
justify-content: space-between;
align-items: center;

// Vertical stack
display: flex;
flex-direction: column;

// Wrapped list
display: flex;
flex-wrap: wrap;
```

See also: [[03-css/approach]]
