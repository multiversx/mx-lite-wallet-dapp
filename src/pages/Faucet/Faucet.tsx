import { useSelector } from 'react-redux';
import { Button, ModalContainer, PrivateKeyCheckWrapper } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { networkSelector } from 'redux/selectors';
import { FaucetModal } from './components/FaucetModal';
import { useModal } from '../../hooks';

const sitekey = import.meta.env.VITE_APP_GOOGLE_RECAPTCHA_KEY;

export const Faucet = () => {
  const { show, handleShow, handleClose } = useModal();
  const { activeNetwork } = useSelector(networkSelector);
  const isSovereign = activeNetwork.id === 'sovereign';

  if (!sitekey && !isSovereign) {
    // Faucet does not work without google recaptcha key, unless recaptchaBypass is specified (sovereign)
    return null;
  }

  return (
    <>
      <Button
        className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
        data-testid={DataTestIdsEnum.faucetBtn}
        onClick={handleShow}
      >
        Request funds
      </Button>
      <PrivateKeyCheckWrapper>
        <ModalContainer
          className='login-modal p-6'
          onClose={handleClose}
          visible={show}
        >
          <FaucetModal />
        </ModalContainer>
      </PrivateKeyCheckWrapper>
    </>
  );
};
