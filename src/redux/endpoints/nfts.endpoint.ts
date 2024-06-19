import { getBaseURL } from 'helpers';
import {
  ACCOUNTS_ENDPOINT,
  API_CACHE_DURATION_SECONDS,
  MAX_API_SIZE,
  NFTS_ENDPOINT
} from 'localConstants';
import { GetNftsType, PartialNftType } from 'types';
import { RootApi } from '../rootApi';

const nftsEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNfts: builder.query<PartialNftType[], GetNftsType>({
      keepUnusedDataFor: API_CACHE_DURATION_SECONDS,
      query: (props) => ({
        baseURL: getBaseURL(),
        url: `/${ACCOUNTS_ENDPOINT}/${props.address}/${NFTS_ENDPOINT}`,
        method: 'GET',
        params: { size: MAX_API_SIZE, ...props }
      })
    })
  })
});

export const { useGetNftsQuery, useLazyGetNftsQuery } = nftsEndpoints;
