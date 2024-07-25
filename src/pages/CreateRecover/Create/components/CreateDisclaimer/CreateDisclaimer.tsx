import { useEffect } from 'react';

import { Link, Navigate } from 'react-router-dom';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'pages/CreateRecover/contexts/createRecover';

import { usePushAndNavigate } from 'hooks';
import { routeNames } from 'routes';
import { CreateDisclaimerScreen } from './components';
import { useCreateDisclaimer } from './hooks';
import { CreateRecoverRoutesEnum } from '../../../routes';

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
      pushAndNavigate(CreateRecoverRoutesEnum.createMnemonic);
    }
  }, [mnemonic]);

  const resetOnInit = () => {
    createDispatch({ type: 'resetWizard' });
  };

  useEffect(resetOnInit, []);

  if (isReturnFromWizard) {
    return <Navigate to={routeNames.home} />;
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
