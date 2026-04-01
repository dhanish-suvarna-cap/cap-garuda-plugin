# User Error Feedback

## Decision Table: Which Error UI When

| Scenario | Feedback Method | Component |
|---|---|---|
| API call fails (server error) | Toast notification (red) | `CapNotification.error` |
| API call fails (client error) | Toast notification (blue) | `CapNotification.info` |
| Form validation fails | Inline error + border | `className="error-border"` + `<CapError>` |
| Page-level render error | Error boundary fallback | `ErrorBoundaryWrapper` |
| Data fetch returns empty | Empty state illustration | `LdsNoDataState` |
| Data fetch is loading | Skeleton placeholder | `CustomSkeleton` / `CenteredSkeleton` |
| Permission denied | Full page | `PermissionDeniedPage` |
| Route not found | 404 page | `NotFoundPage` |
| Session expired (401) | Redirect to login | Automatic via `redirectIfUnauthenticated` |

## Toast Notifications

```javascript
// Success
CapNotification.success({ message: 'Program created successfully' });

// Info (4xx errors)
CapNotification.info({ message: 'Please check your input' });

// Error (5xx errors)
CapNotification.error({ message: 'Server error. Please try again.' });
```

Toasts auto-dismiss. Error toasts persist until manually closed.

## Skeleton Loading

```javascript
// Title skeleton
<CustomSkeleton isTitle height="3.286rem" />

// Content skeleton
<CustomSkeleton height="200px" width="100%" />

// Centered full-page skeleton
<CenteredSkeleton width="90vw" height="90vh" />
```

Used as Suspense fallback and during REQUEST status.

## Toaster Component

Custom `ToastrMessage` component with auto-dismiss timer:

```javascript
<Toaster timeout={5000}>
  {messagesList.map(message => (
    <ToastrMessage
      key={message.messageId}
      timeout={message.type !== 'error' && timeout}
      title={message.title}
      text={message.message}
      type={message.type}
    />
  ))}
</Toaster>
```

See also: [[10-error-handling/strategy]], [[10-error-handling/error-types]]
