import { useDispatch } from 'react-redux';
import { useSetNativeAuthInterceptors } from 'components/AxiosInterceptor/helpers';
import { networks } from 'config';
import {
  setNativeAuthConfig,
  Message,
  refreshNativeAuthTokenLogin,
  getDefaultNativeAuthConfig,
  useGetLoginInfo
} from 'lib';
import { changeNetwork } from 'redux/slices';

export const useRefreshNativeAuthTokenForNetwork = () => {
  const dispatch = useDispatch();
  const { setNativeAuthTokenInterceptors } = useSetNativeAuthInterceptors();
  const { isLoggedIn } = useGetLoginInfo();

  return async ({
    apiAddress,
    networkId,
    signMessageCallback
  }: {
    networkId: string;
    apiAddress: string;
    signMessageCallback: (messageToSign: Message) => Promise<Message>;
  }) => {
    const foundNetwork = networks.find(({ id }) => id === networkId);

    if (!foundNetwork) {
      return;
    }

    try {
      const nativeAuthConfig = getDefaultNativeAuthConfig({ apiAddress });
      setNativeAuthConfig(nativeAuthConfig);

      if (isLoggedIn) {
        const nativeAuthToken = await refreshNativeAuthTokenLogin({
          signMessageCallback: signMessageCallback,
          nativeAuthClientConfig: {
            apiAddress
          }
        });

        setNativeAuthTokenInterceptors(nativeAuthToken);
      }
    } catch (error) {
      console.error('Could not refresh nativeAuth token', error);
    }

    dispatch(changeNetwork(foundNetwork));
  };
};
