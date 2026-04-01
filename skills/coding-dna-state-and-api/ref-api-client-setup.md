# API Client Setup

## HTTP Client: Native fetch (NOT Axios)

The primary HTTP client is the native `fetch` API, polyfilled with `whatwg-fetch`.

**Note**: `axios` appears in `package.json` but the frontend uses `fetch`. Axios is used in the backend (`api/`) only.

## Core Request Function

Located at `webapp/app/services/api.js`:

```javascript
function request(url, options, timeout = 180000, appendTime = true) {
  // Add compression header for internal API calls
  if (url.includes(API_ENDPOINT)) {
    options.headers.append(REQ_HEADERS_COMPRESS_RESPONSE, 'true');
  }

  // Cache busting — append timestamp to every request
  let fetchUrl = url;
  if (appendTime) {
    fetchUrl = url.indexOf('?') !== -1
      ? `${url}&time=${Date.now()}`
      : `${url}?time=${Date.now()}`;
  }

  try {
    return fetchWithTimeout(timeout, fetch(fetchUrl, options))
      .then(checkStatus)           // Status code validation
      .then(async resp => {         // Decompression if needed
        if (isDecompressionNeeded(resp)) {
          const compressedText = await parseText(resp);
          return decompressJsonObject(compressedText);
        }
        return parseJSON(resp);
      })
      .then(res => {                // Error detection in response body
        if (!isEmpty(res.errors) || checkStatusCode(res) ||
            (res.success !== undefined && !res.success)) {
          showError(res, res.status);
        }
        return res;
      });
  } catch (err) {
    showError(err);
    return err;
  }
}
```

## Timeout Configuration

```javascript
// Default: 3 minutes (180,000ms)
request(url, options, 180000);

// Custom timeouts for specific endpoints:
getPrograms()              → 180000 (3 min)
getScopeDependencies()     → 150000 (2.5 min)
reconfigureProgram()       → 90000  (1.5 min)
```

Timeout implemented via race condition:

```javascript
function fetchWithTimeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject({
        message: 'Request timeout',
        errorLocation: window.location.href,
      });
    }, ms);
    promise.then(resolve, reject);
  });
}
```

## Multiple API Endpoints

Configured per environment in `webapp/app/services/api.js`:

| Variable | Purpose |
|---|---|
| `API_ENDPOINT` | Main loyalty API |
| `TARGET_GROUP_ENDPOINT` | Target group service |
| `API_AUTH_ENDPOINT` | Authentication service |
| `BI_API_ENDPOINT` | Business intelligence API |
| `API_IRIS_ENDPOINT` | IRIS messaging service |
| `COUPON_API_ENDPOINT` | Coupon service |
| `EMF_API_ENDPOINT` | EMF service |
| `PROMOTION_ENDPOINT` | Promotions service |
| `CORE_ENDPOINT` | Core platform API |
| `INCENTIVES_API_ENDPOINT` | Incentives service |
| `BADGES_CLAIM_API_ENDPOINT` | Badges service |
| `ORG_SETTINGS_ENDPOINT` | Organization settings |

Environment switching:
```javascript
if (isProd) {
  API_ENDPOINT = config.production.api_endpoint;
} else {
  API_ENDPOINT = config.development.api_endpoint;
}
```

## Request Constructor

Located at `webapp/app/services/requestConstructor.js`:

```javascript
export function getAPICallObject(
  method,
  body,
  isFileUpload = false,
  apiConfigs,
  allowUserId = true,
  allowOrgInProd = false,
) {
  const { token, orgID, user, ouId } = getAuthenticationDetails();

  let headers = isFileUpload ? {} : { 'Content-Type': 'application/json' };

  // Auth headers
  if (user?.refID && allowUserId) headers['X-CAP-REMOTE-USER'] = user.refID;
  if ((allowOrgInProd || !isProd) && orgID) headers['X-CAP-API-AUTH-ORG-ID'] = orgID;
  if (ouId !== undefined) headers['x-cap-api-auth-ou-id'] = ouId;
  if (!isProd && token) headers.Authorization = `Bearer ${token}`;

  const requestObj = {
    method,
    mode: 'cors',
    headers: new Headers(headers),
  };

  if (isProd) requestObj.credentials = 'same-origin';

  if (body && !isFileUpload) requestObj.body = JSON.stringify(body);
  else if (body && isFileUpload) requestObj.body = body; // FormData

  return requestObj;
}
```

### Specialized Request Constructors

| Function | Purpose |
|---|---|
| `getAPICallObject()` | Standard loyalty API |
| `getIRISAPICallObject()` | IRIS messaging service (different auth header) |
| `getAPICallObjectForEMF()` | EMF service |
| `getBiHeaders()` | BI service |

## File Upload

```javascript
export const uploadBulkConfig = ({ bulkConfigFile }) => {
  const formData = new FormData();
  formData.append('file', bulkConfigFile);
  const url = `${API_ENDPOINT}/bulk-config/uploadBulkConfig`;
  return request(url, getAPICallObject('POST', formData, true)); // isFileUpload = true
};
```

When `isFileUpload = true`:
- Content-Type header is omitted (browser sets multipart boundary)
- Body is passed as raw FormData, not JSON.stringify'd

See also: [[06-api/response-handling]], [[06-api/error-handling]], [[07-auth/auth-flow]]
