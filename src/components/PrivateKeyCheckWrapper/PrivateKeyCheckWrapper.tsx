import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { provider } from 'helpers/app';
import { useModal } from 'hooks';
import { KeystoreModal } from 'pages/Unlock/components/Keystore/components/KeystoreModal';
import { PemModal } from 'pages/Unlock/components/Pem/components/PemModal';
import { accountSelector } from 'redux/selectors';
import { FileLoginEnum } from 'redux/slices';
import { routeNames } from 'routes';

export const PrivateKeyCheckWrapper = ({ children }: PropsWithChildren) => {
  const { fileLogin } = useSelector(accountSelector);
  const { show, handleShow, handleClose } = useModal();
  const navigate = useNavigate();
  const shouldRelogin = !provider.isInitialized() && Boolean(fileLogin);

  useEffect(() => {
    if (shouldRelogin) {
      handleShow();
    }
  }, []);

  const handleModalClose = () => {
    handleClose();
    if (shouldRelogin) {
      navigate(routeNames.logout);
    }
  };

  return (
    <>
      {fileLogin === FileLoginEnum.keystore && (
        <KeystoreModal handleClose={handleModalClose} show={show} />
      )}
      {fileLogin === FileLoginEnum.pem && (
        <PemModal handleClose={handleModalClose} show={show} />
      )}
      {children}
    </>
  );
};
