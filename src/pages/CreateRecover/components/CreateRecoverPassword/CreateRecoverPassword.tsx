import { Formik } from 'formik';
import { passwordFormSchema } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { CreateRecoverPasswordFormFields } from './components';
import {
  CreateRecoverFieldNamesEnum,
  CreateRecoverPasswordPropsType,
  PasswordFormInitialValuesType,
  PasswordFormPasswordFieldType
} from './types';
import { getKeysFromMnemonic } from '../../helpers';

const initialValues: PasswordFormInitialValuesType = {
  [CreateRecoverFieldNamesEnum.password]: '',
  [CreateRecoverFieldNamesEnum.passwordRepeat]: '',
  [CreateRecoverFieldNamesEnum.check]: false
};

export const CreateRecoverPassword = ({
  mnemonic,
  onNext,
  setCreatedAddress,
  setKeystoreString
}: CreateRecoverPasswordPropsType) => {
  const infoSection = (
    <p
      className='text-sm text-gray-400 mb-10'
      data-testid={DataTestIdsEnum.modalSubtitle}
    >
      The wallet made a secret key for you and stored it in a file. Protect your
      Keystore File with a password.
    </p>
  );

  const handleSubmit = ({ password }: PasswordFormPasswordFieldType) => {
    const { publicKey, privateKey } = getKeysFromMnemonic({
      mnemonic,
      password
    });

    setCreatedAddress(publicKey);
    setKeystoreString(JSON.stringify(privateKey));
    onNext();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={passwordFormSchema()}
    >
      {(formikProps) => (
        <CreateRecoverPasswordFormFields
          formikProps={formikProps}
          infoSection={infoSection}
        />
      )}
    </Formik>
  );
};
