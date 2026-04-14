---
name: cap-ui-composition-patterns
description: "Lookup table showing HOW to build every common UI pattern using ONLY Cap* components. Eliminates the need for raw HTML tags (div, span, p, etc.) by providing explicit Cap* composition recipes."
---

# Cap UI Composition Patterns — Zero Raw HTML Recipes

> **RULE**: Every UI pattern below has a Cap* composition. There is NO valid reason to use `<div>`, `<span>`, `<p>`, or any other native HTML tag in Component.js. If you think you need raw HTML, you haven't found the right pattern yet — check this table first.

## Layout Patterns

| UI Pattern | HTML You Might Reach For | Cap* Composition | Example |
|---|---|---|---|
| Horizontal layout | `<div style="display:flex">` | `<CapRow type="flex">` | `<CapRow type="flex" justify="space-between" align="middle">` |
| Vertical stack | `<div style="flex-direction:column">` | `<CapColumn>` or `<CapRow type="flex">` with vertical children | `<CapColumn span={24}>` |
| Grid layout | `<div class="grid">` | `<CapRow type="flex">` + `<CapColumn span={N}>` | `<CapRow type="flex"><CapColumn span={12}>Left</CapColumn><CapColumn span={12}>Right</CapColumn></CapRow>` |
| Spacing wrapper | `<div style="margin:16px">` | Styled Cap* component from styles.js | `const SpacedRow = styled(CapRow)\`margin: ${CAP_SPACE_16};\`` in styles.js |
| Container / Section | `<div class="section">` | `<CapCard>` or styled `CapRow` | `<CapCard>` for bordered sections, styled `CapRow` for plain wrappers |
| Full-width container | `<div style="width:100%">` | `<CapRow type="flex">` or `<CapColumn span={24}>` | `<CapColumn span={24}>` |
| Centered content | `<div style="text-align:center">` | `<CapRow type="flex" justify="center" align="middle">` | Wraps children in centered flex |
| Inline group | `<span>` wrapping elements | `<CapRow type="flex" gutter={8}>` | `<CapRow type="flex" gutter={8}><CapIcon .../><CapLabel .../></CapRow>` |

## Typography Hierarchy — Deterministic Font-Size → Component Mapping

> **RULE**: When you see a font size in Figma or design specs, use this table to select the EXACT Cap* component and type. Select by font-size first, weight second, color third. NEVER guess — if the font size isn't in this table, halt and ask the user.

