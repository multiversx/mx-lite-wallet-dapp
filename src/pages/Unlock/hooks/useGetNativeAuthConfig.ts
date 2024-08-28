import { useSelector } from 'react-redux';
import { IS_DEVELOPMENT, IS_TEST } from 'localConstants';
import { networkSelector } from 'redux/selectors';

interface ConfigType {
  origin?: string;
  extraRequestHeaders?: {
    Authorization: string;
  };
}

export const useGetNativeAuthConfig = () => {
  const { activeNetwork } = useSelector(networkSelector);

  const walletConfig: ConfigType =
    IS_DEVELOPMENT || IS_TEST ? { origin: activeNetwork.walletAddress } : {};

  return walletConfig;
};
