import React, { useCallback } from 'react';
import { Button } from 'components';
import { UserSecretKey, UserWallet } from 'lib';

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

interface KeystorePanelProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
}

export const KeystorePanel = ({ onSubmit, onClose }: KeystorePanelProps) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleClose = useCallback(() => {
    // Reset form state when closing
    setSelectedFile(null);
    setFileName('');
    setPassword('');
    setError('');
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

    const keystoreData = await parseKeystore(selectedFile);
    if (!keystoreData) {
      setError('Invalid keystore file format');
      return;
    }

    const walletData = accessWallet({
      kdContent: keystoreData,
      accessPassVal: password
    });

    if (!walletData) {
      setError('Invalid password or corrupted keystore file');
      return;
    }

    onSubmit({
      privateKey: walletData.privateKey,
      address: walletData.address
    });
  };

  return (
    <div>
      <h2>Login with Keystore File</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Keystore File</label>
          <div style={styles.fileUpload}>
            <input
              type='file'
              accept='.json'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id='keystore-file-input'
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
            />
          </label>
        </div>
        {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
        <div style={styles.buttonGroup}>
          <Button onClick={handleClose} {...{ style: styles.button }}>
            Cancel
          </Button>
          <Button type='submit' {...{ style: styles.button }}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
