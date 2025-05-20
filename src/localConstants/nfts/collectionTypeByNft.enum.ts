import { NftEnumType } from 'lib/sdkDapp/sdkDapp.types';

export const CollectionTypeByNftEnum = {
  [NftEnumType.SemiFungibleESDT]: 'sft',
  [NftEnumType.NonFungibleESDT]: 'nft',
  [NftEnumType.MetaESDT]: 'meta'
};
