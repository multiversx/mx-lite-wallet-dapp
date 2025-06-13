import {
  Message,
  Transaction,
  UserSecretKey,
  UserSigner,
  getAddress,
  MessageComputer,
  IProvider,
  TransactionComputer
} from 'lib';
import { IDappProvider } from 'lib';
import { setKeystoreLogin } from 'redux/slices/account';
import { store as reduxStore } from 'redux/store';

const notInitializedError = (caller: string) => () => {
  throw new Error(`Unable to perform ${caller}, Provider not initialized`);
};

class CustomProvider implements IProvider {
  private privateKey: string | null = null;

  setPrivateKey(key: string | null): void {
    this.privateKey = key;
  }

  async init(): Promise<boolean> {
    const address = getAddress();
    return Boolean(address);
  }

  getAccount = notInitializedError('getAccount');
  setAccount = notInitializedError('setAccount');
  login = notInitializedError('login');

  logout(): Promise<boolean> {
    // eslint-disable-next-line
    const storeObject = require('redux/store');
    const store: typeof reduxStore = storeObject.store;
    store.dispatch(
      setKeystoreLogin({
        keystoreFile: '',
        privateKey: ''
      })
    );
    this.setPrivateKey(null);
    return new Promise((resolve, reject) => {
      if (this.privateKey) {
        reject('Unable to perform logout');
      } else {
        resolve(true);
      }
    });
  }

  getAddress = notInitializedError('getAddress');

  isInitialized(): boolean {
    return Boolean(this.privateKey);
  }

  isConnected(): boolean {
    return Boolean(this.privateKey);
  }

  getType(): string {
    return 'customProvider';
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    if (!this.privateKey) {
      const throwError = notInitializedError('signTransaction');
      return throwError();
    }

    const signer = new UserSigner(UserSecretKey.fromString(this.privateKey));
    const transactionComputer = new TransactionComputer();
    const bytesToSign = transactionComputer.computeBytesForSigning(transaction);
    const signature = await signer.sign(bytesToSign);
    transaction.signature = new Uint8Array(signature);

    return transaction;
  }

  async signMessage(message: Message): Promise<Message> {
    if (!this.privateKey) {
      const throwError = notInitializedError('signMessage');
      return throwError();
    }

    const signer = new UserSigner(UserSecretKey.fromString(this.privateKey));
    const messageComputer = new MessageComputer();

    const messageToSign = new Uint8Array(
      messageComputer.computeBytesForSigning(message)
    );

    const signature = await signer.sign(messageToSign);
    message.signature = new Uint8Array(signature);

    return message;
  }

  async signTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this.privateKey) {
      const throwError = notInitializedError('signTransactions');
      return throwError();
    }

    const signedTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const signedTransaction = await this.signTransaction(transaction);
      signedTransactions.push(signedTransaction);
    }

    return signedTransactions;
  }
}
export const provider = new CustomProvider();

export const setProviderPrivateKey = (key: string | null) =>
  provider.setPrivateKey(key);
