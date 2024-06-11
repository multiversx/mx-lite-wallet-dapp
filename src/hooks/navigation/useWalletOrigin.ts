import { getWalletOriginParams } from 'helpers/navigation/getWalletOriginParams';
import { useSelector } from 'react-redux';
import { walletOriginSelector } from 'redux/selectors';

export const useWalletOrigin = () => {
  const walletOrigin = useSelector(walletOriginSelector);

  const { searchParams, hrefValue } = getWalletOriginParams(walletOrigin);

  return {
    ...walletOrigin,
    searchParams,
    hrefValue
  };
};
