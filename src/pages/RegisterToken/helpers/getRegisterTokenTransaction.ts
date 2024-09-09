import BigNumber from 'bignumber.js';
import { prepareTransaction, numberToPaddedHex } from 'lib';
import { GAS_PRICE, SOVEREIGN_TRANSFER_GAS_LIMIT } from 'localConstants';
import {
  NftEnumType,
  PartialNftType,
  TokenType,
  EsdtEnumType,
  CollectionType
} from 'types';
import { RegisterTokenFormType } from '../types';

export const stringToHex = (stringTopEncode?: string) =>
  stringTopEncode ? Buffer.from(stringTopEncode).toString('hex') : '';

export const numberToHex = (numberToEncode: number | string) =>
  numberToPaddedHex(new BigNumber(numberToEncode).toNumber());

const TokenTypeMap: Record<string, number> = {
  [EsdtEnumType.FungibleESDT]: 0,
  [NftEnumType.MetaESDT]: 1,
  [NftEnumType.NonFungibleESDT]: 2,
  [NftEnumType.SemiFungibleESDT]: 3
};

export const getRegisterTokenTransaction = ({
  address,
  balance,
  nonce,
  values,
  token
}: {
  address: string;
  balance: string;
  nonce: number;
  values: RegisterTokenFormType;
  token: PartialNftType | TokenType | CollectionType;
}) => {
  const nft = token as PartialNftType;
  const isNft = Boolean(nft.nonce);
  const tokenIdentifier = isNft
    ? nft.collection
    : 'identifier' in token
    ? token.identifier
    : token.ticker;
  const tokenType = TokenTypeMap[nft.type] || 0;
  const tokenName = token.name;
  const tokenTicker = token.ticker?.split('-')[0];
  const tokenDecimals = token.decimals || 0;

  const args = [
    stringToHex(tokenIdentifier),
    numberToHex(tokenType),
    stringToHex(tokenName),
    stringToHex(tokenTicker),
    numberToHex(tokenDecimals)
  ].join('@');

  const data = `registerToken@${args}`;

  return prepareTransaction({
    amount: '0.05',
    balance,
    chainId: values.chainId.value,
    data,
    gasLimit: SOVEREIGN_TRANSFER_GAS_LIMIT.toString(),
    gasPrice: GAS_PRICE.toString(),
    nonce,
    receiver: values.contract,
    sender: address
  });
};
