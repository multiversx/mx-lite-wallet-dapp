import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { useCreateRecoverDispatch } from 'pages/CreateRecover/contexts/createRecover';
import { generateMnemonic } from '../generateMnemonic';

export interface CreateDisclaimerType {
  handleNetworkCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disclaimerContinueHandler: () => void;
  isValid: boolean;
  touched: boolean;
  safetyRef: MutableRefObject<null>;
  networkRef: MutableRefObject<null>;
  touchedNetwork: boolean;
  isValidNetwork: boolean;
  accessWalletSection?: JSX.Element;
}

export const useCreateDisclaimer = () => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false);
  const [isValidNetwork, setIsValidNetwork] = useState(true);
  const [touchedNetwork, setTouchedNetwork] = useState(false);

  const safetyRef = useRef(null);
  const networkRef = useRef(null);
  const createDispatch = useCreateRecoverDispatch();

  const disclaimerContinueHandler = () => {
    if (touched && isValid && touchedNetwork && isValidNetwork) {
      const mnemonic = generateMnemonic();
      const mnemonicString = mnemonic.join(' ');
      createDispatch({ type: 'setMnemonic', mnemonic: mnemonicString });
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
    touched,
    safetyRef,
    networkRef,
    touchedNetwork,
    isValidNetwork
  };
};
