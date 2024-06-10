import { useSelector } from 'react-redux';
import { getIsMainnet } from 'helpers/misc/getIsMainnet';
import { signTxSchema } from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { activeNetworkSelector } from 'redux/selectors';

export function useSignTxSchema() {
  const { chainId, hookWhitelist } = useSelector(activeNetworkSelector);

  return signTxSchema({
    isMainnet: getIsMainnet(),
    chainId: String(chainId),
    hookWhitelist,
    isSignHook: true
  });
}
