import {
  faArrowRightLong,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { Tooltip } from 'components';
import { networks } from 'config';
import { networkSelector } from 'redux/selectors';
import { useRefreshNativeAuthTokenForNetwork } from './hooks';
import { styles } from './networkSwitcher.styles';

export interface DropdownOption {
  label: string;
  value: string;
}

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
    <Tooltip
      place='bottom'
      clickable={true}
      hasDrawer={true}
      drawerTitle='Choose Network'
      identifier='network-tooltip-identifier'
      className={styles.networkTooltip}
      content={
        <div className={styles.networkTooltipOptions}>
          {networkOptions.map((networkOption) => (
            <div
              key={`network-${networkOption.value}-option`}
              onClick={() => handleNetworkSwitch(networkOption)}
              className={classNames(styles.networkTooltipOption, {
                [styles.networkTooltipOptionActive]:
                  networkOption.value === currentNetwork.value
              })}
            >
              <div className={styles.networkTooltipOptionLabel}>
                {networkOption.label}
              </div>

              {networkOption.value !== currentNetwork.value && (
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className={styles.networkTooltipOptionArrow}
                />
              )}
            </div>
          ))}
        </div>
      }
    >
      <div className={styles.networkTooltipTrigger}>
        <div className={styles.networkTooltipSelectedLabel}>
          {currentNetwork.label}
        </div>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={classNames(styles.networkTooltipTriggerIcon, {
            [styles.networkTooltipTriggerIconRotated]: false
          })}
        />
      </div>
    </Tooltip>
  );
};
