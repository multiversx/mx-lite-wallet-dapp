import {
  ClipboardEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction
} from 'react';
import {
  GuardianFormHookReturnType,
  GuardianFormHookType
} from '../GuardianForm.types';

export interface OnGuardianPasteType
  extends Pick<GuardianFormHookType, 'setGuardianError'>,
    Pick<GuardianFormHookReturnType, 'code'> {
  isLongSingularInput: boolean;
  setCode: Dispatch<SetStateAction<GuardianFormHookReturnType['code']>>;
  inputElementsReferences: MutableRefObject<HTMLInputElement[]>;
}

export const onGuardianFormPaste =
  (externalProperties: OnGuardianPasteType) =>
  (event: ClipboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const index = Number(target.dataset.index);
    const value = event.clipboardData.getData('text/plain');

    const {
      setGuardianError,
      setCode,
      code,
      inputElementsReferences,
      isLongSingularInput
    } = externalProperties;

    event.preventDefault();
    setGuardianError(null);

    const focusAfterPaste = (inputLength: number) => {
      const inputs = inputElementsReferences.current;
      const nextElementAfterPaste = inputs.find(
        (_, elementIndex) => index + inputLength === elementIndex
      );

      const lastElementFocusable = inputs.find(
        (_, elementIndex) =>
          Math.min(index + inputLength - 1, inputs.length - 1) === elementIndex
      );

      if (nextElementAfterPaste) {
        nextElementAfterPaste.focus();
        return;
      }

      if (lastElementFocusable) {
        lastElementFocusable.focus();
        return;
      }
    };

    if (isLongSingularInput) {
      focusAfterPaste(1);
      setCode((current) =>
        current.map((character, position) =>
          position === 0 ? value : character
        )
      );
    } else {
      const values = value.split('');
      const filteredNumbers = values.filter(
        (character) => !isNaN(Number(character))
      );

      const characters = code.map((character, position) =>
        position >= index ? filteredNumbers[position - index] : character
      );

      focusAfterPaste(filteredNumbers.length);
      setCode(characters);
    }
  };
