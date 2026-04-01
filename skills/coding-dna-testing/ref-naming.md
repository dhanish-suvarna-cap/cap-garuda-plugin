# Test Naming Conventions

## File Naming

| Type | Pattern | Example |
|---|---|---|
| Component test | `ComponentName.test.js` | `DifferentDestinationPrograms.test.js` |
| Reducer test | `reducer.test.js` | `reducer.test.js` |
| Saga test | `saga.test.js` | `saga.test.js` |
| Selector test | `selectors.test.js` | `selectors.test.js` |
| Action test | `actions.test.js` | `actions.test.js` |
| Integration test | `FeatureName.integration.test.js` | `CreateProgram.integration.test.js` |
| Mock data | `mockData.js` | `mockData.js` |

## Describe/It Convention

### Component Tests

```javascript
describe('<CreateTracker />', () => {
  it('should render the component', () => {
    // ...
  });

  it('handle valid response from api', () => {
    // ...
  });

  it('should show error when tracker name exists', () => {
    // ...
  });
});
```

- **describe**: Component name in angle brackets `<ComponentName />`
- **it**: Starts with lowercase, describes behavior (NOT implementation)
- **Past tense** or **should** pattern: "should render", "handle valid response"

### Reducer Tests

```javascript
describe('CreateTrackerReducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('handles GET_EXTENDED_FIELDS_REQUEST', () => {
    expect(
      reducer(initialState, { type: types.GET_EXTENDED_FIELDS_REQUEST })
    ).toMatchSnapshot();
  });
});
```

### Saga Tests

```javascript
describe('CreateTracker saga', () => {
  it('should dispatch success action on successful API call', () => {
    // ...
  });

  it('should dispatch failure action on API error', () => {
    // ...
  });
});
```

### Integration Tests

```javascript
describe('Create Program Integration', () => {
  beforeEach(() => {
    server.listen();
    localStorage.clear();
    localStorage.setItem('token', true);
  });

  afterAll(() => {
    server.resetHandlers();
    server.close();
    jest.resetAllMocks();
  });

  it('should complete full program creation flow', async () => {
    // ...
  });
});
```

See also: [[09-testing/approach]], [[09-testing/mocking]]
