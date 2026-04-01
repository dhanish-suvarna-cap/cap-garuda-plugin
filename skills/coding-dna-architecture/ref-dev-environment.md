# Dev Environment

## Node Version

- **Webapp**: `>=8.10.0` (package.json engines)
- **API**: `>=18.0.0` (package.json engines)
- **NPM**: `>=5`
- No `.nvmrc` or `.node-version` file found

## Editor Configuration

From `.editorconfig` (both webapp and api):

```
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

Markdown files: `trim_trailing_whitespace = false`

## Prettier Configuration

### Webapp (`/webapp/.prettierrc`)

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}
```

### API (`/api/.prettierrc.json`)

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 125
}
```

**Key Difference**: Webapp uses `trailingComma: "all"` (80 char width), API uses `"es5"` (125 char width).

## ESLint Configuration

### Webapp (`/webapp/.eslintrc.js`)

- **Parser**: babel-eslint
- **Extends**: airbnb, prettier, prettier/react, eslint:recommended, plugin:react-hooks/recommended
- **Plugins**: prettier, redux-saga, react, jsx-a11y
- **Import resolver**: webpack (resolves via webpack aliases)

**Key enforced rules**:
- `prettier/prettier: error` — Prettier formatting enforced
- `prefer-template: 2` — Template literals over concatenation
- `no-unused-vars: 2` — No unused variables
- `redux-saga/no-yield-in-race: 2` — Saga correctness
- `redux-saga/yield-effects: 2` — Must yield saga effects
- `jsx-a11y/aria-props: 2` — ARIA attributes validated
- `jsx-a11y/label-has-associated-control: 2` — Labels must be linked
- `jsx-a11y/mouse-events-have-key-events: 2` — Mouse events need keyboard equivalents

**Key disabled rules**:
- `react/jsx-filename-extension: off` — .js files can contain JSX
- `react/require-default-props: off` — defaultProps not enforced
- `react/destructuring-assignment: off` — Destructuring style flexible
- `react/sort-comp: off` — Component method ordering flexible
- `no-underscore-dangle: off` — Underscores allowed (e.g., `_id`)
- `max-len: off` — No line length in ESLint (Prettier handles it)
- `jsx-a11y/click-events-have-key-events: off` — Relaxed
- `jsx-a11y/no-static-element-interactions: off` — Relaxed

### API (`/api/.eslintrc`)

- **Extends**: eslint:recommended, airbnb-base, prettier, plugin:sonarjs/recommended
- **Plugins**: jest, prettier, extra-rules, sonarjs
- **Key rules**:
  - `max-params: [error, 3]` — Max 3 function parameters
  - `max-statements: [error, 50]` — Max 50 statements per function
  - `max-lines: [error, 500]` — Max 500 lines per file
  - `complexity: [error, 50]` — Max cyclomatic complexity
  - `extra-rules/no-commented-out-code: error` — No commented-out code
  - `quotes: ['error', 'single', 'avoid-escape']` — Single quotes
  - `indent: ['error', 2]` — 2-space indent

## Stylelint Configuration

```json
{
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-styled-components"
  ]
}
```

## Pre-commit Hooks

### Husky + lint-staged (webapp)

```json
{
  "*.js": ["npm run lint:eslint:fix", "git add --force"],
  "*.json": ["prettier --write", "git add --force"]
}
```

### Gitleaks (root)

Pre-commit hook via `.pre-commit-config.yaml` — scans for secrets before every commit.

## Bundle Size Limits

```json
[{ "path": "./dist/main.*.js", "limit": "2 MB" }]
```

## Webpack Path Aliases

Defined in `webpack.base.babel.js` — resolved via `modules: ['app', 'node_modules']`:

| Alias | Maps To |
|---|---|
| `moment` | `moment/moment.js` |
| `react` | `node_modules/react` (singleton) |
| `react-dom` | `node_modules/react-dom` (singleton) |
| `antd` | `node_modules/antd` |
| `react-helmet` | `node_modules/react-helmet` |
| `react-intl` | `node_modules/react-intl` |
| `react-redux` | `node_modules/react-redux` |
| `styled-components` | `node_modules/styled-components` |
| `react-router` | `node_modules/react-router` |

**Important**: Module resolution uses `moduleDirectories: ['app', 'node_modules']` in webpack AND jest. This means imports like `import X from 'components/...'` resolve from the `app/` directory, NOT via `@/` aliases.

## NPM Scripts (Key)

### Webapp
```
npm start          # Dev server on port 8000
npm run build      # Production webpack build
npm test           # Jest unit tests
npm run test:integration  # Jest integration tests
npm run analyze    # Bundle size analysis
npm run lint       # ESLint + Stylelint
npm run generate   # Plop scaffolding
```

### API
```
npm run dev        # Nodemon dev server on port 2050
npm start          # Production server
npm test           # Unit + integration tests
npm run lint       # ESLint
npm run lint:fix   # ESLint auto-fix
```
