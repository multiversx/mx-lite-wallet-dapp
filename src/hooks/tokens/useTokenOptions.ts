import { useEffect, useMemo } from 'react';
import { useGetAccountInfo } from 'lib/sdkDapp/sdkDapp.hooks';
import { getEgldLabel } from 'lib/sdkDapp/sdkDapp.utils';
import { useLazyGetNftsQuery } from 'redux/endpoints/nfts.endpoint';
import { useGetTokensWithEgld } from './useGetTokensWithEgld';
import { SendTypeEnum, TokenOptionType } from '../../types/send.types';

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
  const egldLabel = getEgldLabel();

  const getTokenOptionsByType = (type: SendTypeEnum): TokenOptionType[] => {
    if (type === SendTypeEnum.nft) {
      return (
        nfts?.map((token) => ({
          value: token.identifier,
          label: token.name
        })) ?? []
      );
    }

    return tokens
      .filter((token) => !skipAddEgld || token.identifier !== egldLabel)
      .map((token) => ({
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

  const allTokens = [...tokens, ...(nfts || [])].filter(
    (token) => !skipAddEgld || token.identifier !== egldLabel
  );

  return {
    allTokens,
    getTokenOptionsByType,
    getTokens,
    isLoading: isLoadingTokens || isLoadingNfts,
    tokenOptions,
    tokens: getTokens(sendType) || []
  };
};
