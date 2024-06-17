export type TransactionProps = {
  address: string;
  nonce: number;
  chainID: string;
};

export interface TransactionSignatureDataType {
  options: string;
  signature: string;
  version: string;
}
