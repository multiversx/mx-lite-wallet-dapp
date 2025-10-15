import {
  Address,
  TokenTransfer,
  SmartContractTransactionsFactory,
  Token,
  TransactionsFactoryConfig,
  StringValue,
  U32Value
} from 'lib/sdkCore';
import {
  NftEnumType,
  TokenType,
  EsdtEnumType,
  CollectionType
} from 'lib/sdkDapp';
import { PartialNftType } from 'lib/sdkDappForm';
import { SOVEREIGN_TRANSFER_GAS_LIMIT } from 'localConstants';
import { RegisterTokenFormType } from '../types';

const TokenTypeMap: Record<string, number> = {
  [EsdtEnumType.FungibleESDT]: 0,
  [NftEnumType.MetaESDT]: 1,
  [NftEnumType.NonFungibleESDT]: 2,
  [NftEnumType.SemiFungibleESDT]: 3
};

export interface GetRegisterTokenTransactionParamsType {
  address: string;
  chainId: string;
  values: RegisterTokenFormType;
  token: PartialNftType | TokenType | CollectionType;
}

export const getRegisterTokenTransaction = ({
  address,
  chainId,
  values,
  token
}: GetRegisterTokenTransactionParamsType) => {
  const nft = token as PartialNftType;
  const isNft = Boolean(nft.nonce);
  const tokenIdentifier =
    'identifier' in token ? token.identifier : token.ticker;
  const tokenType = TokenTypeMap[nft.type] || 0;
  const tokenName = token.name;
  const tokenTicker = token.ticker?.split('-')[1];
  const tokenDecimals = token.decimals || 0;

  const factoryConfig = new TransactionsFactoryConfig({ chainID: chainId });
  const factory = new SmartContractTransactionsFactory({
    config: factoryConfig
  });

  const egldTokenTransfer = new TokenTransfer({
    token: new Token({ identifier: 'EGLD-000000' }),
    amount: BigInt('50000000000000000') // 0.05 EGLD in wei
  });

  const functionArgs = [
    new StringValue(isNft ? nft.collection : tokenIdentifier),
    new U32Value(tokenType),
    new StringValue(tokenName),
    new StringValue(tokenTicker ?? ''),
    new U32Value(tokenDecimals)
  ];

  return factory.createTransactionForExecute(new Address(address), {
    contract: Address.newFromBech32(values.contract),
    function: 'registerToken',
    gasLimit: BigInt(SOVEREIGN_TRANSFER_GAS_LIMIT),
    arguments: functionArgs,
    tokenTransfers: [egldTokenTransfer]
  });
};
