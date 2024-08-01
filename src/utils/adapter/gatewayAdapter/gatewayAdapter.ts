import axios from 'axios';
import { API_URL, GATEWAY_URL } from 'config';
import { getGatewayConfigForCurrentRequest } from './helpers/getGatewayConfigForCurrentRequest';
import { getGatewayResponse } from './helpers/getGatewayResponse';

axios.interceptors.request.use(
  function (config) {
    if (!config.url || (API_URL && !GATEWAY_URL)) {
      return config;
    }

    const newConfig = getGatewayConfigForCurrentRequest(config);

    return newConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    const { config } = response;

    const isGatewayRequest = config.baseURL === GATEWAY_URL;
    const url = config.url || '';

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
