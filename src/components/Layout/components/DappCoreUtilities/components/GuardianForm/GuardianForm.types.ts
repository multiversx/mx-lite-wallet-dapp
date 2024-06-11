import {
  ChangeEvent,
  ClipboardEvent,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  SetStateAction
} from 'react';
import GenericGuardianProvider from '@multiversx/sdk-guardians-provider/out/genericGuardianProvider';

import { AxiosError } from 'axios';
import { TimeGroupType } from 'helpers';
import { WithClassnameType, GuardianScreenType } from 'types';
import { GuardianErrorDataType } from './helpers/getErrorVerificationRetryInfo';

export interface OnGuardianSubmitReturnType {
  transactionsSigned: boolean;
}

export interface GuardianSubmitPropsType {
  code: string;
  secondCode?: string;
}

export interface GuardianFormPropsType
  extends WithClassnameType,
    PropsWithChildren,
    Omit<GuardianScreenType, 'onSignTransaction'> {
  onGuardianSubmit: (_data: GuardianSubmitPropsType) => Promise<void>;
  fieldName: string;
  guardianError?: AxiosError<GuardianErrorDataType> | null;
  isDisabled?: boolean;
  setGuardianError: Dispatch<
    SetStateAction<AxiosError<GuardianErrorDataType> | null>
  >;
  guardianProvider: GenericGuardianProvider;
  hideBackButton?: boolean;
  backButtonText?: string;
  submitButtonText?: string;
}

export type GuardianFormHookType = Pick<
  GuardianFormPropsType,
  'guardianProvider' | 'setGuardianError' | 'onGuardianSubmit'
>;

export interface GuardianFormHookReturnType {
  requiredError: boolean;
  code: string[];
  allInputsHaveValue: boolean;
  anyInputHasValue: boolean;
  cooldownTime: null | TimeGroupType[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: (event: MouseEvent<HTMLElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (event: MouseEvent<HTMLElement>) => void;
  onInputReference: (element: HTMLInputElement | null) => void;
}
