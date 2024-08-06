import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, MxLink } from 'components';
import { getEgldLabel } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { isChromeIOS } from '../../../helpers';
import { CreateDisclaimerReturnType } from '../hooks';

export const CreateDisclaimerScreen = ({
  handleNetworkCheckboxChange,
  handleCheckboxChange,
  disclaimerContinueHandler,
  isValid,
  safetyRef,
  networkRef,
  isValidNetwork
}: CreateDisclaimerReturnType) => {
  const egldLabel = getEgldLabel();

  return (
    <div className='flex flex-col items-center gap-4 mt-10'>
      <div className='mb-10'>
        {isChromeIOS() && (
          <div className='p-2 border rounded border-warning bg-warning-light mb-spacer mx-sm-5'>
            <p className='body-color m-0'>
              Due to a{' '}
              <a
                href='https://groups.google.com/a/chromium.org/g/chromium-html5/c/RKQ0ZJIj7c4?pli=1'
                rel='noopener noreferrer nofollow'
                target='_blank'
              >
                Chrome bug
              </a>{' '}
              there are issues with creating a new wallet using Chrome on iOS.
              Please use Safari to create the new wallet and then you can
              continue using it in Chrome.
            </p>
          </div>
        )}

        <div>
          <p>
            <FontAwesomeIcon icon={faInfoCircle} className='primary' />{' '}
            Blockchains do not have a “Reset Password” feature. All you get is a
            Secret Phrase - make sure to keep it safe.
          </p>

          <div className='mt-2 p-2'>
            <div>
              <input
                type='checkbox'
                id='check'
                data-testid={DataTestIdsEnum.check}
                ref={safetyRef}
                onChange={handleCheckboxChange}
                className='mr-2'
              />

              <label
                htmlFor='check'
                data-testid={DataTestIdsEnum.disclaimerCheck}
              >
                I understand I have to be extra careful to save my secret phrase
                and backup my private keys. My money will depend on it.
              </label>
            </div>

            <div>
              <input
                type='checkbox'
                id='check-testnet'
                data-testid={DataTestIdsEnum.checkNetwork}
                ref={networkRef}
                onChange={handleNetworkCheckboxChange}
                className='mr-2'
              />

              <label htmlFor='check-testnet'>
                I understand that by using this wallet I will be transfering{' '}
                <>{egldLabel === 'EGLD' ? 'real' : ''}</> <>{egldLabel}</>{' '}
                tokens.
              </label>
            </div>
          </div>
        </div>
      </div>

      <Button
        data-testid='submitButton'
        disabled={!isValid || !isValidNetwork}
        id='createWalletBtn'
        onClick={disclaimerContinueHandler}
        type='submit'
      >
        Continue
      </Button>

      <div className='flex flex-col items-center justify-center mt-1 gap-1'>
        <p>Already have a wallet?</p>
        <MxLink
          className='text-blue-400 underline decoration-dotted hover:decoration-solid'
          to={routeNames.unlock}
        >
          Access it
        </MxLink>
      </div>
    </div>
  );
};
