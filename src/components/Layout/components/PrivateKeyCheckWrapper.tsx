import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { provider } from 'helpers';
import { accountSelector } from 'redux/selectors';
import { PrivateKeyRedirectLogin } from './PrivateKeyRedirectLogin';
import { usePrivateKeyCheckRedirectRoute } from 'hooks/navigation';

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
