import axios from 'axios';
import { API_URL, GATEWAY_URL } from 'config';
import { getGatewayResponse } from './helpers/getGatewayResponse';
import { getGatewayUrlForCurrentRequest } from './helpers/getGatewayUrlForCurrentRequest';

axios.interceptors.request.use(
  function (config) {
    const { url } = config;

    if (!url || (API_URL && !GATEWAY_URL)) {
      console.log(
        'API_URL is defined but GATEWAY_URL is not defined. Please set GATEWAY_URL in config/index',
        !url || (API_URL && !GATEWAY_URL)
      );

      return config;
    }

    const newUrl = getGatewayUrlForCurrentRequest(url);

    console.log({
      newUrl
    });

    // GATEWAY_URL is defined
    return {
      ...config,
      url: newUrl
    };
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

    const isGatewayRequest = url?.includes(GATEWAY_URL);

    console.log('\x1b[42m%s\x1b[0m', 'response', {
      isGatewayRequest,
      url
    });

    if (!isGatewayRequest || !url) {
      return response;
    }

    const gatewayResponse = await getGatewayResponse(url, response);

    return gatewayResponse;
  },
  function (error) {
    return Promise.reject(error);
  }
);
