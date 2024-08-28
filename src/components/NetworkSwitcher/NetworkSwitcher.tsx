import { useSelector } from 'react-redux';
import { networks } from 'config';
import { networkSelector } from 'redux/selectors';
import { useRefreshNativeAuthTokenForNetwork } from './hooks';
import { Dropdown, DropdownOption } from '../Dropdown';

export const NetworkSwitcher = () => {
  const { activeNetwork } = useSelector(networkSelector);
  const refreshNativeAuthTokenForNetwork =
    useRefreshNativeAuthTokenForNetwork();

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
      return;
    }

    await refreshNativeAuthTokenForNetwork({
      networkId: selectedNetwork.id,
      origin: window.location.origin,
      signMessageCallback: (messageToSign) => Promise.resolve(messageToSign)
    });
  };

  return (
    <Dropdown
      initialOption={currentNetwork}
      options={networkOptions}
      onSelectOption={handleNetworkSwitch}
    />
  );
};
