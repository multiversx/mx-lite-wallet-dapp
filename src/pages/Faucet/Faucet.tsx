import { Button, ModalContainer, PrivateKeyCheckWrapper } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { FaucetModal } from './components/FaucetModal';
import { useModal } from '../../hooks';

export const Faucet = () => {
  const { show, handleShow, handleClose } = useModal();

  return (
    <>
      <Button
        className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
        data-testid={DataTestIdsEnum.sovereignTransferBtn}
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
