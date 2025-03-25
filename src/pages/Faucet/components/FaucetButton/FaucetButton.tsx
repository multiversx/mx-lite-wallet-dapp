import { MxLink } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';

export const FaucetButton = () => {
  return (
    <MxLink
      className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
      data-testid={DataTestIdsEnum.faucetBtn}
      to={routeNames.faucet}
    >
      Request Funds
    </MxLink>
  );
};
