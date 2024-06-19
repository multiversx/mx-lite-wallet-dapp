import { rest, setupWorker } from 'msw';
import { setupServer } from 'msw/node';

import {
  testNetwork,
  keystoreAccount,
  dappConfig,
  keystoreWalletTokens,
  keystoreWalletNfts,
  pemAccount,
  pemWalletTokens,
  pemWalletNfts
} from './data';
import { mockResponse } from './serverUtils';

export const handlers = [
  rest.get(`${testNetwork.apiAddress}/dapp/config`, mockResponse(dappConfig)),
  rest.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}`,
    mockResponse(keystoreAccount)
  ),
  rest.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}/tokens`,
    mockResponse(keystoreWalletTokens)
  ),
  rest.get(
    `${testNetwork.apiAddress}/accounts/${keystoreAccount.address}/nfts`,
    mockResponse(keystoreWalletNfts)
  ),
  rest.get(
    `${testNetwork.apiAddress}/accounts/${pemAccount.address}`,
    mockResponse(pemAccount)
  ),
  rest.get(
    `${testNetwork.apiAddress}/accounts/${pemAccount.address}/tokens`,
    mockResponse(pemWalletTokens)
  ),
  rest.get(
    `${testNetwork.apiAddress}/accounts/${pemAccount.address}/nfts`,
    mockResponse(pemWalletNfts)
  )
];

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);
const worker = setupWorker(...handlers);

export { server, rest, worker };
