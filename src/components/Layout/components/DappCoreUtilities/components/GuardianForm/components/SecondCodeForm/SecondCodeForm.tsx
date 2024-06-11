import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import InputMask from 'react-input-mask';
import { object, string } from 'yup';
import { GuardianFormPropsType } from '../..';

const CODE_FIELD = 'code';
const SECOND_CODE_FIELD = 'secondCode';

interface FormValuesType {
  [CODE_FIELD]: string;
  [SECOND_CODE_FIELD]: string;
}

const extractCode = (value = '') => value?.replace(/_/g, '').replace(/ /g, '');

interface SecondCodeFormPropsType {
  onGuardianSubmit: GuardianFormPropsType['onGuardianSubmit'];
}

export const SecondCodeForm = ({
  onGuardianSubmit
}: SecondCodeFormPropsType) => {
  const initialValues: FormValuesType = {
    [CODE_FIELD]: '',
    [SECOND_CODE_FIELD]: ''
  };

  const validationSchema = object().shape({
    [CODE_FIELD]: string().test(
      'invalid',
      'Must be 6 characters long',
      (value) => extractCode(value).length === 6
    ),
    [SECOND_CODE_FIELD]: string().test(
      'invalid',
      'Must be 6 characters long',
      (value) => extractCode(value).length === 6
    )
  });

  const onSubmit = async (
    { code, secondCode }: FormValuesType,
    { setSubmitting }: FormikHelpers<FormValuesType>
  ) => {
    await onGuardianSubmit({
      code: extractCode(code),
      secondCode: extractCode(secondCode)
    });
    setSubmitting(false);
  };

  return (
    <div className='p-3'>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        enableReinitialize
      >
        {({
          handleSubmit,
          isValid,
          submitForm,
          handleChange,
          handleBlur,
          isSubmitting
        }) => {
          const inputProps = {
            mask: '9 9 9 9 9 9',
            placeholder: '_ _ _ _ _ _',
            onChange: handleChange,
            onBlur: handleBlur,
            maskChar: '_',
            autoComplete: 'off',
            className: 'code-input-field'
          };
          return (
            <form
              className='confirmation-form-panel-fields'
              onSubmit={handleSubmit}
            >
              <label htmlFor={CODE_FIELD} className='guardian-label pb-1'>
                First Guardian Code
              </label>
              <InputMask name={CODE_FIELD} id={CODE_FIELD} {...inputProps} />
              <label htmlFor={CODE_FIELD} className='guardian-label pt-3 pb-1'>
                Second Guardian Code
              </label>
              <InputMask
                name={SECOND_CODE_FIELD}
                id={SECOND_CODE_FIELD}
                {...inputProps}
              />
              <span className='text-center p-1'>
                Fill in two consecutive guardian codes to proceed.
              </span>
              <button
                className='btn btn-primary modal-layout-button'
                data-testid='secondCodeFormSubmitButton'
                disabled={!isValid || isSubmitting}
                onClick={submitForm}
                type='submit'
              >
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
