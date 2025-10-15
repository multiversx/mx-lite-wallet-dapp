import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants/routes';
import { networkSelector } from 'redux/selectors';
import { RegisterTokenForm } from './components';

export const RegisterToken = () => {
  const { activeNetwork } = useSelector(networkSelector);

  if (!activeNetwork.hasRegisterToken) {
    return <Navigate to={RouteNamesEnum.dashboard} />;
  }

  return <RegisterTokenForm />;
};
