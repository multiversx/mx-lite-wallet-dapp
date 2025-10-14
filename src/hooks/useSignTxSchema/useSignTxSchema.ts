import { useGetNetworkConfig } from 'lib/sdkDapp';
import { signTxSchema } from 'lib/sdkJsWebWalletIo';

export function useSignTxSchema() {
  const {
    network: { chainId }
  } = useGetNetworkConfig();
  const isMainnet = chainId === '1';

  return signTxSchema({
    isMainnet,
    chainId,
    hookWhitelist: [],
    isSignHook: true
  });
}
