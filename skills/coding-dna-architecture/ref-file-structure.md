# File & Folder Structure

## Monorepo Layout

```
cap-loyalty-ui/
├── api/          # Node.js Express backend
├── webapp/       # React frontend
├── debian/       # Debian packaging config
├── .github/      # GitHub Actions & Dependabot
└── version       # Version file (current: 1.282.0)
```

Each sub-project is **independent** — own `package.json`, own linting, own tests. NOT using npm/yarn workspaces.

## Frontend Architecture: Atomic Design + Feature Colocation

```
webapp/app/
├── components/
│   ├── atoms/           # 37 basic UI elements
│   ├── molecules/       # 143 composed components
│   ├── organisms/       # 133 complex feature components
│   ├── pages/           # 15 page-level route components
│   └── templates/       # 1 layout template
├── config/              # App configuration
├── services/            # API client & request constructors
├── utils/               # Shared utilities & HOCs
├── lib/                 # Custom libraries (hooks)
├── assets/              # SVGs, PNGs (~85 files)
├── translations/        # i18n JSON files
├── tests/               # Integration test suites
├── app.js               # Root React component + store init
├── entry.js             # MFE entry point
├── i18n.js              # i18n setup
├── initialReducer.js    # Root Redux reducer
├── initialState.js      # Root Redux state
└── global-styles.js     # Global styled-components
```

## Component Folder Anatomy

Every component follows the same internal structure:

```
ComponentName/
├── ComponentName.js     # Main component code
├── index.js             # Barrel export: export {default} from './ComponentName'
├── style.js             # Styled components / CSS
├── messages.js          # i18n messages (if UI text exists)
├── constants.js         # Action types & local constants (if Redux-connected)
├── actions.js           # Redux action creators (if Redux-connected)
├── reducer.js           # Redux reducer (if Redux-connected)
├── saga.js              # Redux-Saga side effects (if Redux-connected)
├── selectors.js         # Reselect memoized selectors (if Redux-connected)
├── utils.js             # Component-specific helpers (if needed)
└── tests/
    ├── ComponentName.test.js
    ├── actions.test.js
    ├── reducer.test.js
    ├── saga.test.js
    ├── selectors.test.js
    └── mockData.js
```

### Minimal Component (Atom)

```
AvatarIcon/
├── AvatarIcon.js
├── index.js
└── style.js
```

### Full Feature Component (Organism)

```
ActionExpression/
├── ActionExpression.js
├── index.js
├── style.js
├── messages.js
├── constants.js
├── actions.js
├── reducer.js
├── saga.js
├── selectors.js
└── tests/
    ├── ActionExpression.test.js
    ├── actions.test.js
    ├── reducer.test.js
    ├── saga.test.js
    └── selectors.test.js
```

## Backend Architecture: Type-Based Layering

```
api/src/
├── routes/              # 17 route files (*.route.js)
├── controllers/         # Request handlers (by domain)
│   ├── programs/
│   ├── strategy/
│   ├── promotion/
│   └── ... (17 domains)
├── services/            # Business logic (by domain)
│   ├── programs/
│   ├── strategy/
│   └── ... (18+ domains)
├── models/              # MongoDB schemas
├── schemas/             # Joi validation schemas
├── middlewares/          # Express middlewares
├── helpers/             # Shared helper functions
├── utils/               # Utility functions
├── constants/           # Global constants
├── thrift-clients/      # Apache Thrift RPC clients
├── mongoConfig/         # MongoDB configuration
└── api-doc/             # Swagger documentation
```

## Colocation Rules

| What | Where |
|---|---|
| Component tests | `ComponentName/tests/ComponentName.test.js` |
| Component styles | `ComponentName/style.js` |
| Component i18n | `ComponentName/messages.js` |
| Component Redux | Same folder: `actions.js`, `reducer.js`, `saga.js`, `selectors.js`, `constants.js` |
| Integration tests | `webapp/app/tests/integration/FeatureName/` |
| Global mocks | `webapp/__mocks__/` |
| API tests (unit) | `api/tests/unit/` |
| API tests (integration) | `api/tests/integration/` |

## Component Size by Atomic Level

| Level | Count | Typical Lines | Responsibility |
|---|---|---|---|
| Atoms | 37 | 20–60 | Basic UI: buttons, inputs, icons, labels |
| Molecules | 143 | 80–350 | Composed UI: cards, tables, modals, forms |
| Organisms | 133 | 200–366+ | Feature-complete: config panels, dashboards |
| Pages | 15 | 100–500 | Route targets: connect store, layout |
| Templates | 1 | ~50 | Layout wrapper |

## Special Directories

| Directory | Purpose |
|---|---|
| `webapp/internals/webpack/` | Webpack dev/prod/dll configs |
| `webapp/internals/generators/` | Plop scaffolding templates |
| `webapp/internals/testing/` | Jest config files |
| `webapp/server/` | Express dev server |
| `webapp/nginx/` | Production nginx config |
| `webapp/__mocks__/` | Global Jest mocks (files, styles, modules) |
