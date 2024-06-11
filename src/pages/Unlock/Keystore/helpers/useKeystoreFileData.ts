import { useState } from 'react';
import { useSelector } from 'react-redux';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { accountSelector } from 'redux/selectors';

export const useKeystoreFileData = () => {
  const { keystoreFile } = useSelector(accountSelector);

  let initialWalletFile;

  try {
    const keystoreParsed = JSON.parse(keystoreFile);
    initialWalletFile = keystoreParsed[WALLET_FILE];

    // Keystore files is a JSON string when using cheat
    if (typeof initialWalletFile === 'string') {
      initialWalletFile = JSON.parse(initialWalletFile);
    }

    initialWalletFile.name = keystoreParsed[WALLET_FILE_NAME];
  } catch {}

  const [file, setFile] = useState(initialWalletFile);

  return {
    file,
    setFile,
    initialWalletFile
  };
};
