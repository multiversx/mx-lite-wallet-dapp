import { AxiosResponse } from 'axios';
import { GATEWAY_URL } from 'config';
import { GatewayEndpointsEnum } from './apiToGatewayEndpointMap';
import { arraybufferToJSON } from './arraybufferToJSON';
import { jsonToArrayBuffer } from './jsonToArrayBuffer';

export const getGatewayResponse = async (
  gatewayUrl: string,
  response: AxiosResponse<any, any>
): Promise<AxiosResponse<any, any>> => {
  const isGatewayRequest = GATEWAY_URL && gatewayUrl.startsWith(GATEWAY_URL);

  console.log({
    isGatewayRequest
  });

  if (!isGatewayRequest) {
    return response;
  }

  if (gatewayUrl.includes(`/${GatewayEndpointsEnum.address}`)) {
    const account = await arraybufferToJSON(response);

    return {
      ...response,
      data: jsonToArrayBuffer(account.data.account)
    };
  }

  return response;
};
