import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { getInputSiblings } from './getInputSiblings';
import { GuardianFormHookType } from '../GuardianForm.types';
import { GuardianFormHookReturnType } from '../GuardianForm.types';

export interface OnGuardianChangeType
  extends Pick<GuardianFormHookType, 'setGuardianError'>,
    Pick<GuardianFormHookReturnType, 'code'> {
  isLongSingularInput: boolean;
  setCode: Dispatch<SetStateAction<GuardianFormHookReturnType['code']>>;
}

export const onGaurdianFormChange =
  (externalProperties: OnGuardianChangeType) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const nativeInputEvent = event.nativeEvent as InputEvent;
    const isNativeInputEvent = nativeInputEvent.inputType;

    const { nextInputSibling } = getInputSiblings(target);
    const { isLongSingularInput, code, setCode, setGuardianError } =
      externalProperties;

    const index = Number(target.dataset.index);
    const value = isLongSingularInput
      ? target.value
      : target.value.replace(code[index], '');

    event.preventDefault();
    setGuardianError(null);

    if (isLongSingularInput) {
      setCode((current) =>
        current.map((character, position) =>
          position === 0 ? value : character
        )
      );
    } else {
      setCode((current) =>
        current.map((character, position) =>
          position === index ? value : character
        )
      );

      if (nextInputSibling && Boolean(value) && isNativeInputEvent) {
        nextInputSibling.focus();
      }
    }
  };
