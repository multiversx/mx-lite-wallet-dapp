import axios from 'axios';
import { API_URL, GATEWAY_URL } from 'config';
import { getGatewayResponse } from './helpers/getGatewayResponse';
import { getGatewayUrlForCurrentRequest } from './helpers/getGatewayUrlForCurrentRequest';

axios.interceptors.request.use(
  function (config) {
    const { url } = config;

    if (!url || (API_URL && !GATEWAY_URL)) {
      return config;
    }

    const newUrl = getGatewayUrlForCurrentRequest(url);

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
