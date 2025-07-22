import { useCallback, useState } from 'react';
import { FileLoginPanel, FileLoginFormValues } from 'components/FileLoginPanel';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { parsePem } from 'providers/Pem/parsePem';

interface IPemPanelProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
}

export const PemPanel = ({ onSubmit, onClose }: IPemPanelProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');

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

  const handleSubmit = async (values: FileLoginFormValues) => {
    const file = values.file || selectedFile;

    if (!file) {
      setError('Please select a PEM file');
      return;
    }

    const pemData = await parsePem(file);
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
    <FileLoginPanel
      onSubmit={handleSubmit}
      onClose={handleClose}
      fileName={fileName}
      onFileChange={handleFileChange}
      fileLabel='PEM File'
      fileAccept='.pem'
      fileInputId='pem-file-input-panel'
      placeholder='Click here to select a PEM file'
      dataTestId={DataTestIdsEnum.pemLoginPanel}
      fileUploadTestId={DataTestIdsEnum.pemBtn}
    >
      {error && (
        <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </FileLoginPanel>
  );
};
