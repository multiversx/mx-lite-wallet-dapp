import { useLocation } from 'react-router-dom';
import { CreateRecoverRoutesEnum } from '../../routes';

export function useGetCreateTitle() {
  const { pathname } = useLocation();

  if (pathname.includes(CreateRecoverRoutesEnum.createDownload)) {
    return 'Wallet created';
  }

  if (pathname.includes(CreateRecoverRoutesEnum.createPassword)) {
    return 'Awesome, now create a password';
  }

  if (pathname.includes(CreateRecoverRoutesEnum.createCheckMnemonic)) {
    return 'Surprise quiz';
  }

  return 'Create wallet';
}
