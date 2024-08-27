import { useSelector } from 'react-redux';
import { IS_DEVELOPMENT, IS_TEST, TOKEN_KEY } from 'localConstants';
import { networkSelector } from 'redux/selectors';

interface ConfigType {
  origin?: string;
  extraRequestHeaders?: {
    Authorization: string;
  };
}

export const useGetNativeAuthConfig = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const { activeNetwork } = useSelector(networkSelector);
  const extraRequestHeaders = { Authorization: `Bearer ${token}` };

  const walletConfig: ConfigType =
    IS_DEVELOPMENT || IS_TEST
      ? { extraRequestHeaders, origin: activeNetwork.walletAddress }
      : { extraRequestHeaders };

  if (!token) {
    delete walletConfig.extraRequestHeaders;
  }

  return walletConfig;
};
