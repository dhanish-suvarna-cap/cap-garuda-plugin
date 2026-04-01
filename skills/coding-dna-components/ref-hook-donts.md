# Hooks — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Create Hooks That Replace Redux Patterns

- **Anti-pattern**: `usePrograms()` hook that fetches, caches, and returns programs
- **Why**: Server data flows through Redux-Saga. Custom data hooks create a parallel system.
- **Instead**: Use the existing Redux pattern: action → saga → reducer → selector → connect.

## Do Not Use useSelector/useDispatch

- **Anti-pattern**: `const data = useSelector(selectData)`
- **Why**: Consistent with the `connect()` HOC pattern used everywhere.
- **Instead**: `connect(mapStateToProps, mapDispatchToProps)` with `createStructuredSelector`.

## Do Not Omit Cleanup in Effects

- **Anti-pattern**: `useEffect(() => { const interval = setInterval(...) }, [])` without cleanup
- **Why**: Leaks intervals/subscriptions on unmount.
- **Instead**: Always return cleanup: `return () => clearInterval(interval)`

## Do Not Nest Hooks Inside Conditions

- **Anti-pattern**: `if (show) { const [val, setVal] = useState(0) }`
- **Why**: Violates Rules of Hooks — hooks must be called in the same order.
- **Instead**: Always call hooks at the top level of the component function.
