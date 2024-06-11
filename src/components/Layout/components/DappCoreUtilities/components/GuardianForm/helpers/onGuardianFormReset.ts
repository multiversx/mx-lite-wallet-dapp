import { Dispatch, MouseEvent, MutableRefObject, SetStateAction } from 'react';

import {
  GuardianFormHookReturnType,
  GuardianFormHookType
} from '../GuardianForm.types';

export interface OnGuardianResetType
  extends Pick<GuardianFormHookType, 'setGuardianError'> {
  setRequiredError: Dispatch<SetStateAction<boolean>>;
  setCode: Dispatch<SetStateAction<GuardianFormHookReturnType['code']>>;
  inputElementsReferences: MutableRefObject<HTMLInputElement[]>;
  initialEmptyInputs: string[];
}

export const onGuardianFormReset =
  (externalProperties: OnGuardianResetType) =>
  (event: MouseEvent<HTMLElement>) => {
    const {
      setCode,
      setRequiredError,
      setGuardianError,
      inputElementsReferences,
      initialEmptyInputs
    } = externalProperties;

    const firstInput = inputElementsReferences.current.find(
      (element) => Number(element.dataset.index) === 0
    );

    event.preventDefault();
    setCode(initialEmptyInputs);
    setRequiredError(false);
    setGuardianError(null);

    if (firstInput) {
      firstInput.focus();
    }
  };
