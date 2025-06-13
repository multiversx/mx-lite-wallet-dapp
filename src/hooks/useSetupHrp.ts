import { useSelector } from 'react-redux';
import { LibraryConfig } from 'lib';
import { networkSelector } from 'redux/selectors';

export const useSetupHrp = () => {
  const { activeNetwork } = useSelector(networkSelector);

  if (!activeNetwork.hrp) {
    return;
  }

  LibraryConfig.DefaultAddressHrp = activeNetwork.hrp;
};
