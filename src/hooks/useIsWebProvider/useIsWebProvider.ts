import { LoginMethodsEnum } from 'types';
import { useGetAccountProvider } from '../sdkDapp.hooks';

export const useIsWebProvider = () => {
  const { providerType } = useGetAccountProvider();
  const isWebProvider = providerType === LoginMethodsEnum.wallet;

  return { isWebProvider };
};
