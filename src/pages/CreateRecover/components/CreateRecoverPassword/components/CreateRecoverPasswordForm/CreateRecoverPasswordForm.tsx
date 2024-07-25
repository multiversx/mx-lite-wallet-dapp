import { RefObject } from 'react';
import { Formik } from 'formik';

import { CreateRecoverPasswordFormFields } from './components';
import { PasswordFormInitialValuesType } from '../../hooks';
import { passwordFormSchema } from 'helpers';

export interface CreateRecoverPasswordFormType {
  initialValues: PasswordFormInitialValuesType;
  onSubmit: (values: PasswordFormInitialValuesType) => Promise<void>;
  inputRef: RefObject<HTMLInputElement>;
  infoSection?: JSX.Element;
}

export const CreateRecoverPasswordForm = ({
  initialValues,
  onSubmit,
  inputRef,
  infoSection
}: CreateRecoverPasswordFormType) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={passwordFormSchema()}
    >
      {(formikProps) => (
        <CreateRecoverPasswordFormFields
          formikProps={formikProps}
          inputRef={inputRef}
          infoSection={infoSection}
        />
      )}
    </Formik>
  );
};
