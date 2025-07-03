import React, { useCallback, useState } from 'react';
import { Button, AddressScreens } from 'components';
import { UserSecretKey, UserWallet } from 'lib';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '15px'
  },
  button: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    ':hover': {
      backgroundColor: '#1d4ed8'
    }
  },
  fileUpload: {
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    backgroundColor: '#f9f9f9'
  }
};

const parseKeystore = (file: File): Promise<Record<string, any> | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        if (!result) {
          return resolve(null);
        }

        const data = JSON.parse(result);
        resolve(data);
      } catch (error) {
        resolve(null);
      }
    };

    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
};

interface KeystorePanelProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
}

interface WalletData {
  privateKey: string;
  address: string;
}

interface AddressAccount {
  address: string;
  index: number;
}

const accessWallet = ({
  kdContent,
  accessPassVal,
  index = 0
}: {
  kdContent: Record<string, any>;
  accessPassVal: string;
  index?: number;
}): { privateKey: string; address: string } | null => {
  try {
    let privateKey = '';
    let accountAddress = '';

    if (kdContent.kind === 'mnemonic') {
      const mnemonicObj = UserWallet.decryptMnemonic(kdContent, accessPassVal);
      const deriveKey = mnemonicObj.deriveKey(index);
      const secretKeyHex = deriveKey.hex();
      const secretKey = UserSecretKey.fromString(secretKeyHex);
      accountAddress = secretKey.generatePublicKey().toAddress().toBech32();
      privateKey = secretKey.hex();
    } else {
      const decryptedSecretKey = UserWallet.decryptSecretKey(
        kdContent,
        accessPassVal
      );

      const secretKeyUint8Array = new Uint8Array(
        Buffer.from(decryptedSecretKey.hex(), 'hex')
      );

      const secretKey = new UserSecretKey(secretKeyUint8Array);
      const address = secretKey.generatePublicKey().toAddress();
      privateKey = secretKey.hex();
      accountAddress = address.toBech32();
    }

    return {
      privateKey,
      address: accountAddress
    };
  } catch (e) {
    return null;
  }
};

const getKeystoreAddresses = ({
  kdContent,
  accessPassVal,
  index = 0,
  count = 10
}: {
  kdContent: Record<string, any>;
  accessPassVal: string;
  index?: number;
  count?: number;
}): WalletData[] => {
  const addresses: WalletData[] = [];

  for (let i = index; i < index + count; i++) {
    const walletData = accessWallet({
      kdContent,
      accessPassVal,
      index: i
    });

    if (walletData) {
      addresses.push(walletData);
    }
  }

  return addresses;
};

