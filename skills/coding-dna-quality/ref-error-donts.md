# Error Handling — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Swallow Errors Silently

- **Anti-pattern**: `catch (e) { /* do nothing */ }`
- **Why**: Silent failures make debugging impossible.
- **Instead**: At minimum, call `notifyHandledException(error)` for Bugsnag reporting. Dispatch a FAILURE action.

## Do Not Show Raw Error Messages to Users

- **Anti-pattern**: `CapNotification.error({ message: error.stack })`
- **Why**: Stack traces are not user-friendly and may expose internals.
- **Instead**: Use i18n messages for user-facing errors. Send raw details to Bugsnag.

## Do Not Use console.error in Production

- **Anti-pattern**: `console.error('API failed', error)`
- **Why**: ESLint warns on console usage. Bugsnag captures structured errors better.
- **Instead**: `notifyHandledException(error)` for error reporting.

## Do Not Throw Errors from Reducers

- **Anti-pattern**: `throw new Error('Invalid action')` in a reducer
- **Why**: Reducers must be pure functions. Throwing crashes the Redux store.
- **Instead**: Return current state for unknown actions via `default: return state`.

## Do Not Skip Error State in Reducers

- **Anti-pattern**: Only handling SUCCESS, ignoring FAILURE
- **Why**: Components need error state to show appropriate UI (error message, retry button).
- **Instead**: Always handle the FAILURE case and set both `*Status: FAILURE` and `*Error: action.error`.
