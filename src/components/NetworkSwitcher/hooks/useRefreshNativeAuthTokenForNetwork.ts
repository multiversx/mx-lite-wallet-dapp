import { useDispatch } from 'react-redux';
import { useSetNativeAuthInterceptors } from 'components/AxiosInterceptor/helpers';
import { networks } from 'config';
import { Message } from 'lib/sdkCore';
import { refreshNativeAuthTokenLogin } from 'lib/sdkDapp';
import { useGetNativeAuthConfig } from 'pages/Unlock/hooks';
import { changeNetwork } from 'redux/slices';

export const useRefreshNativeAuthTokenForNetwork = () => {
  const nativeAuthConfig = useGetNativeAuthConfig();
  const dispatch = useDispatch();
  const { setNativeAuthTokenInterceptors } = useSetNativeAuthInterceptors();

  return async ({
    networkId,
    origin,
    preventPageReload,
    signMessageCallback
  }: {
    networkId: string;
    origin: string;
    preventPageReload?: boolean;
    signMessageCallback: (messageToSign: Message) => Promise<Message>;
  }) => {
    const foundNetwork = networks.find(({ id }) => id === networkId);

    if (!foundNetwork) {
      return;
    }

    try {
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
    } catch (error) {
      console.error('Could not refresh nativeAuth token', error);
    }

    dispatch(changeNetwork(foundNetwork));

    if (!preventPageReload) {
      setTimeout(() => {
        window.location.reload();
      });
    }
  };
};
