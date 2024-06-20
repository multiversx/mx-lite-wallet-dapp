import { signTxSchema, useGetNetworkConfig } from 'lib';

export function useSignTxSchema() {
  const { chainID } = useGetNetworkConfig();
  console.log('useSignTxSchema', chainID);
  const isMainnet = chainID === '1';

  return signTxSchema({
    isMainnet,
    chainId: chainID,
    hookWhitelist: [],
    isSignHook: true
  });
}
