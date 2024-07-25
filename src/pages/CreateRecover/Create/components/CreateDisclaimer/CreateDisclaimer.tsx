import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Navigate } from 'components';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'contexts/createRecover';

import { usePushAndNavigate } from 'hooks';
import { CreateRoutesEnum, routeNames } from 'routes';
import { CreateDisclaimerScreen } from './components';
import { useCreateDisclaimer } from './hooks';

export const CreateDisclaimer = () => {
  const { createRecoverWalletRoutes, mnemonic } = useCreateRecoverContext();
  const createDispatch = useCreateRecoverDispatch();
  const pushAndNavigate = usePushAndNavigate();
  const {
    handleNetworkCheckboxChange,
    handleCheckboxChange,
    disclaimerContinueHandler,
    isValid,
    touched,
    safetyRef,
    networkRef,
    touchedNetwork,
    isValidNetwork
  } = useCreateDisclaimer();
  const isReturnFromWizard = createRecoverWalletRoutes.length > 0;

  useEffect(() => {
    if (mnemonic) {
      pushAndNavigate(CreateRoutesEnum.mnemonicPhrase);
    }
  }, [mnemonic]);

  const resetOnInit = () => {
    createDispatch({ type: 'resetWizard' });
  };

  useEffect(resetOnInit, []);

  if (isReturnFromWizard) {
    return <Navigate to={routeNames.home} from='CreateDisclaimer' />;
  }

  const accessWalletSection = (
    <div className='modal-layout-text'>
      Already have a wallet? <Link to={routeNames.unlock}>Access it</Link>
    </div>
  );

  return (
    <CreateDisclaimerScreen
      handleNetworkCheckboxChange={handleNetworkCheckboxChange}
      handleCheckboxChange={handleCheckboxChange}
      disclaimerContinueHandler={disclaimerContinueHandler}
      isValid={isValid}
      touched={touched}
      safetyRef={safetyRef}
      networkRef={networkRef}
      touchedNetwork={touchedNetwork}
      isValidNetwork={isValidNetwork}
      accessWalletSection={accessWalletSection}
    />
  );
};
