import { useSelector } from 'react-redux';
import { networks } from 'config';
import { initializeNetwork, EnvironmentsEnum, refreshAccount } from 'lib';
import { networkSelector } from 'redux/selectors';
import { useRefreshNativeAuthTokenForNetwork } from './hooks';
import { useSignMessage } from './hooks/useSignMessage';
import { Dropdown, DropdownOption } from '../Dropdown';

export const NetworkSwitcher = () => {
  const { activeNetwork } = useSelector(networkSelector);
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
      return;
    }

    const { apiAddress } = await initializeNetwork({
      environment: option.value as EnvironmentsEnum,
      customNetworkConfig: {
        ...selectedNetwork,
        skipFetchFromServer: false
      }
    });

    await refreshNativeAuthTokenForNetwork({
      networkId: selectedNetwork.id,
      signMessageCallback: signMessage,
      apiAddress
    });

    await refreshAccount();
  };

  return (
    <Dropdown
      initialOption={currentNetwork}
      options={networkOptions}
      onSelectOption={handleNetworkSwitch}
    />
  );
};
