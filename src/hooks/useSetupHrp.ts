import { LibraryConfig } from '@multiversx/sdk-core/out';
import { useSelector } from 'react-redux';
import { networkSelector } from 'redux/selectors';

export const useSetupHrp = () => {
  const { activeNetwork } = useSelector(networkSelector);

  if (!activeNetwork.hrp) {
    return;
  }

  LibraryConfig.DefaultAddressHrp = activeNetwork.hrp;
};
