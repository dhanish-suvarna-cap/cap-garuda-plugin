---
name: figma-component-map
description: "Maps Figma design elements to Cap UI Library components. Used by figma-decomposer, lld-generator, dev-planner, and code-generator to select correct components."
---

# Figma-to-Component Mapping

> When processing Figma designs, use this mapping to identify which Cap UI Library component corresponds to each Figma design element. Always use the Cap UI component — never create custom implementations for standard UI elements.

## Mapping Table

| Figma Element Type | Cap UI Component | Import Path | Notes |
|-------------------|-----------------|-------------|-------|
| Button / CTA | CapButton | `@capillarytech/cap-ui-library/CapButton` | Variants: primary, secondary, flat. Props: type, prefix, suffix |
| Text Input | CapInput | `@capillarytech/cap-ui-library/CapInput` | Sub: .Search, .TextArea, .Number |
| Dropdown / Select | CapSelect | `@capillarytech/cap-ui-library/CapSelect` | Sub: .CapCustomSelect. For multi: CapMultiSelect |
| Multi-Select | CapMultiSelect | `@capillarytech/cap-ui-library/CapMultiSelect` | For tree: CapMultiSelectWithTree |
| Virtual Select (large lists) | CapVirtualSelect | `@capillarytech/cap-ui-library/CapVirtualSelect` | Use for >100 options |
| Table / Data Grid | CapTable | `@capillarytech/cap-ui-library/CapTable` | Ant Table wrapper with Cap styling |
| Modal / Dialog | CapModal | `@capillarytech/cap-ui-library/CapModal` | For side panel: CapDrawer |
| Drawer / Side Panel | CapDrawer | `@capillarytech/cap-ui-library/CapDrawer` | |
| Tabs | CapTab | `@capillarytech/cap-ui-library/CapTab` | V3 variant: CapTabV3 |
| Card | CapCard | `@capillarytech/cap-ui-library/CapCard` | Variants: CapCustomCard, CapCardBox |
| Date Picker | CapDatePicker | `@capillarytech/cap-ui-library/CapDatePicker` | Range: CapDateRangePicker. Calendar: CapCalendarDatePicker |
| Date Range Picker | CapDateRangePicker | `@capillarytech/cap-ui-library/CapDateRangePicker` | |
| Time Picker | CapTimePicker | `@capillarytech/cap-ui-library/CapTimePicker` | |
| Date+Time Picker | CapDateTimePicker | `@capillarytech/cap-ui-library/CapDateTimePicker` | Range: CapDateTimeRangePicker |
| Checkbox | CapCheckbox | `@capillarytech/cap-ui-library/CapCheckbox` | |
| Radio Button | CapRadio | `@capillarytech/cap-ui-library/CapRadio` | Group: CapRadioGroup. Card: CapRadioCard |
| Toggle / Switch | CapSwitch | `@capillarytech/cap-ui-library/CapSwitch` | |
| Slider | CapSlider | `@capillarytech/cap-ui-library/CapSlider` | |
| Icon | CapIcon | `@capillarytech/cap-ui-library/CapIcon` | |
| Tag / Badge | CapTag | `@capillarytech/cap-ui-library/CapTag` | Colored: CapColoredTag. Checkable: CapTag.CheckableTag |
| Tag Dropdown | CapTagDropdown | `@capillarytech/cap-ui-library/CapTagDropdown` | |
| Tooltip | CapTooltip | `@capillarytech/cap-ui-library/CapTooltip` | With info icon: CapTooltipWithInfo |
| Popover | CapPopover | `@capillarytech/cap-ui-library/CapPopover` | Tree variant: CapPopoverTree |
| Alert / Banner | CapAlert | `@capillarytech/cap-ui-library/CapAlert` | Banner: CapBanner |
| Notification / Toast | CapNotification | `@capillarytech/cap-ui-library/CapNotification` | Snackbar: CapSnackBar |
| Progress Bar | CapProgress | `@capillarytech/cap-ui-library/CapProgress` | |
| Spinner / Loading | CapSpin | `@capillarytech/cap-ui-library/CapSpin` | Skeleton: CapSkeleton |
| Steps / Wizard | CapSteps | `@capillarytech/cap-ui-library/CapSteps` | Accordion: CapStepsAccordian |
| Menu / Navigation | CapMenu | `@capillarytech/cap-ui-library/CapMenu` | Sidebar: CapSideBar. Top: CapTopBar |
| Dropdown Menu | CapDropdown | `@capillarytech/cap-ui-library/CapDropdown` | |
| Breadcrumb / Link | CapLink | `@capillarytech/cap-ui-library/CapLink` | |
| Divider | CapDivider | `@capillarytech/cap-ui-library/CapDivider` | |
| Heading / Title | CapHeading | `@capillarytech/cap-ui-library/CapHeading` | Props: type (h1-h6) |
| Label | CapLabel | `@capillarytech/cap-ui-library/CapLabel` | |
| Row / Grid | CapRow | `@capillarytech/cap-ui-library/CapRow` | Column: CapColumn |
| Column | CapColumn | `@capillarytech/cap-ui-library/CapColumn` | |
| Upload / File Input | CapUploader | `@capillarytech/cap-ui-library/CapUploader` | CSV: CapCSVFileUploader. SKU: CapSKUUploader |
| Tree / Hierarchy | CapTree | `@capillarytech/cap-ui-library/CapTree` | Select: CapTreeSelect. View: CapTreeView |
| Timeline | CapTimeline | `@capillarytech/cap-ui-library/CapTimeline` | Nested: CapTimelineNested |
| Color Picker | CapColorPicker | `@capillarytech/cap-ui-library/CapColorPicker` | |
| Graph / Chart | CapGraph | `@capillarytech/cap-ui-library/CapGraph` | DnD: CapDnDGraph |
| Form | CapForm | `@capillarytech/cap-ui-library/CapForm` | Item: CapFormItem |
| Drag & Drop | CapDragAndDrop | `@capillarytech/cap-ui-library/CapDragAndDrop` | Reorder: CapDragReorder |
| List | CapList | `@capillarytech/cap-ui-library/CapList` | Layout: CapListLayout |
| Carousel | CapCarousel | `@capillarytech/cap-ui-library/CapCarousel` | Custom: CapCustomCarousel |
| Image / Media | CapImage | `@capillarytech/cap-ui-library/CapImage` | Preview: CapMediaPreview |
| Error State | CapError | `@capillarytech/cap-ui-library/CapError` | Illustration: CapErrorStateIllustration |

