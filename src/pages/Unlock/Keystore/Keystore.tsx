import React, { MouseEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Formik, FormikHelpers } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LargeLoader, FileType } from 'components';
import { ModalCloseButton } from 'components/Layout/ModalLayout/components/ModalCloseButton';
import { getIsNativeAuthSingingForbidden } from 'helpers';
import {
  useGetAccountInfo,
  usePrivateKeyCheckRedirectRoute,
  useReplyWithCancelled,
  useWalletOrigin
} from 'hooks';
import { DataTestIdsEnum } from 'localConstants';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { accountSelector, hookSelector } from 'redux/selectors';
import { clearPrivateKeyCheckRedirectRoute } from 'redux/slices';
import { routeNames } from 'routes';

import { PasswordInput } from './components';
import { AddressScreens } from './components/AddressScreens';
import { DropzoneKeystore } from './components/DropzoneKeystore';
import {
  AccessWalletType,
  getOnKeystoreRead,
  keystoreValidationSchema,
  KeystoreValuesType,
  useCheat,
  useKeystoreFileData,
  useOnKeystoreSubmit
} from './helpers';
import { useInitToken } from '../helpers';

const isDevelopment = ['development', 'test'].includes(
  process.env.NODE_ENV as string
);

export const Keystore = () => {
  const { t: c } = useTranslation(['common']);
  const { t } = useTranslation(['unlock']);
  const { token: initToken, keystoreFile } = useSelector(accountSelector);
  const { address } = useGetAccountInfo();
  const navigate = useNavigate();
  const redirectRoute = usePrivateKeyCheckRedirectRoute();
  const handleCheat = useCheat();
  const { type: hook, callbackUrl, loginToken } = useSelector(hookSelector);
  const walletOrigin = useWalletOrigin();
  const getInitToken = useInitToken();
  const dispatch = useDispatch();
  const [walletFileV5andPassword, setWalletFileV5andPassword] =
    useState<AccessWalletType | null>();

  const token = hook ? loginToken : initToken;
  const disabledConnectButton = getIsNativeAuthSingingForbidden(token);

  useEffect(() => {
    if (hook) {
      return;
    }

    getInitToken();

    const isFromUnintentionalBackButton = address && !redirectRoute;

    if (isFromUnintentionalBackButton) {
      navigate(walletOrigin.pathname, { replace: true });
    }
  }, [hook, redirectRoute]);

  const replyWithCancelled = useReplyWithCancelled();
  const { file, setFile, initialWalletFile } = useKeystoreFileData();
  const onKeystoreSubmit = useOnKeystoreSubmit();
  const onRead = getOnKeystoreRead(t);
  const processedFile: FileType | undefined = file
    ? { fileName: initialWalletFile?.name ?? file?.fileName }
    : undefined;

  const initialValues: KeystoreValuesType = {
    accessPass: '',
    [WALLET_FILE]: initialWalletFile,
    [WALLET_FILE_NAME]: initialWalletFile?.name
  };

  const disabledDropzone = Boolean(initialValues[WALLET_FILE_NAME]);
  const needsToken = !hook && token === null;

  const onSubmit = (
    values: KeystoreValuesType,
    props: FormikHelpers<KeystoreValuesType>
  ) => {
    const fileData = onRead(values, props);
    // keystore v4
    if (fileData === null) {
      return onKeystoreSubmit(values, props);
    }
    // keystore v5
    if (fileData) {
      return setWalletFileV5andPassword(fileData);
    }
  };

  const onClose = (event: MouseEvent) => {
    event.preventDefault();

    if (hook && callbackUrl && walletOrigin.hrefValue !== routeNames.unlock) {
      return replyWithCancelled();
    }

    if (redirectRoute) {
      dispatch(clearPrivateKeyCheckRedirectRoute());
      return navigate(routeNames.logout);
    }

    return navigate(walletOrigin.hrefValue);
  };

  if (needsToken) {
    return (
      <div
        className={classNames('keystore-wrapper', { cheat: isDevelopment })}
        data-testid={DataTestIdsEnum.keystoreModal}
      >
        <div
          className='modal-layout-title'
          data-testid={DataTestIdsEnum.modalTitle}
        >
          Login using Keystore
        </div>
        <div className='modal-layout-subtitle'>
          Drag & drop your keystore file here or select file
        </div>

        <LargeLoader />
      </div>
    );
  }

  if (walletFileV5andPassword) {
    return (
      <div className='keystore-wrapper pt-0'>
        <ModalCloseButton className='keystore-close' onClick={onClose} />

        <AddressScreens
          {...walletFileV5andPassword}
          fileName={processedFile?.fileName || ''}
        />
      </div>
    );
  }

  return (
    <div
      className={classNames('keystore-wrapper', { cheat: isDevelopment })}
      data-testid={DataTestIdsEnum.keystoreModal}
    >
      <ModalCloseButton
        className='keystore-close'
        onClick={onClose}
        data-testid={DataTestIdsEnum.keystoreCloseModalBtn}
      />

      <div
        className='modal-layout-title'
        data-testid={DataTestIdsEnum.modalTitle}
      >
        Login using Keystore
      </div>
      <div className='modal-layout-subtitle'>
        Drag & drop your keystore file here or select file
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={keystoreValidationSchema}
      >
        {(formikProps) => {
          const { submitForm, isValid } = formikProps;

          return (
            <div className='keystore-form'>
              <div className='keystore-form-wrapper'>
                <DropzoneKeystore
                  file={processedFile}
                  setFile={(newFile) => setFile(newFile)}
                  disabled={disabledDropzone}
                  formikProps={formikProps}
                />

                <div className='modal-layout-fields'>
                  <div className='modal-layout-field'>
                    <PasswordInput
                      formikProps={formikProps}
                      autoFocus={Boolean(keystoreFile)}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={!isValid || disabledConnectButton}
                onClick={submitForm}
                data-testid={DataTestIdsEnum.submitButton}
                className='btn btn-primary modal-layout-button'
              >
                <Trans t={c}>Access Wallet</Trans>
              </button>

              {isDevelopment && (
                <button
                  disabled={disabledConnectButton}
                  onClick={handleCheat}
                  data-testid={DataTestIdsEnum.cheatBtn}
                  className='modal-layout-text'
                >
                  Cheat
                </button>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
