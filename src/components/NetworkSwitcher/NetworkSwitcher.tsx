import { useDispatch, useSelector } from 'react-redux';
import { networks } from 'config';
import { networkSelector } from 'redux/selectors';
import { changeNetwork } from 'redux/slices';
import { Dropdown, DropdownOption } from '../Dropdown';

export const NetworkSwitcher = () => {
  const { activeNetwork } = useSelector(networkSelector);
  const dispatch = useDispatch();
  const networkOptions = networks.map((network) => ({
    label: network.name,
    value: network.id
  }));

  const currentNetwork = {
    label: activeNetwork.name,
    value: activeNetwork.id
  };

  const handleNetworkSwitch = (option: DropdownOption) => {
    const selectedNetwork = networks.find(
      (network) => network.id === option.value
    );

    if (!selectedNetwork) {
      return;
    }

    dispatch(changeNetwork(selectedNetwork));
  };

  return (
    <Dropdown
      initialOption={currentNetwork}
      options={networkOptions}
      onSelectOption={handleNetworkSwitch}
    />
  );
};
