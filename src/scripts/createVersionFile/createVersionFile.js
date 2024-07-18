// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const buildDir = './build';

function createVersionFile() {
  try {
    const gitShortHash = execSync('git rev-parse --short HEAD')
      .toString()
      .trim();
    const versionData = JSON.stringify({ version: gitShortHash });

    const escapedHash = gitShortHash.replace(/"/g, '\\"');
    const versionDataJson = `{ "hash": "${escapedHash}" }`;

    fs.writeFileSync('./version.json', versionDataJson);

    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir);
    }

    fs.writeFileSync(`${buildDir}/version.json`, versionData);

    console.log('Version file created successfully.');
  } catch (error) {
    console.error('Error creating version file:', error.message);
  }
}

module.exports = createVersionFile;
