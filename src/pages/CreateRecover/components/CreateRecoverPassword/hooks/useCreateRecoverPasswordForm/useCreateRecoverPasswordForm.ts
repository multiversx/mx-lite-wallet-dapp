import { useEffect, useRef } from 'react';
import { CreateRecoverFieldNamesEnum } from 'components/CreateRecoverPassword/types';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'contexts/createRecover';
import { getKeysFromMnemonic } from 'helpers';
import { usePushAndNavigate } from 'hooks';
import { CreateRoutesEnum } from 'routes';
import {
  PasswordFormInitialValuesType,
  PasswordFormPasswordFieldType
} from './useCreateRecoverPasswordForm.types';

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

    pushAndNavigate(CreateRoutesEnum.download);
  };

  return {
    saveToContextAndNavigate,
    initialValues,
    inputRef
  };
};
