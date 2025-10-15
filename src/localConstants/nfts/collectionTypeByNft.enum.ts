import { NftEnumType } from 'lib/sdkDapp';

export const CollectionTypeByNftEnum = {
  [NftEnumType.SemiFungibleESDT]: 'sft',
  [NftEnumType.NonFungibleESDT]: 'nft',
  [NftEnumType.MetaESDT]: 'meta'
};
