# Testing — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Test Implementation Details

- **Anti-pattern**: Testing internal state values, instance methods, or private functions
- **Why**: Tests should verify behavior, not internals. Fragile tests break on refactors.
- **Instead**: Test what the user sees (rendered output) and what the system produces (dispatched actions, API calls).

## Do Not Use Enzyme for New Tests

- **Anti-pattern**: `shallow(<Component />)` or `mount(<Component />)` for new code
- **Why**: Enzyme is legacy. React Testing Library is the modern standard in this codebase.
- **Instead**: Use `render(<Component />)` from `@testing-library/react`.

## Do Not Mock Everything

- **Anti-pattern**: Mocking Redux store, router, intl, and every child component
- **Why**: Over-mocking makes tests pass trivially without verifying real behavior.
- **Instead**: Use real Redux store + MSW for API mocking. Mock only what you can't control (third-party services).

## Do Not Write Tests Without Cleanup

- **Anti-pattern**: Missing `afterAll` or `afterEach` cleanup
- **Why**: Test pollution causes flaky tests. Leaked intervals, listeners, or store state break other tests.
- **Instead**: Always clean up: `server.close()`, `jest.resetAllMocks()`, `localStorage.clear()`.

## Do Not Skip Mock Data Files

- **Anti-pattern**: Huge inline mock objects in test files
- **Why**: Makes tests unreadable and duplicates data across tests.
- **Instead**: Create `tests/mockData.js` and import shared fixtures.
