# State — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Use React Query or SWR

- **Anti-pattern**: `const { data } = useQuery('key', fetchFn)`
- **Why**: Server state is managed through Redux-Saga. Mixing approaches creates two sources of truth.
- **Instead**: Dispatch a `*_REQUEST` action, handle in saga, read from Redux store via selectors.

## Do Not Mutate Immutable.js State

- **Anti-pattern**: `state.extendedFields = newData` or `state.set('field', value)` without returning
- **Why**: Reducers use Immutable.js. Direct mutation breaks the Redux contract.
- **Instead**: Always return: `return state.set('field', value)`

## Do Not Create Global State for Single-Component Data

- **Anti-pattern**: Redux reducer + saga for data used by only one component
- **Why**: Unnecessary complexity. Local state or Context is simpler.
- **Instead**: `useState` for single-component state. Context for feature-wide state.

## Do Not Skip the Three-State Pattern

- **Anti-pattern**: Only dispatching SUCCESS without REQUEST/FAILURE
- **Why**: Loading and error states are tracked via status fields. Missing REQUEST means no loading indicator.
- **Instead**: Always implement REQUEST → SUCCESS/FAILURE for every async operation.

## Do Not Store Derived State

- **Anti-pattern**: Putting computed values in Redux state
- **Why**: Derived state should be computed via Reselect selectors or `useMemo`.
- **Instead**: Use `createSelector` for Redux-derived values, `useMemo` for prop-derived values.

## Do Not Use Redux Toolkit

- **Anti-pattern**: `createSlice`, `createAsyncThunk`, RTK Query
- **Why**: The codebase uses vanilla Redux + Immutable.js + Redux-Saga. RTK is a different paradigm.
- **Instead**: Follow the existing `constants.js` + `actions.js` + `reducer.js` + `saga.js` + `selectors.js` pattern.

---

> useSelector/useDispatch rule: see `coding-dna-components/ref-component-donts.md`
