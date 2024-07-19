import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  AWESOME_NOW_CREATE_A_PASSWORD,
  WALLET_CREATED
} from 'extension/popup/pages/Create/create.constants';
import { CreateRoutesEnum } from 'routes/routeTypes';

export function useGetCreateTitle() {
  const { t } = useTranslation(['createAndRecover']);
  const { pathname } = useLocation();

  if (pathname.includes(CreateRoutesEnum.download)) {
    return t(WALLET_CREATED);
  }

  if (pathname.includes(CreateRoutesEnum.setPassword)) {
    return t(AWESOME_NOW_CREATE_A_PASSWORD);
  }

  if (pathname.includes(CreateRoutesEnum.checkMnemonic)) {
    return t('Surprise quiz');
  }

  return t('Create wallet');
}
