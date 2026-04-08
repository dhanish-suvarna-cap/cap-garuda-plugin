---
name: cap-ui-library
description: "Comprehensive Cap UI Library component reference. 131 components with props, import paths, usage examples, and Figma-to-component mapping. Agents read the index (this file) to find a component, then read the detailed ref-<ComponentName>.md for props and usage."
---

# Cap UI Library Component Reference

> **Package**: `@capillarytech/cap-ui-library` (v8.14.3)
> **Import rule**: ALWAYS use individual file paths — NEVER barrel imports (see FG-01)
> ```js
> // CORRECT
> import CapButton from '@capillarytech/cap-ui-library/CapButton';
> // WRONG
> import { CapButton } from '@capillarytech/cap-ui-library';
> ```

## How Agents Use This Skill

1. **Find a component**: Search this index by category or name
2. **Read detailed spec**: Open `ref-<ComponentName>.md` for full props, sub-components, and usage
3. **Check Figma mapping**: See `skills/figma-component-map/SKILL.md` for Figma element → Cap component mapping

## Component Index by Category

### Form Controls
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapButton | `CapButton` | Button with primary/secondary/flat variants | ref-CapButton.md |
| CapInput | `CapInput` | Text input with .Search, .TextArea, .Number sub-components | ref-CapInput.md |
| CapSelect | `CapSelect` | Dropdown select with .CapCustomSelect | ref-CapSelect.md |
| CapMultiSelect | `CapMultiSelect` | Multi-value select | ref-CapMultiSelect.md |
| CapMultiSelectWithTree | `CapMultiSelectWithTree` | Multi-select with tree hierarchy | ref-CapMultiSelectWithTree.md |
| CapVirtualSelect | `CapVirtualSelect` | Virtualized select for large lists | ref-CapVirtualSelect.md |
| CapVirtualMultiSelect | `CapVirtualMultiSelect` | Virtualized multi-select | ref-CapVirtualMultiSelect.md |
| CapCheckbox | `CapCheckbox` | Checkbox input | ref-CapCheckbox.md |
| CapRadio | `CapRadio` | Radio button | ref-CapRadio.md |
| CapRadioButton | `CapRadioButton` | Button-styled radio | ref-CapRadioButton.md |
| CapRadioCard | `CapRadioCard` | Card-styled radio | ref-CapRadioCard.md |
| CapRadioGroup | `CapRadioGroup` | Radio group wrapper | ref-CapRadioGroup.md |
| CapSwitch | `CapSwitch` | Toggle switch | ref-CapSwitch.md |
| CapSlider | `CapSlider` | Range slider | ref-CapSlider.md |
| CapDatePicker | `CapDatePicker` | Date picker | ref-CapDatePicker.md |
| CapDateRangePicker | `CapDateRangePicker` | Date range picker | ref-CapDateRangePicker.md |
| CapCalendarDatePicker | `CapCalendarDatePicker` | Calendar-style date picker | ref-CapCalendarDatePicker.md |
| CapDateTimePicker | `CapDateTimePicker` | Date + time picker | ref-CapDateTimePicker.md |
| CapDateTimeRangePicker | `CapDateTimeRangePicker` | Date + time range picker | ref-CapDateTimeRangePicker.md |
| CapMobileDatePicker | `CapMobileDatePicker` | Mobile-optimized date picker | ref-CapMobileDatePicker.md |
| CapMobileDateRangePicker | `CapMobileDateRangePicker` | Mobile date range picker | ref-CapMobileDateRangePicker.md |
| CapMultiSelectDatePicker | `CapMultiSelectDatePicker` | Multi-date selection | ref-CapMultiSelectDatePicker.md |
| CapTimePicker | `CapTimePicker` | Time picker | ref-CapTimePicker.md |
| CapColorPicker | `CapColorPicker` | Color picker | ref-CapColorPicker.md |
| CapEmojiPicker | `CapEmojiPicker` | Emoji picker | ref-CapEmojiPicker.md |
| CapForm | `CapForm` | Form wrapper | ref-CapForm.md |
| CapFormItem | `CapFormItem` | Form field wrapper | ref-CapFormItem.md |
| CapUploader | `CapUploader` | File upload | ref-CapUploader.md |
| CapCSVFileUploader | `CapCSVFileUploader` | CSV file upload | ref-CapCSVFileUploader.md |
| CapSKUUploader | `CapSKUUploader` | SKU file upload | ref-CapSKUUploader.md |
| CapCustomSelect | `CapCustomSelect` | Custom-styled select | ref-CapCustomSelect.md |
| CapCustomCheckboxList | `CapCustomCheckboxList` | Checkbox list | ref-CapCustomCheckboxList.md |
| CapCustomList | `CapCustomList` | Custom list control | ref-CapCustomList.md |
| CapSelectFilter | `CapSelectFilter` | Select with filter | ref-CapSelectFilter.md |

