import { useEffect, useRef } from 'react';
import { CreateRecoverFieldNamesEnum } from '../../types';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'pages/CreateRecover/contexts/createRecover';
import { usePushAndNavigate } from 'hooks';
import {
  PasswordFormInitialValuesType,
  PasswordFormPasswordFieldType
} from './useCreateRecoverPasswordForm.types';
import { getKeysFromMnemonic } from '../../../../helpers';
import { CreateRecoverRoutesEnum } from '../../../../routes';

const initialValues: PasswordFormInitialValuesType = {
  [CreateRecoverFieldNamesEnum.password]: '',
  [CreateRecoverFieldNamesEnum.passwordRepeat]: '',
  [CreateRecoverFieldNamesEnum.check]: false
};

export const useCreateRecoverPasswordForm = () => {
  const { mnemonic } = useCreateRecoverContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const createDispatch = useCreateRecoverDispatch();
  const pushAndNavigate = usePushAndNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const saveToContextAndNavigate = async ({
    password
  }: PasswordFormPasswordFieldType) => {
    const { publicKey, privateKey } = getKeysFromMnemonic({
      mnemonic,
      password
    });

    // address to be used later in keystoreFile name + session 1st login
    createDispatch({
      type: 'setCreatedAddress',
      createdAddress: publicKey
    });

    createDispatch({
      type: 'setKeystoreString',
      keystoreString: JSON.stringify(privateKey)
    });

    pushAndNavigate(CreateRecoverRoutesEnum.createDownload);
  };

  return {
    saveToContextAndNavigate,
    initialValues,
    inputRef
  };
};
