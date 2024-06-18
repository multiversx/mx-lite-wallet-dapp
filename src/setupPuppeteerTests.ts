/**
 * Issue: "Error: Port 3002 is already in use"
 * Fix: killall node
 *
 * Issue: Tests fail, but pass individual
 * Fix: Uncomment maxWorkers from jest-puppeteer.config.js
 *
 * https://github.com/argos-ci/jest-puppeteer#globaljestpuppeteerresetpage
 */

jest.setTimeout(60000);
jest.retryTimes(
  process.env.JEST_PPTR_RETRY_TIMES
    ? Number(process.env.JEST_PPTR_RETRY_TIMES)
    : 5
);