### Data Display
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapTable | `CapTable` | Data table (Ant Table wrapper) | ref-CapTable.md |
| CapVerticalGroupTable | `CapVerticalGroupTable` | Grouped vertical table | ref-CapVerticalGroupTable.md |
| CapList | `CapList` | List display | ref-CapList.md |
| CapListLayout | `CapListLayout` | List layout wrapper | ref-CapListLayout.md |
| CapVirtualList | `CapVirtualList` | Virtualized list | ref-CapVirtualList.md |
| CapTree | `CapTree` | Tree structure | ref-CapTree.md |
| CapTreeSelect | `CapTreeSelect` | Tree-based select | ref-CapTreeSelect.md |
| CapTreeView | `CapTreeView` | Tree view display | ref-CapTreeView.md |
| CapTag | `CapTag` | Tag/badge with .CheckableTag | ref-CapTag.md |
| CapColoredTag | `CapColoredTag` | Colored tag with .CheckableTag | ref-CapColoredTag.md |
| CapTagDropdown | `CapTagDropdown` | Tag with dropdown | ref-CapTagDropdown.md |
| CapProgress | `CapProgress` | Progress bar | ref-CapProgress.md |
| CapTimeline | `CapTimeline` | Timeline display | ref-CapTimeline.md |
| CapTimelineNested | `CapTimelineNested` | Nested timeline | ref-CapTimelineNested.md |
| CapStatisticCard | `CapStatisticCard` | Statistic display card | ref-CapStatisticCard.md |
| CapStatus | `CapStatus` | Status indicator | ref-CapStatus.md |
| CapGraph | `CapGraph` | Chart/graph | ref-CapGraph.md |
| CapDnDGraph | `CapDnDGraph` | Drag-and-drop graph | ref-CapDnDGraph.md |
| CapDndGraphSidebar | `CapDndGraphSidebar` | DnD graph sidebar | ref-CapDndGraphSidebar.md |
| CapLevelGraphRenderer | `CapLevelGraphRenderer` | Level graph renderer | ref-CapLevelGraphRenderer.md |
| CapRoadMap | `CapRoadMap` | Roadmap visualization | ref-CapRoadMap.md |
| CapTruncateList | `CapTruncateList` | Truncated list with "show more" | ref-CapTruncateList.md |
| CapCarousel | `CapCarousel` | Image/content carousel | ref-CapCarousel.md |
| CapCustomCarousel | `CapCustomCarousel` | Custom carousel | ref-CapCustomCarousel.md |
| CapEventCalendar | `CapEventCalendar` | Event calendar | ref-CapEventCalendar.md |
| CapExpressionEditor | `CapExpressionEditor` | Expression/formula editor | ref-CapExpressionEditor.md |

### Layout
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapRow | `CapRow` | Flex row container | ref-CapRow.md |
| CapColumn | `CapColumn` | Grid column | ref-CapColumn.md |
| CapCard | `CapCard` | Card container | ref-CapCard.md |
| CapCardBox | `CapCardBox` | Card box variant | ref-CapCardBox.md |
| CapCustomCard | `CapCustomCard` | Custom card | ref-CapCustomCard.md |
| CapDivider | `CapDivider` | Section divider | ref-CapDivider.md |
| CapBlock | `CapBlock` | Content block | ref-CapBlock.md |
| CapBorderedBox | `CapBorderedBox` | Bordered container | ref-CapBorderedBox.md |
| CapSplit | `CapSplit` | Split pane layout | ref-CapSplit.md |
| CapSlideBox | `CapSlideBox` | Sliding content box | ref-CapSlideBox.md |
| CapEmptyDivWithBorder | `CapEmptyDivWithBorder` | Empty bordered div | ref-CapEmptyDivWithBorder.md |

