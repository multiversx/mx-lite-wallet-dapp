import { useNavigate } from 'react-router-dom';
import { Button, PrivateKeyCheckWrapper } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { FaucetContent } from './components/FuacetContent/FaucetContent';
const sitekey = import.meta.env.VITE_APP_GOOGLE_RECAPTCHA_KEY;

export const Faucet = () => {
  const navigate = useNavigate();

  if (!sitekey) {
    // Faucet does not work without google recaptcha key, unless recaptchaBypass is specified (sovereign)
    return null;
  }

  const handleFaucetCloseFlow = () => {
    navigate(routeNames.dashboard);
  };

  return (
    <PrivateKeyCheckWrapper>
      <div
        className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'
        data-testid={DataTestIdsEnum.faucetPage}
      >
        <FaucetContent />
        <Button
          data-testid={DataTestIdsEnum.cancelFaucetBtn}
          className='mx-auto text-blue-600 text-sm'
          id='closeButton'
          onClick={handleFaucetCloseFlow}
        >
          Cancel
        </Button>
      </div>
    </PrivateKeyCheckWrapper>
  );
};
