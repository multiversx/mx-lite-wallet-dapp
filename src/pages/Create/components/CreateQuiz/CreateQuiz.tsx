import React, { useEffect } from 'react';
import { useCreateRecoverContext } from 'contexts/createRecover';
import { useNavigate } from 'hooks';

import { CreateRoutesEnum, routeNames } from 'routes';

import { MnemonicForm } from './MnemonicForm';

export const CreateQuiz = () => {
  const { createRecoverWalletRoutes } = useCreateRecoverContext();
  const navigate = useNavigate({ from: 'CreateQuiz' });
  const routeNotInArray = !createRecoverWalletRoutes.includes(
    CreateRoutesEnum.checkMnemonic
  );
  const returnFromPassword = createRecoverWalletRoutes.includes(
    CreateRoutesEnum.setPassword
  );

  const forbidden = routeNotInArray || returnFromPassword;

  useEffect(() => {
    if (forbidden) {
      navigate(routeNames.home);
    }
  }, []);

  if (forbidden) {
    return null;
  }

  return <MnemonicForm />;
};
