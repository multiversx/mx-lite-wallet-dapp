import { NftEnumType } from '@multiversx/sdk-dapp/types/tokens.types';

export const CollectionTypeByNftEnum = {
  [NftEnumType.SemiFungibleESDT]: 'sft',
  [NftEnumType.NonFungibleESDT]: 'nft',
  [NftEnumType.MetaESDT]: 'meta'
};
