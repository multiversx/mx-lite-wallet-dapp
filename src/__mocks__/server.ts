import { http } from 'msw';
import { setupWorker } from 'msw/browser';

import {
  testNetwork,
  keystoreAccount,
  keystoreWalletTokens,
  keystoreWalletNfts,
  pemAccount,
  pemWalletTokens,
  pemWalletNfts,
  dappConfig,
  networkConfig,
  pemAccountGuarded,
  faucetSettings,
  keystoreWalletCollections,
  pendingTransactionKeystoreWallet,
  emptyWalletAccount
} from './data';
import { issueContract } from './data/issueContract';
import { mockResponse } from './serverUtils';

export const handlers = [
  http.get(`${testNetwork.apiAddress}/dapp/config`, mockResponse(dappConfig)),
  http.get(
    `${testNetwork.apiAddress}/network/config`,
    mockResponse(networkConfig)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}`,
    mockResponse(keystoreAccount)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${emptyWalletAccount.address}`,
    mockResponse(emptyWalletAccount)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}/tokens`,
    mockResponse(keystoreWalletTokens)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}/nfts`,
    mockResponse(keystoreWalletNfts)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}/roles/collections`,
    mockResponse(keystoreWalletCollections)
  ),
  http.post(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}/transactions`,
    mockResponse(pendingTransactionKeystoreWallet)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${pemAccount.address}`,
    mockResponse(pemAccount)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${pemAccount.address}/tokens`,
    mockResponse(pemWalletTokens)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${pemAccount.address}/nfts`,
    mockResponse(pemWalletNfts)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${pemAccountGuarded.address}`,
    mockResponse(pemAccount)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${pemAccountGuarded.address}/tokens`,
    mockResponse(pemWalletTokens)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${pemAccountGuarded.address}/nfts`,
    mockResponse(pemWalletNfts)
  ),
  http.get(
    `${testNetwork.apiAddress}/accounts/${issueContract.address}`,
    mockResponse(issueContract)
  ),
  http.get(
    `${testNetwork.extrasApiAddress}/faucet/settings`,
    mockResponse(faucetSettings)
  ),
  http.post(
    `${testNetwork.extrasApiAddress}/faucet`,
    mockResponse({
      status: 'success'
    })
  )
];

// This configures a request mocking server with the given request handlers.
const worker = setupWorker(...handlers);

export { worker };
