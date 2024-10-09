import { useSelector } from 'react-redux';
import { useReplyToDapp } from 'hooks';
import { useGetAccount, useGetLoginInfo, decodeNativeAuthToken } from 'lib';
import { accountSelector, hookSelector } from 'redux/selectors';
import { WindowProviderResponseEnums } from 'types';

export const useOnLoginHookRedirect = () => {
  const { callbackUrl } = useSelector(hookSelector);
  const { tokenLogin } = useGetLoginInfo();
  const { externalNativeAuthToken } = useSelector(accountSelector);
  const { address } = useGetAccount();
  const replyToDapp = useReplyToDapp();

  return () => {
    if (!callbackUrl) {
      return;
    }

    // User was already logged in, so we only need to reprovide the address (token was already signed)
    const urlParams: { address: string; signature?: string } = { address };
    const nativeAuthToken =
      externalNativeAuthToken || tokenLogin?.nativeAuthToken;

    if (nativeAuthToken) {
      const decoded = decodeNativeAuthToken(nativeAuthToken);
      urlParams.signature = decoded?.signature;
    }

    return replyToDapp({
      type: WindowProviderResponseEnums.loginResponse,
      payload: {
        data: {
          address: urlParams.address,
          signature: urlParams.signature
        }
      }
    });
  };
};
