# Naming Conventions (Exhaustive)

This is the most critical reference file. Every naming decision should follow these patterns.

> **Language note**: These conventions apply to both JavaScript and TypeScript repos. Where TypeScript repos have additional conventions (e.g., type/interface naming), they are noted with a **(TS)** tag.

---

## Files & Folders

### Component Files

| Type | Convention | Example |
|---|---|---|
| Component file | `PascalCase.js` | `DifferentDestinationPrograms.js` |
| Barrel export | `index.js` | `index.js` → `export {default} from './DifferentDestinationPrograms'` |
| Styles | `style.js` (singular) | `style.js` |
| Messages (i18n) | `messages.js` | `messages.js` |
| Constants | `constants.js` | `constants.js` |
| Actions (Redux) | `actions.js` | `actions.js` |
| Reducer | `reducer.js` | `reducer.js` |
| Saga | `saga.js` | `saga.js` |
| Selectors | `selectors.js` | `selectors.js` |
| Utils (component-scoped) | `utils.js` | `utils.js` |
| Tests folder | `tests/` | `tests/ComponentName.test.js` |

### Utility Files

| Type | Convention | Example |
|---|---|---|
| General utils | `camelCase.js` | `commonUtils.js` |
| Specific parser | `camelCase.js` with verb | `parseSenderDetails.js` |
| HOC wrapper | `withXxx.js` | `withStyles.js`, `withErrorBoundary.js`, `withDynamicLazyLoading.js` |
| Custom hook | `useXxx.js` | `usePersistantState.js` |
| Auth utilities | `camelCase.js` | `authWrapper.js`, `userUtils.js` |

### Folder Names

| Level | Convention | Example |
|---|---|---|
| Atomic levels | `plural lowercase` | `atoms/`, `molecules/`, `organisms/`, `pages/`, `templates/` |
| Component dirs | `PascalCase` (singular) | `DifferentDestinationPrograms/`, `ActionExpression/` |
| Utility dirs | `lowercase` | `utils/`, `services/`, `config/`, `assets/`, `lib/` |
| Test dirs | `lowercase` | `tests/` |
| Integration tests | `lowercase` | `integration/` |
| i18n | `lowercase` | `translations/` |

### Backend (API) Files

| Type | Convention | Example |
|---|---|---|
| Route files | `camelCase.route.js` | `programs.route.js`, `bulkConfig.route.js` |
| Controller dirs | `camelCase/` | `alternateCurrency/`, `bulkConfig/`, `programs/` |
| Service dirs | `camelCase/` | `alternateCurrency/`, `programs/` |
| Test files | `*.test.js` | `programs.test.js` |

---

## JavaScript Identifiers

### Components

| What | Convention | Example |
|---|---|---|
| Component name | `PascalCase` | `DifferentDestinationPrograms`, `AvatarIcon`, `CustomSkeleton` |
| Compound prefix | None — flat naming | `ActionViewModeHeader` (not `Action.ViewModeHeader`) |
| Wrapper components | `PascalCase` | `ErrorBoundaryWrapper`, `RoleBasedAuth` |
| Lazy-loaded variants | `XxxLazyLoad` suffix | `PromotionListLazyLoad` |

### Props & PropTypes

**JavaScript repos:**

| What | Convention | Example |
|---|---|---|
| Props interface | `Component.propTypes = {}` | `AvatarIcon.propTypes = { text: PropTypes.string }` |
| Default props | `Component.defaultProps = {}` | `AvatarIcon.defaultProps = { text: '' }` |

**(TS) TypeScript repos:**

| What | Convention | Example |
|---|---|---|
| Props interface | `ComponentNameProps` | `interface AvatarIconProps { text?: string }` |
| Default values | In destructuring | `({ text = '' }: AvatarIconProps)` |
| Types file | `types.ts` in component folder | `ComponentName/types.ts` |
| Type-only import | `import type` | `import type { Program } from './types'` |
| Generic response | `ApiResponse<T>` | `ApiResponse<Program[]>` |
| String union | `type Status = 'a' \| 'b'` | Preferred over enums |

