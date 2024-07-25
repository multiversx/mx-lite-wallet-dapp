import { Navigate } from 'react-router-dom';
import { useCreateRecoverContext } from 'contexts/createRecover';
import { routeNames } from 'routes';

import { CreateRecoverPasswordForm } from './components';
import { useCreateRecoverPasswordForm } from './hooks';
import { CreateRoutesEnum } from './types';

export const CreateRecoverPassword = () => {
  const { createRecoverWalletRoutes } = useCreateRecoverContext();
  const { saveToContextAndNavigate, initialValues, inputRef } =
    useCreateRecoverPasswordForm();

  const routeNotInArray = !createRecoverWalletRoutes.includes(
    CreateRoutesEnum.setPassword
  );
  const returnFromDownload = createRecoverWalletRoutes.includes(
    CreateRoutesEnum.download
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
