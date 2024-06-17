import { getBaseURL } from 'helpers';
import {
  ACCOUNTS_ENDPOINT,
  API_CACHE_DURATION_SECONDS,
  MAX_API_SIZE,
  TRANSACTIONS_ENDPOINT
} from 'localConstants';
import { RootApi } from 'redux/rootApi';
import { ServerTransactionType } from 'types';

const transactionsEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTransactions: builder.query<ServerTransactionType[], string>({
      keepUnusedDataFor: API_CACHE_DURATION_SECONDS,
      query: (address) => ({
        baseURL: getBaseURL(),
        url: `/${ACCOUNTS_ENDPOINT}/${address}/${TRANSACTIONS_ENDPOINT}`,
        method: 'GET',
        params: { size: MAX_API_SIZE }
      })
    })
  })
});

export const { useLazyGetTransactionsQuery, useGetTransactionsQuery } =
  transactionsEndpoints;
