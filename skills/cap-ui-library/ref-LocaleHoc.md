# LocaleHoc

**Import**: `import LocaleHoc from '@capillarytech/cap-ui-library/LocaleHoc';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/LocaleHoc/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Wrapping a component to inject locale props
```jsx
import LocaleHoc from '@capillarytech/cap-ui-library/LocaleHoc';

const TierCard = ({ locale, direction, ...props }) => (
  <div className={`tier-card ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
    <span>{props.tierName}</span>
  </div>
);

export default LocaleHoc(TierCard);
```

### With compose pattern
```jsx
import LocaleHoc from '@capillarytech/cap-ui-library/LocaleHoc';
import { compose } from 'redux';

export default compose(
  LocaleHoc,
  withConnect,
)(injectIntl(withStyles(RewardDetails, styles)));
```

### Accessing locale-aware formatting in a wrapped component
```jsx
import LocaleHoc from '@capillarytech/cap-ui-library/LocaleHoc';

const PointsDisplay = ({ locale, points }) => (
  <span>{new Intl.NumberFormat(locale).format(points)} pts</span>
);

export default LocaleHoc(PointsDisplay);
```
