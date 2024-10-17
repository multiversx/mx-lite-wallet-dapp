/* eslint-disable */
/* tslint:disable */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isLinux = process.platform === 'linux';
const isHeadless = process.env.HEADLESS !== 'false';
const chromePath = process.env.CHROME_PATH;

const findFile = (folderPath, fileName) => {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const found = findFile(filePath, fileName);
      if (found) return found;
    } else if (file === fileName) {
      return filePath;
    }
  }

  return null;
};

const getLinuxChromiumPath = () => {
  try {
    // Try to get the path using 'which' command
    try {
      return execSync('which chromium-browser', { encoding: 'utf8' }).trim();
    } catch (e) {
      // If 'which chromium-browser' fails, try 'which chromium'
      try {
        return execSync('which chromium', { encoding: 'utf8' }).trim();
      } catch (e) {
        // If both fail, continue to next method
      }
    }

    // Check common snap installation path
    const snapPath = '/snap/bin/chromium';

    if (fs.existsSync(snapPath)) {
      return snapPath;
    }

    // Check another common installation path
    const commonPath = '/usr/bin/chromium-browser';

    if (fs.existsSync(commonPath)) {
      return commonPath;
    }

    // If all attempts fail, return null
    return null;
  } catch (error) {
    console.error('Error finding Chromium path:', error);
    return null;
  }
};

const getChromeExecutablePath = () => {
  if (chromePath) {
    return chromePath;
  }

  return !isHeadless && isLinux ? getLinuxChromiumPath() : undefined;
};

const args = [
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--start-maximized', // Required to start in full screen
  '--disable-web-security', // Required for iframe to work
  '--ignore-certificate-errors' // Required for HTTPS to work
];

const config = {
  preset: 'jest-puppeteer',
  testMatch: ['**/src/**/*.e2e.ts'],
  setupFilesAfterEnv: ['./src/setupPuppeteerTests.ts'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  bail: 1,
  workerIdleMemoryLimit: '512MB',
  maxWorkers: isHeadless ? '100%' : 1,
  launch: {
    headless: isHeadless,
    dumpio: false, // Enable to see machine logs
    product: 'chrome',
    defaultViewport: isHeadless ? { width: 1600, height: 800 } : null,
    args,
    executablePath: getChromeExecutablePath(),
    devtools: false // Enable to see browser console
  },
  server: {
    command: 'vite preview'
  },
  exitOnPageError: false,
  browserContext: isHeadless ? 'incognito' : 'default',
  browserPerWorker: true
};

if (!isHeadless && !isLinux && !chromePath) {
  delete config.launch.executablePath;
}

module.exports = config;
