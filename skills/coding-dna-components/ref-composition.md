# Component Composition Patterns

## Children vs Explicit Props

### Explicit Props (Dominant)

Most components use explicit props for content slots:

```javascript
// ConfirmationModal uses explicit props
<ConfirmationModal
  image={deleteIcon}
  title="Confirm Delete"
  description="Are you sure?"
  footer={<CapButton>Confirm</CapButton>}
/>
```

### Children (Generic Wrappers Only)

`children` is used only for generic container components:

```javascript
// CollapsableContent accepts children
const CollapsableContent = ({ children, isCollapsed }) => (
  <div className="collapsable-content">
    {!isCollapsed && children}
  </div>
);
```

## HOC Composition (Primary Composition Pattern)

The main composition mechanism is Higher-Order Components, applied via `compose`:

```javascript
import { compose } from 'redux';

export default compose(
  ...withSaga,       // Inject saga
  ...withReducer,    // Inject reducer
  withConnect,       // Connect to Redux store
  withRouter,        // Inject router props
)(injectIntl(withStyles(ComponentName, styles)));
```

### HOC Inventory

| HOC | Source | Purpose |
|---|---|---|
| `withStyles(Component, styles)` | `utils/withStyles.js` | Injects CSS styles |
| `withErrorBoundary(Component)` | `utils/withErrorBoundary.js` | Wraps in error boundary |
| `withDynamicLazyLoading(Component)` | `utils/withDynamicLazyLoading.js` | Lazy load with Suspense fallback |
| `injectIntl(Component)` | `react-intl` | Injects `intl` prop for i18n |
| `connect(mapState, mapDispatch)` | `react-redux` | Redux store connection |
| `injectReducer({ key, reducer })` | `utils/injectReducer.js` | Dynamic reducer injection |
| `injectSaga({ key, saga })` | `utils/injectSaga.js` | Dynamic saga injection |
| `withRouter` | `react-router-dom` | Injects history, match, location |
| `connectedRouterRedirect` | `redux-auth-wrapper` | Auth redirect HOC |

### Wrapping Order

Inside-out application:
1. `withStyles` (innermost — applies CSS)
2. `injectIntl` (adds i18n)
3. `connect` (Redux store)
4. `withRouter` (router props)
5. `injectReducer` / `injectSaga` (dynamic store injection — outermost)

## Render Helpers

Complex components extract render logic into local functions:

```javascript
const ExpiryStrategy = ({ formatMessage, data }) => {
  // Render helper function
  // NOTE: Use Cap UI components (CapRow, CapColumn, CapLabel, CapHeading)
  // instead of native HTML elements (div, span, p, h1-h6)
  const renderHeader = () => (
    <CapRow className="header">
      <CapHeading>{formatMessage(messages.title)}</CapHeading>
      <CapInput
        onChange={handleSearchValueChange}
        placeholder={formatMessage(messages.search)}
      />
    </CapRow>
  );

  const renderTable = () => (
    <CapTable
      columns={columns}
      dataSource={data}
    />
  );

  return (
    <CapRow className="expiry-strategy">
      {renderHeader()}
      {renderTable()}
    </CapRow>
  );
};
```

## React.Children.toArray for Lists

When rendering arrays with mixed content:

```javascript
return React.Children.toArray(
  channels.map(({ channelType, content }, index) => (
    <>
      <FlexContainer>
        {/* content */}
      </FlexContainer>
      {channels.length - 1 !== index && (
        <CapDivider className="row-inner-divider" />
      )}
    </>
  )),
);
```

`React.Children.toArray` auto-assigns keys, avoiding the manual `key` prop on fragments.

## Compound Components

**Not widely used.** The codebase prefers flat composition with explicit props over compound component patterns like `Tab.Panel` or `Accordion.Item`. Ant Design's compound components (e.g., `Menu.Item`, `Select.Option`) are used as-is.

See also: [[04-components/anatomy]], [[04-components/conditional-rendering]]
