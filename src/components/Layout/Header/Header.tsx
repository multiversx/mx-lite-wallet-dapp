import { MouseEvent } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faPowerOff,
  faWallet,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MvxButton,
  MvxDataWithExplorerLink
} from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { MxLink } from 'components/MxLink';
import { NetworkSwitcher } from 'components/NetworkSwitcher';
import { Tooltip } from 'components/Tooltip';
import { GITHUB_REPO_URL } from 'config';
import {
  getAccountProvider,
  NotificationsFeedManager,
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetNetworkConfig
} from 'lib';
import { RouteNamesEnum } from 'localConstants';
import { styles } from './header.styles';
import MultiversXLogo from '../../../assets/img/multiversx-logo.svg?react';

interface HeaderBrowseButtonType {
  handleClick: (event: MouseEvent<HTMLDivElement>) => void;
  icon: IconDefinition;
  isVisible: boolean;
  label: string;
}

export const Header = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const isLoggedIn = useGetIsLoggedIn();
  const provider = getAccountProvider();
  const navigate = useNavigate();
  const explorerAddress = network.explorerAddress;

  const handleLogout = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  const handleGitHubBrowsing = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(GITHUB_REPO_URL);
  };

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
  };

  const handleNotificationsBrowsing = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    NotificationsFeedManager.getInstance().openNotificationsFeed();
  };

  const headerBrowseButtons: HeaderBrowseButtonType[] = [
    {
      label: 'GitHub',
      handleClick: handleGitHubBrowsing,
      icon: faGithub as IconDefinition,
      isVisible: true
    },
    {
      label: 'Notifications',
      handleClick: handleNotificationsBrowsing,
      icon: faBell,
      isVisible: isLoggedIn
    }
  ];

  return (
    <header className={styles.header}>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <MultiversXLogo className={styles.headerLogo} />
      </MxLink>

      <nav className={styles.headerNavigation}>
        <div className={styles.headerNavigationButtons}>
          {headerBrowseButtons.map((headerBrowseButton) => (
            <Tooltip
              identifier={`header-${headerBrowseButton.label}-button`}
              key={`header-${headerBrowseButton.label}-button`}
              content={headerBrowseButton.label}
              place='bottom'
            >
              <div
                onClick={headerBrowseButton.handleClick}
                className={classNames(styles.headerNavigationButton, {
                  hidden: !headerBrowseButton.isVisible
                })}
              >
                <FontAwesomeIcon
                  className={styles.headerNavigationButtonIcon}
                  icon={headerBrowseButton.icon}
                />
              </div>
            </Tooltip>
          ))}
        </div>

        <div className={styles.headerNavigationNetwork}>
          <div className={styles.headerNavigationNetworkLabel}>
            <NetworkSwitcher />
          </div>
        </div>

        {isLoggedIn && (
          <div className={styles.headerNavigationAddress}>
            <FontAwesomeIcon
              icon={faWallet}
              className={styles.headerNavigationAddressWallet}
            />

            <div className={styles.headerNavigationAddressExplorer}>
              <MvxDataWithExplorerLink
                data={address}
                withTooltip={true}
                explorerLink={`${explorerAddress}/accounts/${address}`}
              />
            </div>

            <Tooltip
              place='bottom'
              identifier='disconnect-tooltip-identifier'
              content='Disconnect'
            >
              <div
                onClick={handleLogout}
                className={styles.headerNavigationAddressLogout}
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </div>
            </Tooltip>
          </div>
        )}

        {!isLoggedIn && <MvxButton onClick={handleLogIn}>Connect</MvxButton>}
      </nav>
    </header>
  );
};
