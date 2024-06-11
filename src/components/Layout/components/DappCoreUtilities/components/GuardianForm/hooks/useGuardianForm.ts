import { MouseEvent, useMemo, useState, useRef, useEffect } from 'react';

import { AxiosError } from 'axios';
import { TimeGroupLabelEnum } from 'helpers';
import { TimeDataTypeEnum, useGetRemainingTime } from 'hooks';
import { useGuardianCodeStates } from 'hooks/guardian';
import { GUARDIAN_CODE_LENGTH_LONG } from 'localConstants';

import {
  GuardianFormHookReturnType,
  GuardianFormHookType
} from '../GuardianForm.types';
import {
  GuardianErrorDataType,
  getErrorVerificationRetryInfo,
  onGaurdianFormChange,
  onGuardianFormKeyDown,
  onGuardianFormPaste,
  onGuardianFormReset
} from '../helpers';

export const useGuardianForm = ({
  onGuardianSubmit,
  setGuardianError,
  guardianProvider
}: GuardianFormHookType): GuardianFormHookReturnType => {
  const { codeInputLength } = guardianProvider;

  const {
    insertGuardianCodeEntryTimeout,
    resetGuardianCodeEntryTimeout,
    trackGuardianCodeEntryStatus
  } = useGuardianCodeStates();

  const isLongSingularInput = codeInputLength > GUARDIAN_CODE_LENGTH_LONG;
  const inputElementsReferences = useRef<HTMLInputElement[]>([]);

  const totalCodeInputBoxes = isLongSingularInput ? 1 : codeInputLength;
  const initialEmptyInputs = Array(totalCodeInputBoxes).fill('');

  const [requiredError, setRequiredError] = useState(false);
  const [code, setCode] = useState(initialEmptyInputs);
  const [codeAttemptTimeout, setCodeAttemptTimeout] = useState(0);

  const resetGuardianCodeTimeout = () => {
    setCodeAttemptTimeout(0);
    resetGuardianCodeEntryTimeout();
  };

  const cooldownRemainingTime = useGetRemainingTime({
    timeData: codeAttemptTimeout,
    timeDataType: TimeDataTypeEnum.timestampUntiTarget,
    onCountdownEnd: resetGuardianCodeTimeout,
    excludeTimeGroup: [TimeGroupLabelEnum.days, TimeGroupLabelEnum.hours]
  });

  const cooldownTime = useMemo(() => {
    if (codeAttemptTimeout <= 0 || cooldownRemainingTime.length === 0) {
      return null;
    }

    return cooldownRemainingTime;
  }, [codeAttemptTimeout, cooldownRemainingTime]);

  const allInputsHaveValue = useMemo(
    () => code.every((character) => Boolean(character)),
    [code]
  );

  const anyInputHasValue = useMemo(
    () => code.some((character) => Boolean(character)),
    [code]
  );

  const onInputReference = (element: HTMLInputElement | null) => {
    if (element && !inputElementsReferences.current.includes(element)) {
      inputElementsReferences.current.push(element);
    }
  };

  const onSubmit = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (allInputsHaveValue) {
      try {
        await onGuardianSubmit({ code: code.join('') });
        resetGuardianCodeTimeout();
      } catch (error) {
        const data = getErrorVerificationRetryInfo(
          error as AxiosError<GuardianErrorDataType>
        );

        if (data?.remainingTrials === 0) {
          insertGuardianCodeEntryTimeout(data?.resetAfter);
        }
      }
    } else {
      const firstEmptyCodeIndex = code.findIndex((character) => !character);
      const firstEmptyInput = inputElementsReferences.current.find(
        (_, index) => index === firstEmptyCodeIndex
      );

      if (firstEmptyInput) {
        setRequiredError(true);
        firstEmptyInput.focus();
      }
    }
  };

  const onKeyDown = onGuardianFormKeyDown({ setCode, setGuardianError });
  const onReset = onGuardianFormReset({
    setCode,
    setGuardianError,
    setRequiredError,
    inputElementsReferences,
    initialEmptyInputs
  });

  const onPaste = onGuardianFormPaste({
    setCode,
    isLongSingularInput,
    setGuardianError,
    inputElementsReferences,
    code
  });

  const onChange = onGaurdianFormChange({
    setCode,
    setGuardianError,
    code,
    isLongSingularInput
  });

  useEffect(() => {
    trackGuardianCodeEntryStatus((registrationTimeoutTimestamp) => {
      setCodeAttemptTimeout(registrationTimeoutTimestamp);
    });
  }, [trackGuardianCodeEntryStatus]);

  return {
    code,
    requiredError,
    /**
     * An array of objects containing each time group representing the remaining time until the user can try submitting the code again.
     */
    cooldownTime,
    onChange,
    onPaste,
    onReset,
    onKeyDown,
    onSubmit,
    onInputReference,
    allInputsHaveValue,
    anyInputHasValue
  };
};
