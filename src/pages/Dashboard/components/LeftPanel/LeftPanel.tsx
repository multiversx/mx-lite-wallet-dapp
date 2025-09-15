import {
  faClose,
  faPowerOff,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxDataWithExplorerLink } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconExpand } from 'assets/img/expand-up-down.svg';
import {
  ACCOUNTS_ENDPOINT,
  getAccountProvider,
  useGetAccountInfo,
  useGetIsLoggedIn
} from 'lib';
import { RouteNamesEnum } from 'localConstants';

import { SideMenu } from './components';
import { styles } from './leftPanel.styles';
import { ReactComponent as MultiversXLogo } from '../../../../assets/img/multiversx-logo.svg';
import { Account } from '../../widgets';

interface LeftPanelPropsType {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LeftPanel = ({
  isOpen = false,
  setIsOpen
}: LeftPanelPropsType) => {
  const handleOpenPanel = () => {
    setIsOpen(!isOpen);
  };

  const { address } = useGetAccountInfo();

  const isLoggedIn = useGetIsLoggedIn();

  const provider = getAccountProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  return (
    <div
      className={classNames(styles.leftPanelContainer, {
        [styles.leftPanelContainerOpen]: isOpen
      })}
    >
      <div className={styles.leftPanelMobileHeader} onClick={handleOpenPanel}>
        <MultiversXLogo className='h-4 w-fit' />

        {isOpen ? (
          <FontAwesomeIcon
            icon={faClose}
            className={styles.leftPanelMobileHeaderIconClose}
            size='xl'
          />
        ) : (
          <IconExpand className={styles.leftPanelMobileHeaderIconOpen} />
        )}
      </div>

      <div
        className={classNames(styles.leftPanel, {
          [styles.leftPanelHidden]: !isOpen
        })}
      >
        <div className={styles.leftPanelMobileAddressSection}>
          <div className={styles.leftPanelMobileAddress}>
            <FontAwesomeIcon
              icon={faWallet}
              className={styles.leftPanelMobileAddressIcon}
            />

            <div className={styles.leftPanelMobileAddressExplorer}>
              <MvxDataWithExplorerLink
                data={address}
                withTooltip={true}
                explorerLink={`/${ACCOUNTS_ENDPOINT}/${address}`}
              />
            </div>
          </div>

          {isLoggedIn && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          )}
        </div>

        <div className={styles.leftPanelComponents}>
          <Account />

          <div className={styles.leftPanelBar} />

          <SideMenu setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};
