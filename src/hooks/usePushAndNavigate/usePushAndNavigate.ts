import { useNavigate } from 'react-router-dom';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'pages/CreateRecover/contexts/createRecover';
import { CreateRecoverRoutesEnum } from '../../pages/CreateRecover/routes';

/**
 * Because Recover and Create flow has custom navigation conditions, every route must
 * be registered before navigating to it
 */
export const usePushAndNavigate = () => {
  const recoverDispatch = useCreateRecoverDispatch();
  const { providerType } = useCreateRecoverContext();
  const navigate = useNavigate();

  return (nextRoute: CreateRecoverRoutesEnum) => {
    recoverDispatch({
      type: 'pushToWalletRoutes',
      nextRoute
    });

    navigate(`/${providerType}/${nextRoute}`);
  };
};
