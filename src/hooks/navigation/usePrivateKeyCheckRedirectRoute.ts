import { useSelector } from 'react-redux';
import { privateKeyCheckRedirectRouteSelector } from 'redux/selectors';

export const usePrivateKeyCheckRedirectRoute = () =>
  useSelector(privateKeyCheckRedirectRouteSelector);
