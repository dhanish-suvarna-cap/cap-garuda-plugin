# API — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Call API Functions Directly from Components

- **Anti-pattern**: `useEffect(() => { Api.getPrograms().then(setData) }, [])`
- **Why**: All API calls go through Redux-Saga. Direct calls bypass centralized error handling, loading states, and request de-duplication.
- **Instead**: Dispatch a `*_REQUEST` action. Handle the API call in `saga.js`.

## Do Not Use Axios in the Frontend

- **Anti-pattern**: `import axios from 'axios'; axios.get('/api/...')`
- **Why**: The frontend uses the native `fetch` API via the `request()` wrapper. Axios is only used in the backend.
- **Instead**: Use `request(url, getAPICallObject('GET'))` from `services/api.js`.

## Do Not Hardcode API URLs

- **Anti-pattern**: `fetch('https://api.capillary.com/loyalty/api/v1/programs')`
- **Why**: Endpoints are configured per environment in `api.js`.
- **Instead**: Use the appropriate endpoint variable: `API_ENDPOINT`, `PROMOTION_ENDPOINT`, etc.

## Do Not Skip Cache Busting

- **Anti-pattern**: Calling `fetch(url)` directly without the `request()` wrapper
- **Why**: The `request()` function appends a timestamp for cache busting and adds compression headers.
- **Instead**: Always use `request()` or create a new API function in `services/api.js`.

## Do Not Throw Errors from API Functions

- **Anti-pattern**: `throw new Error('API failed')` in an API function
- **Why**: The `request()` function handles errors and shows notifications. Sagas handle the control flow.
- **Instead**: Return the response as-is. Let sagas check `res.success` and dispatch FAILURE actions.

## Do Not Add New Endpoint Files

- **Anti-pattern**: Creating `services/programs-api.js` or `services/promotions-api.js`
- **Why**: All API functions are centralized in `services/api.js`.
- **Instead**: Add new endpoint functions to `services/api.js`.

## Do Not Add React Query or SWR

- **Anti-pattern**: `npm install @tanstack/react-query`
- **Why**: Server state management is handled by Redux-Saga. Adding a second data-fetching layer creates confusion.
- **Instead**: Follow the existing saga pattern for new API integrations.
