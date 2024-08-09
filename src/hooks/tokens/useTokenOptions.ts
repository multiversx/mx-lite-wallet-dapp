import { useEffect, useMemo } from 'react';
import { useGetTokensWithEgld } from 'hooks';
import { useGetAccountInfo } from 'lib';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { SendTypeEnum, TokenOptionType } from 'types';

export const useTokenOptions = ({
  sendType,
  skipAddEgld
}: {
  sendType: SendTypeEnum;
  skipAddEgld?: boolean;
}) => {
  const { address, websocketEvent } = useGetAccountInfo();
  const { tokens, isLoading: isLoadingTokens } = useGetTokensWithEgld();
  const [fetchNFTs, { data: nfts, isLoading: isLoadingNfts }] =
    useLazyGetNftsQuery();

  const getTokenOptionsByType = (type: SendTypeEnum): TokenOptionType[] => {
    if (type === SendTypeEnum.nft) {
      return (
        nfts?.map((token) => ({
          value: token.identifier,
          label: token.name
        })) ?? []
      );
    }

    if (skipAddEgld) {
      tokens.shift();
    }

    return tokens.map((token) => ({
      value: token.identifier,
      label: token.name
    }));
  };

  const getTokens = (type: SendTypeEnum) =>
    type === SendTypeEnum.nft ? nfts : tokens;

  useEffect(() => {
    fetchNFTs({ address });
  }, [address, websocketEvent]);

  const tokenOptions = useMemo(
    () => getTokenOptionsByType(sendType),
    [nfts, tokens, sendType]
  );

  const allTokens = [...tokens, ...(nfts || [])];

  if (skipAddEgld) {
    allTokens.shift();
  }

  return {
    allTokens,
    getTokenOptionsByType,
    getTokens,
    isLoading: isLoadingTokens || isLoadingNfts,
    tokenOptions,
    tokens: getTokens(sendType)
  };
};
