import { useSelector } from 'react-redux';
import { networks } from 'config';
import { networkSelector } from 'redux/selectors';
import { validateNetworkSwitch } from './helpers';
import { useRefreshNativeAuthTokenForNetwork, useSignMessage } from './hooks';
import { Dropdown, DropdownOption } from '../Dropdown';

export const NetworkSwitcher = () => {
  const { activeNetwork, isNetworkSwitching } = useSelector(networkSelector);
  const refreshNativeAuthTokenForNetwork =
    useRefreshNativeAuthTokenForNetwork();
  const signMessage = useSignMessage();

  const networkOptions = networks.map((network) => ({
    label: network.name,
    value: network.id
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

    const validation = validateNetworkSwitch({
      currentNetwork: activeNetwork,
      targetNetwork: selectedNetwork,
      isNetworkSwitching
    });

    if (!validation.isValid) {
      console.warn('Network switch validation failed:', validation.error);
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
    <div className={isNetworkSwitching ? 'opacity-50 cursor-not-allowed' : ''}>
      <Dropdown
        initialOption={currentNetwork}
        options={networkOptions}
        onSelectOption={handleNetworkSwitch}
      />
    </div>
  );
};
