import {
  Address,
  AddressValue,
  TokenTransfer,
  SmartContractTransactionsFactory,
  Token,
  TransactionsFactoryConfig,
  TokenType,
  getEgldLabel,
  PartialNftType,
  parseAmount
} from 'lib';
import { SOVEREIGN_TRANSFER_GAS_LIMIT } from 'localConstants';
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
          token: new Token({
            identifier:
              token.token?.value === egldLabel
                ? 'EGLD-000000'
                : token.token?.value
          }),
          amount: BigInt(token.amount)
        });
      }

      const nonce = (realToken as PartialNftType).nonce;

      return new TokenTransfer({
        token: new Token({
          identifier:
            realToken.identifier === egldLabel
              ? 'EGLD-000000'
              : realToken.identifier,
          nonce: nonce ? BigInt(nonce) : undefined
        }),
        amount: BigInt(
          nonce ? token.amount : parseAmount(token.amount, realToken.decimals)
        )
      });
    })
  });
};
