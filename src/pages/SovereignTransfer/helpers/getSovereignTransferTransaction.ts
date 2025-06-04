import {
  SmartContractTransactionsFactory,
  TransactionsFactoryConfig,
  Token
} from '@multiversx/sdk-core';
import {
  getEgldLabel,
  parseAmount,
  Address,
  AddressValue,
  TokenTransfer
} from 'lib';
import { SOVEREIGN_TRANSFER_GAS_LIMIT } from 'localConstants';
import { PartialNftType, TokenType } from 'types';
import { getCurrentNetwork } from '../../../helpers';
import { SovereignTransferFormType } from '../types';

export const getSovereignTransferTransaction = ({
  address,
  chainId,
  values,
  tokens
}: {
  address: string;
  chainId: string;
  values: SovereignTransferFormType;
  tokens: (PartialNftType | TokenType)[];
}) => {
  const egldLabel = getEgldLabel();
  const { WEGLDid = '' } = getCurrentNetwork();
  const factoryConfig = new TransactionsFactoryConfig({ chainID: chainId });
  const factory = new SmartContractTransactionsFactory({
    config: factoryConfig
  });

  return factory.createTransactionForExecute(new Address(address), {
    contract: Address.newFromBech32(values.contract),
    function: 'deposit',
    gasLimit: BigInt(SOVEREIGN_TRANSFER_GAS_LIMIT),
    arguments: [new AddressValue(Address.newFromBech32(values.receiver))],
    tokenTransfers: values.tokens.map((token) => {
      const realToken = tokens.find(
        ({ identifier }) => identifier === token.token?.value
      );

      if (!realToken) {
        return new TokenTransfer({
          token: new Token({ identifier: token.token?.value }),
          amount: BigInt(token.amount)
        });
      }

      const nonce = (realToken as PartialNftType).nonce;

      return new TokenTransfer({
        token: new Token({
          identifier:
            realToken.identifier === egldLabel ? WEGLDid : realToken.identifier,
          nonce: nonce ? BigInt(nonce) : undefined
        }),
        amount: BigInt(
          nonce ? token.amount : parseAmount(token.amount, realToken.decimals)
        )
      });
    })
  });
};
