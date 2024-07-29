import axios from 'axios';
import { API_URL } from 'config';
import { ACCOUNTS_ENDPOINT } from 'localConstants';
import { arraybufferToJSON } from './helpers/arraybufferToJSON';
import { jsonToArrayBuffer } from './helpers/jsonToArrayBuffer';

const gatewayUrl = 'https://devnet-gateway.multiversx.com';

const endpointMap = {
  [ACCOUNTS_ENDPOINT]: 'address'
};

axios.interceptors.request.use(
  function (config) {
    const { url } = config;

    if (!url?.includes(API_URL)) {
      return config;
    }

    if (url.includes(ACCOUNTS_ENDPOINT)) {
      return {
        ...config,
        url: url.replace(
          `${API_URL}/accounts`,
          'https://devnet-gateway.multiversx.com/address'
        )
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    const {
      config: { url }
    } = response;

    if (url?.includes(API_URL)) {
      return response;
    }

    if (url?.includes('address')) {
      const account = await arraybufferToJSON(response);

      return {
        ...response,
        data: jsonToArrayBuffer(account.data.account)
      };
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
