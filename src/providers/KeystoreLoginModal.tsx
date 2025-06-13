import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from 'components';
import { UserSecretKey, UserWallet } from 'lib';

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%'
  },
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

const containerStyles = {
  ...modalStyles,
  overlay: {
    position: 'relative' as const
  },
  modal: {
    padding: modalStyles.modal.padding,
    borderRadius: '8px',
    width: '100%',
    maxWidth: '100%'
  }
};

interface ModalProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
  anchor?: HTMLElement;
}

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

const Modal = ({ onSubmit, onClose, anchor }: ModalProps) => {
  const styles = anchor ? containerStyles : modalStyles;
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

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

  const modal = (
    <div style={styles.overlay}>
      <div style={styles.modal}>
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
              <label
                htmlFor='keystore-file-input'
                style={{ cursor: 'pointer' }}
              >
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
          {error && (
            <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>
          )}
          <div style={styles.buttonGroup}>
            <Button onClick={onClose} {...{ style: styles.button }}>
              Cancel
            </Button>
            <Button type='submit' {...{ style: styles.button }}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, anchor || document.body);
};

export class KeystoreLoginModal {
  private static instance: KeystoreLoginModal;
  private _modalRoot: HTMLDivElement;

  private constructor() {
    this._modalRoot = document.createElement('div');
    document.body.appendChild(this._modalRoot);
  }

  public static getInstance(): KeystoreLoginModal {
    if (!KeystoreLoginModal.instance) {
      KeystoreLoginModal.instance = new KeystoreLoginModal();
    }
    return KeystoreLoginModal.instance;
  }

  public showModal(options?: {
    needsAddress: boolean;
    anchor?: HTMLElement;
  }): Promise<{
    privateKey: string;
    address: string;
  }> {
    return new Promise((resolve) => {
      const root = createRoot(this._modalRoot);

      const handleSubmit = (values: {
        privateKey: string;
        address: string;
      }) => {
        root.unmount();
        resolve(values);
      };

      const handleClose = () => {
        root.unmount();
        resolve({ privateKey: '', address: '' });
      };

      root.render(
        <Modal
          onSubmit={handleSubmit}
          onClose={handleClose}
          anchor={options?.anchor}
        />
      );
    });
  }
}
