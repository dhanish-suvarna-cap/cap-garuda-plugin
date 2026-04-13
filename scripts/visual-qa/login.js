#!/usr/bin/env node
'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    const val = argv[i + 1];
    switch (key) {
      case '--username':
        args.username = val; i++; break;
      case '--password':
        args.password = val; i++; break;
      case '--base-url':
        args.baseUrl = val; i++; break;
      case '--org-id':
        args.orgId = val; i++; break;
      case '--output':
        args.output = val; i++; break;
      default:
        break;
    }
  }
  return args;
}

function httpsPost(hostname, path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname,
      port: 443,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const responseBody = Buffer.concat(chunks).toString();
        resolve({ statusCode: res.statusCode, body: responseBody });
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(new Error('Request timeout')); });
    req.write(data);
    req.end();
  });
}

async function main() {
  const args = parseArgs(process.argv);

  // Resolve credentials: CLI args → env vars → error
  const username = args.username || process.env.GARUDA_USERNAME;
  const password = args.password || process.env.GARUDA_PASSWORD;
  const baseUrl = args.baseUrl || process.env.GARUDA_INTOUCH_BASE_URL || 'nightly.intouch.capillarytech.com';
  const orgIdOverride = args.orgId || process.env.GARUDA_ORG_ID || null;
  const outputPath = args.output ? path.resolve(args.output) : null;

  if (!username || !password) {
    console.log(JSON.stringify({
      success: false,
      error: 'Missing credentials. Provide --username/--password or set GARUDA_USERNAME/GARUDA_PASSWORD env vars.',
    }));
    process.exit(1);
  }

  if (!outputPath) {
    console.log(JSON.stringify({
      success: false,
      error: 'Missing required --output argument.',
    }));
    process.exit(1);
  }

  try {
    // Call the Arya login API
    const loginPath = '/arya/api/v1/auth/login';
    const response = await httpsPost(baseUrl, loginPath, { username, password });

    if (response.statusCode !== 200) {
      console.log(JSON.stringify({
        success: false,
        error: `Login API returned status ${response.statusCode}: ${response.body.slice(0, 200)}`,
      }));
      process.exit(1);
    }

    let loginData;
    try {
      loginData = JSON.parse(response.body);
    } catch {
      console.log(JSON.stringify({
        success: false,
        error: `Failed to parse login API response: ${response.body.slice(0, 200)}`,
      }));
      process.exit(1);
    }

    if (!loginData.success) {
      console.log(JSON.stringify({
        success: false,
        error: `Login failed: ${loginData.message || loginData.error || 'Unknown error'}`,
      }));
      process.exit(1);
    }

    if (!loginData.token || !loginData.user) {
      console.log(JSON.stringify({
        success: false,
        error: 'Login response missing token or user data.',
      }));
      process.exit(1);
    }

    // Determine orgID: override → API response
    const orgID = orgIdOverride
      ? (isNaN(orgIdOverride) ? orgIdOverride : Number(orgIdOverride))
      : loginData.user.orgID;

    // Build localStorage entries
    // localStorageApi from vulcan-react-sdk wraps values with JSON.stringify on save
    // So we must pre-stringify the values to match what the app expects
    const authData = {
      localStorage: {
        token: JSON.stringify(loginData.token),
        orgID: JSON.stringify(orgID),
        user: JSON.stringify(loginData.user),
        isLoggedIn: JSON.stringify(true),
      },
    };

    // Write auth JSON file
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify(authData, null, 2));

    console.log(JSON.stringify({
      success: true,
      path: outputPath,
      orgID,
      username,
      baseUrl,
    }));
  } catch (err) {
    console.log(JSON.stringify({
      success: false,
      error: err.message,
    }));
    process.exit(1);
  }
}

main();