**Both JS and TS repos:**
| Boolean props | `isXxx` or `hasXxx` prefix | `isLoading`, `isEditable`, `isScope`, `hasError` |
| Handler props | `onXxx` | `onSearchChange`, `onOptionClick`, `onCloseSlideBox` |
| Callback props | `callback` or `onXxx` | `callback`, `onRefreshClick` |
| Data props | Noun, descriptive | `expiryStrategyDetails`, `selectedPrograms`, `bulkConfigName` |
| Render props | Noun or `renderXxx` | `footer`, `content`, `children` |
| ClassName prop | `className` | `className: PropTypes.string` |

### Event Handlers

| Pattern | When | Example |
|---|---|---|
| `handleXxx` | Internal function in component | `handleCloseModal`, `handleRemoveExistingDraft`, `handleSearchValueChange` |
| `onXxx` | Passed as prop / handler assigned to events | `onSearchChange`, `onEditClick`, `onSetChange`, `onRemoveClickHandler` |
| `openXxx` / `closeXxx` | Modal/dialog toggles | `openRemoveModal`, `handleCloseModal` |

### Functions & Utilities

| What | Convention | Example |
|---|---|---|
| Utility functions | `camelCase`, verb-first | `parseQueryParams`, `isEmptyOrNil`, `getContentChannels` |
| Validators | `isXxx` or `validateXxx` | `isEmptyOrNil`, `isUserAdmin` |
| Formatters | `formatXxx` | `formatMessage` (from intl) |
| Parsers | `parseXxx` | `parseQueryParams`, `parseSenderDetails` |
| Getters | `getXxx` | `getContentChannels`, `getSenderOptions`, `getRBACConfigurationData` |
| HOCs | `withXxx` | `withStyles`, `withErrorBoundary`, `withDynamicLazyLoading` |
| Factory selectors | `makeSelectXxx` | `makeSelectExtendedFields`, `makeSelectUpsertId` |
| Domain selectors | `selectXxxDomain` | `selectCreateTrackerDomain`, `selectCapDomain` |

### Constants

| What | Convention | Example |
|---|---|---|
| Action types | `SCREAMING_SNAKE_CASE` with domain prefix | `'createTracker/GET_EXTENDED_FIELDS_REQUEST'` |
| Status constants | `SCREAMING_SNAKE_CASE` | `REQUEST`, `SUCCESS`, `FAILURE` |
| Feature flags | `SCREAMING_SNAKE_CASE` | `ALTERNATE_CURRENCIES`, `DOUBLE_VAL` |
| Config values | `SCREAMING_SNAKE_CASE` | `EXPIRY_STRATEGY_NAME_MAP` |
| Enum-like maps | `SCREAMING_SNAKE_CASE` | `DRAFT_CREATED`, `DRAFT_INVALID` |

### Action Type Naming Pattern

```
domainName/VERB_NOUN_STATUS
```

Examples:
```javascript
export const GET_EXTENDED_FIELDS_REQUEST = 'createTracker/GET_EXTENDED_FIELDS_REQUEST';
export const GET_EXTENDED_FIELDS_SUCCESS = 'createTracker/GET_EXTENDED_FIELDS_SUCCESS';
export const GET_EXTENDED_FIELDS_FAILURE = 'createTracker/GET_EXTENDED_FIELDS_FAILURE';
export const UPSERT_TRACKER_STRATEGY_REQUEST = 'createTracker/UPSERT_TRACKER_STRATEGY_REQUEST';
export const UPLOAD_BULK_CONFIG_SUCCESS = 'bulkConfig/UPLOAD_BULK_CONFIG_SUCCESS';
```

### Redux Store Keys

| What | Convention | Example |
|---|---|---|
| Reducer key | `camelCase` domain name | `'createTracker'`, `'actionInfo'`, `'loyaltyCap'` |
| State fields | `camelCase` | `getExtendedFieldStatus`, `extendedFields`, `alternateCurrencyListData` |
| Status fields | `xxxStatus` suffix | `getExtendedFieldStatus`, `alternateCurrencyListStatus`, `upsertTrackerStrategyStatus` |
| Error fields | `xxxError` suffix | `getExtendedFieldError`, `upsertTrackerStrategyError` |

