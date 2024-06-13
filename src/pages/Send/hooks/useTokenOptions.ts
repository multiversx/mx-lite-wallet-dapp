import { useEffect, useMemo } from 'react';
import { useGetTokensWithEgld, useGetAccountInfo } from 'hooks';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { SendTypeEnum } from '../types';

export const useTokenOptions = (sendType: SendTypeEnum) => {
  const { address, websocketEvent } = useGetAccountInfo();
  const { tokens, isLoading: isLoadingTokens } = useGetTokensWithEgld();
  const [fetchNFTs, { data: nfts, isLoading: isLoadingNfts }] =
    useLazyGetNftsQuery();

  const isNFT = sendType === SendTypeEnum.nft;

  useEffect(() => {
    fetchNFTs({ address });
  }, [address, websocketEvent]);

  const tokenOptions = useMemo(() => {
    if (isNFT) {
      return nfts?.map((token) => ({
        value: token.identifier,
        label: token.name
      }));
    }

    return tokens.map((token) => ({
      value: token.identifier,
      label: token.name
    }));
  }, [nfts, tokens, sendType]);

  return {
    tokenOptions,
    tokens: isNFT ? nfts : tokens,
    isLoading: isLoadingTokens || isLoadingNfts
  };
};
