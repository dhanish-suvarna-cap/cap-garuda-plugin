# CapStepsAccordian

**Import**: `import CapStepsAccordian from '@capillarytech/cap-ui-library/CapStepsAccordian';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapStepsAccordian/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic Steps Accordion
```jsx
import CapStepsAccordian from '@capillarytech/cap-ui-library/CapStepsAccordian';

<CapStepsAccordian>
  <CapStepsAccordian.Panel header="Step 1: Basic Details" key="1">
    <p>Enter tier name and description</p>
  </CapStepsAccordian.Panel>
  <CapStepsAccordian.Panel header="Step 2: Thresholds" key="2">
    <p>Define point thresholds for upgrade</p>
  </CapStepsAccordian.Panel>
  <CapStepsAccordian.Panel header="Step 3: Benefits" key="3">
    <p>Select benefits for this tier</p>
  </CapStepsAccordian.Panel>
</CapStepsAccordian>
```

### Steps Accordion with Custom Styling
```jsx
import CapStepsAccordian from '@capillarytech/cap-ui-library/CapStepsAccordian';

<CapStepsAccordian
  className="wizard-accordion"
  style={{ maxWidth: '800px', margin: '0 auto' }}
>
  <CapStepsAccordian.Panel header="Program Setup" key="setup">
    <div>Configure loyalty program parameters</div>
  </CapStepsAccordian.Panel>
  <CapStepsAccordian.Panel header="Rule Engine" key="rules">
    <div>Define earning and burning rules</div>
  </CapStepsAccordian.Panel>
</CapStepsAccordian>
```
