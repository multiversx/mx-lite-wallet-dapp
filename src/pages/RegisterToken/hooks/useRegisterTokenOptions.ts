import { useEffect, useMemo } from 'react';
import { useGetTokensWithEgld } from 'hooks';
import { useGetAccountInfo } from 'lib';
import { useLazyGetCollectionsQuery } from 'redux/endpoints';
import { SendTypeEnum, TokenOptionType } from 'types';

export const useRegisterTokenOptions = (sendType: SendTypeEnum) => {
  const { address, websocketEvent } = useGetAccountInfo();
  const { tokens, isLoading: isLoadingTokens } = useGetTokensWithEgld();
  const [
    fetchCollections,
    { data: collections, isLoading: isLoadingCollections }
  ] = useLazyGetCollectionsQuery();

  const getTokenOptionsByType = (type: SendTypeEnum): TokenOptionType[] => {
    if (type === SendTypeEnum.nft) {
      return (
        collections?.map((token) => ({
          value: token.ticker,
          label: token.name
        })) ?? []
      );
    }

    // Remove EGLD
    tokens.shift();

    return tokens.map((token) => ({
      value: token.identifier,
      label: token.name
    }));
  };

  const getTokens = (type: SendTypeEnum) =>
    type === SendTypeEnum.nft ? collections : tokens;

  useEffect(() => {
    fetchCollections(address);
  }, [address, websocketEvent]);

  const tokenOptions = useMemo(
    () => getTokenOptionsByType(sendType),
    [collections, tokens, sendType]
  );

  const allTokens = [...tokens, ...(collections || [])];

  // Remove EGLD
  allTokens.shift();

  return {
    allTokens,
    getTokenOptionsByType,
    getTokens,
    isLoading: isLoadingTokens || isLoadingCollections,
    tokenOptions,
    tokens: getTokens(sendType) || []
  };
};
