# ClearDataOnUnmountHoc

**Import**: `import ClearDataOnUnmountHoc from '@capillarytech/cap-ui-library/ClearDataOnUnmountHoc';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/ClearDataOnUnmountHoc/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Wrapping a component to clear Redux data on unmount
```jsx
import ClearDataOnUnmountHoc from '@capillarytech/cap-ui-library/ClearDataOnUnmountHoc';

const TierDetailsWithClear = ClearDataOnUnmountHoc(TierDetails);

// In the compose chain or export:
export default ClearDataOnUnmountHoc(
  connect(mapStateToProps, mapDispatchToProps)(TierDetails)
);
```

### With compose pattern (typical organism export)
```jsx
import ClearDataOnUnmountHoc from '@capillarytech/cap-ui-library/ClearDataOnUnmountHoc';
import { compose } from 'redux';

export default compose(
  ClearDataOnUnmountHoc,
  withConnect,
  ...withReducer,
  ...withSaga,
)(injectIntl(withStyles(CreateProgram, styles)));
```

### Wrapping a page-level component
```jsx
import ClearDataOnUnmountHoc from '@capillarytech/cap-ui-library/ClearDataOnUnmountHoc';

// Ensures the reducer slice is reset when navigating away from this page
const ProgramListPage = ClearDataOnUnmountHoc(ProgramList);
```
