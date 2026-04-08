---
description: Capillary UI coding DNA — architecture, stack, code style, file structure, naming, imports
triggers:
  - "file structure"
  - "import order"
  - "naming convention"
  - "project structure"
  - "monorepo"
  - "code style"
  - "banned package"
  - "webpack alias"
  - "PropTypes"
  - "barrel export"
---

# Coding DNA: Architecture & Code Style

Capillary-wide coding standards for project architecture, file structure, naming, and imports. These apply to ALL Capillary UI repos.

> For full details on any topic, read the reference files in this skill directory (ref-*.md).

## Tech Stack (Non-Negotiable)

| Category | Technology | Version |
|----------|-----------|---------|
| UI Framework | React | 18.x |
| UI Library | Ant Design + @capillarytech/cap-ui-library | 3.x |
| State | Redux + Redux-Saga + Immutable.js + Reselect | - |
| Routing | React Router | v5 |
| Styling | styled-components + withStyles HOC | 6.x |
| i18n | react-intl | - |
| HTTP | Native fetch (whatwg-fetch polyfill) | - |
| Monitoring | Bugsnag + New Relic | - |
| Bundler | Webpack | 5.x |
| Testing | Jest + React Testing Library + redux-saga-test-plan | - |

## BANNED Packages (Never Install)

TypeScript (in JS repos), @tanstack/react-query, SWR, Redux Toolkit, zustand, jotai/recoil, tailwindcss, emotion, CSS Modules, date-fns/dayjs (use moment), formik/react-hook-form, next.js, vite, framer-motion, MUI/Chakra, axios (frontend), clsx, twMerge.

## File Structure — Monorepo

```
/webapp                           # Frontend
  /app
    /components
      /atoms/                     # 20-60 lines, stateless
      /molecules/                 # 80-350 lines, composed
      /organisms/                 # 200-400 lines, Redux-connected
      /pages/                     # 100-500 lines, route-level
      /templates/                 # Layout wrappers
    /services/api.js              # ALL API functions (single file)
    /config/endpoints.js          # ALL endpoint URLs
    /utils/                       # Shared utilities
    /translations/                # i18n translation files
    /assets/                      # Static assets
    app.js                        # Root component
    initialReducer.js             # Pre-loaded reducers
    initialState.js               # Initial Redux state
    global-styles.js              # Global CSS
/api                              # Backend (optional)
```

## Import Order (Strict)

```js
// 1. React core
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// 3. Cap-UI (one per line, INDIVIDUAL file paths)
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';

// 4. Internal components (relative paths)
import MyMolecule from '../../molecules/MyMolecule';

// 5. Utilities
import { formatDate } from 'utils/dateUtils';

// 6. Local files (style, messages, constants, actions, reducer, saga, selectors)
import styles from './style';
import messages from './messages';
import { FETCH_DATA_REQUEST } from './constants';
import { fetchDataRequest } from './actions';
```

## Path Resolution

- **NO aliases** (@/, ~/) — Webpack resolves from `app/` via moduleDirectories
- **Relative imports** for local files: `./style`, `../molecules/MyMolecule`
- **Module imports** for utils: `utils/injectSaga` (resolves to `app/utils/injectSaga`)
- **Lodash**: Always per-method: `import debounce from 'lodash/debounce'`

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase | `AudienceList.js` |
| Barrel files | index.js | `export { default } from './AudienceList'` |
| Utils/helpers | camelCase | `formatDate.js` |
| HOCs | withXxx.js | `withErrorBoundary.js` |
| Custom hooks | useXxx.js | `usePersistantState.js` |
| Component names | PascalCase, flat | `AudienceList` (not `AudienceListComponent`) |
| Props: booleans | isXxx/hasXxx | `isLoading`, `hasError` |
| Props: handlers | onXxx (from parent) | `onChange`, `onSubmit` |
| Internal handlers | handleXxx | `handleFilterChange` |
| Constants | SCREAMING_SNAKE | `FETCH_DATA_REQUEST` |
| Action prefix | `domainName/VERB_NOUN_STATUS` | `createTracker/GET_FIELDS_REQUEST` |
| Redux keys | camelCase | `audienceList` |
| CSS classes | kebab-case | `.audience-list-wrapper` |
| i18n scope | dot.separated | `garuda.components.organisms.AudienceList` |
| Routes | kebab-case | `/loyalty/ui/v3/audience-list` |

## Do-Nots (Anti-Patterns)

- Don't mix JS/TS within a repo — match existing
- Don't use path aliases (@/, ~/) — use relative or module paths
- Don't import lodash wholesale — use per-method imports
- Don't import cap-ui-library from root — use sub-modules
- Don't skip PropTypes — always define them
- Don't leave console.log in production
- Don't name internal handlers with 'on' prefix — use 'handle'
- Don't put logic in barrel index.js files — only re-exports
- Don't use var — use const/let

## Reference Files

- `ref-dev-environment.md` — Node versions, EditorConfig, Prettier, ESLint, pre-commit hooks
- `ref-package-registry.md` — Full dependency list, banned packages
- `ref-tech-stack.md` — Complete technology inventory
- `ref-file-structure.md` — Monorepo layout, atomic design, component sizes
- `ref-imports.md` — Import ordering, path resolution, barrel files
- `ref-naming.md` — Full naming conventions with examples
- `ref-code-style-donts.md` — Anti-patterns to avoid
- `ref-typescript.md` — JS vs TS guidance, PropTypes patterns
