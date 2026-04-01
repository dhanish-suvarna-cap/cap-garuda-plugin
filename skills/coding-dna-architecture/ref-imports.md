# Import Conventions

## Import Ordering

Imports follow this consistent order, separated by topic (not always by blank lines):

```javascript
// 1. React core
import React, { useState, useEffect, useMemo } from 'react';

// 2. Third-party libraries
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { compose } from 'redux';

// 3. Capillary UI library components (one per line)
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';

// 4. Internal components (relative paths)
import CustomSkeleton from '../../atoms/CustomSkeleton';
import ConfirmationModal from '../ConfirmationModal';

// 5. Internal utilities
import withStyles from '../../../utils/withStyles';
import { gtmPush } from '../../../utils/gtmTrackers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// 6. Local files (same component folder)
import styles from './style';
import messages from './messages';
import * as types from './constants';
import reducer from './reducer';
import saga from './saga';
import { makeSelectExtendedFields } from './selectors';
```

## Path Resolution

### No Aliases — Two Resolution Strategies

1. **Relative paths** (most common):
   ```javascript
   import withStyles from '../../../utils/withStyles';
   import styles from './style';
   ```

2. **Module-style imports from `app/` root** (via webpack `moduleDirectories`):
   ```javascript
   import injectReducer from 'utils/injectReducer';
   import injectSaga from 'utils/injectSaga';
   ```
   This works because webpack resolves `app/` as a module directory.

### Capillary Library Imports

Always import specific sub-modules (NOT the root package):

```javascript
// CORRECT
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import { CAP_SPACE_12 } from '@capillarytech/cap-ui-library/styled/variables';
import StyledVars from '@capillarytech/cap-ui-library/styled';

// WRONG - never import from root
import { CapButton } from '@capillarytech/cap-ui-library';
```

## Barrel Files (index.js)

Every component folder has an `index.js` that re-exports the default export:

```javascript
// ComponentName/index.js
export { default } from './ComponentName';
```

This allows clean imports:
```javascript
import DifferentDestinationPrograms from '../DifferentDestinationPrograms';
// resolves to DifferentDestinationPrograms/index.js → DifferentDestinationPrograms.js
```

## Default vs Named Exports

| File Type | Export Style | Example |
|---|---|---|
| Components | Default export (wrapped) | `export default injectIntl(withStyles(Card, styles))` |
| Reducers | Default export | `export default CreateTrackerReducer` |
| Sagas | Default export (generator) | `export default function*() { yield all([...]) }` |
| Action creators | Named exports | `export const getExtendedFields = (...)` |
| Constants | Named exports | `export const GET_FIELDS_REQUEST = '...'` |
| Selectors | Named exports | `export { makeSelectExtendedFields }` |
| Utilities | Named exports | `export const parseQueryParams = (...)` |
| Messages | Default export | `export default defineMessages({ ... })` |
| Style files | Mixed | Named: `export const Wrapper = styled.div`; Default: `export default css\`...\`` |

## Dynamic Imports (Lazy Loading)

Used at the route/page level via Capillary's `loadable`:

```javascript
import { loadable } from '@capillarytech/cap-ui-utils';

// In routes.js
{
  component: loadable(() => import('../Dashboard')),
  path: `${publicPath}/`,
}
```

Also via React.lazy with custom wrapper:

```javascript
// withDynamicLazyLoading.js pattern
const Capping = React.lazy(() => import('../CappingSlidebox'));

// Wrapped in Suspense with skeleton fallback
<Suspense fallback={<CenteredSkeleton width="90vw" height="90vh" />}>
  <Capping />
</Suspense>
```

## Side-Effect Imports

Rare, but found:

```javascript
// Polyfill
import 'whatwg-fetch';
```

## Lodash Imports

Always use per-method imports for tree-shaking:

```javascript
// CORRECT
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

// WRONG - imports entire library
import { cloneDeep } from 'lodash';
import _ from 'lodash';
```

The `babel-plugin-lodash` further optimizes this in production builds.

## Circular Dependencies

`circular-dependency-plugin` is configured in webpack dev config with `failOnError: false` — it warns but doesn't break the build.
