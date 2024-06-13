import React, { useEffect, useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType } from 'hooks';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { useInitToken } from 'pages/Unlock/hooks';
import { hookSelector } from 'redux/selectors';
import { AddressScreens } from './components';
import {
  accessWallet,
  keystoreValidationSchema,
  parseKeystoreJSON
} from './helpers';
import { KeystoreValuesType, useOnKeystoreSubmit } from './hooks';

interface AccessWalletType {
  kdContent: { [key: string]: any };
  accessPassVal: string;
}

const ACCESS_PASS = 'accessPass';

const initialValues: KeystoreValuesType = {
  [ACCESS_PASS]: '',
  [WALLET_FILE]: '',
  [WALLET_FILE_NAME]: ''
};

export const KeystoreModal = ({ handleClose, show }: UseModalReturnType) => {
  const [fileName, setFileName] = useState<string>();
  const [walletFileV5andPassword, setWalletFileV5andPassword] =
    useState<AccessWalletType | null>();
  const getInitToken = useInitToken();
  const onKeystoreSubmit = useOnKeystoreSubmit();

  const { type: hook } = useSelector(hookSelector);

  useEffect(() => {
    if (hook) {
      return;
    }

    getInitToken();
  }, [hook]);

  const onSubmit = async (
    values: KeystoreValuesType,
    props: FormikHelpers<KeystoreValuesType>
  ) => {
    const data = await parseKeystoreJSON(values.walletFile);
    if (data == null) {
      return props.setFieldError(ACCESS_PASS, 'Please check your loaded file');
    }

    const accountData = accessWallet({
      kdContent: data,
      accessPassVal: values.accessPass,
      index: 0
    });

    if (accountData == null) {
      return props.setFieldError(
        ACCESS_PASS,
        'Please check your uploaded file or password'
      );
    }

    if (data.kind === 'mnemonic') {
      return setWalletFileV5andPassword({
        kdContent: data,
        accessPassVal: values.accessPass
      });
    }

    onKeystoreSubmit({
      [WALLET_FILE_NAME]: String(fileName),
      [WALLET_FILE]: data,
      accessPass: values.accessPass
    });
  };

  if (walletFileV5andPassword) {
    return (
      <ModalContainer onClose={handleClose} visible={show}>
        <PageState
          icon={faFileAlt}
          iconSize='3x'
          title='Login using PEM'
          description={
            <AddressScreens
              {...walletFileV5andPassword}
              fileName={fileName || ''}
            />
          }
        />
      </ModalContainer>
    );
  }

  return (
    <ModalContainer onClose={handleClose} visible={show}>
      <PageState
        icon={faFileAlt}
        iconSize='3x'
        title='Login using PEM'
        description={
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={keystoreValidationSchema}
          >
            {(formikProps) => {
              const {
                submitForm,
                errors,
                touched,
                handleChange,
                isValid,
                setFieldValue
              } = formikProps;
              return (
                <div className='flex flex-col mx-auto items-center'>
                  <label htmlFor={WALLET_FILE} className='mb-2'>
                    Keystore file
                  </label>
                  <input
                    className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
                    type='file'
                    required
                    id={WALLET_FILE}
                    name={WALLET_FILE}
                    accept='.json'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFileName(file.name);
                        setFieldValue(WALLET_FILE, file);
                      }
                    }}
                  />
                  <label htmlFor={ACCESS_PASS} className='mb-2'>
                    Password
                  </label>
                  <input
                    className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
                    type='password'
                    required
                    id={ACCESS_PASS}
                    name={ACCESS_PASS}
                    onChange={handleChange}
                  />
                  {touched.accessPass && errors.accessPass && (
                    <div className='text-red-600 mb-4'>{errors.accessPass}</div>
                  )}
                  <div className='flex flex-col mx-auto items-center gap-2 mt-4'>
                    <Button
                      data-testid='submitButton'
                      type='submit'
                      disabled={!isValid}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                    <button
                      id='closeButton'
                      data-testid='closeButton'
                      onClick={handleClose}
                      type='button'
                      className='mt-2'
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            }}
          </Formik>
        }
      />
    </ModalContainer>
  );
};
