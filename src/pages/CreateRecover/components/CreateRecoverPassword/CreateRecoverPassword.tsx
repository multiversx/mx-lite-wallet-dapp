import { Navigate } from 'react-router-dom';
import { useCreateRecoverContext } from 'pages/CreateRecover/contexts/createRecover';
import { routeNames } from 'routes';

import { CreateRecoverPasswordForm } from './components';
import { useCreateRecoverPasswordForm } from './hooks';
import { CreateRecoverRoutesEnum } from '../../routes';

export const CreateRecoverPassword = () => {
  const { createRecoverWalletRoutes } = useCreateRecoverContext();
  const { saveToContextAndNavigate, initialValues, inputRef } =
    useCreateRecoverPasswordForm();

  const routeNotInArray = !createRecoverWalletRoutes.includes(
    CreateRecoverRoutesEnum.createPassword
  );
  const returnFromDownload = createRecoverWalletRoutes.includes(
    CreateRecoverRoutesEnum.createDownload
  );

  const infoSection = (
    <p className='modal-layout-subtitle' data-testid='modalSubtitle'>
      The wallet made a secret key for you and stored it in a file. <br />{' '}
      Protect your Keystore File with a password.
    </p>
  );

  if (routeNotInArray || returnFromDownload) {
    return <Navigate to={routeNames.home} />;
  }

  return (
    <CreateRecoverPasswordForm
      initialValues={initialValues}
      onSubmit={saveToContextAndNavigate}
      inputRef={inputRef}
      infoSection={infoSection}
    />
  );
};
