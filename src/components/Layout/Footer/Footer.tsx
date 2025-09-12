import { useState, useEffect } from 'react';
import HeartIcon from 'assets/img/heart.svg?react';

import { styles } from './footer.styles';
import { version } from '../../../../package.json';

export const Footer = () => {
  const [walletVersion, setWalletVersion] = useState<string | null>(null);

  useEffect(() => {
    const loadVersion = async () => {
      try {
        const versionModule = await import('../../../../version.json');
        setWalletVersion(versionModule.hash);
      } catch (error) {
        console.error('Failed to load version information', error);
        setWalletVersion(null);
      }
    };

    loadVersion();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <a className={styles.footerDisclaimer} href='/disclaimer'>
          Disclaimer
        </a>

        <a
          target='_blank'
          className={styles.footerSecondRow}
          href='https://multiversx.com/'
        >
          Made with <HeartIcon className={styles.footerHeart} /> by the
          MultiversX team
        </a>

        {walletVersion && (
          <span className={styles.footerBuild}>
            Build {version}-{walletVersion}
          </span>
        )}
      </div>
    </footer>
  );
};
