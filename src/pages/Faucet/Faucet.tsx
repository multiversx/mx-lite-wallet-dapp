import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'components/Button';
import { DataTestIdsEnum } from 'localConstants';
import { RootState } from 'redux/store';
import { RouteNamesEnum } from 'localConstants/routes';
import { FaucetContent } from './components/FuacetContent/FaucetContent';
const sitekey = import.meta.env.VITE_APP_GOOGLE_RECAPTCHA_KEY;

const hasFaucet = import.meta.env.VITE_APP_MSW === 'true' || Boolean(sitekey);

export const Faucet = () => {
  const navigate = useNavigate();
  const { activeNetwork } = useSelector((state: RootState) => state.network);

  if (!hasFaucet || !activeNetwork.faucet) {
    // Faucet does not work without google recaptcha key, unless recaptchaBypass is specified (sovereign)
    return <Navigate to={RouteNamesEnum.dashboard} />;
  }

  const handleFaucetCloseFlow = () => {
    navigate(RouteNamesEnum.dashboard);
  };

  return (
    <>
      <FaucetContent />
      <Button
        data-testid={DataTestIdsEnum.cancelFaucetBtn}
        className='mx-auto text-blue-600 text-sm'
        id='closeButton'
        onClick={handleFaucetCloseFlow}
      >
        Cancel
      </Button>
    </>
  );
};
