import { useSelector } from 'react-redux';
import { isExtension } from 'config';
import { extensionOrigin } from 'extension/popup/constants';
import { storage } from 'helpers';
import { IS_DEVELOPMENT, IS_TEST } from 'localConstants';
import { ACCESS_TOKEN_KEY } from 'localConstants/storageKeys.enum';
import { activeNetworkSelector } from 'redux/selectors';

interface ConfigType {
  origin?: string;
  extraRequestHeaders?: {
    Authorization: string;
  };
}

export const useGetNativeAuthConfig = () => {
  const token = storage.local.getItem(ACCESS_TOKEN_KEY);
  const network = useSelector(activeNetworkSelector);
  const extraRequestHeaders = { Authorization: `Bearer ${token}` };

  const walletConfig: ConfigType =
    IS_DEVELOPMENT || IS_TEST
      ? { extraRequestHeaders, origin: network.walletAddress }
      : { extraRequestHeaders };

  const extensionConfig: ConfigType = {
    origin: extensionOrigin,
    extraRequestHeaders
  };

  if (!token) {
    if (isExtension) {
      delete extensionConfig.extraRequestHeaders;
    } else {
      delete walletConfig.extraRequestHeaders;
    }
  }

  if (isExtension) {
    return extensionConfig;
  }

  return walletConfig;
};
