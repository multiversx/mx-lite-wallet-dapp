import { useEffect } from 'react';
import uniqBy from 'lodash/unionBy';
import {
  useGetAccountInfo,
  TokenType,
  networkSelector,
  getState,
  websocketEventSelector
} from 'lib';
import { useLazyGetTokensQuery } from 'redux/endpoints';

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
  const { address, account } = useGetAccountInfo();
  const network = networkSelector(getState());
  const websocketEvent = websocketEventSelector(getState());
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
