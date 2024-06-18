import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { provider } from 'helpers/app';
import { useModal } from 'hooks';
import { KeystoreModal } from 'pages/Unlock/components/Keystore/components/KeystoreModal';
import { PemModal } from 'pages/Unlock/components/Pem/components/PemModal';
import { accountSelector, hookSelector } from 'redux/selectors';
import { FileLoginEnum } from 'redux/slices';

export const PrivateKeyCheckWrapper = ({ children }: PropsWithChildren) => {
  const { type: hook } = useSelector(hookSelector);
  const { fileLogin } = useSelector(accountSelector);
  const { show, handleShow, handleClose } = useModal();
  const shouldRelogin = !provider.isInitialized() && Boolean(fileLogin);

  useEffect(() => {
    if (shouldRelogin) {
      handleShow();
    }
  }, []);

  const handleModalClose = () => {
    handleClose();
  };

  const hideChildren = show && hook;

  return (
    <>
      {fileLogin === FileLoginEnum.keystore && (
        <KeystoreModal handleClose={handleModalClose} show={show} />
      )}
      {fileLogin === FileLoginEnum.pem && (
        <PemModal handleClose={handleModalClose} show={show} />
      )}
      {hideChildren ? null : children}
    </>
  );
};