### Action Creators

| What | Convention | Example |
|---|---|---|
| Fetch actions | `getXxx` | `getExtendedFields(extendedField, programId, callback)` |
| Mutation actions | `upsertXxx`, `createXxx`, `updateXxx`, `deleteXxx` | `upsertTrackerStrategy(payload, callback)` |
| Upload actions | `uploadXxx` | `uploadBulkConfig(bulkConfigFile, callback)` |

### Saga Watchers

| What | Convention | Example |
|---|---|---|
| Watcher generator | `watchXxx` | `watchGetExtendedField`, `watchUploadBulkConfig` |
| Worker generator | Matches action name | `getExtendedFields`, `uploadBulkConfig` |
| Default export | Anonymous generator with `yield all([...])` | `export default function*() { yield all([watchGetExtendedField()]); }` |

### API Functions (services/api.js)

| HTTP Method | Convention | Example |
|---|---|---|
| GET (single) | `getXxxById` | `getProgramById(programId)` |
| GET (list) | `getXxx` (plural) | `getPrograms()` |
| GET (paginated) | `getPaginatedXxx` | `getPaginatedTargetGroups(queryParams)` |
| POST (create) | `createXxx` | `createProgram(program, isUpdateMode)` |
| PUT/POST (upsert) | `upsertXxx` | `upsertPointStrategy({ payload, programId })` |
| POST (upload) | `uploadXxx` | `uploadBulkConfig({ bulkConfigFile })` |
| DELETE | `deleteXxx` | (follows same pattern) |
| GET (compressed) | `getCompressedXxx` | `getCompressedTargetGroupsWithTargets()` |
| GET (cache clear) | `clearXxxCache` | `clearRulesetsCache({ programId, eventType })` |

### CSS Classes

| What | Convention | Example |
|---|---|---|
| General classes | `kebab-case` | `search-program-row`, `search-filter-head` |
| App-specific prefix | `lp-` (Loyalty Plus) | `lp-btn-bulkconfig-delete-program`, `lp-menu-config-points` |
| Status classes | `kebab-case` | `check-icon-status`, `bulk-config-status-filter-option-row` |
| BEM-like modifiers | `suffix` style | `create-draft-button-continue`, `remove-invalid-btn` |
| Utility classes | `descriptive kebab-case` | `truncate-text`, `align-items-center`, `pointer-cursor` |

### i18n Message IDs

Pattern: `appName.components.level.ComponentName.messageName`

```javascript
export const scope = 'loyaltyPlus.components.molecules.SuggestionCard';

export default defineMessages({
  learnMore: {
    id: `${scope}.learnMore`,
    defaultMessage: 'Learn more',
  },
  dismiss: {
    id: `${scope}.dismiss`,
    defaultMessage: 'Dismiss',
  },
});
```

### Route Paths

| Pattern | Convention | Example |
|---|---|---|
| Root | `/` (relative to publicPath) | `${publicPath}/` |
| List views | `/resource/list` | `${publicPath}/promotions/list` |
| Create views | `/resource/create` | `${publicPath}/promotions/create` |
| Edit views | `/resource/edit/:id` | `${publicPath}/bulk-configurations/edit/:id` |
| Detail views | `/resource/:mode/:parentId/:id` | `${publicPath}/promotions/:mode/:programId/:promotionId` |
| Settings | `/settings` | `${publicPath}/settings` |
| Multi-word paths | `kebab-case` | `bulk-configurations`, `access-forbidden` |

---

## Inconsistencies Found

| Inconsistency | Details |
|---|---|
| `defaultProps` vs `propTypes` order | Most files define `defaultProps` before `propTypes`, but some reverse this |
| `onXxx` vs `handleXxx` naming | Some internal handlers use `on` prefix (e.g., `onSearchChange`), inconsistent with the `handle` convention |
| `onRemoveClickHandler` | Uses both `on` prefix AND `Handler` suffix — pick one |
| API function params | Some use object destructuring `({ payload, programId })`, others use positional args `(programId, payload)` |
