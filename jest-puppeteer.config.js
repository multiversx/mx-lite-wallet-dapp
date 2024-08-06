/* eslint-disable */
/* tslint:disable */
const fs = require('fs');
const path = require('path');

const getChromeExecutablePath = () => {
  const chromeHeadlessShellPath = './chrome-headless-shell';
  const platform = process.platform; // Get the platform

  if (platform === 'linux') {
    const dirs = fs.readdirSync(chromeHeadlessShellPath);
    const chromeDirectory = dirs.find((dir) => dir.startsWith('linux-'));

    if (chromeDirectory) {
      return path.resolve(
        __dirname,
        chromeHeadlessShellPath,
        chromeDirectory,
        'chrome-headless-shell-linux64/chrome-headless-shell'
      );
    } else {
      throw new Error('Chrome headless shell directory not found');
    }
  } else if (platform === 'darwin') {
    // macOS
    const dirs = fs.readdirSync(chromeHeadlessShellPath);
    const chromeDirectory = dirs.find((dir) => dir.startsWith('mac_arm-'));

    if (chromeDirectory) {
      return path.resolve(
        __dirname,
        chromeHeadlessShellPath,
        chromeDirectory,
        'chrome-headless-shell-mac-arm64/chrome-headless-shell'
      );
    } else {
      throw new Error('Chrome headless shell directory not found');
    }
  } else {
    throw new Error('Unsupported platform');
  }
};

const isHeadless = process.env.HEADLESS !== 'false';

const args = [
  '--start-maximized', // Required to start in full screen
  '--disable-web-security', // Required for iframe to work
  '--ignore-certificate-errors' // Required for HTTPS to work
];

if (isHeadless) {
  args.unshift(
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    `--headless=new`
  );
}

const config = {
  preset: 'jest-puppeteer',
  testMatch: ['**/src/**/*.e2e.ts'],
  setupFilesAfterEnv: ['./src/setupPuppeteerTests.ts'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  bail: 1,
  workerIdleMemoryLimit: '512MB', // Memory used per worker. Required to prevent memory leaks
  maxWorkers: '50%', // Maximum tests ran in parallel. Required to prevent CPU usage at 100%
  launch: {
    headless: false,
    product: 'chrome',
    defaultViewport: { width: 1600, height: 800 },
    args,
    executablePath: getChromeExecutablePath(), // optional locally, required on Git Action
    devtools: !isHeadless
  },
  server: {
    command: 'vite preview'
  },
  exitOnPageError: false,
  browserContext: isHeadless ? 'incognito' : 'default',
  browserPerWorker: true
};

if (!isHeadless) {
  delete config.launch.executablePath;
}

module.exports = config;
