import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { useGetAccountInfo, useGetNetworkConfig } from '../sdkDapp.hooks';
import { useLazyGetTokensQuery } from 'redux/endpoints';
import { useEffect } from 'react';

export const useGetTokensWithEgld = () => {
  const { websocketEvent, address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [fetchTokens, { data: tokens, isLoading }] = useLazyGetTokensQuery();

  useEffect(() => {
    fetchTokens(address);
  }, [address, websocketEvent]);

  const usedTokens = [...(tokens ?? [])];

  if (usedTokens.length > 0) {
    const egldToken: TokenType = {
      ...usedTokens[0],
      identifier: network.egldLabel,
      name: network.egldLabel,
      balance: account?.balance
    };

    usedTokens.unshift(egldToken);
  }

  return {
    tokens: usedTokens,
    isLoading
  };
};
