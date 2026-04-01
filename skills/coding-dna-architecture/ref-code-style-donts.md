# Code Style — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Mix Languages Within a Repo

- **Anti-pattern**: Adding `.ts` files to a JavaScript repo, or `.js` files to a TypeScript repo
- **Why**: Mixing languages within a single repo creates tooling inconsistency and confusing DX.
- **Instead**: Check what the repo uses. If it's JS → use JS + PropTypes. If it's TS → use TS + interfaces. If the user asks to use a different language, follow their instruction.

## Do Not Use Path Aliases

- **Anti-pattern**: `import X from '@/components/...'` or `import X from '~/utils/...'`
- **Why**: Webpack resolves `app/` as a module directory. Aliases don't exist in this config.
- **Instead**: Use relative paths (`../../utils/commonUtils`) or module-style (`utils/injectReducer`).

## Do Not Import lodash as a Whole

- **Anti-pattern**: `import _ from 'lodash'` or `import { cloneDeep } from 'lodash'`
- **Why**: Bundle size. The codebase uses `babel-plugin-lodash` but still prefers per-method imports.
- **Instead**: `import cloneDeep from 'lodash/cloneDeep'`

## Do Not Import cap-ui-library from Root

- **Anti-pattern**: `import { CapButton } from '@capillarytech/cap-ui-library'`
- **Why**: The library is designed for sub-module imports to enable tree-shaking.
- **Instead**: `import CapButton from '@capillarytech/cap-ui-library/CapButton'`

## Do Not Skip PropTypes

- **Anti-pattern**: Components without `Component.propTypes = { ... }`
- **Why**: PropTypes serve as the only type documentation in this JS codebase.
- **Instead**: Always define propTypes AND defaultProps for every component.

## Do Not Use Console.log in Production Code

- **Anti-pattern**: `console.log(data)` left in committed code
- **Why**: ESLint rule `no-console: 1` (warning). Should be zero in PRs.
- **Instead**: Use Bugsnag for errors: `notifyHandledException(error)`. Remove debug logs before committing.

## Do Not Name Internal Handlers with `on` Prefix

- **Anti-pattern**: `const onSearchChange = () => { ... }` (internal handler, not a prop)
- **Why**: `on` prefix should indicate a prop callback. Internal handlers use `handle`.
- **Instead**: `const handleSearchChange = () => { ... }`
- **Note**: This convention is inconsistently applied; the dominant pattern mixes both. Prefer `handle` for new code.

## Do Not Create Top-Level index.js with Logic

- **Anti-pattern**: Barrel files (`index.js`) that contain component logic
- **Why**: Barrel files should ONLY re-export. Logic makes debugging harder.
- **Instead**: `export { default } from './ComponentName'` — nothing else.

## Do Not Use `var` or Unscoped Declarations

- **Anti-pattern**: `var x = 1`
- **Why**: ESLint enforces `const`/`let` via Airbnb config.
- **Instead**: `const` by default, `let` only when reassignment is needed.
