import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useScrollToElement, useSignWithRedirect } from 'hooks';
import { refreshAccount, useGetAccountInfo } from 'lib';
import { WidgetType } from 'types/widget.types';
import { AuthRedirectWrapper } from 'wrappers';
import { LeftPanel } from './components/LeftPanel';
import { Widget } from './components/Widget';
import { styles } from './dashboard.styles';
import { NFTs, SignMessage, Tokens, Transactions } from './widgets';

const WIDGETS: WidgetType[] = [
  {
    title: 'Tokens',
    widget: Tokens,
    description: 'Tokens for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTokens'
  },
  {
    title: 'NFTs',
    widget: NFTs,
    description: 'NFTs for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountNfts'
  },
  {
    title: 'Sign message',
    widget: SignMessage,
    description: 'Message signing using the connected account',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1'
  },
  {
    title: 'Transactions',
    widget: Transactions,
    description: 'Transactions list for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  useScrollToElement();
  const { websocketEvent } = useGetAccountInfo();
  useSignWithRedirect();

  useEffect(() => {
    refreshAccount();
  }, [websocketEvent]);

  return (
    <AuthRedirectWrapper>
      <div className={styles.dashboardContainer}>
        <div
          className={classNames(
            styles.mobilePanelContainer,
            styles.desktopPanelContainer
          )}
        >
          <LeftPanel
            isOpen={isMobilePanelOpen}
            setIsOpen={setIsMobilePanelOpen}
          />
        </div>

        <div
          className={classNames(styles.dashboardContent, {
            [styles.dashboardContentMobilePanelOpen]: isMobilePanelOpen
          })}
          style={{ backgroundImage: 'url(src/assets/img/background.svg)' }}
        >
          <div className={styles.dashboardWidgets}>
            {WIDGETS.map((element) => (
              <Widget key={element.title} {...element} />
            ))}
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
