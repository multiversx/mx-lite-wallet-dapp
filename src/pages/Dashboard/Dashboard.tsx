import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useScrollToElement, useSignWithRedirect } from 'hooks';
import { refreshAccount, useGetAccountInfo } from 'lib';
import { WidgetType } from 'types/widget.types';
import { AuthRedirectWrapper } from 'wrappers';
import { LeftPanel } from './components/LeftPanel';
import { Widget } from './components/Widget';
import { NFTs, SignMessage, Tokens, Transactions } from './widgets';

// prettier-ignore
const styles = {
  dashboardContainer: 'dashboard-container flex w-screen min-h-screen relative border-t border-b border-secondary transition-all duration-200 ease-out',
  mobilePanelContainer: 'mobile-panel-container fixed bottom-0 left-0 right-0 z-50 max-h-full overflow-y-auto lg:static lg:max-h-none lg:overflow-visible',
  desktopPanelContainer: 'desktop-panel-container lg:flex',
  dashboardContent: 'dashboard-content flex flex-col gap-6 justify-center items-center flex-1 w-full overflow-auto border-l border-secondary p-4 lg:p-6 transition-all duration-200 ease-out',
  dashboardContentMobilePanelOpen: 'dashboard-content-mobile-panel-open opacity-20 lg:opacity-100 pointer-events-none',
  dashboardWidgets: 'dashboard-widgets flex flex-col gap-6  w-full max-w-320'
} satisfies Record<string, string>;

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
