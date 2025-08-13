import { useDispatch } from 'react-redux';
import { useSetNativeAuthInterceptors } from 'components/AxiosInterceptor/helpers';
import { networks } from 'config';
import {
  Message,
  refreshNativeAuthTokenLogin,
  initializeNetwork,
  refreshAccount
} from 'lib';
import { useGetNativeAuthConfig } from 'pages/Unlock/hooks';
import { RootApi } from 'redux/rootApi';
import {
  changeNetwork,
  startNetworkSwitch,
  revertNetworkSwitch
} from 'redux/slices';
import { AppDispatch } from 'redux/store';

export const useRefreshNativeAuthTokenForNetwork = () => {
  const nativeAuthConfig = useGetNativeAuthConfig();
  const dispatch = useDispatch<AppDispatch>();
  const { setNativeAuthTokenInterceptors } = useSetNativeAuthInterceptors();

  return async ({
    networkId,
    origin,
    signMessageCallback
  }: {
    networkId: string;
    origin: string;
    signMessageCallback: (messageToSign: Message) => Promise<Message>;
  }) => {
    const foundNetwork = networks.find(({ id }) => id === networkId);

    if (!foundNetwork) {
      return;
    }

    try {
      dispatch(startNetworkSwitch());
      dispatch(RootApi.util.resetApiState());
      await initializeNetwork({
        customNetworkConfig: {
          ...foundNetwork,
          skipFetchFromServer: false
        }
      });

      const nativeAuthToken = await refreshNativeAuthTokenLogin({
        signMessageCallback,
        nativeAuthClientConfig: {
          ...nativeAuthConfig,
          origin,
          apiAddress: foundNetwork?.apiAddress,
          expirySeconds: 86400
        }
      });

      setNativeAuthTokenInterceptors(nativeAuthToken);
      dispatch(changeNetwork(foundNetwork));
      await refreshAccount();
    } catch (error) {
      console.error('Could not refresh nativeAuth token', error);
      dispatch(revertNetworkSwitch());
      throw error;
    }
  };
};
