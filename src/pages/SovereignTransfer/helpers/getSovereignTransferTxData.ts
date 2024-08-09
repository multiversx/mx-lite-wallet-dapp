import { Address } from '@multiversx/sdk-core/out';
import {
  addressToHex,
  numberToPaddedHex
} from '@multiversx/sdk-core/out/utils.codec';
import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { parseAmount } from '@multiversx/sdk-dapp/utils';
import { PartialNftType } from '@multiversx/sdk-dapp-form';
import BigNumber from 'bignumber.js';
import { TransactionTypesEnum } from 'types';
import { SovereignTransferFormType } from '../types';
import { getEgldLabel } from 'lib';
import { WEGLDID } from 'config';

export const stringToHex = (stringTopEncode?: string) =>
  stringTopEncode ? Buffer.from(stringTopEncode).toString('hex') : '';

export const numberToHex = (numberToEncode: number | string) =>
  numberToPaddedHex(new BigNumber(numberToEncode).toNumber());

export const getSovereignTransferTxData = ({
  values,
  tokens
}: {
  values: SovereignTransferFormType;
  tokens: (PartialNftType | TokenType)[];
}) => {
  const egldLabel = getEgldLabel();
  const encodedContractAddress = addressToHex(new Address(values.contract));
  const encodedTokensLength = numberToHex(values.tokens.length);
  const encodedTokens = values.tokens
    .map((token) => {
      const realToken = tokens.find((t) => t.identifier === token.token?.value);

      if (!realToken) {
        return '';
      }

      const encodedTokenId = stringToHex(
        egldLabel === egldLabel ? WEGLDID : egldLabel
      );

      const encodedAmount = numberToHex(
        parseAmount(token.amount, realToken.decimals)
      );
      const tokenNonce = (realToken as PartialNftType).nonce;
      const encodedNonce = tokenNonce ? numberToHex(tokenNonce) : '';

      return `${encodedTokenId}@${encodedNonce}@${encodedAmount}`;
    })
    .join('@');

  const encodedFunctionName = stringToHex('deposit');
  const encodedReceiverAddress = addressToHex(new Address(values.receiver));

  return `${TransactionTypesEnum.MultiESDTNFTTransfer}@${encodedContractAddress}@${encodedTokensLength}@${encodedTokens}@${encodedFunctionName}@${encodedReceiverAddress}`;
};
