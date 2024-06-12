import { useModal } from 'hooks';

export const Keystore = () => {
  const { show, handleShow, handleClose } = useModal();

  return (
    <>
      <button
        data-testid='pemLoginButton'
        onClick={handleShow}
        className='dapp-core-component__main__btn dapp-core-component__main__btn-primary dapp-core-component__main__px-4 dapp-core-component__main__m-1 dapp-core-component__main__mx-3 dapp-pem-login-button'
      >
        <span className='dapp-core-component__loginButtonStyles__login-text'>
          Keystore
        </span>
      </button>
      {/* <PemModal handleClose={handleClose} show={show} /> */}
    </>
  );
};
