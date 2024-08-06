export enum CreateRoutesEnum {
  info = '',
  mnemonicPhrase = 'mnemonic',
  checkMnemonic = 'check',
  setPassword = 'password',
  download = 'download'
}

export enum CreateRecoverFieldNamesEnum {
  check = 'check',
  password = 'password',
  passwordRepeat = 'passwordRepeat'
}

export interface PasswordFormInitialValuesType {
  [CreateRecoverFieldNamesEnum.password]: string;
  [CreateRecoverFieldNamesEnum.passwordRepeat]: string;
  [CreateRecoverFieldNamesEnum.check]: boolean;
}

export type PasswordFormPasswordFieldType = Pick<
  PasswordFormInitialValuesType,
  CreateRecoverFieldNamesEnum.password
>;

export interface CreateRecoverPasswordPropsType {
  mnemonic: string;
  onNext: () => void;
  setCreatedAddress: (address: string) => void;
  setKeystoreString: (keystoreString: string) => void;
}
