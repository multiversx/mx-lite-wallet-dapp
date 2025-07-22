import {
  Address,
  IDAppProviderAccount,
  IProvider,
  ProviderType,
  Message,
  MessageComputer,
  signTransactions,
  Transaction,
  TransactionComputer,
  UserSecretKey,
  UserSigner
} from 'lib';
import { IFileProviderOptions } from 'types/providers';

const notInitializedError = (caller: string) => () => {
  throw new Error(`Unable to perform ${caller}, Provider not initialized`);
};

let privateKey = '';

export const setProviderPrivateKey = (key: string | null) => {
  privateKey = key || '';
};

export abstract class FileProvider implements IProvider {
  protected _anchor?: HTMLElement;
  protected _account: IDAppProviderAccount = {
    address: ''
  };

  constructor(options?: IFileProviderOptions) {
    this._anchor = options?.anchor;
    if (options?.address) {
      this.setAccount({
        address: options.address
      });
    }
  }

  isInitialized() {
    return Boolean(this._account.address);
  }

  isConnected(): boolean {
    return Boolean(privateKey);
  }

  getTokenLoginSignature(): string | undefined {
    return this._account.signature;
  }

  setAccount(value: IDAppProviderAccount) {
    this._account = value;
  }

  getAccount(): IDAppProviderAccount | null {
    return this._account;
  }

  async getAddress(): Promise<string | undefined> {
    return this._account.address;
  }

  async init() {
    return true;
  }

  abstract getType(): ProviderType;

  async signTransaction(transaction: Transaction) {
    const _privateKey = await this._getPrivateKey('signTransaction');
    const signer = new UserSigner(UserSecretKey.fromString(_privateKey));
    const transactionComputer = new TransactionComputer();
    const bytesToSign = transactionComputer.computeBytesForSigning(transaction);
    const signature = await signer.sign(bytesToSign);
    transaction.signature = new Uint8Array(signature);

    return transaction;
  }

  private async _signTransactions(transactions: Transaction[]) {
    const signedTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const signedTransaction = await this.signTransaction(transaction);
      signedTransactions.push(signedTransaction);
    }
    return signedTransactions;
  }

  async signTransactions(transactions: Transaction[]) {
    const hasPrivateKey = await this._getPrivateKey('signTransactions');
    if (!hasPrivateKey) {
      throw Error('Unable to sign transactions.');
    }
    return signTransactions({
      transactions,
      handleSign: this._signTransactions.bind(this)
    });
  }

  async login(options?: { token?: string }): Promise<{
    address: string;
    signature: string;
  }> {
    return new Promise(async (resolve, reject) => {
      const loginResult = await this.showLoginPanel();

      if (!loginResult.address || !loginResult.privateKey) {
        return reject('User cancelled login');
      }

      privateKey = loginResult.privateKey;

      this.handleLoginResult(loginResult);

      this.setAccount({
        address: loginResult.address
      });

      const token = options?.token;

      if (!token) {
        resolve({
          address: loginResult.address,
          signature: ''
        });
        return;
      }

      const message = `${loginResult.address}${token}{}`;
      const msg = new Message({
        address: new Address(loginResult.address),
        data: this.encodeMessage(message)
      });
      const signedMessage = await this.signMessage(msg);

      if (!signedMessage.signature) {
        resolve({
          address: loginResult.address,
          signature: ''
        });
        return;
      }

      const signature = this.formatSignature(signedMessage.signature);

      this.setAccount({
        address: loginResult.address,
        signature
      });

      resolve({
        address: loginResult.address,
        signature
      });
    });
  }

  async logout() {
    privateKey = '';
    this._account = {
      address: ''
    };
    return true;
  }

  async signMessage(message: Message) {
    const _privateKey = await this._getPrivateKey('signMessage');

    const signer = new UserSigner(UserSecretKey.fromString(_privateKey));
    const messageComputer = new MessageComputer();

    const messageToSign = new Uint8Array(
      messageComputer.computeBytesForSigning(message)
    );

    const signature = await signer.sign(new Uint8Array(messageToSign));
    message.signature = new Uint8Array(signature);

    return message;
  }

  protected async _getPrivateKey(action: string): Promise<string> {
    if (!privateKey) {
      const result = await this.showReloginPanel();

      if (!result.privateKey) {
        await this.logout();
        return notInitializedError(action)();
      }

      privateKey = result.privateKey;
    }
    return privateKey;
  }

  protected abstract showLoginPanel(): Promise<{
    address: string;
    privateKey: string;
    [key: string]: any;
  }>;

  protected abstract showReloginPanel(): Promise<{
    privateKey: string;
    [key: string]: any;
  }>;

  protected abstract handleLoginResult(result: any): void;

  protected abstract encodeMessage(message: string): Uint8Array;

  protected abstract formatSignature(signature: Uint8Array): string;
}
