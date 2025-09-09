import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTestIdsEnum } from 'localConstants';
import { networkSelector } from 'redux/selectors';
import { routeNames } from 'routes';

export const FaucetButton = () => {
  const { activeNetwork } = useSelector(networkSelector);
  console.log(activeNetwork);
  const navigate = useNavigate();

  const handleRequestFunds = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.faucet);
  };

  if (!activeNetwork.faucet) {
    return null;
  }

  return (
    <MvxButton
      data-testid={DataTestIdsEnum.faucetBtn}
      onClick={handleRequestFunds}
      size='small'
    >
      <span className='text-sm font-normal'>Request Funds</span>
    </MvxButton>
  );
};
