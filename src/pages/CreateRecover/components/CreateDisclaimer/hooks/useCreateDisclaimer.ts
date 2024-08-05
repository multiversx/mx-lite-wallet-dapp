import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { generateMnemonic } from '../generateMnemonic';

export interface CreateDisclaimerReturnType {
  disclaimerContinueHandler: () => void;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNetworkCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  isValidNetwork: boolean;
  networkRef: MutableRefObject<null>;
  safetyRef: MutableRefObject<null>;
}

export interface CreateDisclaimerPropsType {
  onNext: () => void;
  setMnemonic: (mnemonic: string) => void;
}

export const useCreateDisclaimer = ({
  onNext,
  setMnemonic
}: CreateDisclaimerPropsType) => {
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isValidNetwork, setIsValidNetwork] = useState(true);
  const [touchedNetwork, setTouchedNetwork] = useState(false);

  const safetyRef = useRef(null);
  const networkRef = useRef(null);

  const disclaimerContinueHandler = () => {
    if (touched && isValid && touchedNetwork && isValidNetwork) {
      const mnemonic = generateMnemonic();
      const mnemonicString = mnemonic.join(' ');
      setMnemonic(mnemonicString);
      onNext();
    } else {
      const isChecked =
        safetyRef.current !== null && (safetyRef.current as any).checked;
      const isCheckedNetwork =
        networkRef.current !== null && (networkRef.current as any).checked;

      setTouched(true);
      setIsValid(isChecked);
      setTouchedNetwork(true);
      setIsValidNetwork(isCheckedNetwork);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setTouched(true);

    if (checked) {
      setIsValid(true);
    } else {
      setIsValid(false);
      event.target.setCustomValidity('Please select a date in the past.');
    }
  };

  const handleNetworkCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setTouchedNetwork(true);

    if (checked) {
      setIsValidNetwork(true);
    } else {
      setIsValidNetwork(false);
      event.target.setCustomValidity(
        'Please confirm by clicking the checkbox.'
      );
    }
  };

  return {
    handleNetworkCheckboxChange,
    handleCheckboxChange,
    disclaimerContinueHandler,
    isValid,
    safetyRef,
    networkRef,
    isValidNetwork
  };
};
