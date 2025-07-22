import { ChangeEvent, FormEvent, ReactNode } from 'react';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

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

export interface FileLoginPanelProps {
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
  fileName: string;
  error: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileLabel: string;
  fileAccept: string;
  fileInputId: string;
  placeholder: string;
  dataTestId: string;
  fileUploadTestId: string;
  children?: ReactNode;
}

export const FileLoginPanel = ({
  onSubmit,
  onClose,
  fileName,
  error,
  onFileChange,
  fileLabel,
  fileAccept,
  fileInputId,
  placeholder,
  dataTestId,
  fileUploadTestId,
  children
}: FileLoginPanelProps) => {
  return (
    <div style={styles.container} data-testid={dataTestId}>
      <form onSubmit={onSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>{fileLabel}</label>
          <div style={styles.fileUpload} data-testid={fileUploadTestId}>
            <input
              type='file'
              accept={fileAccept}
              onChange={onFileChange}
              style={{ display: 'none' }}
              id={fileInputId}
              data-testid={DataTestIdsEnum.walletFile}
            />
            <label
              htmlFor={fileInputId}
              style={{ cursor: 'pointer', width: '100%', display: 'block' }}
            >
              {fileName ? (
                <div>
                  <div>✓ {fileLabel} loaded</div>
                  <div style={{ fontSize: '14px', color: '#aaa' }}>
                    {fileName}
                  </div>
                </div>
              ) : (
                placeholder
              )}
            </label>
          </div>
        </div>

        {children}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.buttonGroup}>
          <button
            onClick={onClose}
            style={styles.button}
            data-testid={DataTestIdsEnum.cancelBtn}
            type='button'
          >
            Cancel
          </button>
          <button
            type='submit'
            style={styles.button}
            data-testid={DataTestIdsEnum.submitButton}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
