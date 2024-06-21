import { PartialNftType } from '@multiversx/sdk-dapp-form';
import BigNumber from 'bignumber.js';

export const computeTokenDataField = ({
  tokenId,
  amount,
  decimals
}: {
  tokenId: string;
  amount: string;
  decimals: number;
}) => {
  return `ESDTTransfer@${tokenId}@${new BigNumber(amount)
    .shiftedBy(decimals)
    .toString(16)}`;
};

export const computeNftDataField = ({
  nft,
  amount,
  receiver
}: {
  nft: PartialNftType;
  amount: string;
  receiver: string;
}) => {
  return `ESDTNFTTransfer@${nft.identifier}@${nft.nonce.toString(
    16
  )}@${new BigNumber(amount).toString(16)}@${receiver}`;
};
