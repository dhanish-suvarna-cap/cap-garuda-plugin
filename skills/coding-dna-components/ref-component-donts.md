# Components — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Use Class Components

- **Anti-pattern**: `class Component extends React.Component`
- **Why**: All new components are functional with hooks. Class components exist only in legacy code.
- **Instead**: `const Component = (props) => { ... }`

## Do Not Skip the withStyles HOC

- **Anti-pattern**: Exporting a component without `withStyles` wrapping
- **Why**: `withStyles` is how styled-components CSS is injected. Without it, `style.js` has no effect.
- **Instead**: `export default withStyles(Component, styles)` — or `injectIntl(withStyles(Component, styles))` if using i18n.

## Do Not Put Logic in index.js

- **Anti-pattern**: `index.js` containing component code, imports, or logic
- **Why**: Barrel files are for clean re-exports only.
- **Instead**: `export { default } from './ComponentName'` — nothing else.

## Do Not Use useEffect for Data Fetching

- **Anti-pattern**: `useEffect(() => { fetch('/api/...').then(...) }, [])`
- **Why**: The codebase uses Redux-Saga for all API calls. Direct fetching bypasses the centralized error handling, loading states, and caching.
- **Instead**: Dispatch a `*_REQUEST` action. Handle the API call in a saga. Read results from Redux store via selectors.

## Do Not Create Components Without PropTypes

- **Anti-pattern**: A component file with no `Component.propTypes = { ... }`
- **Why**: PropTypes are the only type documentation in this JavaScript codebase.
- **Instead**: Define `propTypes` and `defaultProps` for every component.

## Do Not Use forwardRef Without Reason

- **Anti-pattern**: Adding `forwardRef` to a component that doesn't need ref access
- **Why**: The codebase rarely uses refs. HOC composition handles most needs.
- **Instead**: Only use `forwardRef` when a parent genuinely needs imperative access to a DOM element.

## Do Not Nest Components Inside Components

- **Anti-pattern**: Defining a component inside another component's render
- **Why**: Creates a new component instance every render, breaking React's reconciliation.
- **Instead**: Extract to a separate component or use a render helper function (not a component).

## Do Not Mix HOCs and Hooks Inconsistently

- **Anti-pattern**: Using `useSelector`/`useDispatch` in a component that's also wrapped with `connect`
- **Why**: The codebase uses `connect` + `mapStateToProps` pattern consistently.
- **Instead**: Stick with `connect` + `createStructuredSelector` for Redux-connected components.
