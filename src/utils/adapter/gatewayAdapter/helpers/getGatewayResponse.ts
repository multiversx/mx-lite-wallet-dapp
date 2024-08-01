import { AxiosResponse } from 'axios';
import { NETWORK_CONFIG_ENDPOINT } from 'localConstants';
import { gatewayEndpoints } from './apiToGatewayEndpointMap';
import { arraybufferToJSON } from './arraybufferToJSON';
import { jsonToArrayBuffer } from './jsonToArrayBuffer';

export const getGatewayResponse = async (
  gatewayUrl: string,
  response: AxiosResponse<any, any>
): Promise<AxiosResponse<any, any>> => {
  if (gatewayUrl.includes(`/${gatewayEndpoints.address}`)) {
    const account = await arraybufferToJSON(response);

    return {
      ...response,
      data: jsonToArrayBuffer(account.data.account)
    };
  }

  if (gatewayUrl.includes(`/${gatewayEndpoints[NETWORK_CONFIG_ENDPOINT]}`)) {
    const networkConfig = await arraybufferToJSON(response);
    return {
      ...response,
      data: jsonToArrayBuffer(networkConfig.data.config)
    };
  }

  return response;
};
