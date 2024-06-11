import { useSelector } from 'react-redux';
import { useGetAccount, useGetNetworkConfig } from 'hooks';
import { RootState } from 'redux/store';

export function useAccountSelector<
  F extends (rootState: RootState, addr: string) => any
>(cachedSelector: F): ReturnType<F> {
  const { address } = useGetAccount();
  const { chainID } = useGetNetworkConfig();
  const chainId_address = `${chainID.valueOf()}_${address}`;
  return useSelector((state: RootState) => {
    return cachedSelector(state, chainId_address);
  });
}
