import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants/routes';
import { RootState } from 'redux/store';
import { SovereignTransferForm } from './components';

export const SovereignTransfer = () => {
  const { activeNetwork } = useSelector((state: RootState) => state.network);

  if (!activeNetwork.hasSovereignTransfer) {
    return <Navigate to={RouteNamesEnum.dashboard} />;
  }

  return <SovereignTransferForm />;
};
