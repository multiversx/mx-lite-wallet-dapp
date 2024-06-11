import React from 'react';
import { FormikProps, getIn } from 'formik';

import {
  Dropzone,
  AcceptedFileTypeEnum,
  DropzonePropsType,
  FileType
} from 'components';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants';

import { KeystoreValuesType } from '../../helpers';

export interface DropzoneKeystorePropsType
  extends Pick<DropzonePropsType, 'disabled'> {
  file?: FileType;
  setFile: (file: FileType | undefined) => void;
  formikProps: FormikProps<KeystoreValuesType>;
}

export const DropzoneKeystore = ({
  file,
  setFile,
  formikProps,
  disabled
}: DropzoneKeystorePropsType) => {
  const { setFieldValue, setFieldTouched, setErrors, errors } = formikProps;

  const onRemove = () => {
    setFile(undefined);
    setFieldValue(WALLET_FILE, undefined);
  };

  const onFileDrop = ([newFile]: File[]) => {
    const fileReader = new FileReader();
    setFieldTouched(WALLET_FILE, true);

    fileReader.onload = () => {
      if (fileReader.result) {
        try {
          const parsedWalletContentJson = JSON.parse(
            fileReader.result.toString()
          );

          setFieldValue(WALLET_FILE_NAME, newFile.name);
          setFieldValue(WALLET_FILE, parsedWalletContentJson);
        } catch {
          setErrors({
            [WALLET_FILE]: 'The file you uploaded cannot be properly processed.'
          });
        }
      }
    };

    if (newFile) {
      setFile({ fileName: newFile.name });
      fileReader.readAsText(newFile);
    }
  };

  return (
    <Dropzone
      onFileDrop={onFileDrop}
      files={file ? [file] : []}
      onFileRemove={onRemove}
      disabled={disabled}
      data-testid={WALLET_FILE}
      successMessage='Keystore loaded'
      className='keystore-dropzone-wrapper'
      errorMessage={getIn(errors, WALLET_FILE)}
      acceptedFileTypes={[
        AcceptedFileTypeEnum.applicationJson,
        AcceptedFileTypeEnum.json
      ]}
    />
  );
};
