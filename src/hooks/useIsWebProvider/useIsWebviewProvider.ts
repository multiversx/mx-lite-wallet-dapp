import { getAccountProvider, ProviderTypeEnum } from 'lib';

export const useIsWebviewProvider = () => {
  const provider = getAccountProvider();
  const providerType = provider.getType();
  const isWebProvider = providerType === ProviderTypeEnum.webview;

  return isWebProvider;
};
