# Test Mocking Patterns

## API Mocking: MSW (Mock Service Worker)

Used for integration tests to intercept HTTP requests:

```javascript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('/loyalty/api/v1/programs', (req, res, ctx) => {
    return res(ctx.json({ success: true, result: mockPrograms }));
  }),
  rest.post('/loyalty/api/v1/programs', (req, res, ctx) => {
    return res(ctx.json({ success: true, result: { id: '123' } }));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Module Mocking: jest.mock

### Cap-UI-Utils Mock

```javascript
jest.mock('@capillarytech/cap-ui-utils', () => ({
  GA: {
    initialize: jest.fn(),
    setCustomDimension: jest.fn(),
  },
}));
```

### Global Module Mocks (in `__mocks__/`)

| Mock File | Mocks |
|---|---|
| `__mocks__/fileMock.js` | Image/file imports → `'test-file-stub'` |
| `__mocks__/styleMock.js` | CSS/LESS/SCSS imports → `{}` |
| `__mocks__/moduleMocks.js` | Various module overrides |
| `__mocks__/newRelicMock.js` | New Relic browser agent |
| `__mocks__/registerContext.js` | require.context polyfill for tests |

## Function Mocking: jest.fn()

```javascript
const mockCallback = jest.fn();
const mockDispatch = jest.fn();

// In component props
const wrapper = mount(
  <Component
    onSave={mockCallback}
    dispatch={mockDispatch}
  />
);

// Assert
expect(mockCallback).toHaveBeenCalledWith(expectedArgs);
expect(mockCallback).toHaveBeenCalledTimes(1);
```

## Redux Store Mocking

```javascript
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
  createTracker: fromJS({
    getExtendedFieldStatus: null,
    extendedFields: [],
  }),
});
```

## Saga Mocking: redux-saga-test-plan

```javascript
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

it('should handle getExtendedFields', () => {
  return expectSaga(getExtendedFields, { extendedField: 'custom', programId: '123' })
    .provide([
      [matchers.call.fn(Api.getExtendedFields), { success: true, result: mockData }],
    ])
    .put({ type: types.GET_EXTENDED_FIELDS_SUCCESS, result: mockData })
    .run();
});
```

## Setup/Teardown

### Standard Pattern

```javascript
beforeEach(() => {
  server.listen();
  localStorage.clear();
  localStorage.setItem('token', true);
});

afterAll(() => {
  server.resetHandlers();
  server.close();
  jest.resetAllMocks();
  delete window?.capAuth;
});
```

### Enzyme Setup

Configured globally in `internals/testing/enzyme-setup.js`:
```javascript
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });
```

## Snapshot Testing

Used for reducers and simple components:

```javascript
// Reducer snapshots
it('returns the initial state', () => {
  expect(reducer(undefined, {})).toMatchSnapshot();
});

// Component snapshots (via enzyme-to-json)
it('matches snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
```

See also: [[09-testing/approach]], [[09-testing/test-data]]
