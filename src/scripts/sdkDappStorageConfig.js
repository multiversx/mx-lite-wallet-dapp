// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const dir = './node_modules/@multiversx/sdk-dapp/__chunks__';
const localStorageKeySearchData = [
  'persistReducersStorageType:"localStorage"',
  'persistReducersStorageType: "localStorage"'
];
const sessionStorageKeySearchData = [
  'persistReducersStorageType:"sessionStorage"',
  'persistReducersStorageType: "sessionStorage"'
];
const localStorageKey = 'persistReducersStorageType:"localStorage"';
const sessionStorageKey = 'persistReducersStorageType:"sessionStorage"';

// configure in .env your preference for redux account persistance
const config = {
  sessionStorage: {
    searchData: localStorageKeySearchData,
    replaceData: sessionStorageKey,
    info: 'sessionStorage replacement'
  },
  localStorage: {
    searchData: sessionStorageKeySearchData,
    replaceData: localStorageKey,
    info: 'localStorage replacement'
  }
};

function replaceInFiles(type = process.env.VITE_APP_PERSIST ?? 'localStorage') {
  const props = config[type];
  const dirname = dir;
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      throw err;
    }

    let done;

    for (const index in filenames) {
      const filePath = `${dirname}/${filenames[index]}`;

      if (filePath.endsWith('.js.map')) {
        continue;
      }

      try {
        let data = fs.readFileSync(filePath, 'utf-8');

        if (data.includes(props.replaceData)) {
          console.log(props.info + ' complete');
          return;
        }

        for (const searchData of props.searchData) {
          if (data.includes(searchData)) {
            let newValue = data.replace(searchData, props.replaceData);
            fs.writeFileSync(filePath, newValue, 'utf-8');
            console.log(props.info + ' complete');
            return;
          }
        }

        done = false;
      } catch (error) {
        console.log(
          '\x1b[33m%s\x1b[0m',
          'ERROR: ' + props.info + ' failed',
          error
        );
        throw err;
      }
    }

    if (!done) {
      const errorMessage = 'ERROR: unable to set ' + props.info + ' in sdkDapp';
      console.log('\x1b[33m%s\x1b[0m', errorMessage);
      throw errorMessage;
    }
  });
}

replaceInFiles();
