import LedgerIcon from 'assets/img/ledger-icon.svg?react';
// import MetamaskIcon from 'assets/img/metamask-icon.svg?react';
// import PasskeyIcon from 'assets/img/passkey-icon.svg?react';
import WebWalletIcon from 'assets/img/web-wallet-icon.svg?react';
import XPortalIcon from 'assets/img/xportal-icon.svg?react';
import {
  // BrowserEnum,
  // CHROME_METAMASK_EXTENSION_LINK,
  // FIREFOX_METAMASK_ADDON_LINK,
  GET_LEDGER,
  GET_XPORTAL,
  WALLET_ADDRESS
} from 'localConstants';

// import { getDetectedBrowser } from 'pages/Home/helpers';
import { ConnectCard, ExtensionConnect } from './components';
import { styles } from './howToConnectComponent.styles';

export const HowToConnectComponent = () => {
  // const detectedBrowser = getDetectedBrowser();
  // const isFirefox = detectedBrowser === BrowserEnum.Firefox;

  const connectCards = [
    // Passkey and Metamask not active for the moment

    // {
    //   icon: MetamaskIcon,
    //   title: 'Metamask Snap',
    //   description:
    //     'Explore the entire MultiversX ecosystem with Metamask! Securely manage, swap and transfer your assets.',
    //   linkTitle: 'Get Metamask',
    //   linkDownloadAddress: isFirefox
    //     ? FIREFOX_METAMASK_ADDON_LINK
    //     : CHROME_METAMASK_EXTENSION_LINK
    // },
    // {
    //   icon: PasskeyIcon,
    //   title: 'Passkey',
    //   description:
    //     'Passkeys offer a more secure and user-friendly way to authenticate and sign transactions.',
    //   linkTitle: 'Get Passkey',
    //   linkDownloadAddress: WALLET_ADDRESS
    // },
    {
      icon: XPortalIcon,
      title: 'xPortal Wallet',
      description:
        'The easiest way to invest, spend globally with a crypto card and earn yield across DeFi and stablecoins.',
      linkTitle: 'Get xPortal',
      linkDownloadAddress: GET_XPORTAL
    },
    {
      icon: LedgerIcon,
      title: 'Ledger',
      description:
        'You can safely store your EGLD by installing the MultiversX EGLD app on your Ledger Nano S or Ledger Nano X device',
      linkTitle: 'Get Started',
      linkDownloadAddress: GET_LEDGER
    },
    {
      icon: WebWalletIcon,
      title: 'MultiversX Web Wallet',
      description:
        'Store, swap, and transfer tokens or NFTs. Connect to Web3 apps on MultiversX blockchain.',
      linkTitle: 'Get MultiversX Wallet',
      linkDownloadAddress: WALLET_ADDRESS
    }
  ];
  return (
    <div className={styles.howToConnectContainer}>
      <div className={styles.howToConnectHeader}>
        <h1 className={styles.howToConnectTitle}>How can you connect</h1>

        <p className={styles.howToConnectDescription}>
          Choose your path, you must.
        </p>
      </div>

      <div className={styles.howToConnectContent}>
        <ExtensionConnect />

        <div className={styles.howToConnectContentCards}>
          {connectCards.map((card, index) => (
            <ConnectCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              linkTitle={card.linkTitle}
              linkDownloadAddress={card.linkDownloadAddress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