### Navigation
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapMenu | `CapMenu` | Navigation menu | ref-CapMenu.md |
| CapNavigation | `CapNavigation` | Navigation wrapper | ref-CapNavigation.md |
| CapSideBar | `CapSideBar` | Sidebar navigation | ref-CapSideBar.md |
| CapTopBar | `CapTopBar` | Top navigation bar | ref-CapTopBar.md |
| CapSecondaryTopBar | `CapSecondaryTopBar` | Secondary top bar | ref-CapSecondaryTopBar.md |
| CapCollapsibleLeftNavigation | `CapCollapsibleLeftNavigation` | Collapsible left nav | ref-CapCollapsibleLeftNavigation.md |
| CapCollapsibleNavbar | `CapCollapsibleNavbar` | Collapsible navbar | ref-CapCollapsibleNavbar.md |
| CapHamburgerMenu | `CapHamburgerMenu` | Hamburger menu | ref-CapHamburgerMenu.md |
| CapTab | `CapTab` | Tab navigation | ref-CapTab.md |
| CapTabV3 | `CapTabV3` | Tab v3 variant | ref-CapTabV3.md |
| CapSteps | `CapSteps` | Step wizard | ref-CapSteps.md |
| CapStepsAccordian | `CapStepsAccordian` | Steps accordion | ref-CapStepsAccordian.md |
| CapLink | `CapLink` | Hyperlink | ref-CapLink.md |
| CapDropdown | `CapDropdown` | Dropdown menu | ref-CapDropdown.md |

### Feedback
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapModal | `CapModal` | Modal dialog | ref-CapModal.md |
| CapDrawer | `CapDrawer` | Side drawer | ref-CapDrawer.md |
| CapAlert | `CapAlert` | Alert message | ref-CapAlert.md |
| CapBanner | `CapBanner` | Banner notification | ref-CapBanner.md |
| CapNotification | `CapNotification` | Notification popup | ref-CapNotification.md |
| CapNotificationDropdown | `CapNotificationDropdown` | Notification dropdown | ref-CapNotificationDropdown.md |
| CapSnackBar | `CapSnackBar` | Snackbar toast | ref-CapSnackBar.md |
| CapTooltip | `CapTooltip` | Tooltip | ref-CapTooltip.md |
| CapTooltipWithInfo | `CapTooltipWithInfo` | Tooltip with info icon | ref-CapTooltipWithInfo.md |
| CapPopover | `CapPopover` | Popover content | ref-CapPopover.md |
| CapPopoverTree | `CapPopoverTree` | Popover with tree | ref-CapPopoverTree.md |
| CapSpin | `CapSpin` | Loading spinner | ref-CapSpin.md |
| CapSkeleton | `CapSkeleton` | Skeleton loader | ref-CapSkeleton.md |
| CapInfoNote | `CapInfoNote` | Info note callout | ref-CapInfoNote.md |

### Typography & Icons
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapHeading | `CapHeading` | Heading (h1-h6) | ref-CapHeading.md |
| CapLabel | `CapLabel` | Form label | ref-CapLabel.md |
| CapIcon | `CapIcon` | Icon component | ref-CapIcon.md |
| CapAdvancedIcon | `CapAdvancedIcon` | Advanced icon with effects | ref-CapAdvancedIcon.md |
| CapIllustration | `CapIllustration` | Illustration/SVG | ref-CapIllustration.md |
| CapImage | `CapImage` | Image display | ref-CapImage.md |
| CapMediaPreview | `CapMediaPreview` | Media preview | ref-CapMediaPreview.md |
| CapShape | `CapShape` | Shape element | ref-CapShape.md |

