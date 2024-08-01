import { AxiosResponse } from 'axios';
import { GatewayEndpointsEnum } from './apiToGatewayEndpointMap';
import { arraybufferToJSON } from './arraybufferToJSON';
import { jsonToArrayBuffer } from './jsonToArrayBuffer';

export const getGatewayResponse = async (
  gatewayUrl: string,
  response: AxiosResponse<any, any>
): Promise<AxiosResponse<any, any>> => {
  if (gatewayUrl.includes(`/${GatewayEndpointsEnum.address}`)) {
    const account = await arraybufferToJSON(response);

    return {
      ...response,
      data: jsonToArrayBuffer(account.data.account)
    };
  }

  return response;
};
