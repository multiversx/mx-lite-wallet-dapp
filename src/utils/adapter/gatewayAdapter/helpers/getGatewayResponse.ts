import { AxiosResponse } from 'axios';
import { NETWORK_CONFIG_ENDPOINT } from 'localConstants';
import { matchPath } from 'types/sdkDapp.types';
import { gatewayEndpoints } from './apiToGatewayEndpointMap';
import { arraybufferToJSON } from './arraybufferToJSON';
import { jsonToArrayBuffer } from './jsonToArrayBuffer';

export const getGatewayResponse = async (
  gatewayUrl: string,
  response: AxiosResponse<any, any>
): Promise<AxiosResponse<any, any>> => {
  if (gatewayUrl.includes('/transaction/send')) {
    const transaction = await arraybufferToJSON(response);

    return {
      ...response,
      data: jsonToArrayBuffer(transaction.data)
    };
  }

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

  const isFetchTransaction = matchPath('/transaction/:hash', gatewayUrl);

  if (Boolean(isFetchTransaction)) {
    const data = await arraybufferToJSON(response);

    return {
      ...response,
      data: [{ ...data.data.transaction, txHash: data.data.transaction.hash }]
    };
  }

  return response;
};
