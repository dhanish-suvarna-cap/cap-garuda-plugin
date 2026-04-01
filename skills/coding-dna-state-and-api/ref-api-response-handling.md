# API Response Handling

## Standard API Response Shape

```javascript
// Success
{
  success: true,
  result: { /* data */ },
  status: { code: 200, message: 'OK' }
}

// Failure
{
  success: false,
  code: 400,
  message: 'Validation failed',
  errors: [{ field: 'name', message: 'Required' }],
  status: { code: 400, message: 'Bad Request' }
}
```

## Response Pipeline

The `request()` function processes responses through a chain:

### 1. Status Code Check

```javascript
function checkStatus(response) {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 500 ||
    response.status === 400 ||
    response.status === 403 ||
    response.status === 409 ||
    response.status === 412 ||
    response.status === 422 ||
    response.status === 404
  ) {
    return response;  // Pass through — let business logic handle these
  }
  redirectIfUnauthenticated(response);  // 401 → redirect to login
  throw new Error(response.statusText);
}
```

**Note**: 4xx and 500 errors are NOT thrown. They pass through to business logic. Only 401 causes a redirect.

### 2. Decompression (If Needed)

```javascript
if (isDecompressionNeeded(resp)) {
  const compressedText = await parseText(resp);
  return decompressJsonObject(compressedText);
}
return parseJSON(resp);
```

Uses `pako` for zlib decompression when `compress-response: true` header is present.

### 3. Business Error Detection

```javascript
.then(res => {
  if (!isEmpty(res.errors) || checkStatusCode(res) ||
      (res.success !== undefined && !res.success)) {
    showError(res, res.status);
  }
  return res;  // Still returns — saga decides what to do
})
```

Errors are shown as notifications but the response is still returned to the saga.

### 4. Saga Response Handling

```javascript
const res = yield call(Api.getExtendedFields, extendedField, programId);

if (res?.success) {
  yield put({
    type: SUCCESS,
    result: res?.result[extendedField],
  });
} else {
  yield put({
    type: FAILURE,
    error: res?.status?.message || res?.message,
  });
}
```

## Status Code Helper

```javascript
function checkStatusCode(res) {
  if (res && res.code) {
    return /^[4-5][0-9][0-9]$/.test(res.code);
  }
  return false;
}
```

## JSON Parsing

```javascript
async function parseJSON(response) {
  if (response.headers.get('content-type')?.includes('text/plain')) {
    const message = await response.text();
    return {
      status: response.status,
      statusText: response.statusText,
      message,
    };
  } else {
    return response?.json();
  }
}
```

Handles both JSON and plain text responses.

## No Request/Response Transformation

There is **no automatic camelCase ↔ snake_case conversion**. The API responses are used as-is. Field names in the frontend match whatever the backend returns.

See also: [[06-api/client-setup]], [[06-api/error-handling]]
