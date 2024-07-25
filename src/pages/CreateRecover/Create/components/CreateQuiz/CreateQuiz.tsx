import { useEffect } from 'react';
import { useCreateRecoverContext } from 'pages/CreateRecover/contexts/createRecover';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import { MnemonicForm } from './MnemonicForm';
import { CreateRecoverRoutesEnum } from '../../../routes';

export const CreateQuiz = () => {
  const { createRecoverWalletRoutes } = useCreateRecoverContext();
  const navigate = useNavigate();
  const routeNotInArray = !createRecoverWalletRoutes.includes(
    CreateRecoverRoutesEnum.createCheckMnemonic
  );

  const returnFromPassword = createRecoverWalletRoutes.includes(
    CreateRecoverRoutesEnum.createPassword
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
