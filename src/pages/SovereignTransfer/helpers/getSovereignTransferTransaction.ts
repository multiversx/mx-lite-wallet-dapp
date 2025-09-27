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
  parseAmount,
  EnvironmentsEnum
} from 'lib';
import { SOVEREIGN_TRANSFER_GAS_LIMIT } from 'localConstants';
import { SovereignTransferFormType } from '../types';

interface GetSovereignTransferTransactionPropsType {
  address: string;
  chainId: EnvironmentsEnum;
  values: SovereignTransferFormType;
  tokens: (PartialNftType | TokenType)[];
}

export const getSovereignTransferTransaction = ({
  address,
  chainId,
  values,
  tokens
}: GetSovereignTransferTransactionPropsType) => {
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

      const isSovereign = Object.values(EnvironmentsEnum).includes(chainId);

      if (!realToken) {
        const tokenValue = token.token?.value;

        return new TokenTransfer({
          token: new Token({
            identifier:
              tokenValue === egldLabel && !isSovereign
                ? 'EGLD-000000'
                : tokenValue
          }),
          amount: BigInt(token.amount)
        });
      }

      const nonce = (realToken as PartialNftType).nonce;
      const tokenValue = realToken.identifier;

      return new TokenTransfer({
        token: new Token({
          identifier:
            tokenValue === egldLabel && !isSovereign
              ? 'EGLD-000000'
              : tokenValue,
          nonce: nonce ? BigInt(nonce) : undefined
        }),
        amount: BigInt(
          nonce ? token.amount : parseAmount(token.amount, realToken.decimals)
        )
      });
    })
  });
};
