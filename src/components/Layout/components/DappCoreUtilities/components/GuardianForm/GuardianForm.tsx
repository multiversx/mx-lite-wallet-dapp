import React, { useEffect, useState } from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { handleGuardianError } from 'helpers/guardian';
import { useGetAccountProvider } from 'hooks';
import {
  DataTestIdsEnum,
  GUARDIAN_CODE_LENGTH_LONG,
  GUARDIAN_CODE_LENGTH_MEDIUM,
  GUARDIAN_CODE_LENGTH_SHORT
} from 'localConstants';
import { useCountdownTimer } from 'modules/Guardian/pages/GuardianVerify/components/VerifyCode/helpers/useCountdownTimer';
import { LoginMethodsEnum } from 'types';

import { GuardianFormInput, SecondCodeForm } from './components';
import { GuardianFormPropsType } from './GuardianForm.types';
import { getErrorVerificationRetryInfo } from './helpers';
import { useGuardianForm } from './hooks';

export const GuardianForm = ({
  onGuardianSubmit,
  onPrev,
  fieldName,
  guardianError: error,
  setGuardianError,
  isDisabled,
  className,
  guardianProvider,
  hideBackButton,
  backButtonText = 'Back',
  submitButtonText,
  guardianFormDescription,
  children
}: GuardianFormPropsType) => {
  const [isSecurityMode, setSecurityMode] = useState(false);
  const [securityModeTimeout, setSecurityModeTimeout] = useState(0);
  const [codeAttemptTimeout, setCodeAttemptTimeout] = useState(0);

  const { providerType } = useGetAccountProvider();
  const guardianError = handleGuardianError(error);
  const info = getErrorVerificationRetryInfo(error);

  useEffect(() => {
    const inSecurityMode =
      info?.securityModeRemainingTrials === 0 &&
      Boolean(info?.securityModeResetAfter);

    if (!inSecurityMode) {
      return;
    }

    setSecurityModeTimeout(info?.securityModeResetAfter ?? 0);
    setSecurityMode(true);

    if (info.remainingTrials === 0) {
      setCodeAttemptTimeout(info.resetAfter);
    }
  }, [info]);

  const remainingTimeUntilSecurityModeEnd =
    useCountdownTimer(securityModeTimeout);
  const remainingTimeUntiNewCodeAttempt = useCountdownTimer(codeAttemptTimeout);

  const {
    code,
    requiredError,
    onChange,
    onPaste,
    onReset,
    onSubmit,
    onKeyDown,
    onInputReference,
    allInputsHaveValue,
    anyInputHasValue,
    cooldownTime
  } = useGuardianForm({ onGuardianSubmit, setGuardianError, guardianProvider });

  const codeInputLength = guardianProvider.codeInputLength;
  const isLedgerProvider = providerType === LoginMethodsEnum.ledger;
  const showLongSingularInput = codeInputLength > GUARDIAN_CODE_LENGTH_LONG;
  const showInputsPairsOfThree = codeInputLength === GUARDIAN_CODE_LENGTH_SHORT;

  const showInputsPairsOfFour =
    codeInputLength >= GUARDIAN_CODE_LENGTH_MEDIUM &&
    codeInputLength <= GUARDIAN_CODE_LENGTH_LONG;

  const anyInputHasError =
    (!allInputsHaveValue && requiredError) || Boolean(guardianError);

  const getInputErrorByIndex = (index: number) =>
    (!Boolean(code[index]) && Boolean(requiredError)) || Boolean(guardianError);

  const submitButtonLabel =
    submitButtonText ?? `${isLedgerProvider ? 'Confirm' : 'Submit'}`;

  if (remainingTimeUntiNewCodeAttempt) {
    return (
      <div className='guardian-cooldown text-center py-4'>
        Retry code in
        <span> {remainingTimeUntiNewCodeAttempt}</span>
      </div>
    );
  }

  if (isSecurityMode) {
    return (
      <>
        <div className='guardian-cooldown text-center'>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size='xs'
            className='text-warning me-1'
          />
          Security mode active for
          <span> {remainingTimeUntilSecurityModeEnd}</span>
        </div>
        <SecondCodeForm onGuardianSubmit={onGuardianSubmit} />
      </>
    );
  }

  return (
    <form className={classNames('guardian', className)}>
      <div className='guardian-wrapper'>
        {guardianFormDescription && (
          <div className='guardian-description'>{guardianFormDescription}</div>
        )}

        <div
          className={classNames('guardian-field', {
            'guardian-field-longest': showLongSingularInput
          })}
        >
          <label htmlFor={`${fieldName}-0`} className='guardian-label'>
            Guardian Code
          </label>

          <div
            className={classNames('guardian-fields', {
              medium: showInputsPairsOfThree
            })}
          >
            {Array(codeInputLength)
              .fill('')
              .map((_, index) => (
                <GuardianFormInput
                  fieldName={fieldName}
                  inputIndex={index}
                  onChange={onChange}
                  onPaste={onPaste}
                  onKeyDown={onKeyDown}
                  onReference={onInputReference}
                  codeInputLength={codeInputLength}
                  isDisabled={isDisabled}
                  value={code[index]}
                  hasError={getInputErrorByIndex(index)}
                  key={`input-code-${index}`}
                />
              ))}
          </div>

          {cooldownTime && (
            <div className='guardian-cooldown'>
              Retry code in
              {cooldownTime.map((item) => (
                <span className='guardian-cooldown-time' key={item.label}>
                  {item.time}
                </span>
              ))}
            </div>
          )}

          <div
            onClick={onReset}
            data-testid={DataTestIdsEnum.guardianCodeReset}
            className={classNames('guardian-reset', {
              'guardian-reset-medium': showInputsPairsOfThree,
              'guardian-reset-long': showInputsPairsOfFour,
              visible: anyInputHasValue && !isDisabled,
              error: anyInputHasError
            })}
          >
            Reset
          </div>

          <div
            data-testid='guardianCodeError'
            className={classNames('guardian-error', {
              visible: anyInputHasError
            })}
          >
            {guardianError || 'Required'}
          </div>
        </div>
      </div>

      {children}

      <div className='guardian-buttons'>
        <button
          className='btn btn-primary modal-layout-button'
          data-testid='guardianFormSubmit'
          disabled={Boolean(isDisabled || guardianError)}
          onClick={onSubmit}
          type='submit'
        >
          {submitButtonLabel}
        </button>

        <button
          className={classNames('modal-layout-text', {
            hidden: hideBackButton
          })}
          data-testid={DataTestIdsEnum.backBtn}
          disabled={isLedgerProvider && isDisabled}
          onClick={onPrev}
          type='button'
        >
          {backButtonText}
        </button>
      </div>
    </form>
  );
};
