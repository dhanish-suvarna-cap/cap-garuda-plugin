# Tech Stack

## Core Frontend Stack (All Capillary UI Repos)

| Category | Technology | Notes |
|---|---|---|
| **UI Framework** | React 18 | Functional components + hooks |
| **UI Library** | Ant Design (antd) | v3.x — legacy but standard |
| **Component Library** | @capillarytech/cap-ui-library | Capillary design system |
| **Utility Library** | @capillarytech/cap-ui-utils | Shared utilities (loadable, GA, etc.) |
| **Platform SDK** | @capillarytech/vulcan-react-sdk | Store config, navigation, i18n |
| **State Management** | Redux | Vanilla Redux (NOT Redux Toolkit) |
| **Side Effects** | Redux-Saga | Generator-based async flows |
| **Immutability** | Immutable.js | All Redux state is Immutable Maps/Lists |
| **Selectors** | Reselect | Memoized state derivation |
| **Routing** | React Router v5 | With connected-react-router |
| **Styling** | styled-components | CSS-in-JS with `withStyles` HOC |
| **Internationalization** | react-intl | `defineMessages` + `formatMessage` |
| **Translation SaaS** | Locize | Remote translation management |
| **HTTP Client** | Native fetch | Via whatwg-fetch polyfill, NOT axios |
| **Utility Library** | Lodash | Per-method imports only |
| **Date Library** | Moment.js | With moment-timezone |
| **Type Checking** | PropTypes | NO TypeScript |
| **Bundler** | Webpack 5 | With Module Federation |
| **Transpiler** | Babel 7 | With esbuild-loader for speed |
| **Linter** | ESLint (Airbnb config) | With prettier integration |
| **Formatter** | Prettier | Single quotes, semicolons, trailing commas |
| **Testing** | Jest | With React Testing Library + Enzyme (legacy) |
| **API Mocking** | MSW | Mock Service Worker for integration tests |
| **Saga Testing** | redux-saga-test-plan | Declarative saga assertions |
| **Error Tracking** | Bugsnag | With React error boundary plugin |
| **Performance Monitoring** | New Relic Browser Agent | Web vitals tracking |
| **Compression** | Pako | Zlib decompression for API responses |
| **Micro-Frontend** | Webpack Module Federation | Apps exposed as MFE remotes |

## Common Optional Packages

These appear in many (but not all) Capillary UI repos:

| Package | Purpose |
|---|---|
| react-window | Virtualized list rendering |
| react-intersection-observer | Lazy rendering on viewport entry |
| immer | Immutable state helper (alongside Immutable.js) |
| classnames | Conditional CSS class composition |
| react-error-boundary | Error boundary utility |
| uuid | UUID generation |
| ml-matrix | Matrix operations (analytics features) |

## Backend Stack (When `/api` Directory Exists)

| Category | Technology | Notes |
|---|---|---|
| **Runtime** | Node.js >=18 | |
| **Framework** | Express.js | Via @capillarytech/arya |
| **HTTP Client** | Axios | Backend uses axios (unlike frontend) |
| **Validation** | Joi | Schema-based request validation |
| **RPC** | Apache Thrift | For internal service communication |
| **API Docs** | swagger-ui-express | Auto-generated API docs |
| **Testing** | Jest | With sinon for mocking |
| **Monitoring** | New Relic | Server-side APM |

## Infrastructure (Standard Across Repos)

| What | Technology |
|---|---|
| **Containerization** | Docker (nginx for frontend, Node for backend) |
| **Web Server** | Nginx (production frontend serving) |
| **Pre-commit** | Husky + lint-staged + gitleaks |
| **Code Quality** | SonarQube |
| **Bundle Analysis** | webpack-bundle-analyzer + size-limit |
| **Dependency Updates** | Dependabot (weekly) |
| **Secret Scanning** | Gitleaks (GitHub Actions) |
