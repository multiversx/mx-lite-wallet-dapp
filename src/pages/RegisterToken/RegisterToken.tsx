import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FeaturePageLayout } from 'components/Layout';
import { RootState } from 'redux/store';
import { routeNames } from 'routes';
import { RegisterTokenForm } from './components';

export const RegisterToken = () => {
  const { activeNetwork } = useSelector((state: RootState) => state.network);

  if (!activeNetwork.hasRegisterToken) {
    return <Navigate to={routeNames.dashboard} />;
  }

  return (
    <FeaturePageLayout title='Register Sovereign Token'>
      <RegisterTokenForm />
    </FeaturePageLayout>
  );
};
