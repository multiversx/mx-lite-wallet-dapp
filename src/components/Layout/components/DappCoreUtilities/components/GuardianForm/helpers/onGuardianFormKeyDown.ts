import { Dispatch, KeyboardEvent, SetStateAction } from 'react';

import { getInputSiblings } from './getInputSiblings';
import {
  GuardianFormHookReturnType,
  GuardianFormHookType
} from '../GuardianForm.types';

export interface OnGuardianKeydownType
  extends Pick<GuardianFormHookType, 'setGuardianError'> {
  setCode: Dispatch<SetStateAction<GuardianFormHookReturnType['code']>>;
}

export const onGuardianFormKeyDown =
  (externalProperties: OnGuardianKeydownType) =>
  (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = Boolean(target.value);

    if (['Equal', 'Minus', 'Period', 'KeyE'].includes(event.code)) {
      return event.preventDefault();
    }

    const { setGuardianError, setCode } = externalProperties;
    const { nextInputSibling, previousInputSibling } = getInputSiblings(target);

    const actionNext = event.code === 'ArrowRight';
    const actionPrevious = event.code === 'ArrowLeft';
    const actionRemove = event.code === 'Backspace' || event.code === 'Delete';

    if (actionNext && nextInputSibling) {
      nextInputSibling.focus();
      return;
    }

    if (actionPrevious && previousInputSibling) {
      previousInputSibling.focus();
      return;
    }

    if (actionRemove && value) {
      setCode((current) =>
        current.map((character, position) =>
          position === Number(target.dataset.index) ? '' : character
        )
      );

      setGuardianError(null);
      return;
    }

    if (actionRemove && previousInputSibling && !value) {
      setCode((current) =>
        current.map((character, position) =>
          position === Number(previousInputSibling.dataset.index)
            ? ''
            : character
        )
      );

      previousInputSibling.focus();
      setGuardianError(null);
    }
  };
