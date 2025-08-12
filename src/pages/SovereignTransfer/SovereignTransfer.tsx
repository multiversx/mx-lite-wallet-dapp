import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'redux/store';
import { routeNames } from 'routes';
import { SovereignTransferForm } from './components';

export const SovereignTransfer = () => {
  const { activeNetwork } = useSelector((state: RootState) => state.network);

  if (!activeNetwork.hasSovereignTransfer) {
    return <Navigate to={routeNames.dashboard} />;
  }

  return <SovereignTransferForm />;
};
