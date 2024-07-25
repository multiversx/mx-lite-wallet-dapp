import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'localConstants';
import { CreateDisclaimerType } from '../hooks';
import { getEgldLabel } from 'lib';
import { isChromeIOS } from '../../../../helpers';

export const CreateDisclaimerScreen = ({
  handleNetworkCheckboxChange,
  handleCheckboxChange,
  disclaimerContinueHandler,
  isValid,
  touched,
  safetyRef,
  networkRef,
  touchedNetwork,
  isValidNetwork,
  accessWalletSection
}: CreateDisclaimerType) => {
  const egldLabel = getEgldLabel();

  return (
    <div className='create-wrapper'>
      <div className='create-top'>
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

        <div className='create-disclaimers'>
          <p className='create-disclaimer'>
            <FontAwesomeIcon icon={faInfoCircle} className='primary' />{' '}
            Blockchains do not have a “Reset Password” feature. All you get is a
            Secret Phrase - make sure to keep it safe.
          </p>

          <div className='modal-layout-fields'>
            <div className='modal-layout-checkbox-field'>
              <input
                type='checkbox'
                id='check'
                data-testid={DataTestIdsEnum.check}
                ref={safetyRef}
                onChange={handleCheckboxChange}
                className={classNames('modal-layout-checkbox-input', {
                  invalid: touched && !isValid
                })}
              />

              <label
                htmlFor='check'
                data-testid={DataTestIdsEnum.disclaimerCheck}
              >
                I understand I have to be extra careful to save my secret phrase
                and backup my private keys. My money will depend on it.
              </label>
            </div>

            <div className='modal-layout-checkbox-field'>
              <input
                type='checkbox'
                id='check-testnet'
                data-testid={DataTestIdsEnum.checkNetwork}
                ref={networkRef}
                onChange={handleNetworkCheckboxChange}
                className={classNames('modal-layout-checkbox-input', {
                  invalid: touchedNetwork && !isValidNetwork
                })}
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

      <button
        type='submit'
        disabled={!isValid || !isValidNetwork}
        data-testid='submitButton'
        id='createWalletBtn'
        className='btn btn-primary modal-layout-button'
        onClick={disclaimerContinueHandler}
      >
        Continue
      </button>

      {accessWalletSection}
    </div>
  );
};
