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
  const encodedContractAddress = addressToHex(new Address(values.contract));
  const encodedTokensLength = numberToHex(values.tokens.length);
  const encodedTokens = values.tokens
    .map((token) => {
      const realToken = tokens.find((t) => t.identifier === token.token?.value);

      if (!realToken) {
        return '';
      }

      const parsedAmount = parseAmount(token.amount, realToken.decimals);
      const tokenNonce = (realToken as PartialNftType).nonce || 0;

      return `${stringToHex(token.token.value)}@${numberToHex(
        tokenNonce
      )}@${numberToHex(parsedAmount)}`;
    })
    .join('@');

  const encodedFunctionName = stringToHex('deposit');
  const encodedReceiverAddress = addressToHex(new Address(values.receiver));

  return `${TransactionTypesEnum.MultiESDTNFTTransfer}@${encodedContractAddress}@${encodedTokensLength}@${encodedTokens}@${encodedFunctionName}@${encodedReceiverAddress}`;
};
