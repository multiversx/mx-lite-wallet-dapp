/* eslint-disable */
/* tslint:disable */
const { execSync } = require('child_process');

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

module.exports = {
  getLinuxChromiumPath
};
