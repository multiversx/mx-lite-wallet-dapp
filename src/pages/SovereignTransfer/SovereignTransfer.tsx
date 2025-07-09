import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FeaturePageLayout } from 'components/Layout';
import { RootState } from 'redux/store';
import { routeNames } from 'routes';
import { SovereignTransferForm } from './components';

export const SovereignTransfer = () => {
  const { activeNetwork } = useSelector((state: RootState) => state.network);

  if (!activeNetwork.hasSovereignTransfer) {
    return <Navigate to={routeNames.dashboard} />;
  }

  return (
    <FeaturePageLayout title='Sovereign Transfer'>
      <SovereignTransferForm />
    </FeaturePageLayout>
  );
};
