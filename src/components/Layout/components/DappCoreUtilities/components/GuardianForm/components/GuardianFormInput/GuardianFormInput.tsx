import React, { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';

import {
  GUARDIAN_CODE_LENGTH_LONG,
  GUARDIAN_CODE_LENGTH_MEDIUM,
  GUARDIAN_CODE_LENGTH_SHORT,
  GUARDIAN_CODE_MAX_VALUE,
  GUARDIAN_CODE_MIN_VALUE
} from 'localConstants';

import { GuardianFormHookReturnType } from '../../GuardianForm.types';

interface GuardianFormInputPropsType {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  fieldName: string;
  value: string;
  inputIndex: number;
  hasError: boolean;
  onReference: GuardianFormHookReturnType['onInputReference'];
  codeInputLength: number;
  isDisabled?: boolean;
}

export const GuardianFormInput = ({
  value,
  isDisabled,
  codeInputLength,
  fieldName,
  inputIndex,
  hasError,
  onKeyDown,
  onPaste,
  onChange,
  onReference
}: GuardianFormInputPropsType) => {
  const showLongSingularInput = codeInputLength > GUARDIAN_CODE_LENGTH_LONG;
  const showInputsPairsOfThree = codeInputLength === GUARDIAN_CODE_LENGTH_SHORT;

  const showInputsPairsOfFour =
    codeInputLength >= GUARDIAN_CODE_LENGTH_MEDIUM &&
    codeInputLength <= GUARDIAN_CODE_LENGTH_LONG;

  const showInputsWithoutSeparator =
    codeInputLength < GUARDIAN_CODE_LENGTH_SHORT;

  const middleInputIndex = showInputsWithoutSeparator
    ? null
    : Math.floor(codeInputLength / 2);

  const shouldAutoFocus = !Boolean(isDisabled) && inputIndex === 0;
  const guardianInputIdentifier = `${fieldName}-${inputIndex}`;

  const showInputSeparator =
    middleInputIndex === inputIndex + 1 && !showLongSingularInput;

  return (
    <div
      className={classNames('guardian-input-wrapper', {
        [`guardian-input-wrapper-${inputIndex}`]: !showLongSingularInput,
        'guardian-input-wrapper-longest': showLongSingularInput,
        'guardian-input-wrapper-separator': showInputSeparator,
        'guardian-input-wrapper-long': showInputsPairsOfFour,
        'guardian-input-wrapper-medium': showInputsPairsOfThree
      })}
    >
      <input
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        ref={onReference}
        onChange={onChange}
        value={value}
        data-index={inputIndex}
        autoFocus={shouldAutoFocus}
        id={guardianInputIdentifier}
        name={guardianInputIdentifier}
        data-testid={guardianInputIdentifier}
        autoComplete='off'
        min={GUARDIAN_CODE_MIN_VALUE}
        max={GUARDIAN_CODE_MAX_VALUE}
        type='number'
        className={classNames('guardian-input', {
          'guardian-input-box': !showLongSingularInput,
          'guardian-input-longest': showLongSingularInput,
          'guardian-input-error': hasError,
          'guardian-input-disabled': isDisabled
        })}
      />
    </div>
  );
};
