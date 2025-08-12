/* eslint-disable */
/* tslint:disable */
const { getLinuxChromiumPath } = require('./get-linux-chromium-path');

const isLinux = process.platform === 'linux';
const isHeadless = process.env.HEADLESS !== 'false';
const chromePath = process.env.CHROME_PATH;

const getChromeExecutablePath = () => {
  if (chromePath) {
    return chromePath;
  }

  return !isHeadless && isLinux ? getLinuxChromiumPath() : undefined;
};

module.exports = {
  getChromeExecutablePath
};
