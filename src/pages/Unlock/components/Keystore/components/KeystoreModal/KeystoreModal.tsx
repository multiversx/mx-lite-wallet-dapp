import { useEffect, useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType, useCloseModalOnEsc } from 'hooks';
import { WALLET_FILE, WALLET_FILE_NAME, DataTestIdsEnum } from 'localConstants';
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
      <ModalContainer
        className='login-modal'
        onClose={handleModalClose}
        visible={show}
      >
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
    <ModalContainer
      className='login-modal'
      onClose={handleModalClose}
      visible={show}
    >
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
                <div className='flex flex-col mx-auto items-center pt-6'>
                  <label
                    htmlFor={WALLET_FILE}
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Keystore file
                  </label>
                  {disabled ? (
                    <input
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      type='text'
                      disabled
                      id={WALLET_FILE}
                      defaultValue={initialValues.fileName}
                    />
                  ) : (
                    <input
                      accept='.json'
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      data-testid={DataTestIdsEnum.walletFile}
                      id={WALLET_FILE}
                      name={WALLET_FILE}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                          setFieldValue(WALLET_FILE, file);
                        }
                      }}
                      placeholder='Select file'
                      required
                      type='file'
                    />
                  )}
                  <label
                    htmlFor={ACCESS_PASS}
                    className='block text-gray-700 text-sm font-bold mb-2 mt-4'
                  >
                    Password
                  </label>
                  <input
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='password'
                    required
                    id={ACCESS_PASS}
                    name={ACCESS_PASS}
                    data-testid={DataTestIdsEnum.accessPass}
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
                  <div className='flex flex-col mx-auto items-center gap-2 mt-8'>
                    <Button
                      data-testid={DataTestIdsEnum.submitButton}
                      type='submit'
                      disabled={!isValid}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                    <button
                      className='mt-2 text-blue-600'
                      data-testid={DataTestIdsEnum.closeButton}
                      id={DataTestIdsEnum.closeButton}
                      onClick={handleModalClose}
                      type='button'
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
