import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'config';
import { ACCOUNTS_ENDPOINT } from 'localConstants';

const getData = async <T extends AxiosResponse>(response: T) => {
  const needsParsing = response.config.responseType === 'arraybuffer';

  if (!needsParsing) {
    return response.data;
  }

  const decoder = new TextDecoder('utf-8');
  const text = decoder.decode(new Uint8Array(response.data));

  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    // Handle JSON parse error if needed
    return Promise.reject(
      new Error('Failed to parse JSON from arraybuffer response.')
    );
  }
};

const jsonToArrayBuffer = (json: Record<string, unknown>) => {
  const jsonString = JSON.stringify(json);
  const encoder = new TextEncoder();
  const arrayBuffer = encoder.encode(jsonString);
  return arrayBuffer;
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
      const account = await getData(response);

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
