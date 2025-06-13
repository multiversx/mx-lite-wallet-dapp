import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from 'components';
import { parsePem } from './helpers/parsePem';

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
  needsAddress?: boolean;
  anchor?: HTMLElement;
}

const Modal = ({ onSubmit, onClose, anchor }: ModalProps) => {
  const styles = anchor ? containerStyles : modalStyles;
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
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
      setError('Please select a PEM file');
      return;
    }

    const pemData = await parsePem(selectedFile);
    if (!pemData) {
      setError('Invalid PEM file format');
      return;
    }

    onSubmit({
      privateKey: pemData.privateKey,
      address: pemData.address
    });
  };

  const modal = (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Login with PEM File</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>PEM File</label>
            <div style={styles.fileUpload}>
              <input
                type='file'
                accept='.pem'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id='pem-file-input'
              />
              <label htmlFor='pem-file-input' style={{ cursor: 'pointer' }}>
                {fileName ? (
                  <div>
                    <div>✓ PEM file loaded</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {fileName}
                    </div>
                  </div>
                ) : (
                  'Click here to select a PEM file'
                )}
              </label>
            </div>
            {error && (
              <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                {error}
              </div>
            )}
          </div>
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

export class PemLoginModal {
  private static instance: PemLoginModal;
  private _modalRoot: HTMLDivElement;

  private constructor() {
    this._modalRoot = document.createElement('div');
    document.body.appendChild(this._modalRoot);
  }

  public static getInstance(): PemLoginModal {
    if (!PemLoginModal.instance) {
      PemLoginModal.instance = new PemLoginModal();
    }
    return PemLoginModal.instance;
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
          needsAddress={options?.needsAddress}
          anchor={options?.anchor}
        />
      );
    });
  }
}
