import { getBaseURL } from 'helpers';
import { ACCOUNTS_ENDPOINT, TOKENS_ENDPOINT, TokenType } from 'lib';
import { API_CACHE_DURATION_SECONDS, MAX_API_SIZE } from 'localConstants';
import { RootApi } from '../rootApi';

const tokensEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTokens: builder.query<TokenType[], string>({
      keepUnusedDataFor: API_CACHE_DURATION_SECONDS,
      query: (address) => ({
        baseURL: getBaseURL(),
        url: `/${ACCOUNTS_ENDPOINT}/${address}/${TOKENS_ENDPOINT}`,
        method: 'GET',
        params: { size: MAX_API_SIZE, includeMetaESDT: true }
      })
    })
  })
});

export const { useGetTokensQuery, useLazyGetTokensQuery } = tokensEndpoints;
