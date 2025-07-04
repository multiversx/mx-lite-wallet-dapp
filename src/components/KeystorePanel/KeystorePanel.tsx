import React, { useCallback, useState } from 'react';
import { Button, AddressScreens } from 'components';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { accessWallet } from '../../providers/Keystore/accessWallet';
import { parseKeystoreJSON } from '../../providers/Keystore/parseKeystoreJSON';

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'stretch'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    width: '100%'
  },
  input: {
    padding: '10px',
    marginTop: '6px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #333',
    background: '#18181b',
    color: '#fff',
    fontSize: '16px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '10px'
  },
  button: {
    backgroundColor: '#232326',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: '8px',
    border: '1px solid #333',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'background 0.2s, border 0.2s'
  },
  fileUpload: {
    border: '2px dashed #333',
    borderRadius: '8px',
    padding: '18px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    background: '#232326',
    color: '#fff',
    fontSize: '16px',
    marginTop: '6px'
  },
  label: {
    fontWeight: 500,
    fontSize: '15px',
    color: '#fff',
    marginBottom: '4px',
    display: 'block'
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px'
  }
};

interface KeystorePanelProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
}

export const KeystorePanel = ({ onSubmit, onClose }: KeystorePanelProps) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [keystoreData, setKeystoreData] = useState<Record<string, any> | null>(
    null
  );

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setFileName('');
    setPassword('');
    setError('');
    setShowAddressSelection(false);
    setKeystoreData(null);
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

    const keystoreDataParsed = await parseKeystoreJSON(selectedFile);
    if (!keystoreDataParsed) {
      setError('Invalid keystore file format');
      return;
    }

    // Test the password with the first account
    const walletData = accessWallet({
      kdContent: keystoreDataParsed,
      accessPassVal: password,
      index: 0
    });

    if (!walletData) {
      setError('Invalid password or corrupted keystore file');
      return;
    }

    // Check if it's a mnemonic (multiple addresses) or single key
    if (keystoreDataParsed.kind === 'mnemonic') {
      setKeystoreData(keystoreDataParsed);
      setShowAddressSelection(true);
    } else {
      // Single key, proceed directly
      onSubmit({
        privateKey: walletData.privateKey,
        address: walletData.address
      });
    }
  };

  // Handler for when an address is confirmed in AddressScreens
  const handleConfirmSelectedAddress = useCallback(
    (account: { index: number }) => {
      if (!account || !keystoreData) return;
      // Derive privateKey for the selected index
      const walletData = accessWallet({
        kdContent: keystoreData,
        accessPassVal: password,
        index: account.index
      });
      if (walletData) {
        onSubmit({
          privateKey: walletData.privateKey,
          address: walletData.address
        });
      }
    },
    [keystoreData, password, onSubmit]
  );

  if (showAddressSelection && keystoreData) {
    return (
      <div
        style={styles.container}
        data-testid={DataTestIdsEnum.addressSelectionPanel}
      >
        <AddressScreens
          kdContent={keystoreData}
          accessPassVal={password}
          onConfirmSelectedAddress={handleConfirmSelectedAddress}
          className='p-0'
        />
      </div>
    );
  }

  return (
    <div
      style={styles.container}
      data-testid={DataTestIdsEnum.keystoreLoginPanel}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>Keystore File</label>
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
            <label
              htmlFor='keystore-file-input'
              style={{ cursor: 'pointer', width: '100%', display: 'block' }}
            >
              {fileName ? (
                <div>
                  <div>✓ Keystore file loaded</div>
                  <div style={{ fontSize: '14px', color: '#aaa' }}>
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
          <label style={styles.label}>
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
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.buttonGroup}>
          <Button
            onClick={handleClose}
            style={styles.button}
            data-testid={DataTestIdsEnum.cancelBtn}
            type='button'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            style={styles.button}
            data-testid={DataTestIdsEnum.submitButton}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
