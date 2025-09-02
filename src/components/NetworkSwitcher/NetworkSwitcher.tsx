import { useSelector } from 'react-redux';
import { networks } from 'config';
import { networkSelector } from 'redux/selectors';
import { useRefreshNativeAuthTokenForNetwork, useSignMessage } from './hooks';
import { Dropdown, DropdownOption } from '../Dropdown';

export const NetworkSwitcher = () => {
  const { activeNetwork } = useSelector(networkSelector);
  const refreshNativeAuthTokenForNetwork =
    useRefreshNativeAuthTokenForNetwork();
  const signMessage = useSignMessage();

  const networkOptions = networks.map((network) => ({
    label: network.name,
    value: network.id,
    disabled: network.id === activeNetwork.id
  }));

  const currentNetwork = {
    label: activeNetwork.name,
    value: activeNetwork.id
  };

  const handleNetworkSwitch = async (option: DropdownOption) => {
    const selectedNetwork = networks.find(
      (network) => network.id === option.value
    );

    if (!selectedNetwork) {
      console.error('Selected network not found:', option.value);
      return;
    }

    try {
      await refreshNativeAuthTokenForNetwork({
        networkId: selectedNetwork.id,
        origin: window.location.origin,
        signMessageCallback: signMessage
      });
    } catch (error) {
      console.error('Network switch failed:', error);
    }
  };

  return (
    <Dropdown
      initialOption={currentNetwork}
      options={networkOptions}
      onSelectOption={handleNetworkSwitch}
    />
  );
};
