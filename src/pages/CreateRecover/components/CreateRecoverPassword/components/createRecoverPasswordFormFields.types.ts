import { FormikProps } from 'formik';
import {
  CreateRecoverFieldNamesEnum,
  PasswordFormInitialValuesType
} from '../types';

export interface CreateRecoverPasswordFormFieldsPropsType {
  formikProps: FormikProps<PasswordFormInitialValuesType>;
  infoSection?: JSX.Element;
}

export interface CreateRecoverPasswordFormFieldType {
  label: string;
  type: string;
  name: CreateRecoverFieldNamesEnum;
}
