import { ReactComponent as WalletBraveLogo } from 'assets/img/wallet-brave-logo.svg';
import { ReactComponent as WalletChromeLogo } from 'assets/img/wallet-chrome-logo.svg';
import { ReactComponent as WalletFirefoxLogo } from 'assets/img/wallet-firefox-logo.svg';
import { ReactComponent as WalletIcon } from 'assets/img/web-wallet-icon.svg';
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
