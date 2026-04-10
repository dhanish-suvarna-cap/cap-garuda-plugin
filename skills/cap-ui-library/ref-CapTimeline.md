# CapTimeline

**Import**: `import CapTimeline from '@capillarytech/cap-ui-library/CapTimeline';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapTimeline/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Step-by-Step Timeline (Wizard Pattern)
```jsx
import CapTimeline from '@capillarytech/cap-ui-library/CapTimeline';

const [currentStep, setCurrentStep] = useState('details');

const timelinePanes = [
  {
    key: 'details',
    milestoneHeader: <span>Campaign Details</span>,
    milestoneDescription: <span>Name, duration, target value</span>,
    disabled: false,
    complete: false,
    paneKey: 'details',
    isSelected: currentStep === 'details',
    handleClick: () => setCurrentStep('details'),
  },
  {
    key: 'audience',
    milestoneHeader: <span>Customer Enrolment</span>,
    milestoneDescription: <span>4 audience lists</span>,
    disabled: true,
    complete: false,
    paneKey: 'audience',
    isSelected: currentStep === 'audience',
    handleClick: () => setCurrentStep('audience'),
  },
];

const contents = {
  details: <DetailsForm />,
  audience: <AudienceForm />,
};

<CapTimeline
  currentStep={currentStep}
  setCurrentStep={setCurrentStep}
  timelinePanes={timelinePanes}
  contents={contents}
  width={380}
/>
```