### Specialized
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapDragAndDrop | `CapDragAndDrop` | Drag and drop | ref-CapDragAndDrop.md |
| CapDragReorder | `CapDragReorder` | Drag to reorder | ref-CapDragReorder.md |
| CapReorderComponent | `CapReorderComponent` | Reorderable component | ref-CapReorderComponent.md |
| CapHierarchyComponent | `CapHierarchyComponent` | Hierarchy display | ref-CapHierarchyComponent.md |
| CapMultiplePath | `CapMultiplePath` | Multiple path selector | ref-CapMultiplePath.md |
| CapCondition | `CapCondition` | Condition builder | ref-CapCondition.md |
| CapConditionPreview | `CapConditionPreview` | Condition preview | ref-CapConditionPreview.md |
| CapProductSelection | `CapProductSelection` | Product selector | ref-CapProductSelection.md |
| CapStaticTemplates | `CapStaticTemplates` | Static templates | ref-CapStaticTemplates.md |
| CapSupportVideosWrapper | `CapSupportVideosWrapper` | Support videos | ref-CapSupportVideosWrapper.md |
| CapAskAira | `CapAskAira` | AI assistant widget | ref-CapAskAira.md |

### Error Handling
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapError | `CapError` | Error display | ref-CapError.md |
| CapErrorBoundary | `CapErrorBoundary` | React error boundary | ref-CapErrorBoundary.md |
| CapErrorStateIllustration | `CapErrorStateIllustration` | Error state illustration | ref-CapErrorStateIllustration.md |
| CapSomethingWentWrong | `CapSomethingWentWrong` | "Something went wrong" page | ref-CapSomethingWentWrong.md |
| CapAppNotEnabled | `CapAppNotEnabled` | App not enabled page | ref-CapAppNotEnabled.md |

### Auth & System
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| CapLogin | `CapLogin` | Login page | ref-CapLogin.md |
| CapUserProfile | `CapUserProfile` | User profile display | ref-CapUserProfile.md |
| CapHeader | `CapHeader` | Page header | ref-CapHeader.md |
| CapActionBar | `CapActionBar` | Action toolbar | ref-CapActionBar.md |
| CapImportMFEComponent | `CapImportMFEComponent` | Micro-frontend loader | ref-CapImportMFEComponent.md |

### HOCs (Higher-Order Components)
| Component | Import | Description | Spec |
|-----------|--------|-------------|------|
| ClearDataOnUnmountHoc | `ClearDataOnUnmountHoc` | Clears Redux data on unmount | ref-ClearDataOnUnmountHoc.md |
| CapLanguageProvider | `CapLanguageProvider` | i18n provider | ref-CapLanguageProvider.md |
| LocaleHoc | `LocaleHoc` | Locale injection HOC | ref-LocaleHoc.md |

## Design Tokens

Import from: `@capillarytech/cap-ui-library/styled/variables`

| Token Group | Examples | Usage |
|------------|---------|-------|
| Spacing | CAP_SPACE_04, CAP_SPACE_08, CAP_SPACE_12, CAP_SPACE_16, CAP_SPACE_20, CAP_SPACE_24, CAP_SPACE_32 | Padding, margin, gaps |
| Greys | CAP_G00 (white), CAP_G05, CAP_G10, CAP_G20, CAP_G40, CAP_G60, CAP_G80, CAP_G100 (black) | Text, backgrounds, borders |
| Font Size | FONT_SIZE_12, FONT_SIZE_14, FONT_SIZE_16, FONT_SIZE_18, FONT_SIZE_20 | Typography |
| Font Weight | FONT_WEIGHT_REGULAR, FONT_WEIGHT_500, FONT_WEIGHT_600, FONT_WEIGHT_BOLD | Typography emphasis |

## HOC-Injected Props (ComponentWithLabelHOC)

Many form components are wrapped with ComponentWithLabelHOC, which adds:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string \| node | - | Display label |
| labelPosition | 'top' \| 'left' | 'top' | Label placement |
| errorMessage | string \| node | - | Error text |
| isRequired | boolean | false | Show * marker |
| inductiveText | string \| node | - | Helper text |
| inline | boolean | false | Inline layout |

Components with this HOC: CapInput, CapSelect, CapCheckbox, CapRadio, CapSwitch, CapSlider, CapTimePicker, CapDatePicker, CapTreeSelect, CapMultiSelect, CapMultiSelectWithTree, CapFormItem, CapRadioGroup, CapCustomSelect, CapCustomCheckboxList, CapCustomList, CapCalendarDatePicker, CapMobileDatePicker, CapMobileDateRangePicker.
