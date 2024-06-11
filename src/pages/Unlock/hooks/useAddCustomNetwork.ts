import { useSelector } from 'react-redux';
import { getNewNetworkConfig } from 'apiRequests';
import { networks } from 'config';
import { useNavigate, useRefreshNativeAuthTokenForNetwork } from 'hooks';
import { activeNetworkSelector } from 'redux/selectors';
import { routeNames } from 'routes';

export const useAddCustomNetwork = () => {
  const activeNetwork = useSelector(activeNetworkSelector);
  const navigate = useNavigate({ from: 'useAddCustomNetwork' });
  const refreshNativeAuthTokenForNetwork =
    useRefreshNativeAuthTokenForNetwork();

  return async (url: string) => {
    const existingNetwork = networks.find(
      (network) => network.apiAddress === url
    );

    if (existingNetwork?.id) {
      await refreshNativeAuthTokenForNetwork({
        networkId: existingNetwork.id,
        origin: window.location.origin,
        signMessageCallback: (messageToSign) => Promise.resolve(messageToSign)
      });

      navigate(routeNames.unlock);

      return;
    }

    try {
      const networkConfig = (await getNewNetworkConfig(url)) ?? activeNetwork;
      const isNetworkAdded = networks.some(
        (network) =>
          network.id === networkConfig.id ||
          network.name === networkConfig.name ||
          network.chainId === networkConfig.chainId
      );

      if (isNetworkAdded) {
        // Don't allow duplicate networks
        return;
      }

      const newNetwork = {
        ...activeNetwork,
        ...networkConfig,
        default: false,
        id: `${networkConfig.id}`,
        walletConnectBridgeAddresses:
          networkConfig.walletConnectBridgeAddresses || []
      };

      networks.unshift(newNetwork);

      await refreshNativeAuthTokenForNetwork({
        networkId: newNetwork.id,
        origin: window.location.origin,
        signMessageCallback: (messageToSign) => Promise.resolve(messageToSign)
      });

      navigate(routeNames.unlock);
    } catch (error) {
      console.error('Error fetching network config:', error);
    }
  };
};