export const KeystorePanel = ({ onSubmit, onClose }: KeystorePanelProps) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [keystoreData, setKeystoreData] = useState<Record<string, any> | null>(
    null
  );
  const [accounts, setAccounts] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<AddressAccount | null>(
    null
  );

  const defaultAddressesPerPage = 10;

  const handleClose = useCallback(() => {
    // Reset form state when closing
    setSelectedFile(null);
    setFileName('');
    setPassword('');
    setError('');
    setShowAddressSelection(false);
    setKeystoreData(null);
    setAccounts([]);
    setSelectedAddress(null);
    onClose();
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setError('');
    }
  };

  const handleBackToKeystore = useCallback(() => {
    setShowAddressSelection(false);
    setKeystoreData(null);
    setAccounts([]);
    setSelectedAddress(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a keystore file');
      return;
    }

    if (!password) {
      setError('Please enter your keystore password');
      return;
    }

    const keystoreDataParsed = await parseKeystore(selectedFile);
    if (!keystoreDataParsed) {
      setError('Invalid keystore file format');
      return;
    }

    // Test the password with the first account
    const walletData = accessWallet({
      kdContent: keystoreDataParsed,
      accessPassVal: password
    });

    if (!walletData) {
      setError('Invalid password or corrupted keystore file');
      return;
    }

    // Check if it's a mnemonic (multiple addresses) or single key
    if (keystoreDataParsed.kind === 'mnemonic') {
      // Show address selection for mnemonic
      setKeystoreData(keystoreDataParsed);
      const addresses = getKeystoreAddresses({
        kdContent: keystoreDataParsed,
        accessPassVal: password,
        index: startIndex,
        count: defaultAddressesPerPage
      }).map(({ address }) => address);

      setAccounts(addresses);
      setShowAddressSelection(true);
    } else {
      // Single key, proceed directly
      onSubmit({
        privateKey: walletData.privateKey,
        address: walletData.address
      });
    }
  };

  const handleSelectAddress = useCallback((address: AddressAccount | null) => {
    setSelectedAddress(address);
  }, []);

  const handleGoToNextPage = useCallback(() => {
    setSelectedAddress(null);
    const newStartIndex = startIndex + defaultAddressesPerPage;
    setStartIndex(newStartIndex);

    if (keystoreData) {
      const addresses = getKeystoreAddresses({
        kdContent: keystoreData,
        accessPassVal: password,
        index: newStartIndex,
        count: defaultAddressesPerPage
      }).map(({ address }) => address);

      setAccounts(addresses);
    }
  }, [startIndex, keystoreData, password]);

  const handleGoToPrevPage = useCallback(() => {
    setSelectedAddress(null);
    const newStartIndex = Math.max(0, startIndex - defaultAddressesPerPage);
    setStartIndex(newStartIndex);

    if (keystoreData) {
      const addresses = getKeystoreAddresses({
        kdContent: keystoreData,
        accessPassVal: password,
        index: newStartIndex,
        count: defaultAddressesPerPage
      }).map(({ address }) => address);

      setAccounts(addresses);
    }
  }, [startIndex, keystoreData, password]);

  const handleGoToSpecificPage = useCallback(
    (page: number) => {
      setSelectedAddress(null);
      const newStartIndex = page * defaultAddressesPerPage;
      setStartIndex(newStartIndex);

      if (keystoreData) {
        const addresses = getKeystoreAddresses({
          kdContent: keystoreData,
          accessPassVal: password,
          index: newStartIndex,
          count: defaultAddressesPerPage
        }).map(({ address }) => address);

        setAccounts(addresses);
      }
    },
    [keystoreData, password]
  );

  const handleConfirmSelectedAddress = useCallback(() => {
    if (!selectedAddress || !keystoreData) {
      return;
    }

    const walletData = accessWallet({
      kdContent: keystoreData,
      accessPassVal: password,
      index: selectedAddress.index
    });

    if (walletData) {
      onSubmit({
        privateKey: walletData.privateKey,
        address: walletData.address
      });
    }
  }, [selectedAddress, keystoreData, password, onSubmit]);

  if (showAddressSelection) {
    return (
      <div data-testid={DataTestIdsEnum.addressSelectionPanel}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <Button
            onClick={handleBackToKeystore}
            data-testid={DataTestIdsEnum.backToKeystoreBtn}
            style={{ marginRight: '10px' }}
          >
            ← Back
          </Button>
          <h2>Select Address</h2>
        </div>
        <AddressScreens
          accounts={accounts}
          loading={false}
          onGoToNextPage={handleGoToNextPage}
          onGoToPrevPage={handleGoToPrevPage}
          onSelectAddress={handleSelectAddress}
          onGoToSpecificPage={handleGoToSpecificPage}
          startIndex={startIndex}
          selectedAddress={selectedAddress?.address}
          className='p-0'
          onConfirmSelectedAddress={handleConfirmSelectedAddress}
          addressTableClassNames={{
            ledgerModalTitleClassName: 'ledger-modal-title',
            ledgerModalSubtitleClassName: 'ledger-modal-subtitle',
            ledgerModalTableHeadClassName: 'ledger-modal-table-head',
            ledgerModalTableItemClassName: 'ledger-modal-table-item',
            ledgerModalButtonClassName:
              'button primary large ledger-modal-button',
            ledgerModalTableSelectedItemClassName:
              'ledger-modal-table-selected-item'
          }}
        />
      </div>
    );
  }

  return (
    <div data-testid={DataTestIdsEnum.keystoreLoginPanel}>
      <h2>Login with Keystore File</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Keystore File</label>
          <div
            style={styles.fileUpload}
            data-testid={DataTestIdsEnum.keystoreBtn}
          >
            <input
              type='file'
              accept='.json'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id='keystore-file-input'
              data-testid={DataTestIdsEnum.walletFile}
            />
            <label htmlFor='keystore-file-input' style={{ cursor: 'pointer' }}>
              {fileName ? (
                <div>
                  <div>✓ Keystore file loaded</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {fileName}
                  </div>
                </div>
              ) : (
                'Click here to select a keystore file'
              )}
            </label>
          </div>
        </div>
        <div>
          <label>
            Password
            <input
              style={styles.input}
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter keystore password'
              required
              data-testid={DataTestIdsEnum.accessPass}
            />
          </label>
        </div>
        {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
        <div style={styles.buttonGroup}>
          <Button
            onClick={handleClose}
            {...{ style: styles.button }}
            data-testid={DataTestIdsEnum.cancelBtn}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            {...{ style: styles.button }}
            data-testid={DataTestIdsEnum.submitButton}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
