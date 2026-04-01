# Global State (Redux)

## Architecture

- **Store**: Configured via `@capillarytech/vulcan-react-sdk/utils` `configureStore`
- **Immutability**: All state is Immutable.js Maps/Lists
- **Selectors**: Reselect for memoized access
- **Side Effects**: Redux-Saga
- **Dynamic Injection**: Reducers and sagas injected at component mount time

## Reducer Pattern

```javascript
// reducer.js
import { fromJS } from 'immutable';
import * as types from './constants';
import { REQUEST, SUCCESS, FAILURE } from 'config/constants';

export const initialState = fromJS({
  getExtendedFieldStatus: null,
  extendedFields: [],
  getExtendedFieldError: null,
  upsertTrackerStrategyStatus: null,
  upsertTrackerStrategyError: null,
});

const CreateTrackerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_EXTENDED_FIELDS_REQUEST:
      return state
        .set('getExtendedFieldStatus', REQUEST)
        .set('extendedFields', fromJS([]))
        .set('getExtendedFieldError', null);

    case types.GET_EXTENDED_FIELDS_SUCCESS:
      return state
        .set('getExtendedFieldStatus', SUCCESS)
        .set('extendedFields', action.result);

    case types.GET_EXTENDED_FIELDS_FAILURE:
      return state
        .set('getExtendedFieldStatus', FAILURE)
        .set('getExtendedFieldError', action.error);

    default:
      return state;
  }
};

export default CreateTrackerReducer;
```

### Key Patterns

1. **Immutable.js** — state is created with `fromJS()`, updated with `.set()`
2. **Three-state async** — Every API operation has `REQUEST`, `SUCCESS`, `FAILURE`
3. **Status + Error fields** — Each async operation tracks `*Status` and `*Error`
4. **Default action** — `action = {}` prevents undefined destructuring
5. **Initial state exported** — Used by selectors as fallback

## Constants Pattern

```javascript
// constants.js
export const GET_EXTENDED_FIELDS_REQUEST = 'createTracker/GET_EXTENDED_FIELDS_REQUEST';
export const GET_EXTENDED_FIELDS_SUCCESS = 'createTracker/GET_EXTENDED_FIELDS_SUCCESS';
export const GET_EXTENDED_FIELDS_FAILURE = 'createTracker/GET_EXTENDED_FIELDS_FAILURE';
```

Format: `domainName/VERB_NOUN_STATUS`

## Actions Pattern

```javascript
// actions.js
import * as types from './constants';

export const getExtendedFields = (extendedField, programId, callback) => ({
  type: types.GET_EXTENDED_FIELDS_REQUEST,
  extendedField,
  programId,
  callback,
});
```

**Callback pattern**: Actions accept a `callback` parameter that sagas invoke after API response.

## Selectors Pattern

```javascript
// selectors.js
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

const selectCreateTrackerDomain = (state = fromJS({})) =>
  state.get('createTracker', initialState);

const makeSelectExtendedFields = () =>
  createSelector(selectCreateTrackerDomain, (substate = fromJS({})) => ({
    extendedFields: substate && substate.get('extendedFields'),
    getExtendedFieldStatus: substate && substate.get('getExtendedFieldStatus'),
  }));

export {
  selectCreateTrackerDomain,
  makeSelectExtendedFields,
};
```

### Selector Conventions

1. **Domain selector**: `selectXxxDomain` — gets the slice from root state
2. **Factory selectors**: `makeSelectXxx()` — returns a new selector instance (for `createStructuredSelector`)
3. **Immutable → JS**: Selectors call `.get()` to extract values from Immutable.js

## Connecting Components

```javascript
const mapStateToProps = createStructuredSelector({
  extendedFieldsData: makeSelectExtendedFields(),
  upsertData: makeSelectUpsertTrackersStrategy(),
});

const mapDispatchToProps = dispatch => ({
  getExtendedFields: (field, id, cb) =>
    dispatch(actions.getExtendedFields(field, id, cb)),
  upsertTrackerStrategy: (payload, cb) =>
    dispatch(actions.upsertTrackerStrategy(payload, cb)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// Dynamic injection
const withSaga = [{ key: 'createTracker', saga }].map(injectSaga);
const withReducer = [{ key: 'createTracker', reducer }].map(injectReducer);

export default compose(
  ...withSaga,
  ...withReducer,
  withConnect,
)(injectIntl(withStyles(CreateTracker, styles)));
```

## Initial Root Reducer

```javascript
// initialReducer.js
export const initialReducer = {
  language: CapLanguageProviderReducer,
  navigationConfig: CapCollapsibleLeftNavigationReducer,
  [AIRA_REDUCER_DOMAIN]: askAiraReducer,
  loyaltyCap: capReducer,
};
```

Feature reducers are dynamically injected via `injectReducer` when components mount.

See also: [[05-state/decision-tree]], [[05-state/server-state]], [[06-api/client-setup]]
