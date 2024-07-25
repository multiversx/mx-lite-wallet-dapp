import classNames from 'classnames';

import { CreateRecoverFieldNamesEnum } from 'components/CreateRecoverPassword/types';
import { PasswordVisibilityToggle } from 'components/PasswordVisibilityToggle';
import { useBooleanStateToggle } from 'hooks';
import { DataTestIdsEnum } from 'localConstants';

import {
  CreateRecoverPasswordFormFieldsPropsType,
  CreateRecoverPasswordFormFieldType
} from './createRecoverPasswordFormFields.types';

export const CreateRecoverPasswordFormFields = ({
  formikProps,
  inputRef,
  infoSection
}: CreateRecoverPasswordFormFieldsPropsType) => {
  const { t } = useTranslation(['createAndRecover']);
  const { t: c } = useTranslation(['common']);
  const { isSet, toggleState } = useBooleanStateToggle(false);

  const showError = (fieldName: CreateRecoverFieldNamesEnum) =>
    Boolean(formikProps.errors[fieldName] && formikProps.touched[fieldName]);

  const fields: CreateRecoverPasswordFormFieldType[] = [
    {
      label: 'Password',
      type: 'password',
      name: CreateRecoverFieldNamesEnum.password,
      inputRef
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
      className='create-wrapper recover-wrapper password-form'
    >
      {infoSection}

      <div className='create-top recover-top'>
        <div className='modal-layout-fields'>
          {fields.map((field) => (
            <div key={field.name} className='form-group modal-layout-field'>
              <label htmlFor={field.name}>
                <Trans t={c}>{field.label}</Trans>
              </label>
              <input
                className={classNames('form-control', 'modal-layout-input', {
                  invalid: showError(field.name)
                })}
                data-testid={DataTestIdsEnum[field.name]}
                id={field.name}
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
                ref={field.inputRef}
                type={isSet ? 'text' : field.type}
              />
              {field.name.startsWith(CreateRecoverFieldNamesEnum.password) && (
                <PasswordVisibilityToggle
                  isVisible={isSet}
                  onVisibilityChange={toggleState}
                />
              )}
              {showError(field.name) && (
                <div
                  data-testid={DataTestIdsEnum.passwordError}
                  className='modal-layout-error'
                >
                  {formikProps.errors[field.name]}
                </div>
              )}

              {!showError(field.name) && field.inputRef && (
                <small className='modal-layout-small create-small recover-small'>
                  <Trans t={t}>
                    At least 8 characters, an uppercase letter, a symbol & a
                    number.
                  </Trans>
                </small>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={!formikProps.isValid}
        type='submit'
        data-testid={DataTestIdsEnum.submitButton}
        id='createWalletBtn'
        className='btn btn-primary modal-layout-button'
      >
        <Trans t={c}>Continue</Trans>
      </button>
    </form>
  );
};
