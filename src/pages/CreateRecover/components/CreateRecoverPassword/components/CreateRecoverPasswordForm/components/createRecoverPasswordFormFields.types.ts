import { RefObject } from 'react';
import { FormikProps } from 'formik';

import { PasswordFormInitialValuesType } from 'components/CreateRecoverPassword/hooks';
import { CreateRecoverFieldNamesEnum } from 'components/CreateRecoverPassword/types';

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
