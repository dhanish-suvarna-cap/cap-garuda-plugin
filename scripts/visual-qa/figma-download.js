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
      case '--file-key':
        args.fileKey = val; i++; break;
      case '--node-id':
        args.nodeId = val; i++; break;
      case '--output':
        args.output = val; i++; break;
      case '--scale':
        args.scale = parseInt(val, 10); i++; break;
      default:
        break;
    }
  }
  return args;
}

function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGet(res.headers.location, {}).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve({ statusCode: res.statusCode, body, headers: res.headers });
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(new Error('Request timeout')); });
  });
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.fileKey || !args.nodeId || !args.output) {
    console.log(JSON.stringify({
      success: false,
      error: 'Missing required arguments. Usage: --file-key <key> --node-id <id> --output <path> [--scale 2]',
    }));
    process.exit(1);
  }

  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.log(JSON.stringify({
      success: false,
      error: 'FIGMA_ACCESS_TOKEN environment variable not set. Set it to your Figma personal access token.',
    }));
    process.exit(1);
  }

  const scale = args.scale || 2;
  const nodeId = args.nodeId.replace(/-/g, ':');
  const outputPath = path.resolve(args.output);

  try {
    // Step 1: Get image URL from Figma API
    const apiUrl = `https://api.figma.com/v1/images/${args.fileKey}?ids=${encodeURIComponent(nodeId)}&format=png&scale=${scale}`;
    const apiRes = await httpsGet(apiUrl, {
      'X-Figma-Token': token,
    });

    if (apiRes.statusCode !== 200) {
      console.log(JSON.stringify({
        success: false,
        error: `Figma API returned status ${apiRes.statusCode}: ${apiRes.body.toString().slice(0, 200)}`,
      }));
      process.exit(1);
    }

    const apiData = JSON.parse(apiRes.body.toString());

    if (apiData.err) {
      console.log(JSON.stringify({
        success: false,
        error: `Figma API error: ${apiData.err}`,
      }));
      process.exit(1);
    }

    const imageUrl = apiData.images && apiData.images[nodeId];
    if (!imageUrl) {
      const availableKeys = apiData.images ? Object.keys(apiData.images) : [];
      console.log(JSON.stringify({
        success: false,
        error: `No image URL returned for node "${nodeId}". Available keys: ${JSON.stringify(availableKeys)}`,
      }));
      process.exit(1);
    }

    // Step 2: Download the image
    const imgRes = await httpsGet(imageUrl, {});

    if (imgRes.statusCode !== 200) {
      console.log(JSON.stringify({
        success: false,
        error: `Image download failed with status ${imgRes.statusCode}`,
      }));
      process.exit(1);
    }

    // Step 3: Save to disk
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, imgRes.body);

    // Step 4: Get image dimensions using sharp (if available) or report without
    let dimensions = null;
    try {
      const sharp = require('sharp');
      const metadata = await sharp(outputPath).metadata();
      dimensions = { width: metadata.width, height: metadata.height };
    } catch {
      // sharp not available — dimensions unknown, still successful
    }

    console.log(JSON.stringify({
      success: true,
      path: outputPath,
      fileKey: args.fileKey,
      nodeId,
      scale,
      dimensions,
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
