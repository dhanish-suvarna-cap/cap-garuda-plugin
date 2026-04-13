# Component Anatomy

## Standard File Structure (Top to Bottom)

Every component file follows this exact ordering:

```javascript
// ═══════════════════════════════════════
// 1. REACT & CORE IMPORTS
// ═══════════════════════════════════════
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';

// ═══════════════════════════════════════
// 2. THIRD-PARTY / UTILITY IMPORTS
// ═══════════════════════════════════════
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

// ═══════════════════════════════════════
// 3. CAPILLARY UI IMPORTS
// ═══════════════════════════════════════
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapInput from '@capillarytech/cap-ui-library/CapInput';

// ═══════════════════════════════════════
// 4. INTERNAL COMPONENT IMPORTS
// ═══════════════════════════════════════
import CustomSkeleton from '../../atoms/CustomSkeleton';
import ConfirmationModal from '../ConfirmationModal';

// ═══════════════════════════════════════
// 5. UTILITY IMPORTS
// ═══════════════════════════════════════
import withStyles from '../../../utils/withStyles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// ═══════════════════════════════════════
// 6. LOCAL FILE IMPORTS
// ═══════════════════════════════════════
import { StyledWrapper, FlexContainer } from './style';
import styles from './style';
import messages from './messages';
import * as types from './constants';
import reducer from './reducer';
import saga from './saga';
import { makeSelectData } from './selectors';
import { fetchData, updateData } from './actions';

// ═══════════════════════════════════════
// 7. CONSTANTS / DESTRUCTURING
// ═══════════════════════════════════════
const { someStyledVar } = StyledVars;

// ═══════════════════════════════════════
// 8. COMPONENT DECLARATION
// ═══════════════════════════════════════
const ComponentName = ({
  intl: { formatMessage },
  className,
  data,
  onAction,
}) => {
  // --- Local State ---
  const [isOpen, setIsOpen] = useState(false);

  // --- Effects ---
  useEffect(() => {
    // side effect
  }, []);

  // --- Computed / Memos ---
  const processedData = useMemo(() => {
    return data.filter(item => item.active);
  }, [data]);

  // --- Handlers ---
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // --- Render Helpers (inline or extracted) ---
  const renderHeader = () => (
    <CapRow className="header">
      <CapHeading type="h3">{formatMessage(messages.title)}</CapHeading>
    </CapRow>
  );

  // --- Return JSX ---
  // NEVER use native HTML elements (div, span, p, h1-h6, label, a)
  // Use Cap UI: CapRow, CapColumn, CapLabel, CapHeading, CapLink, etc.
  return (
    <CapRow className={classnames(className, 'component-root')}>
      {renderHeader()}
      <CapButton onClick={handleClick}>
        {formatMessage(messages.action)}
      </CapButton>
    </CapRow>
  );
};

// ═══════════════════════════════════════
// 9. DEFAULT PROPS
// ═══════════════════════════════════════
ComponentName.defaultProps = {
  className: '',
  data: [],
};

// ═══════════════════════════════════════
// 10. PROP TYPES
// ═══════════════════════════════════════
ComponentName.propTypes = {
  intl: intlShape.isRequired,
  className: PropTypes.string,
  data: PropTypes.array,
  onAction: PropTypes.func,
};

// ═══════════════════════════════════════
// 11. REDUX CONNECTION (if needed)
// ═══════════════════════════════════════
const mapStateToProps = createStructuredSelector({
  dataFromStore: makeSelectData(),
});

const mapDispatchToProps = dispatch => ({
  fetchData: params => dispatch(fetchData(params)),
  updateData: payload => dispatch(updateData(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = [{ key: 'componentDomain', saga }].map(injectSaga);
const withReducer = [{ key: 'componentDomain', reducer }].map(injectReducer);

// ═══════════════════════════════════════
// 12. EXPORT (with HOC composition)
// ═══════════════════════════════════════
export default compose(
  ...withSaga,
  ...withReducer,
  withConnect,
)(injectIntl(withStyles(ComponentName, styles)));
```

**IMPORTANT — index.js is NOT this file.**

The above compose chain, mapStateToProps, mapDispatchToProps all live in `Component.js`.

The `index.js` file ONLY contains a single re-export:
```js
// index.js — this is ALL it contains
export { default } from './ComponentName';
```

See `skills/shared-rules.md` Section 1 and Section 3 for the authoritative rule.

## Function Declaration Style

**Arrow functions** are the dominant pattern:

```javascript
// DOMINANT PATTERN
const AvatarIcon = ({ text, className }) => (
  <div className={className}>{text}</div>
);

// Also common for larger components
const ActionExpression = ({
  intl: { formatMessage },
  className,
  ...props
}) => {
  // component body with hooks
  return <div>...</div>;
};
```

**No `function` keyword** for component declarations in new code.

## Export Wrapping Pattern

### Simple Component (Atom)

```javascript
export default withStyles(AvatarIcon, styles);
```

### With i18n

```javascript
export default injectIntl(withStyles(SuggestionCard, styles));
```

### With Error Boundary

```javascript
export default withErrorBoundary(injectIntl(withStyles(Component, styles)));
```

### Full Redux-Connected Component

```javascript
export default compose(
  ...withSaga,
  ...withReducer,
  withConnect,
  withRouter,
)(injectIntl(withStyles(ComponentName, styles)));
```

The `compose` function wraps inside-out: `withStyles` applies first, then `injectIntl`, then Redux connection, then saga/reducer injection.

## Component Size Guidelines

| Atomic Level | Expected Lines | If Exceeding... |
|---|---|---|
| Atom | 20–60 | Probably should be a molecule |
| Molecule | 80–200 | Consider splitting render helpers |
| Organism | 200–400 | Extract sub-components |
| Page | 100–300 | Keep thin — delegate to organisms |

Largest observed: `ActionExpression.js` at 366 lines (organism).

See also: [[04-components/props]], [[04-components/composition]], [[02-code-style/naming]]
