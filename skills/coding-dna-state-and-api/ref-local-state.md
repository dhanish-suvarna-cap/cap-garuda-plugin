# Local State

## useState (Dominant Local State Pattern)

```javascript
// Simple toggle
const [isOpen, setIsOpen] = useState(false);

// Form input
const [searchTerm, setSearchTerm] = useState('');

// Complex data
const [upgradeCriteria, setUpgradeCriteria] = useState(upgradeCriteriaState);
const [additionalUpgradeCriteria, setAdditionalUpgradeCriteria] = useState([]);

// Derived from props (initialized from props)
const [dataHistory, setDataHistory] = useState({
  previousState: initialData,
  currentState: initialData,
});
```

## Common Local State Patterns

### Modal/Drawer Toggle

```javascript
const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

const openRemoveModal = () => setConfirmationModalVisible(true);
const handleCloseModal = () => setConfirmationModalVisible(false);
```

### Search/Filter

```javascript
const [programSearchTerm, setProgramSearchTerm] = useState('');
const [filterValue, setFilterValue] = useState('all');

const handleSearchValueChange = event => {
  setSearchValue(event.target.value);
};
```

### Timer/Countdown

```javascript
const [percent, setPercent] = useState(100);

useEffect(() => {
  const interval = setInterval(() => {
    setPercent(prev => prev - step);
  }, intervalMs);
  return () => clearInterval(interval);
}, []);
```

## useMemo for Derived State

```javascript
const isSaveDisabled = useMemo(
  () => {
    return upgradeCriteria.every(c => c.isValid) && thresholdValues.length > 0;
  },
  [upgradeCriteria, thresholdValues]
);
```

## useReducer (Rare)

Not commonly used. When complex local state exists, the pattern is to lift to Redux instead.

## State Initialization from Props

```javascript
const [destinationPrograms, setDestinationPrograms] = useState(
  setInitialProgramData(bulkConfigData, selectedPrograms),
);
```

**Warning**: This only initializes on first render. Use `useEffect` if the prop changes should update state.

See also: [[05-state/decision-tree]], [[05-state/global-state]]
