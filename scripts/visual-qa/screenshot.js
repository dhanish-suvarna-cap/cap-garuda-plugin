#!/usr/bin/env node
'use strict';

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    const val = argv[i + 1];
    switch (key) {
      case '--url':
        args.url = val; i++; break;
      case '--output':
        args.output = val; i++; break;
      case '--viewport':
        args.viewport = val; i++; break;
      case '--wait':
        args.wait = parseInt(val, 10); i++; break;
      case '--selector':
        args.selector = val; i++; break;
      case '--auth-json':
        args.authJson = val; i++; break;
      case '--full-page':
        args.fullPage = true; break;
      default:
        break;
    }
  }
  return args;
}

function parseViewport(viewportStr) {
  const [width, height] = viewportStr.split('x').map(Number);
  if (!width || !height) {
    throw new Error(`Invalid viewport format: "${viewportStr}". Expected WxH (e.g. 1280x800)`);
  }
  return { width, height };
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.url) {
    console.error(JSON.stringify({ success: false, error: 'Missing required --url argument' }));
    process.exit(1);
  }

  if (!args.output) {
    console.error(JSON.stringify({ success: false, error: 'Missing required --output argument' }));
    process.exit(1);
  }

  const viewport = args.viewport ? parseViewport(args.viewport) : { width: 1280, height: 800 };
  const waitMs = args.wait || 3000;
  const fullPage = args.fullPage || false;
  const outputPath = path.resolve(args.output);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Auth injection: inject localStorage entries before navigating to the target URL
    if (args.authJson) {
      try {
        const authData = JSON.parse(fs.readFileSync(path.resolve(args.authJson), 'utf8'));
        if (authData.localStorage) {
          // Navigate to origin first (required to set localStorage for that domain)
          const urlObj = new URL(args.url);
          await page.goto(urlObj.origin, { waitUntil: 'domcontentloaded', timeout: 15000 });
          // Inject localStorage entries
          await page.evaluate((entries) => {
            for (const [key, value] of Object.entries(entries)) {
              localStorage.setItem(key, value);
            }
          }, authData.localStorage);
        }
      } catch (authErr) {
        // Auth injection failed — continue without auth, screenshot may show login page
        console.error(`Warning: Auth injection failed: ${authErr.message}`);
      }
    }

    await page.goto(args.url, { waitUntil: 'networkidle', timeout: 60000 });

    if (waitMs > 0) {
      await page.waitForTimeout(waitMs);
    }

    if (args.selector) {
      const element = await page.$(args.selector);
      if (!element) {
        console.log(JSON.stringify({
          success: false,
          error: `Selector "${args.selector}" not found on page`,
        }));
        process.exit(1);
      }
      await element.screenshot({ path: outputPath });
    } else {
      await page.screenshot({ path: outputPath, fullPage });
    }

    console.log(JSON.stringify({
      success: true,
      path: outputPath,
      viewport,
      url: args.url,
      authenticated: !!args.authJson,
    }));
  } catch (err) {
    console.log(JSON.stringify({
      success: false,
      error: err.message,
    }));
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

main();
