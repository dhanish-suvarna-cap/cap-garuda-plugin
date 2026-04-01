# Testing Approach

## Frameworks & Libraries

| Tool | Version | Purpose |
|---|---|---|
| Jest | ^27.5.1 | Test runner + assertion library |
| React Testing Library | ^13.4.0 | Component rendering + queries |
| Enzyme | 3.7.0 | Component testing (legacy, still in use) |
| enzyme-to-json | 3.3.4 | Snapshot serialization |
| MSW | ^0.36.8 | API mocking (Mock Service Worker) |
| redux-saga-test-plan | ^3.7.0 | Saga testing |
| redux-mock-store | ^1.5.3 | Redux store mocking |
| @testing-library/user-event | ^13.5.0 | User interaction simulation |
| jest-styled-components | 6.2.2 | Styled-components testing |
| mockdate | ^3.0.5 | Date mocking |
| sinon | 3.3.0 | API backend mocking |

## Test Types

### Unit Tests (Primary)

- **Config**: `webapp/internals/testing/jest.unit.config.js`
- **Command**: `npm test`
- **Coverage output**: `reports/coverage/unit`
- **Environment**: jsdom
- Tests for: Components, reducers, sagas, selectors, actions, utils

### Integration Tests

- **Config**: `webapp/internals/testing/jest.integration.config.js`
- **Command**: `npm run test:integration`
- **Coverage output**: `reports/coverage/integration`
- **Match pattern**: `*.integration.test.js`
- Tests for: Full feature flows with Redux store, router, and MSW API mocking

## What Gets Tested

| Layer | What's Tested | How |
|---|---|---|
| Components | Rendering, user interactions | React Testing Library + Enzyme |
| Reducers | State transitions per action type | Direct reducer calls + snapshot |
| Sagas | Side effect flows | redux-saga-test-plan |
| Selectors | Memoized data derivation | Direct selector calls |
| Actions | Action creator output | Direct calls + equality checks |
| Utils | Pure function logic | Direct calls |
| Integration | Full user flows | RTL + MSW + real Redux store |

## Jest Configuration Highlights

```javascript
// Modules resolve from 'app/' directory (mirrors webpack)
moduleDirectories: ['node_modules', 'app'],

// Snapshot serialization for Enzyme
snapshotSerializers: ['enzyme-to-json/serializer'],

// Clear and reset mocks between tests
clearMocks: true,
resetMocks: true,

// Globals available in all tests
globals: {
  NODE_ENV: 'test',
  CURRENT_APP_NAME: 'LoyaltyUI',
},

// Module name mapping for non-JS imports
moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
},
```

## Coverage

- Coverage collected automatically on test runs
- Path ignoring: `node_modules/`, integration tests, mock files, style files, `library-build/`
- Backend has coverage thresholds: 50% statements, branches, functions, lines
- Frontend has no enforced thresholds but collects coverage

## Test File Location

Tests are colocated with source code:

```
ComponentName/
├── ComponentName.js
├── tests/
│   ├── ComponentName.test.js
│   ├── reducer.test.js
│   ├── saga.test.js
│   ├── selectors.test.js
│   ├── actions.test.js
│   └── mockData.js
```

Integration tests live in a separate directory:
```
webapp/app/tests/integration/
├── commonMocks/
├── CreateProgram/
├── EditProgram/
├── Login/
├── Promotion/
└── Versioning/
```

See also: [[09-testing/naming]], [[09-testing/mocking]], [[09-testing/test-data]]
