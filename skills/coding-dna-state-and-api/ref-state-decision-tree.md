# State Management Decision Tree

## Flowchart

```
What kind of state do you need?
│
├── UI-only state (modal open, form input, toggle)?
│   ├── Used by ONE component only?
│   │   └── useState → See [[05-state/local-state]]
│   ├── Used by SIBLINGS or nearby components?
│   │   └── Lift state to parent + pass as props
│   └── Used across a feature (wizard, multi-step)?
│       └── React Context → See context.js pattern
│
├── Server/API data?
│   ├── Fetched once, read by many?
│   │   └── Redux + Saga → See [[05-state/global-state]]
│   ├── Fetched with parameters (pagination, filters)?
│   │   └── Redux + Saga with params in action
│   └── Needs loading/error tracking?
│       └── Three-state pattern (REQUEST/SUCCESS/FAILURE)
│
├── Needs to survive page navigation?
│   └── Redux store (persists across route changes)
│
├── Needs to persist across browser sessions?
│   └── usePersistantState hook (localStorage-backed)
│
├── Derived from other state?
│   ├── Simple derivation?
│   │   └── Compute inline or useMemo
│   └── From Redux store?
│       └── Reselect createSelector
│
└── URL-driven state (filters, pagination)?
    └── Manual query parameter construction (no URL state lib)
```

## State Tool Inventory

| Tool | When | Where |
|---|---|---|
| `useState` | Simple local UI state | Component body |
| `useReducer` | Complex local state with multiple sub-values | Component body (rare) |
| `useMemo` | Derived/computed values | Component body |
| React Context | Feature-wide state (5-10 components) | `context.js` file in feature folder |
| Redux + Saga | API data, cross-feature shared state | `reducer.js`, `saga.js`, `actions.js`, `selectors.js` |
| Immutable.js | Redux state shape | Inside reducers (`fromJS`, `.set()`, `.get()`) |
| Reselect | Memoized Redux selectors | `selectors.js` |
| `usePersistantState` | State that survives browser refresh | `utils/usePersistantState.js` |
| localStorage (direct) | Auth tokens, org settings | `services/localStorageApi.js` |

## What This Codebase Does NOT Use

| Tool | Status |
|---|---|
| React Query / TanStack Query | Not used |
| SWR | Not used |
| Redux Toolkit (RTK) | Not used |
| RTK Query | Not used |
| Zustand | Not used |
| Jotai / Recoil | Not used |
| MobX | Not used |
| Formik / React Hook Form | Not used |
| URL state libraries | Not used |

See also: [[05-state/local-state]], [[05-state/global-state]], [[05-state/server-state]]
