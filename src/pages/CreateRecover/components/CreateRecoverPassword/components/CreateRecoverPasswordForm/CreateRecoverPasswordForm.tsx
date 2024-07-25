import React, { RefObject } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { PasswordFormInitialValuesType } from 'components/CreateRecoverPassword/hooks';
import { passwordFormSchema } from 'helpers';

import { CreateRecoverPasswordFormFields } from './components';

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
  const { t } = useTranslation(['createAndRecover']);
  const { t: c } = useTranslation(['common']);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={passwordFormSchema({ t, c })}
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
