import { useLocation } from 'react-router-dom';
import { CreateRecoverRoutesEnum } from '../../routes';

export const useGetRecoverTitle = () => {
  const { pathname } = useLocation();

  if (pathname.includes(CreateRecoverRoutesEnum.recoverDownload)) {
    return 'Keystore created!';
  }

  if (pathname.includes(CreateRecoverRoutesEnum.recoverPassword)) {
    return 'Awesome, now create a password';
  }

  return 'Recover Keystore file';
};
