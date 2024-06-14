import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { usePrivateKeyCheckRedirectRoute } from 'hooks';
import { accountSelector } from 'redux/selectors';
import { PrivateKeyRedirectLogin } from './components';

export const PrivateKeyCheckWrapper = ({ children }: PropsWithChildren) => {
  const { fileLogin } = useSelector(accountSelector);

  const existingRedirectRoute = usePrivateKeyCheckRedirectRoute();
  const isWaitingForLoginModal = Boolean(existingRedirectRoute);
  const shouldRelogin = !provider.isInitialized() && Boolean(fileLogin);

  if (shouldRelogin) {
    return <PrivateKeyRedirectLogin />;
  }

  if (isWaitingForLoginModal) {
    return null;
  }

  return <>{children}</>;
};
