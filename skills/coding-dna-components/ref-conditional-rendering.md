# Conditional Rendering Patterns

## Early Return (For Loading/Error States)

Used at the top of render to short-circuit:

```javascript
const ActionExpression = ({ actionInfoStatus, title }) => {
  if (actionInfoStatus?.[title] === REQUEST) {
    return <CustomSkeleton isTitle height="3.286rem" />;
  }

  // Main render...
  return <div>...</div>;
};
```

## Ternary Operator (For Two-Branch Rendering)

Most common pattern for toggling between two UI states:

```javascript
// Show/hide based on state
{isLoading ? (
  <CustomSkeleton height="200px" />
) : (
  <DataTable data={items} />
)}

// Text content switching
{title ? <span className="messageTitle">{title}</span> : ''}

// Component variant
{isEditable ? (
  <CapInput value={value} onChange={handleChange} />
) : (
  <span>{value}</span>
)}
```

## Logical AND (For Single-Branch Rendering)

Used when there's no else case:

```javascript
// Show only when condition is true
{typeof deleteAction === 'function' && !isScope && (
  <CapRow onClick={deleteAction}>
    <CapImage className="pointer-cursor" src={deleteIcon} />
  </CapRow>
)}

// Show divider only between items (not after last)
{channels.length - 1 !== index && (
  <CapDivider className="row-inner-divider" />
)}
```

## Switch Statement (For Multiple Variants)

Used in render helpers with many possible states:

```javascript
const getInput = inputType => {
  switch (inputType) {
    case NUMBER:
      return <NumberInput />;
    case TEXT:
      return <TextInput />;
    case DATE:
      return <DatePicker />;
    default:
      return null;
  }
};
```

Also used for complex header rendering:

```javascript
const Header = () => {
  switch (true) {
    case isScope:
      return <ScopeHeader />;
    case isEditing:
      return <EditHeader />;
    default:
      return <ViewHeader />;
  }
};
```

## When to Use Which

| Pattern | Use When | Example |
|---|---|---|
| Early return | Loading, error, or empty states at top | `if (status === REQUEST) return <Skeleton />` |
| Ternary | Exactly two alternatives | `{isEdit ? <Input /> : <Text />}` |
| `&&` operator | Show/hide single element | `{hasPermission && <DeleteButton />}` |
| Switch | 3+ variants based on same variable | `switch(status) { case A: ... case B: ... }` |
| Render helper function | Complex conditional with its own logic | `const renderHeader = () => { ... }` |

## Auth-Based Conditional

```javascript
// From RoleBasedAuth.js
if (!enabledRBACConfigurations.includes(config)) {
  return <RenderRoute {...rest} />;
}
return enabledRBACConfigurations.includes(permission)
  ? <RenderRoute {...rest} />
  : <PermissionDeniedPage />;
```

See also: [[04-components/anatomy]], [[04-components/composition]]
