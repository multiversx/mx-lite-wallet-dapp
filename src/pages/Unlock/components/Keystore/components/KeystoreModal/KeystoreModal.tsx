import React, { useEffect, useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType, useCloseModalOnEsc } from 'hooks';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { useInitToken } from 'pages/Unlock/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';
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

export const KeystoreModal = ({ handleClose, show }: UseModalReturnType) => {
  const [walletFileV5andPassword, setWalletFileV5andPassword] =
    useState<AccessWalletType | null>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getInitToken = useInitToken();
  const onKeystoreSubmit = useOnKeystoreSubmit();
  const { keystoreFile, address } = useSelector(accountSelector);

  const handleModalClose = () => {
    handleClose();

    const shouldLogoutIfReloginNotConfirmed =
      address && pathname !== routeNames.unlock;

    if (shouldLogoutIfReloginNotConfirmed) {
      navigate(routeNames.logout);
    }
  };

  useCloseModalOnEsc({
    onClose: handleModalClose,
    isOpen: show
  });

  const fileData = keystoreFile ? JSON.parse(keystoreFile) : {};
  const initialFile = fileData[WALLET_FILE];

  const initialValues: KeystoreValuesType = {
    [ACCESS_PASS]: '',
    [WALLET_FILE]: initialFile
      ? new Blob([JSON.stringify(initialFile)], { type: 'application/json' })
      : '',
    [WALLET_FILE_NAME]: fileData[WALLET_FILE_NAME] ?? ''
  };

  const [fileName, setFileName] = useState<string>(initialValues.fileName);

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

    handleClose();

    onKeystoreSubmit({
      [WALLET_FILE_NAME]: String(fileName),
      [WALLET_FILE]: data,
      accessPass: values.accessPass
    });
  };

  if (walletFileV5andPassword) {
    return (
      <ModalContainer onClose={handleModalClose} visible={show}>
        <PageState
          icon={faFileAlt}
          iconSize='3x'
          title='Login using Keystore'
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
    <ModalContainer onClose={handleModalClose} visible={show}>
      <PageState
        icon={faFileAlt}
        iconSize='3x'
        title='Login using Keystore'
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

              const disabled = Boolean(initialFile);

              return (
                <div className='flex flex-col mx-auto items-center'>
                  <label htmlFor={WALLET_FILE} className='mb-2'>
                    Keystore file
                  </label>
                  {disabled ? (
                    <input
                      className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
                      type='text'
                      disabled
                      id={WALLET_FILE}
                      defaultValue={initialValues.fileName}
                    />
                  ) : (
                    <input
                      className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
                      type='file'
                      placeholder='Select file'
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
                  )}
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent default submission behavior
                        submitForm();
                      }
                    }}
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
                      onClick={handleModalClose}
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
