import {
  Transaction,
  UserSecretKey,
  UserSigner,
  getAddress,
  MessageComputer
} from 'lib';
import { setKeystoreLogin } from 'redux/slices/account';
import { store as reduxStore } from 'redux/store';
import { IDappProvider } from 'types';
let privateKey: string | null = null;

export const setProviderPrivateKey = (key: typeof privateKey) =>
  (privateKey = key);

const notInitializedError = (caller: string) => () => {
  throw new Error(`Unable to perform ${caller}, Provider not initialized`);
};

export const provider: IDappProvider = {
  init: async () => {
    const address = getAddress();
    return Boolean(address);
  },
  getAccount: notInitializedError('getAccount'),
  setAccount: notInitializedError('setAccount'),
  login: notInitializedError('login'),
  logout: () => {
    // eslint-disable-next-line
    const storeObject = require('redux/store');
    const store: typeof reduxStore = storeObject.store;
    store.dispatch(
      setKeystoreLogin({
        keystoreFile: '',
        privateKey: ''
      })
    );
    setProviderPrivateKey(null);
    return new Promise((resolve, reject) => {
      if (privateKey) {
        reject('Unable to perform logout');
      } else {
        resolve(true);
      }
    });
  },
  getAddress: notInitializedError('getAddress'),
  isInitialized: () => Boolean(privateKey),
  isConnected: () => false,
  sendTransaction: notInitializedError('sendTransaction'),
  signTransaction: async (transaction: Transaction) => {
    if (!privateKey) {
      const throwError = notInitializedError('signTransaction');
      return throwError();
    }

    const signer = new UserSigner(UserSecretKey.fromString(privateKey));
    const signature = await signer.sign(transaction.serializeForSigning());
    transaction.applySignature(new Uint8Array(signature));

    return transaction;
  },

  signMessage: async (message) => {
    if (!privateKey) {
      const throwError = notInitializedError('signMessage');
      return throwError();
    }

    const signer = new UserSigner(UserSecretKey.fromString(privateKey));
    const messageComputer = new MessageComputer();

    const messageToSign = new Uint8Array(
      messageComputer.computeBytesForSigning(message)
    );

    const signature = await signer.sign(Buffer.from(messageToSign));
    message.signature = new Uint8Array(signature);

    return message;
  },
  signTransactions: async (transactions: Transaction[]) => {
    if (!privateKey) {
      const throwError = notInitializedError('signTransactions');
      return throwError();
    }
    const signedTransactions: Transaction[] = [];
    const signer = new UserSigner(UserSecretKey.fromString(privateKey));

    for (const transaction of transactions) {
      const signature = await signer.sign(transaction.serializeForSigning());

      transaction.signature = new Uint8Array(signature);
      signedTransactions.push(transaction);
    }

    return signedTransactions;
  }
};
