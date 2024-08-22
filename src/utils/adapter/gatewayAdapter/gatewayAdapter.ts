import axios from 'axios';
import { getCurrentNetwork } from 'helpers';
import { getGatewayConfigForCurrentRequest } from './helpers/getGatewayConfigForCurrentRequest';
import { getGatewayResponse } from './helpers/getGatewayResponse';

axios.interceptors.request.use(
  function (config) {
    const { apiAddress, gatewayUrl } = getCurrentNetwork();

    if (!config.url || (apiAddress && !gatewayUrl)) {
      return config;
    }

    return getGatewayConfigForCurrentRequest(config);
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    const { gatewayUrl } = getCurrentNetwork();
    const { config } = response;

    const isGatewayRequest = config.baseURL === gatewayUrl;
    const url = config.url || '';

    if (!isGatewayRequest || !url) {
      return response;
    }

    return await getGatewayResponse(url, response);
  },
  function (error) {
    return Promise.reject(error);
  }
);