## Decision Flowchart

When a Figma element doesn't have an obvious mapping:

```
1. Is it a standard HTML element (button, input, select, table)?
   → YES: Use the Cap UI equivalent from the mapping table above
   → NO: Continue to 2

2. Is it a layout container (row, column, card, section)?
   → YES: Use CapRow/CapColumn for grids, CapCard for cards
   → NO: Continue to 3

3. Is it a feedback element (alert, toast, modal, loading)?
   → YES: Use the Cap UI feedback component from the table
   → NO: Continue to 4

4. Does a similar Cap UI component exist?
   → YES: Use the closest Cap UI component, extend with styled-components if needed
   → NO: Flag as "custom implementation needed" in figma_decomposition.json unmapped_elements

5. For custom implementations:
   → Use Cap UI tokens for styling (FG-11)
   → Follow organism anatomy rules (FG-02)
   → Document why no Cap UI component was suitable
```

## HOC-Injected Props

Many Cap UI components are wrapped with `ComponentWithLabelHOC`, which injects these props automatically:

| Prop | Type | Description |
|------|------|-------------|
| label | string \| node | Display label above/beside the component |
| labelPosition | string | 'top' (default) or 'left' |
| errorMessage | string \| node | Error text below the component |
| isRequired | boolean | Show required marker (*) |
| inductiveText | string \| node | Helper text below the component |
| inline | boolean | Render label and component inline |

Components with HOC: CapInput, CapSelect, CapCheckbox, CapRadio, CapSwitch, CapSlider, CapTimePicker, CapDatePicker, CapTreeSelect, CapMultiSelect, CapMultiSelectWithTree, CapFormItem, CapRadioGroup, and more.

## Usage by Agents

- **figma-decomposer**: Uses this mapping to map Figma elements to Cap UI components in `figma_decomposition.json`.
- **lld-generator**: Uses this mapping during Figma verification to confirm component choices.
- **dev-planner**: References `figma_decomposition.json → component_mapping` when planning which Cap components to use per file.
- **code-generator**: Before generating any UI element, checks `figma_decomposition.json → component_mapping`. Uses ONLY the mapped component. Reads detailed props from `skills/cap-ui-library/ref-<ComponentName>.md`.
