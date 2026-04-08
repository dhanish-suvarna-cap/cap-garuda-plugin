---
description: "DEPRECATED — Use skills/cap-ui-library/SKILL.md instead. Full 131-component reference with props, sub-components, and Figma mapping."
triggers:
  - "cap-ui-library"
  - "CapSelect"
  - "CapButton"
  - "CapTable"
  - "CapInput"
  - "CapModal"
  - "Cap component"
  - "cap-ui"
---

# Cap UI Component Patterns

## Import Rule (CRITICAL)

Always import from individual file paths. NEVER use barrel imports.

```js
// CORRECT
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
import CapTable from '@capillarytech/cap-ui-library/CapTable';

// WRONG — causes full library bundle
import { CapButton, CapSelect } from '@capillarytech/cap-ui-library';
```

## Design Token Imports

```js
import {
  CAP_SPACE_04, CAP_SPACE_08, CAP_SPACE_12, CAP_SPACE_16, CAP_SPACE_20, CAP_SPACE_24,
  CAP_G05, CAP_G06, CAP_G07, CAP_G08, CAP_G09, CAP_G10,
  FONT_SIZE_12, FONT_SIZE_14, FONT_SIZE_16, FONT_SIZE_18, FONT_SIZE_20,
  FONT_WEIGHT_NORMAL, FONT_WEIGHT_SEMI_BOLD, FONT_WEIGHT_BOLD,
} from '@capillarytech/cap-ui-library/styled/variables';
```

## Top 15 Cap* Components

### CapButton
```jsx
import CapButton from '@capillarytech/cap-ui-library/CapButton';
<CapButton type="primary" onClick={handleClick}>Submit</CapButton>
<CapButton type="secondary" disabled={loading}>Cancel</CapButton>
```

### CapSelect
```jsx
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
<CapSelect
  options={options}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Select..."
  showSearch
/>
```

### CapTable
```jsx
import CapTable from '@capillarytech/cap-ui-library/CapTable';
<CapTable
  columns={columns}
  dataSource={data}
  pagination={pagination}
  onChange={handleTableChange}
  loading={loading}
/>
```

### CapInput
```jsx
import CapInput from '@capillarytech/cap-ui-library/CapInput';
<CapInput value={value} onChange={handleChange} placeholder="Enter..." />
```

### CapModal
```jsx
import CapModal from '@capillarytech/cap-ui-library/CapModal';
<CapModal visible={isOpen} onCancel={handleClose} title="My Modal">
  {content}
</CapModal>
```

### CapIcon
```jsx
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
<CapIcon type="search" size="m" />
```

### CapTooltip
```jsx
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';
<CapTooltip title="Help text"><CapIcon type="info" /></CapTooltip>
```

### CapTab / CapTabPane
```jsx
import CapTab from '@capillarytech/cap-ui-library/CapTab';
import CapTabPane from '@capillarytech/cap-ui-library/CapTabPane';
<CapTab activeKey={activeTab} onChange={setActiveTab}>
  <CapTabPane tab="Tab 1" key="1">{content1}</CapTabPane>
  <CapTabPane tab="Tab 2" key="2">{content2}</CapTabPane>
</CapTab>
```

### CapSpin
```jsx
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
<CapSpin spinning={loading}>{content}</CapSpin>
```

### CapNotification
```jsx
import CapNotification from '@capillarytech/cap-ui-library/CapNotification';
CapNotification.success({ message: 'Saved successfully' });
CapNotification.error({ message: 'Something went wrong' });
```

### CapSwitch
```jsx
import CapSwitch from '@capillarytech/cap-ui-library/CapSwitch';
<CapSwitch checked={enabled} onChange={handleToggle} />
```

### CapDatePicker
```jsx
import CapDatePicker from '@capillarytech/cap-ui-library/CapDatePicker';
<CapDatePicker value={date} onChange={handleDateChange} format="YYYY-MM-DD" />
```

### CapRadio / CapRadioGroup
```jsx
import CapRadio from '@capillarytech/cap-ui-library/CapRadio';
import CapRadioGroup from '@capillarytech/cap-ui-library/CapRadioGroup';
<CapRadioGroup value={selected} onChange={handleChange}>
  <CapRadio value="a">Option A</CapRadio>
  <CapRadio value="b">Option B</CapRadio>
</CapRadioGroup>
```

### CapCheckbox
```jsx
import CapCheckbox from '@capillarytech/cap-ui-library/CapCheckbox';
<CapCheckbox checked={isChecked} onChange={handleChange}>Label</CapCheckbox>
```

### CapTag
```jsx
import CapTag from '@capillarytech/cap-ui-library/CapTag';
<CapTag color="blue">Active</CapTag>
```

## For Detailed Docs

Use the MCP tool for deep component documentation:
- `mcp__cap-ui-library-mcp__fetch_all_topics_and_buckets` — list all available docs
- `mcp__cap-ui-library-mcp__get_rag_context_by_topic` — get detailed docs for a specific component
