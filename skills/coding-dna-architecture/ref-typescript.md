# Language & Type Patterns

## Default: JavaScript + PropTypes

Most Capillary UI repos use JavaScript (`.js` files) with PropTypes for type checking. This is the standard.

## When TypeScript Is Used

Some repos may use TypeScript. **Always check the repo first:**

- If `tsconfig.json` exists → the repo uses TypeScript
- If files are `.ts` / `.tsx` → follow TypeScript patterns
- If the user explicitly asks for TypeScript → use TypeScript

**The repo's language choice overrides this DNA's default.** When working in a TypeScript repo, use proper TS patterns (interfaces, type annotations, generics) instead of PropTypes.

---

## JavaScript Pattern (Default)

### PropTypes for Type Checking

Every component defines its props via `PropTypes` at the bottom of the file.

```javascript
import PropTypes from 'prop-types';

const AvatarIcon = ({ text, className, backgroundColor, textColor }) => (
  // JSX
);

AvatarIcon.defaultProps = {
  text: '',
  className: '',
  backgroundColor: '#E8F5E9',
  textColor: '#1B5E20',
};

AvatarIcon.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default AvatarIcon;
```

### PropTypes Ordering

1. Component function declaration
2. `Component.defaultProps = { ... }` (FIRST)
3. `Component.propTypes = { ... }` (SECOND)
4. Export statement

### Common PropTypes Used

| PropType | When |
|---|---|
| `PropTypes.string` | Text values, classNames, IDs |
| `PropTypes.bool` | Flags, toggles |
| `PropTypes.func` | Callbacks, handlers |
| `PropTypes.object` | Complex data, Redux state slices |
| `PropTypes.array` | Lists, collections |
| `PropTypes.number` | Counts, indices |
| `PropTypes.node` | Renderable children |
| `PropTypes.oneOfType([...])` | Multiple accepted types |
| `PropTypes.oneOf([...])` | Enum values |
| `intlShape.isRequired` | react-intl injected intl prop |

---

## TypeScript Pattern (When Repo Uses TS)

If the repo has TypeScript, follow these patterns instead:

### Component with Props Interface

```tsx
interface AvatarIconProps {
  text?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const AvatarIcon = ({
  text = '',
  className = '',
  backgroundColor = '#E8F5E9',
  textColor = '#1B5E20',
}: AvatarIconProps) => (
  // JSX
);

export default AvatarIcon;
```

### TypeScript Naming Conventions

| What | Convention | Example |
|---|---|---|
| Props interface | `ComponentNameProps` | `AvatarIconProps` |
| Type for data shapes | `type` keyword | `type Program = { id: string; name: string }` |
| Interface for contracts | `interface` keyword | `interface ApiResponse<T> { success: boolean; result: T }` |
| Enum values | `const` object or string union | `type Status = 'active' \| 'draft' \| 'archived'` |
| Generic API response | Generic interface | `ApiResponse<Program[]>` |
| Type-only imports | `import type` | `import type { Program } from './types'` |

### File Naming in TS Repos

| Type | Convention |
|---|---|
| Component | `ComponentName.tsx` |
| Types file | `types.ts` (colocated in component folder) |
| Hook | `useHookName.ts` |
| Utility | `utilName.ts` |
| Test | `ComponentName.test.tsx` |

---

## Data Shape Documentation (JavaScript Repos)

Since JS repos have no TypeScript interfaces, data shapes are implicit. They are documented via:

1. **PropTypes** on components
2. **Immutable.js initialState** in reducers
3. **Destructuring in selectors** showing expected shape
4. **API response handling** in sagas showing field names

### Reducer Initial State as "Schema"

```javascript
export const initialState = fromJS({
  getExtendedFieldStatus: null,
  extendedFields: [],
  getExtendedFieldError: null,
  upsertTrackerStrategyStatus: null,
  upsertTrackerStrategyError: null,
});
```

This is the closest pattern to a type definition in JS repos — the initial state shape IS the schema.
