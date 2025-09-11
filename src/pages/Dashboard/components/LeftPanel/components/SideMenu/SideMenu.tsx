import { FunctionComponent, SVGProps, useState } from 'react';
import {
  faArrowRight,
  faArrowRightArrowLeft,
  faArrowUp,
  faChevronUp,
  faCoins,
  faCubes,
  faPenNib,
  faRectangleList,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';
import { networkSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { ItemIcon } from './components';
import { styles } from './sideMenu.styles';

interface SideMenuPropsType {
  setIsOpen: (isOpen: boolean) => void;
}
interface MenuItemsType {
  title: string;
  icon?: IconDefinition | FunctionComponent<SVGProps<SVGSVGElement>>;
  id?: ItemsIdentifiersEnum;
  route?: string;
  visible?: boolean;
}

export const SideMenu = ({ setIsOpen }: SideMenuPropsType) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(ItemsIdentifiersEnum.tokens);
  const navigate = useNavigate();
  const { activeNetwork } = useSelector(networkSelector);
  const { hasRegisterToken, hasSovereignTransfer } = activeNetwork as any;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleScrollToItem = (id: ItemsIdentifiersEnum) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 250;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setActiveItem(id);
    }
  };

  const handleRouteRedirect = (route: string) => {
    navigate(route);
  };

  const handleMenuItemClick = (item: MenuItemsType) => {
    if (item.route) {
      handleRouteRedirect(item.route);
    } else if (item.id) {
      handleScrollToItem(item.id);
    }
  };

  const menuItems: MenuItemsType[] = [
    {
      title: 'Tokens',
      icon: faCoins,
      id: ItemsIdentifiersEnum.tokens,
      visible: true
    },
    {
      title: 'NFTs',
      icon: faCubes,
      id: ItemsIdentifiersEnum.nfts,
      visible: true
    },
    {
      title: 'Sign message',
      icon: faPenNib,
      id: ItemsIdentifiersEnum.signMessage,
      visible: true
    },
    {
      title: 'Transactions',
      icon: faRectangleList,
      id: ItemsIdentifiersEnum.transactions,
      visible: true
    },
    {
      title: 'Send',
      icon: faArrowUp,
      route: routeNames.send,
      visible: true
    },
    {
      title: 'Sovereign Transfer',
      icon: faArrowRight,
      route: routeNames.sovereignTransfer,
      visible: hasSovereignTransfer
    },
    {
      title: 'Register Token',
      icon: faArrowRight,
      route: routeNames.registerToken,
      visible: hasRegisterToken
    },
    {
      title: 'Request Funds',
      icon: faArrowRightArrowLeft,
      route: routeNames.faucet,
      visible: activeNetwork.faucet
    }
  ];

  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.sideMenuHeader}>
        <h2 className={styles.sideMenuHeaderTitle}>Library</h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={classNames(styles.sideMenuHeaderIcon, {
            [styles.sideMenuHeaderIconRotated]: isCollapsed
          })}
          onClick={toggleCollapse}
        />
      </div>

      <div
        className={classNames(styles.sideMenuItems, {
          [styles.sideMenuItemsHidden]: isCollapsed
        })}
      >
        {menuItems.map(
          (item) =>
            item.visible && (
              <div
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                className={classNames(styles.sideMenuItem, {
                  [styles.sideMenuItemActive]: item.id === activeItem
                })}
              >
                {item.icon && <ItemIcon icon={item.icon} />}

                <div className={styles.sideMenuItemTitle}>{item.title}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
