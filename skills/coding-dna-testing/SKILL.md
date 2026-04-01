---
description: Capillary UI coding DNA — testing approach, mocking, naming, test data, coverage
triggers:
  - "test approach"
  - "test strategy"
  - "mocking"
  - "MSW"
  - "mock service worker"
  - "redux-saga-test-plan"
  - "test naming"
  - "test data"
  - "mockData"
  - "jest config"
  - "integration test"
  - "test coverage"
  - "renderWithProviders"
  - "enzyme"
---

# Coding DNA: Testing

Capillary-wide standards for testing approach, mocking strategies, naming, and test data organization.

## Testing Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Jest | 27.5 | Test runner + assertions |
| React Testing Library | 13.4 | Component testing (preferred) |
| Enzyme | 3.7 | Legacy component testing (don't use for new) |
| MSW | 0.36.8 | API mocking for integration tests |
| redux-saga-test-plan | 3.7 | Saga testing |
| redux-mock-store | - | Store mocking |
| sinon | - | Spy/stub (backend tests) |

## Test Types

| Type | Config | Files | Command |
|------|--------|-------|---------|
| Unit | jest.unit.config.js | `*.test.js` | `npm test` |
| Integration | jest.integration.config.js | `*.integration.test.js` | `npm run test:integration` |

## What Gets Tested

| Item | Test File | Key Assertions |
|------|----------|---------------|
| Component | Component.test.js | Renders, interactions, states |
| Reducer | reducer.test.js | Initial state, every switch case |
| Saga | saga.test.js | Success/failure/error paths |
| Selectors | selectors.test.js | Correct data extraction |
| Actions | actions.test.js | Correct type + payload |
| Utils | utils.test.js | Input/output correctness |
| Integration | Feature.integration.test.js | Full user flow |

## Component Testing (React Testing Library)

```js
import React from 'react';
import { renderWithProviders, screen, fireEvent } from 'app/utils/test-utils';
// OR for integration tests:
// import { renderWithProviders } from '../testUtils';

describe('<MyComponent />', () => {
  it('should render the component', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText('Expected')).toBeInTheDocument();
  });

  it('should handle loading state', () => {
    renderWithProviders(<MyComponent loading={true} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should handle valid response from api', () => {
    renderWithProviders(<MyComponent data={mockData} />);
    expect(screen.getByText('Data Item')).toBeInTheDocument();
  });
});
```

## Reducer Testing

```js
import reducer, { initialState } from '../reducer';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, CLEAR } from '../constants';

describe('MyReducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles FETCH_REQUEST', () => {
    const result = reducer(initialState, { type: FETCH_REQUEST });
    expect(result.get('loading')).toBe(true);
  });

  it('handles FETCH_SUCCESS', () => {
    const data = [{ id: 1 }];
    const result = reducer(initialState, { type: FETCH_SUCCESS, payload: data });
    expect(result.get('data').toJS()).toEqual(data);
  });

  it('handles FETCH_FAILURE', () => {
    const error = 'Error';
    const result = reducer(initialState, { type: FETCH_FAILURE, error });
    expect(result.get('error')).toEqual(error);
  });

  it('handles CLEAR', () => {
    const dirty = initialState.set('data', fromJS([{ id: 1 }]));
    expect(reducer(dirty, { type: CLEAR })).toEqual(initialState);
  });
});
```

## Saga Testing (redux-saga-test-plan)

```js
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as Api from 'services/api';
import { fetchWorker } from '../saga';
import { fetchSuccess, fetchFailure } from '../actions';

jest.mock('utils/bugsnag', () => ({ notifyHandledException: jest.fn() }));

describe('fetchWorker saga', () => {
  it('should dispatch success action', () =>
    expectSaga(fetchWorker, { payload: mockPayload })
      .provide([[matchers.call.fn(Api.fetchData), { success: true, data: mockData }]])
      .put(fetchSuccess(mockData))
      .run()
  );

  it('should dispatch failure action', () =>
    expectSaga(fetchWorker, { payload: mockPayload })
      .provide([[matchers.call.fn(Api.fetchData), { success: false, errors: ['Error'] }]])
      .put(fetchFailure(['Error']))
      .run()
  );

  it('should handle exception', () =>
    expectSaga(fetchWorker, { payload: mockPayload })
      .provide([[matchers.call.fn(Api.fetchData), throwError(new Error('Network'))]])
      .put(fetchFailure(expect.any(Error)))
      .run()
  );
});
```

## Mocking Strategies

### API Mocking (MSW for integration tests)
```js
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('/api/v1/programs', (req, res, ctx) =>
    res(ctx.json({ success: true, result: mockPrograms }))
  ),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Module Mocking
```js
// Global mocks in __mocks__/
jest.mock('utils/bugsnag', () => ({ notifyHandledException: jest.fn() }));
jest.mock('@capillarytech/cap-ui-utils/withStyles', () => (comp) => comp);
```

### Function Mocking
```js
const mockCallback = jest.fn();
fireEvent.click(button);
expect(mockCallback).toHaveBeenCalledWith(expectedArgs);
expect(mockCallback).toHaveBeenCalledTimes(1);
```

## Test File Naming

| File | Naming |
|------|--------|
| Component test | `ComponentName.test.js` |
| Reducer test | `reducer.test.js` |
| Saga test | `saga.test.js` |
| Selector test | `selectors.test.js` |
| Mock data | `mockData.js` |
| Integration test | `FeatureName.integration.test.js` |

## Test Data Organization

```js
// tests/mockData.js
export const mockPrograms = [{ id: 1, name: 'Test Program' }];
export const mockStoreState = fromJS({ data: mockPrograms, loading: false, error: null });
export const createMockProgram = (overrides = {}) => ({ id: 1, name: 'Default', ...overrides });
```

## Do-Nots

- Don't test implementation details — test behavior
- Don't use Enzyme for new tests — use React Testing Library
- Don't mock everything — use real Redux + MSW for integration
- Don't skip cleanup — always use afterAll/afterEach
- Don't write huge inline mock objects — use mockData.js files

## Reference Files

- `ref-approach.md` — Full testing strategy, Jest config, coverage thresholds
- `ref-mocking.md` — MSW, jest.mock, redux-mock-store, saga mocking
- `ref-naming.md` — Describe/it conventions, file naming
- `ref-test-data.md` — Mock data organization, factories, fixtures
- `ref-testing-donts.md` — Testing anti-patterns
