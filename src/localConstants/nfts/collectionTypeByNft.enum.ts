import { NftEnumType } from 'lib';

export const CollectionTypeByNftEnum = {
  [NftEnumType.SemiFungibleESDT]: 'sft',
  [NftEnumType.NonFungibleESDT]: 'nft',
  [NftEnumType.MetaESDT]: 'meta'
};
