import React, { useCallback } from 'react';
import { Button } from 'components';
import { parsePem } from '../../providers/helpers/parsePem';

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
    <div>
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
              id='pem-file-input-panel'
            />
            <label htmlFor='pem-file-input-panel' style={{ cursor: 'pointer' }}>
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
