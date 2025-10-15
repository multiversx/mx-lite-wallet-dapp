import { getAccountProvider, ProviderTypeEnum } from 'lib/sdkDapp';

export const useIsWebviewProvider = () => {
  const provider = getAccountProvider();
  const providerType = provider.getType();
  const isWebProvider = providerType === ProviderTypeEnum.webview;

  return isWebProvider;
};
