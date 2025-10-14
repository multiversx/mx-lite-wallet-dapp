import { useEffect } from 'react';
import uniqBy from 'lodash/unionBy';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib/sdkDapp/sdkDapp.hooks';
import { TokenType } from 'lib/sdkDapp/sdkDapp.types';
import { useLazyGetTokensQuery } from 'redux/endpoints/tokens.endpoint';

const defaultValues = {
  owner: '',
  minted: '',
  burnt: '',
  supply: '',
  circulatingSupply: '',
  canBurn: false,
  canChangeOwner: false,
  canFreeze: false,
  canMint: false,
  canPause: false,
  canUpgrade: false,
  canWipe: false,
  isPaused: false,
  transactions: 0,
  accounts: 0
};

export const useGetTokensWithEgld = () => {
  const { address, account, websocketEvent } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [fetchTokens, { data: tokens, isLoading }] = useLazyGetTokensQuery();

  const egldToken: TokenType = {
    ...defaultValues,
    identifier: network.egldLabel,
    name: network.egldLabel,
    balance: account?.balance
  };

  useEffect(() => {
    fetchTokens(address);
  }, [address, websocketEvent]);

  const usedTokens = [egldToken, ...(tokens ?? [])];

  return {
    tokens: uniqBy(usedTokens, 'identifier'),
    isLoading
  };
};
