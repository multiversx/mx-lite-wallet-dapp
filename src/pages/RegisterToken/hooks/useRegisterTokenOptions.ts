import { useEffect, useMemo } from 'react';
import { useGetTokensWithEgld } from 'hooks';
import { useGetAccountInfo, getEgldLabel } from 'lib';
import { useLazyGetCollectionsQuery } from 'redux/endpoints';
import { SendTypeEnum, TokenOptionType } from 'types';

export const useRegisterTokenOptions = (sendType: SendTypeEnum) => {
  const { address, websocketEvent } = useGetAccountInfo();
  const { tokens, isLoading: isLoadingTokens } = useGetTokensWithEgld();
  const [
    fetchCollections,
    { data: collections, isLoading: isLoadingCollections }
  ] = useLazyGetCollectionsQuery();
  const egldLabel = getEgldLabel();

  const getTokenOptionsByType = (type: SendTypeEnum): TokenOptionType[] => {
    let options: TokenOptionType[] = [];

    if (type === SendTypeEnum.nft) {
      options =
        collections?.map((token) => ({
          value: token.ticker,
          label: token.name
        })) ?? [];
    } else {
      options = tokens
        .filter((token) => token.identifier !== egldLabel)
        .map((token) => ({
          value: token.identifier,
          label: token.name
        }));
    }

    // Show only tokens/collections with a prefix (e.g. sov-FNG-123456)
    return options.filter((token) => token.value.split('-').length > 2);
  };

  const getTokens = (type: SendTypeEnum) =>
    type === SendTypeEnum.nft ? collections : tokens;

  useEffect(() => {
    fetchCollections(address);
  }, [address, sendType, websocketEvent]);

  const tokenOptions = useMemo(
    () => getTokenOptionsByType(sendType),
    [collections, tokens, sendType]
  );

  const allTokens = [...tokens, ...(collections || [])].filter(
    (token) => !('identifier' in token) || token.identifier !== egldLabel
  );

  return {
    allTokens,
    getTokenOptionsByType,
    getTokens,
    isLoading: isLoadingTokens || isLoadingCollections,
    tokenOptions,
    tokens: getTokens(sendType) || []
  };
};
