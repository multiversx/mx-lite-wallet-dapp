import { useEffect, useState, useRef } from 'react';
import {
  faFileAlt,
  faCheck,
  faPencilAlt,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
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
const MAX_RETRIES = 3;

export const KeystoreModal = ({ handleClose, show }: UseModalReturnType) => {
  const [walletFileV5andPassword, setWalletFileV5andPassword] =
    useState<AccessWalletType | null>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getInitToken = useInitToken();
  const onKeystoreSubmit = useOnKeystoreSubmit();
  const { keystoreFile, address } = useSelector(accountSelector);
  const retriesRef = useRef(MAX_RETRIES);

  const handleModalClose = () => {
    handleClose();
    const shouldLogoutIfReloginNotConfirmed =
      address && pathname !== routeNames.unlock;
    if (shouldLogoutIfReloginNotConfirmed) {
      navigate(routeNames.logout);
    }
  };

  useCloseModalOnEsc({ onClose: handleModalClose, isOpen: show });

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
      retriesRef.current -= 1;
      if (retriesRef.current <= 0) {
        navigate(routeNames.logout, {
          state: { caller: 'Keystore wrong password retry' }
        });
        if (!window.opener) {
          setTimeout(() => {
            window.location.reload();
          });
        }
      }
      return props.setFieldError(
        ACCESS_PASS,
        'Please check your uploaded file or password.'
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
      className='login-modal p-6'
      onClose={handleModalClose}
      visible={show}
    >
      <PageState
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
                setFieldValue
              } = formikProps;

              const disabled = Boolean(initialFile);
              const dropzoneClassNames = {
                'border-gray-300': !fileName && !errors[WALLET_FILE],
                'border-red-300': fileName && errors[WALLET_FILE],
                'border-green-300': fileName && !errors[WALLET_FILE_NAME]
              };

              return (
                <div className='flex flex-col items-center'>
                  <h2 className='text-2xl mt-4 mb-2'>Login using Keystore</h2>
                  <label
                    htmlFor={WALLET_FILE}
                    className='block text-gray-500 text-sm font-bold mb-4'
                  >
                    Select a keystore file and type your password
                  </label>
                  {disabled ? (
                    <div
                      className={classNames(
                        'w-full p-2 border rounded-md bg-gray-400 text-white flex flex-row items-center justify-center gap-1'
                      )}
                    >
                      <FontAwesomeIcon className='text-white' icon={faLock} />
                      {initialValues.fileName}
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        'w-full my-6 flex flex-col border-dashed border-2 rounded-md p-6 flex items-center justify-center mb-4 h-[200px]',
                        dropzoneClassNames
                      )}
                    >
                      {fileName && (
                        <div className='flex flex-row items-center gap-1'>
                          <FontAwesomeIcon
                            className='text-green-500'
                            icon={faCheck}
                          />
                          <span className='text-green-500'>
                            Keystore loaded
                          </span>
                        </div>
                      )}
                      <input
                        accept='.json'
                        className='hidden'
                        id={WALLET_FILE}
                        name={WALLET_FILE}
                        data-testid={DataTestIdsEnum.walletFile}
                        type='file'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileName(file.name);
                            setFieldValue(WALLET_FILE, file);
                          }
                        }}
                        required
                      />
                      <label
                        htmlFor={WALLET_FILE}
                        className='text-gray-400 text-sm'
                      >
                        {fileName ? (
                          <div className='flex flex-row items-center cursor-pointer gap-1'>
                            <span>{fileName}</span>
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </div>
                        ) : errors[WALLET_FILE] ? (
                          <div className='text-red-500 mt-2 text-sm'>
                            {errors[WALLET_FILE] as string}
                          </div>
                        ) : (
                          <span className='cursor-pointer'>
                            Click here to select a file
                          </span>
                        )}
                      </label>
                    </div>
                  )}
                  <input
                    className={`w-full my-2 p-2 border ${
                      touched.accessPass && errors.accessPass
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                    type='password'
                    placeholder='Password...'
                    id={ACCESS_PASS}
                    name={ACCESS_PASS}
                    data-testid={DataTestIdsEnum.accessPass}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        submitForm();
                      }
                    }}
                    required
                  />
                  {touched.accessPass && errors.accessPass && (
                    <div className='text-red-500 mt-2 text-sm'>
                      {errors.accessPass}
                    </div>
                  )}
                  <div className='flex flex-col items-center gap-2 mt-8'>
                    <Button
                      data-testid={DataTestIdsEnum.submitButton}
                      type='submit'
                      onClick={submitForm}
                    >
                      Access Wallet
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
