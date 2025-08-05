/* eslint-disable */
/* tslint:disable */
const {
  getChromeExecutablePath
} = require('./puppeteer/get-chrome-executable-path');

const isLinux = process.platform === 'linux';
const isHeadless = process.env.HEADLESS !== 'false';
const chromePath = process.env.CHROME_PATH;

const args = [
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--start-maximized', // Required to start in full screen
  '--disable-web-security', // Required for iframe to work
  '--ignore-certificate-errors', // Required for HTTPS to work
];

const shouldRemoveExecutablePath = !isHeadless && !isLinux && !chromePath;

const config = {
  preset: 'jest-puppeteer',
  testMatch: ['**/src/**/*.e2e.ts'],
  setupFilesAfterEnv: ['./src/setupPuppeteerTests.ts'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  bail: 1,
  workerIdleMemoryLimit: '512MB',
  maxWorkers: isHeadless ? 2 : 1,
  launch: {
    slowMo: 0,
    headless: isHeadless,
    dumpio: false, // Enable to see machine logs
    product: 'chrome',
    defaultViewport: isHeadless ? { width: 1600, height: 800 } : null,
    args,
    ...(shouldRemoveExecutablePath
      ? {}
      : { executablePath: getChromeExecutablePath() }),
    devtools: false // Enable to see browser console
  },
  server: { command: 'vite preview' },
  exitOnPageError: false,
  browserContext: 'incognito',
  browserPerWorker: true
};

module.exports = config;