| Font Size | Font Weight | Text Color | Cap* Component | Type Prop |
|---|---|---|---|---|
| 32px+ | any | any | `CapHeading` | `type="h1"` |
| 24–28px | any | any | `CapHeading` | `type="h2"` |
| 20px | any | any | `CapHeading` | `type="h3"` |
| 16px | medium (500) | dark (#091e42) | `CapHeading` | `type="h4"` |
| 16px | regular (400) | any | `CapLabel` | `type="label7"` |
| 14px | medium (500) | any | `CapLabel` | `type="label7"` |
| 14px | regular (400) | dark (#091e42) | `CapLabel` | `type="label4"` |
| 14px | regular (400) | grey (#5e6c84) | `CapLabel` | `type="label1"` |
| 12px | regular (400) | dark (#091e42) | `CapLabel` | `type="label2"` |
| 12px | regular (400) | grey (#5e6c84) | `CapLabel` | `type="label1"` |
| 12px | regular (400) | light (#97a0af) | `CapLabel` | `type="label3"` |
| 10px | any | any | `CapLabel` | `type="label5"` |

**CapLabel type summary**:
- `label1` — 12–14px regular, grey secondary text (descriptions, hints)
- `label2` — 12px regular, dark body text
- `label3` — 12px regular, light tertiary text (timestamps, metadata)
- `label4` — 14px regular, dark primary text
- `label5` — 10px, extra small text (badges, captions)
- `label7` — 14–16px medium, semi-bold text (field values, emphasis)

**CapHeading type summary**:
- `h1` — 32px+, page titles
- `h2` — 24–28px, section titles
- `h3` — 20px, sub-section titles
- `h4` — 16px medium, card/panel titles

## Typography Patterns

| UI Pattern | HTML You Might Reach For | Cap* Composition | Example |
|---|---|---|---|
| Page title | `<h1>`, `<h2>` | `<CapHeading type="h1">` | `<CapHeading type="h2">{formatMessage(messages.pageTitle)}</CapHeading>` |
| Section heading | `<h3>`, `<h4>` | `<CapHeading type="h3">` | `<CapHeading type="h3">{formatMessage(messages.sectionTitle)}</CapHeading>` |
| Body text | `<p>`, `<span>` | `<CapLabel type="label2">` | `<CapLabel type="label2">{formatMessage(messages.description)}</CapLabel>` |
| Small text / caption | `<small>`, `<span class="caption">` | `<CapLabel type="label4">` | `<CapLabel type="label4">{formatMessage(messages.hint)}</CapLabel>` |
| Bold text | `<strong>`, `<b>` | `<CapLabel type="label1">` or styled CapLabel | Styled: `` const BoldLabel = styled(CapLabel)`font-weight: ${FONT_WEIGHT_MEDIUM};` `` |
| Label for a field | `<label>` | `<CapLabel>` or HOC `label` prop | Most Cap* form components accept `label` prop via HOC |
| Link text | `<a href="...">` | `<CapLink>` | `<CapLink href="/path">{formatMessage(messages.link)}</CapLink>` |
| Error text | `<span class="error">` | HOC `errorMessage` prop or styled CapLabel | `<CapInput errorMessage={errorText} />` |

## Common Component Patterns

| UI Pattern | HTML You Might Reach For | Cap* Composition |
|---|---|---|
| **Header bar** | `<div class="header">` | `<CapRow type="flex" justify="space-between" align="middle">` → `<CapHeading>` + `<CapRow type="flex" gutter={8}>` (action buttons) |
| **Card with title** | `<div class="card"><h3>Title</h3>...` | `<CapCard>` → `<CapHeading type="h3">` + content |
| **Metric card** | `<div class="metric">` | `<CapCard>` → `<CapColumn>` → `<CapLabel type="label1">{value}</CapLabel>` + `<CapLabel type="label4">{description}</CapLabel>` |
| **Status indicator** | `<span class="status-dot">` | `<CapRow type="flex" gutter={8} align="middle">` → `<CapIcon type="..." />` + `<CapLabel>` |
| **Badge / Tag** | `<span class="badge">` | `<CapTag>` or `<CapColoredTag>` |
| **Empty state** | `<div class="empty">` | `<CapRow type="flex" justify="center">` → `<CapColumn>` → `<CapIcon>` + `<CapLabel>` + `<CapButton>` |
| **Action bar** | `<div class="actions">` | `<CapRow type="flex" justify="end" gutter={12}>` → `<CapButton type="flat">Cancel</CapButton>` + `<CapButton type="primary">Save</CapButton>` |
| **Search bar** | `<div class="search">` | `<CapInput.Search>` or `<CapRow type="flex" gutter={8}>` → `<CapIcon type="search">` + `<CapInput>` |
| **Filter row** | `<div class="filters">` | `<CapRow type="flex" gutter={16}>` → `<CapColumn><CapSelect .../></CapColumn>` + `<CapColumn><CapDateRangePicker .../></CapColumn>` |
| **Avatar / icon circle** | `<div class="avatar">` | Styled `CapIcon`: `` const Avatar = styled(CapIcon)`border-radius: 50%; background: ${CAP_G05};` `` |
| **Sidebar nav** | `<nav><ul><li>` | `<CapSideBar>` or `<CapMenu mode="inline">` |
| **Tab content** | `<div class="tab-content">` | `<CapTab>` with `panes` prop array |
| **Loading overlay** | `<div class="overlay">` | `<CapSpin spinning={loading}>` wrapping content |
| **Skeleton screen** | `<div class="skeleton">` | `<CapSkeleton active loading={loading}>` |
| **Divider line** | `<hr>` | `<CapDivider />` |
| **List of items** | `<ul><li>` | `<CapList>` or `<CapColumn>` with mapped children |
| **Table wrapper** | `<div class="table-wrapper">` | `<CapTable dataSource={data} columns={columns} />` — no wrapper div needed |
| **Form layout** | `<form><div class="field">` | `<CapForm>` → `<CapFormItem>` for each field, or `<CapColumn>` with form components using HOC `label` prop |
| **Breadcrumb** | `<nav><a>Home</a> > <a>Page</a>` | `<CapLink>` components or Cap breadcrumb pattern |
| **Notification area** | `<div class="notification">` | `CapNotification.open({...})` (imperative API, no JSX wrapper needed) |

## Styled-Components Patterns (styles.js Only)

When you need custom styling beyond what Cap* props provide, use styled Cap* components — **NEVER** `styled.div` in Component.js.

```js
// styles.js — CORRECT: styled Cap* components
import styled from 'styled-components';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

export const HeaderRow = styled(CapRow)`
  padding: ${styledVars.CAP_SPACE_16};
  border-bottom: 1px solid ${styledVars.CAP_G05};
`;

export const MetricValue = styled(CapLabel)`
  font-size: ${styledVars.FONT_SIZE_VL};
  font-weight: ${styledVars.FONT_WEIGHT_MEDIUM};
`;

export const StatusDot = styled(CapIcon)`
  color: ${styledVars.CAP_PRIMARY.base};
`;

// styles.js — LAST RESORT: styled.div (only in styles.js, with justification comment)
// Use ONLY when no Cap* component can serve as the base
export const GradientOverlay = styled.div`
  /* No Cap* equivalent — gradient overlay for image backgrounds */
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  position: absolute;
  inset: 0;
`;
```

```js
// Component.js — CORRECT: import styled components from styles.js
import { HeaderRow, MetricValue, StatusDot } from './styles';

const MyComponent = ({ intl: { formatMessage } }) => (
  <HeaderRow type="flex" justify="space-between">
    <MetricValue>{formatMessage(messages.count)}</MetricValue>
    <StatusDot type="check-circle" />
  </HeaderRow>
);

// Component.js — WRONG: never use styled.div or raw HTML here
// const Wrapper = styled.div`...`;  // WRONG — move to styles.js
// <div className="wrapper">         // WRONG — use CapRow or styled CapRow
```

## Fallback Priority Chain

When you encounter a UI element with no obvious Cap* match, follow this chain **in order**:

```
Priority 1: Compose from Cap* primitives
   → CapRow, CapColumn, CapCard, CapLabel, CapHeading, CapIcon, CapButton
   → These cover 95% of layout and text needs

Priority 2: Use styled(Cap*) in styles.js
   → styled(CapRow), styled(CapLabel), styled(CapIcon), etc.
   → Add custom CSS while keeping the Cap* component as the base

Priority 3: styled.div in styles.js ONLY (with justification)
   → MUST include comment: /* No Cap* equivalent — <reason> */
   → Examples: gradient overlays, absolute positioned decorations, canvas wrappers
   → Import into Component.js as a named styled component

Priority 4: NEVER — Raw HTML in Component.js
   → <div>, <span>, <p>, <label>, <a>, <button>, <input>, <table>, <ul>, <li>, <ol>, <hr>
   → These are NEVER acceptable in Component.js under any circumstance
   → If you think you need them, go back to Priority 1 and try harder
```

## Quick Reference: HTML Tag → Cap* Replacement

| HTML Tag | Cap* Replacement | When to Use |
|---|---|---|
| `<div>` (layout) | `CapRow` / `CapColumn` | Always — every div is either a row or column |
| `<div>` (card/panel) | `CapCard` | When content has a border or elevation |
| `<div>` (spacing) | styled `CapRow` or `CapColumn` | Add margin/padding via styled-components in styles.js |
| `<span>` | `CapLabel` | All inline text |
| `<p>` | `CapLabel type="label2"` | Body text |
| `<h1>`–`<h6>` | `CapHeading type="h1"` through `"h6"` | All headings |
| `<label>` | `CapLabel` or HOC `label` prop | Field labels |
| `<a>` | `CapLink` | All links |
| `<button>` | `CapButton` | All buttons |
| `<input>` | `CapInput` | Text inputs |
| `<select>` | `CapSelect` | Dropdowns |
| `<table>` | `CapTable` | All tables |
| `<ul>` / `<ol>` / `<li>` | `CapList` or `CapColumn` with mapped items | Lists |
| `<hr>` | `CapDivider` | Dividers |
| `<img>` | `CapImage` (or `CapIcon` for icons) | Images |
| `<nav>` | `CapSideBar` or `CapMenu` | Navigation |
| `<form>` | `CapForm` | Forms |

## Usage by Agents

- **code-generator**: MUST consult this file before writing ANY Component.js. For every JSX element, find the Cap* composition here.
- **dev-planner**: Reference this when planning component structure — all layout decisions should use Cap* patterns.
- **guardrail-checker**: Violations of these patterns are FG-13 CRITICAL.
- **visual-qa**: Verify rendered output uses Cap* composition, not raw HTML wrappers.
