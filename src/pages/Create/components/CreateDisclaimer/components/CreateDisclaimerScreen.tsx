import React from 'react';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { getEgldLabel, isChromeIOS } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { CreateDisclaimerType } from '../hooks/useCreateDisclaimer';

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
  const { t } = useTranslation(['createAndRecover']);
  const { t: c } = useTranslation(['common']);
  const egldLabel = getEgldLabel();

  return (
    <div className='create-wrapper'>
      <div className='create-top'>
        {isChromeIOS() && (
          <div className='p-2 border rounded border-warning bg-warning-light mb-spacer mx-sm-5'>
            <p className='body-color m-0'>
              <Trans t={t}>
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
              </Trans>
            </p>
          </div>
        )}

        <div className='create-disclaimers'>
          <p className='create-disclaimer'>
            <FontAwesomeIcon icon={faInfoCircle} className='primary' />{' '}
            <Trans t={t}>
              Blockchains do not have a “Reset Password” feature. All you get is
              a Secret Phrase - make sure to keep it safe.
            </Trans>
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
                <Trans t={t}>
                  I understand I have to be extra careful to save my secret
                  phrase and backup my private keys. My money will depend on it.
                </Trans>
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
                <Trans t={t}>
                  I understand that by using this wallet I will be transfering{' '}
                  <>{egldLabel === 'EGLD' ? t('real') : ''}</> <>{egldLabel}</>{' '}
                  tokens.
                </Trans>
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
        <Trans t={c}>Continue</Trans>
      </button>

      {accessWalletSection}
    </div>
  );
};
