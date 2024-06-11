import React from 'react';
import classNames from 'classnames';
import { ErrorMessage, FormikProps } from 'formik';

interface PasswordInputPropsType<T> {
  formikProps: FormikProps<T>;
  autoFocus?: boolean;
}

export const ACCESS_PASS = 'accessPass';

export function PasswordInput<
  T extends {
    accessPass: string;
  }
>({ formikProps, autoFocus }: PasswordInputPropsType<T>) {
  const { values, handleChange, handleBlur, errors, touched, submitForm } =
    formikProps;

  return (
    <>
      <input
        type='password'
        autoComplete='new-password'
        id={ACCESS_PASS}
        data-testid={ACCESS_PASS}
        value={values[ACCESS_PASS]}
        onChange={handleChange}
        onBlur={handleBlur}
        name={ACCESS_PASS}
        placeholder='Password...'
        className={classNames('form-control', 'modal-layout-input', {
          invalid: errors[ACCESS_PASS] && touched[ACCESS_PASS]
        })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            submitForm();
          }
        }}
        autoFocus={autoFocus}
      />

      <ErrorMessage
        component='div'
        name={ACCESS_PASS}
        className='modal-layout-error'
      />
    </>
  );
}
