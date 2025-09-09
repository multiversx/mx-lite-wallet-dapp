import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Circles from 'assets/img/circles.svg?react';
import extensionImage from 'assets/img/extension-image.png';
import WalletIcon from 'assets/img/web-wallet-icon.svg?react';

import {
  BrowserEnum,
  CHROME_EXTENSION_LINK,
  FIREFOX_ADDON_LINK
} from 'localConstants';
import { getDetectedBrowser } from 'pages/Home/helpers';
import { BrowserFrame } from './components';

// prettier-ignore
const styles = {
  extensionCardContainer: 'extension-card-container bg-secondary p-8 lg:p-10 lg:h-115 rounded-2xl lg:rounded-3xl flex flex-col lg:flex-row justify-between gap-10 w-full transition-all duration-200 ease-out',
  extensionCardContent: 'extension-card-content flex flex-col gap-10 max-w-120',
  extensionCardText: 'extension-card-text flex flex-col gap-4',
  extensionCardTitle: 'extension-card-title text-3xl text-primary font-medium tracking-[-0.96px] leading-[1] transition-all duration-200 ease-out',
  extensionCardDescription: 'extension-card-description text-secondary text-xl tracking-[-0.21px] leading-[1.5] transition-all duration-200 ease-out',
  extensionCardDownloadSection: 'extension-card-download-section flex items-center justify-between max-w-80',
  extensionCardLink: 'extension-card-link text-accent hover:opacity-75 text-sm sm:text-lg font-semibold transition-all duration-200 ease-out',
  extensionCardLinkTitle: 'extension-card-link-title p-2 xs:p-3',
  extensionCardLogos: 'extension-card-logos flex gap-2.5 items-center',
  extensionCardImage: 'relative max-w-100 w-full pb-10',
  extensionCardCircles: 'extension-card-circles absolute -right-22 -top-10 z-50', 
  extensionCardScreen: 'extension-card-image absolute top-10 right-4'
} satisfies Record<string, string>;

export const ExtensionConnect = () => {
  const detectedBrowser = getDetectedBrowser();
  const isFirefox = detectedBrowser === BrowserEnum.Firefox;

  return (
    <div className={styles.extensionCardContainer}>
      <div className={styles.extensionCardContent}>
        <WalletIcon />

        <div className={styles.extensionCardText}>
          <h2 className={styles.extensionCardTitle}>
            MultiversX Wallet Extension
          </h2>

          <p className={styles.extensionCardDescription}>
            The MultiversX DeFi Wallet can be installed on Firefox, Chrome,
            Brave, and other chromium-based browsers. This extension is free and
            secure.
          </p>
        </div>

        <div className={styles.extensionCardDownloadSection}>
          <a
            href={isFirefox ? FIREFOX_ADDON_LINK : CHROME_EXTENSION_LINK}
            target='_blank'
            className={styles.extensionCardLink}
          >
            <span className={styles.extensionCardLinkTitle}>Get Extension</span>

            <FontAwesomeIcon icon={faArrowRightLong} />
          </a>
        </div>
      </div>

      <div className={styles.extensionCardImage}>
        <Circles className={styles.extensionCardCircles} />

        <BrowserFrame />

        <img src={extensionImage} className={styles.extensionCardScreen} />
      </div>
    </div>
  );
};
