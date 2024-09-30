import { getBaseURL } from 'helpers';
import {
  ACCOUNTS_ENDPOINT,
  API_CACHE_DURATION_SECONDS,
  MAX_API_SIZE,
  NFTS_ENDPOINT,
  ROLES_ENDPOINT,
  COLLECTIONS_ENDPOINT
} from 'localConstants';
import { GetNftsType, PartialNftType, CollectionType } from 'types';
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
        params: { excludeMetaESDT: true, size: MAX_API_SIZE, ...props }
      })
    }),
    getCollections: builder.query<CollectionType[], string>({
      keepUnusedDataFor: API_CACHE_DURATION_SECONDS,
      query: (address) => ({
        baseURL: getBaseURL(),
        url: `/${ACCOUNTS_ENDPOINT}/${address}/${ROLES_ENDPOINT}/${COLLECTIONS_ENDPOINT}`,
        method: 'GET',
        params: { creator: address }
      })
    })
  })
});

export const {
  useGetNftsQuery,
  useGetCollectionsQuery,
  useLazyGetNftsQuery,
  useLazyGetCollectionsQuery
} = nftsEndpoints;
