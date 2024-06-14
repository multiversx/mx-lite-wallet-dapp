import { signTxSchema } from '@multiversx/sdk-js-web-wallet-io/out/url/helpers/sign';
import { useGetNetworkConfig } from '../sdkDapp.hooks';

export function useSignTxSchema() {
  const { chainID } = useGetNetworkConfig();
  const isMainnet = chainID === '1';

  return signTxSchema({
    isMainnet,
    chainId: chainID,
    hookWhitelist: [],
    isSignHook: true
  });
}
