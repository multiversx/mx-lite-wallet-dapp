import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { RecoverRoutesEnum } from 'routes';

export function useGetRecoverTitle() {
  const { t } = useTranslation(['createAndRecover']);
  const { pathname } = useLocation();

  if (pathname.includes(RecoverRoutesEnum.download)) {
    return t('Keystore created!');
  }

  if (pathname.includes(RecoverRoutesEnum.setPassword)) {
    return t('Awesome, now create a password');
  }
  return t('Recover Keystore file');
}
