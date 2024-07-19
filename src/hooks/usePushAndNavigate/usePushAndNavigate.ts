import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'contexts/createRecover';
import { CreateRoutesEnum, RecoverRoutesEnum, routeNames } from 'routes';
import { useNavigate } from 'react-router-dom';

/**
 * Because Recover and Create flow has custom navigation conditions, every route must
 * be registered before navigating to it
 */
export const usePushAndNavigate = () => {
  const recoverDispatch = useCreateRecoverDispatch();
  const { providerType } = useCreateRecoverContext();
  const navigate = useNavigate();

  return function registerNextRoute(
    nextRoute: RecoverRoutesEnum | CreateRoutesEnum
  ) {
    recoverDispatch({
      type: 'pushToWalletRoutes',
      nextRoute
    });
    navigate(`/${routeNames[providerType]}/${nextRoute}`);
  };
};
