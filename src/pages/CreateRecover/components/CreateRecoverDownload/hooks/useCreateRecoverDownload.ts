import { useDispatch } from 'react-redux';
import { useCreateRecoverContext } from 'contexts/createRecover';
import { setWalletOrigin } from 'redux/slices';
import { routeNames } from 'routes';

export const useCreateRecoverDownload = () => {
  const { keystoreString, createdAddress, createRecoverWalletRoutes } =
    useCreateRecoverContext();
  const dispatch = useDispatch();

  const accessWalletBtnHandler = () => {
    dispatch(
      setWalletOrigin({
        pathname: routeNames.unlock,
        search: ''
      })
    );
  };

  return {
    accessWalletBtnHandler,
    createRecoverWalletRoutes,
    keystoreString,
    createdAddress
  };
};
