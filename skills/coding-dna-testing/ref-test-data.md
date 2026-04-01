# Test Data Patterns

## Mock Data Files

Each component's test directory can have a `mockData.js` file:

```javascript
// ComponentName/tests/mockData.js
export const mockInitialState = fromJS({
  getExtendedFieldStatus: null,
  extendedFields: [],
});

export const mockResponse = {
  success: true,
  result: {
    custom: [
      { id: 1, name: 'Field 1', type: 'STRING' },
      { id: 2, name: 'Field 2', type: 'NUMBER' },
    ],
  },
};

export const mockTrackerData = {
  trackerId: '123',
  trackerName: 'Test Tracker',
  trackerType: 'STANDARD',
};
```

## Data Patterns

### Inline Data (Simple Tests)

```javascript
it('should render with props', () => {
  const props = {
    title: 'Test Title',
    description: 'Test Description',
    isActive: true,
  };
  render(<Component {...props} />);
});
```

### Factory-Like Objects (Complex Tests)

```javascript
// In mockData.js
export const createMockProgram = (overrides = {}) => ({
  programId: '123',
  programName: 'Test Program',
  status: 'ACTIVE',
  ...overrides,
});

// In test
const program = createMockProgram({ status: 'DRAFT' });
```

### Redux State Fixtures

```javascript
export const mockStoreState = {
  createTracker: fromJS({
    extendedFields: [],
    getExtendedFieldStatus: 'SUCCESS',
  }),
  loyaltyCap: fromJS({
    programs: [{ id: '1', name: 'Program 1' }],
  }),
};
```

### MSW Handlers per Feature

```javascript
// tests/integration/CreateProgram/handlers.js
export const handlers = [
  rest.get('*/programs', (req, res, ctx) => {
    return res(ctx.json(mockProgramsResponse));
  }),
  rest.post('*/programs', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
];
```

## Integration Test Utilities

```javascript
// tests/test-utils.js
export const renderWithProviders = (ui, { preloadedState, store, ...options } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store || configureTestStore(preloadedState)}>
      <Router history={history}>
        <IntlProvider locale="en" messages={messages}>
          {children}
        </IntlProvider>
      </Router>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};
```

See also: [[09-testing/approach]], [[09-testing/mocking]]
