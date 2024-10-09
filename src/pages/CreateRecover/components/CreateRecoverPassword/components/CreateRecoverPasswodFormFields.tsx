import classNames from 'classnames';
import { Button, PasswordVisibilityToggle } from 'components';
import { getFormHasError } from 'helpers';
import { useBooleanStateToggle } from 'hooks';
import { DataTestIdsEnum } from 'localConstants';

import {
  CreateRecoverPasswordFormFieldsPropsType,
  CreateRecoverPasswordFormFieldType
} from './createRecoverPasswordFormFields.types';
import { CreateRecoverFieldNamesEnum } from '../types';

export const CreateRecoverPasswordFormFields = ({
  formikProps,
  infoSection
}: CreateRecoverPasswordFormFieldsPropsType) => {
  const { isSet, toggleState } = useBooleanStateToggle(false);

  const fields: CreateRecoverPasswordFormFieldType[] = [
    {
      label: 'Password',
      type: 'password',
      name: CreateRecoverFieldNamesEnum.password
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: CreateRecoverFieldNamesEnum.passwordRepeat
    }
  ];

  return (
    <form
      data-testid={DataTestIdsEnum.createPasswordForm}
      onSubmit={formikProps.handleSubmit}
      className='flex flex-col items-center justify-center gap-4 w-full'
    >
      {infoSection}

      <div className='flex flex-col items-center justify-center gap-4 w-full mb-10'>
        {fields.map((field, index) => {
          const checkFormHasError = getFormHasError(formikProps);
          const hasError = checkFormHasError(field.name);

          return (
            <div key={field.name} className='w-full flex flex-col relative'>
              <label
                htmlFor={field.name}
                className='block text-sm font-bold mb-2'
              >
                {field.label}
              </label>
              <input
                autoFocus={index === 0}
                className={classNames(
                  'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded relative',
                  {
                    'border-red-600': hasError
                  }
                )}
                data-testid={DataTestIdsEnum[field.name]}
                id={field.name}
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
                type={isSet ? 'text' : field.type}
              />
              {field.name.startsWith(CreateRecoverFieldNamesEnum.password) && (
                <PasswordVisibilityToggle
                  isVisible={isSet}
                  onVisibilityChange={toggleState}
                />
              )}
              {hasError && (
                <div
                  data-testid={DataTestIdsEnum.passwordError}
                  className='text-red-600 text-sm mt-1'
                >
                  {formikProps.errors[field.name]}
                </div>
              )}

              {!hasError && (
                <span className='text-sm text-gray-400 mt-1'>
                  At least 8 characters, an uppercase letter, a symbol & a
                  number.
                </span>
              )}
            </div>
          );
        })}
      </div>

      <Button
        data-testid={DataTestIdsEnum.submitButton}
        disabled={!formikProps.isValid}
        id='createWalletBtn'
        type='submit'
      >
        Continue
      </Button>
    </form>
  );
};
