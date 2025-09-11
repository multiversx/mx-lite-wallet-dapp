import WalletBraveLogo from 'assets/img/wallet-brave-logo.svg?react';
import WalletChromeLogo from 'assets/img/wallet-chrome-logo.svg?react';
import WalletFirefoxLogo from 'assets/img/wallet-firefox-logo.svg?react';
import WalletIcon from 'assets/img/web-wallet-icon.svg?react';
import { BrowserEnum } from 'localConstants';

interface BrowserIconPropsType {
  browser?: BrowserEnum;
}

export const BrowserIcon = ({ browser }: BrowserIconPropsType) => {
  switch (browser) {
    case BrowserEnum.Firefox:
      return <WalletFirefoxLogo />;
    case BrowserEnum.Brave:
      return <WalletBraveLogo />;
    case BrowserEnum.Chrome:
      return <WalletChromeLogo />;
    default:
      return <WalletIcon />;
  }
};
