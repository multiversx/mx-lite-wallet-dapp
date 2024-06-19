import { useGetAccountProvider } from 'lib';
import { LoginMethodsEnum } from 'types';

export const useIsWebProvider = () => {
  const { providerType } = useGetAccountProvider();
  const isWebProvider = providerType === LoginMethodsEnum.wallet;

  return { isWebProvider };
};
