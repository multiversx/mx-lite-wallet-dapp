import { SignableMessage } from '@multiversx/sdk-core/out';
import { useDispatch } from 'react-redux';
import { useSetNativeAuthInterceptors } from 'components/AxiosInterceptor/helpers';
import { networks } from 'config';
import { useLoginService } from 'lib';
import { useGetNativeAuthConfig } from 'pages/Unlock/hooks';
import { changeNetwork } from 'redux/slices';

export const useRefreshNativeAuthTokenForNetwork = () => {
  const nativeAuthConfig = useGetNativeAuthConfig();
  const loginService = useLoginService(nativeAuthConfig);
  const dispatch = useDispatch();
  const { setNativeAuthTokenInterceptors } = useSetNativeAuthInterceptors();

  return async ({
    networkId,
    origin,
    signMessageCallback
  }: {
    networkId: string;
    origin: string;
    signMessageCallback: (
      messageToSign: SignableMessage
    ) => Promise<SignableMessage>;
  }) => {
    const foundNetwork = networks.find(({ id }) => id === networkId);

    if (!foundNetwork) {
      return;
    }

    try {
      const nativeAuthToken = await loginService.refreshNativeAuthTokenLogin({
        signMessageCallback,
        nativeAuthClientConfig: {
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
  };
};
