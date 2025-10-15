import { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { accessWallet } from '../../providers/Keystore/accessWallet';
import { parseKeystoreJSON } from '../../providers/Keystore/parseKeystoreJSON';
import { AddressScreens } from '../AddressScreens/AddressScreens';
import {
  FileLoginPanel,
  FileLoginFormValues
} from '../FileLoginPanel/FileLoginPanel';

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
    marginTop: '4px'
  }
};

interface IKeystorePanelProps {
  onSubmit: (values: {
    privateKey: string;
    address: string;
    keystoreFile?: string;
    keystoreFileName?: string;
    addressIndex?: number;
  }) => void;
  onClose: () => void;
  needsAddress?: boolean;
  savedKeystoreFile?: string;
  keystoreFileName?: string;
}

export const KeystorePanel = ({
  onSubmit,
  onClose,
  needsAddress,
  savedKeystoreFile,
  keystoreFileName
}: IKeystorePanelProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [keystoreData, setKeystoreData] = useState<Record<string, any> | null>(
    null
  );
  const [savedFileContent, setSavedFileContent] = useState<string | null>(null);

  useEffect(() => {
    if (!savedKeystoreFile) {
      return;
    }

    try {
      setFileName(keystoreFileName || 'keystore.json');
      setSavedFileContent(savedKeystoreFile);
    } catch (e) {
      console.error('Error parsing saved keystore file', e);
    }
  }, [savedKeystoreFile, keystoreFileName]);

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setFileName('');
    setPassword('');
    setError('');
    setShowAddressSelection(false);
    setKeystoreData(null);
    onClose();
  }, [onClose]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setError('');
      setSavedFileContent(null);
    }
  };

  const handleSubmit = async (values: FileLoginFormValues) => {
    const file = values.file || selectedFile;
    const submittedPassword = values.password || password;

    if (!file && !savedFileContent) {
      setError('Please select a keystore file');
      return;
    }

    if (!submittedPassword) {
      setError('Please enter your keystore password');
      return;
    }

    let keystoreDataParsed;

    if (file) {
      keystoreDataParsed = await parseKeystoreJSON(file);
    } else if (savedFileContent) {
      keystoreDataParsed = JSON.parse(savedFileContent);
    }

    if (!keystoreDataParsed) {
      setError('Invalid keystore file format');
      return;
    }

    const walletData = accessWallet({
      kdContent: keystoreDataParsed,
      accessPassVal: submittedPassword,
      index: 0
    });

    if (!walletData) {
      setError('Invalid password or corrupted keystore file');
      return;
    }

    if (keystoreDataParsed.kind === 'mnemonic' && needsAddress) {
      setKeystoreData(keystoreDataParsed);
      setPassword(submittedPassword);
      setShowAddressSelection(true);

      return;
    }

    onSubmit({
      privateKey: walletData.privateKey,
      address: walletData.address,
      keystoreFile: savedFileContent || JSON.stringify(keystoreDataParsed),
      keystoreFileName: fileName
    });
  };

  const handleConfirmSelectedAddress = useCallback(
    (account: { index: number; address: string }) => {
      if (!account || !keystoreData) {
        return;
      }
      const walletData = accessWallet({
        kdContent: keystoreData,
        accessPassVal: password,
        index: account.index
      });
      if (walletData) {
        onSubmit({
          privateKey: walletData.privateKey,
          address: walletData.address,
          keystoreFile: savedFileContent || JSON.stringify(keystoreData),
          keystoreFileName: fileName,
          addressIndex: account.index
        });
      }
    },
    [keystoreData, password, onSubmit, savedFileContent, fileName]
  );

  if (needsAddress && showAddressSelection && keystoreData) {
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
    <FileLoginPanel
      onSubmit={handleSubmit}
      onClose={handleClose}
      fileName={fileName}
      onFileChange={handleFileChange}
      fileLabel='Keystore File'
      fileAccept='.json'
      fileInputId='keystore-file-input'
      placeholder='Click here to select a keystore file'
      dataTestId={DataTestIdsEnum.keystoreLoginPanel}
      fileUploadTestId={DataTestIdsEnum.keystoreBtn}
      initialValues={{
        file: savedFileContent ? new File([savedFileContent], fileName) : null,
        password
      }}
      skipValidation={Boolean(savedFileContent)}
    >
      {(formikProps) => (
        <div>
          <label style={styles.label}>
            Password
            <input
              style={styles.input}
              type='password'
              value={formikProps.values.password}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              name='password'
              placeholder='Enter keystore password'
              required
              data-testid={DataTestIdsEnum.accessPass}
            />
          </label>
          {formikProps.errors.password && formikProps.touched.password && (
            <div style={styles.error}>{formikProps.errors.password}</div>
          )}
          {error && <div style={styles.error}>{error}</div>}
        </div>
      )}
    </FileLoginPanel>
  );
};
