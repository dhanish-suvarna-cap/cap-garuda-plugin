# Error Types & Shapes

## Frontend Error Shapes

### API Response Error

```javascript
{
  success: false,
  code: 400,
  message: 'Validation failed',
  errors: [{ field: 'name', message: 'Name is required' }],
  status: { code: 400, message: 'Bad Request' }
}
```

### Network/Timeout Error

```javascript
{
  message: 'Request timeout',
  errorLocation: 'https://app.example.com/loyalty/ui/programs'
}
```

### JavaScript Error

Standard `Error` object thrown in catch blocks:
```javascript
const error = new Error(response.statusText);
error.response = response;
throw error;
```

## Backend Error Class

`api/src/helpers/APIError.js`:

Custom error class for backend API errors with structured error data.

## Redux Error Shape

Stored in state as string or object:

```javascript
// In reducer
case types.GET_DATA_FAILURE:
  return state
    .set('status', FAILURE)
    .set('error', action.error);  // string message or error object

// Error extraction in saga
error: res?.status?.message || res?.message || res?.error
```

## Error Status Codes

| Code | Frontend Handling |
|---|---|
| 200-299 | Success path |
| 400 | Pass through → business logic → info notification |
| 401 | Auto-redirect to login |
| 403 | Pass through → info notification |
| 404 | Pass through → info notification |
| 409 | Pass through → conflict handling |
| 412 | Pass through → precondition handling |
| 422 | Pass through → validation error display |
| 500 | Pass through → error notification |
| Timeout | Reject with timeout message |

See also: [[10-error-handling/strategy]], [[10-error-handling/user-feedback]]
