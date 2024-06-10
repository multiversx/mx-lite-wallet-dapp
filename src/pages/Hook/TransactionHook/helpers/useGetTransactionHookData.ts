import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMainnet } from 'helpers';
import { activeNetworkSelector } from 'redux/selectors';

import { getTransactionHookData } from './getTransactionHookData';
import { transactionSchema } from './transactionSchema';

export const useGetTransactionHookData = () => {
  const { t } = useTranslation(['send']);
  const { chainId } = useSelector(activeNetworkSelector);
  const isMainnet = getIsMainnet();
  const schema = transactionSchema({ t, isMainnet });

  return getTransactionHookData({ chainId: String(chainId), schema });
};
