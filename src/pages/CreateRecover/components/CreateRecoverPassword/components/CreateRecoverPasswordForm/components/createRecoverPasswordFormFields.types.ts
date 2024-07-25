import { RefObject } from 'react';
import { FormikProps } from 'formik';
import { PasswordFormInitialValuesType } from '../../../hooks';
import { CreateRecoverFieldNamesEnum } from '../../../types';

export interface CreateRecoverPasswordFormFieldsPropsType {
  formikProps: FormikProps<PasswordFormInitialValuesType>;
  inputRef: RefObject<HTMLInputElement>;
  infoSection?: JSX.Element;
}

export interface CreateRecoverPasswordFormFieldType {
  label: string;
  type: string;
  name: CreateRecoverFieldNamesEnum;
  inputRef?: RefObject<HTMLInputElement>;
}
