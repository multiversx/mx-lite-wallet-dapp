import { useSelector } from 'react-redux';
import { MxLink } from 'components/MxLink';
import { DataTestIdsEnum } from 'localConstants';
import { RouteNamesEnum } from 'localConstants/routes';
import { networkSelector } from 'redux/selectors';

export const FaucetButton = () => {
  const { activeNetwork } = useSelector(networkSelector);

  if (!activeNetwork.faucet) {
    return null;
  }

  return (
    <MxLink
      className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
      data-testid={DataTestIdsEnum.faucetBtn}
      to={RouteNamesEnum.faucet}
    >
      Request Funds
    </MxLink>
  );
};
