import { API_CACHE_DURATION_SECONDS, MAX_API_SIZE } from 'localConstants';
import { RootApi } from 'redux/rootApi';
import {
  ACCOUNTS_ENDPOINT,
  TOKENS_ENDPOINT
} from '@multiversx/sdk-dapp/apiCalls/endpoints';
import { PartialNftType } from '@multiversx/sdk-dapp-form';
import { GetNftsType } from 'types';
import { getBaseURL } from 'helpers';

const nftsEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNfts: builder.query<PartialNftType[], GetNftsType>({
      keepUnusedDataFor: API_CACHE_DURATION_SECONDS,
      query: (props) => ({
        baseURL: getBaseURL(),
        url: `/${ACCOUNTS_ENDPOINT}/${props.address}/${TOKENS_ENDPOINT}`,
        method: 'GET',
        params: { size: MAX_API_SIZE, ...props }
      })
    })
  })
});

export const { useGetNftsQuery, useLazyGetNftsQuery } = nftsEndpoints;
