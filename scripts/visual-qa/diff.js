#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    const val = argv[i + 1];
    switch (key) {
      case '--expected':
        args.expected = val; i++; break;
      case '--actual':
        args.actual = val; i++; break;
      case '--output':
        args.output = val; i++; break;
      case '--threshold':
        args.threshold = parseFloat(val); i++; break;
      default:
        break;
    }
  }
  return args;
}

async function loadAndResize(imagePath, targetWidth, targetHeight) {
  const resized = await sharp(imagePath)
    .resize(targetWidth, targetHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer();

  return resized;
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.expected || !args.actual || !args.output) {
    console.log(JSON.stringify({
      success: false,
      error: 'Missing required arguments. Usage: --expected <path> --actual <path> --output <path> [--threshold 0.1]',
    }));
    process.exit(1);
  }

  const threshold = args.threshold !== undefined ? args.threshold : 0.1;
  const expectedPath = path.resolve(args.expected);
  const actualPath = path.resolve(args.actual);
  const outputPath = path.resolve(args.output);

  if (!fs.existsSync(expectedPath)) {
    console.log(JSON.stringify({ success: false, error: `Expected image not found: ${expectedPath}` }));
    process.exit(1);
  }
  if (!fs.existsSync(actualPath)) {
    console.log(JSON.stringify({ success: false, error: `Actual image not found: ${actualPath}` }));
    process.exit(1);
  }

  try {
    // Get metadata for both images
    const expectedMeta = await sharp(expectedPath).metadata();
    const actualMeta = await sharp(actualPath).metadata();

    // Use the larger dimensions as the comparison canvas
    // This ensures both images are fully represented
    const targetWidth = Math.max(expectedMeta.width, actualMeta.width);
    const targetHeight = Math.max(expectedMeta.height, actualMeta.height);

    // Resize both images to the same dimensions
    const expectedBuf = await loadAndResize(expectedPath, targetWidth, targetHeight);
    const actualBuf = await loadAndResize(actualPath, targetWidth, targetHeight);

    // Create diff output buffer
    const diffPng = new PNG({ width: targetWidth, height: targetHeight });

    // Run pixelmatch
    const diffPixels = pixelmatch(
      expectedBuf,
      actualBuf,
      diffPng.data,
      targetWidth,
      targetHeight,
      {
        threshold,
        includeAA: false,
        alpha: 0.1,
        diffColor: [255, 0, 0],
        diffColorAlt: [0, 0, 255],
      }
    );

    // Write diff image
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const diffBuffer = PNG.sync.write(diffPng);
    fs.writeFileSync(outputPath, diffBuffer);

    const totalPixels = targetWidth * targetHeight;
    const mismatchPercent = parseFloat(((diffPixels / totalPixels) * 100).toFixed(2));

    console.log(JSON.stringify({
      success: true,
      mismatch_percent: mismatchPercent,
      diff_pixels: diffPixels,
      total_pixels: totalPixels,
      path: outputPath,
      dimensions: { width: targetWidth, height: targetHeight },
      expected_original: { width: expectedMeta.width, height: expectedMeta.height },
      actual_original: { width: actualMeta.width, height: actualMeta.height },
      threshold,
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
