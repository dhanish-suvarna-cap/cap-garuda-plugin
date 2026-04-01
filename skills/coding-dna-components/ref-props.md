# Props Patterns

## Destructuring in Signature (Always)

Every component destructures props directly in the function signature:

```javascript
const SuggestionCard = ({
  isLoading,
  title,
  className,
  content,
  intl: { formatMessage },
}) => {
  // ...
};
```

Nested destructuring of `intl` is the standard pattern for accessing `formatMessage`.

## Default Props

Always defined as a static property, BEFORE propTypes:

```javascript
PrimaryInput.defaultProps = {
  className: '',
  label: '',
  inductiveText: '',
  placeholder: '',
  value: '',
  inputType: '',
};

PrimaryInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  // ...
};
```

### Default Values for Common Props

| Prop | Default | Why |
|---|---|---|
| `className` | `''` | Prevents undefined in classnames |
| String props | `''` | Safe rendering |
| Array props | `[]` | Safe `.map()` |
| Object props | `{}` | Safe destructuring |
| Boolean props | `false` | Explicit falsy |
| Function props | (often not defaulted) | Caller responsibility |

## Props Passing Patterns

### Spread Props (Rare)

```javascript
// Only for route/wrapper components
<RenderRoute {...rest} />
```

### Explicit Passing (Dominant)

```javascript
<ToastrMessage
  key={message.messageId}
  timeout={message.type !== 'error' && timeout}
  title={message.title}
  text={message.message}
  type={message.type}
/>
```

### Callback Props with Data

```javascript
// Parent passes handler
<ExpiryRow
  onEditClick={rowData => onOptionClick(EDIT, rowData)}
  onViewClick={rowData => setExpiryConditionData(rowData)}
/>

// Child calls with data
<CapButton onClick={() => onEditClick(rowData)}>Edit</CapButton>
```

### Redux Callback Pattern

```javascript
// In saga, callback is invoked with API response
export function* uploadBulkConfig({ bulkConfigFile, callback }) {
  const res = yield call(Api.uploadBulkConfig, { bulkConfigFile });
  if (callback) callback(res);
}

// Component dispatches action with callback
dispatch(uploadBulkConfig(file, (response) => {
  if (response.success) showSuccess();
}));
```

## ClassName Prop Convention

Every component that renders visible UI accepts a `className` prop:

```javascript
const AvatarIcon = ({ text, className }) => (
  <div className={classnames('avatar-icon', className)}>
    {text}
  </div>
);

AvatarIcon.propTypes = {
  className: PropTypes.string,
};

AvatarIcon.defaultProps = {
  className: '',
};
```

This allows parent components to add styles via styled-components or additional classes.

## intl Prop Pattern

Components using i18n receive `intl` via `injectIntl` HOC:

```javascript
const Component = ({ intl: { formatMessage } }) => (
  <span>{formatMessage(messages.title)}</span>
);

Component.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(withStyles(Component, styles));
```

See also: [[04-components/anatomy]], [[02-code-style/naming]]
