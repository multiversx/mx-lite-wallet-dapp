import React, { useCallback } from 'react';
import { Button } from 'components';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { parsePem } from 'providers/Pem/parsePem';

const styles = {
  container: {
    width: '100%',
    height: '100%',
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

interface PemPanelProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
}

export const PemPanel = ({ onSubmit, onClose }: PemPanelProps) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setFileName('');
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

  return (
    <div style={styles.container} data-testid={DataTestIdsEnum.pemLoginPanel}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>PEM File</label>
          <div style={styles.fileUpload} data-testid={DataTestIdsEnum.pemBtn}>
            <input
              type='file'
              accept='.pem'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id='pem-file-input-panel'
              data-testid={DataTestIdsEnum.walletFile}
            />
            <label
              htmlFor='pem-file-input-panel'
              style={{ cursor: 'pointer', width: '100%', display: 'block' }}
            >
              {fileName ? (
                <div>
                  <div>✓ PEM file loaded</div>
                  <div style={{ fontSize: '14px', color: '#aaa' }}>
                    {fileName}
                  </div>
                </div>
              ) : (
                'Click here to select a PEM file'
              )}
            </label>
          </div>
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
