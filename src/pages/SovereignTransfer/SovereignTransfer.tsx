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

  return (
    <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'>
      <h2 className='text-2xl font-bold p-2 mb-2 text-center'>
        Sovereign Transfer
      </h2>
      <SovereignTransferForm />
    </div>
  );
};
