import { MouseEvent } from 'react';

import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { RouteNamesEnum } from 'localConstants';
import { styles } from './heroComponent.styles';

export const HeroComponent = () => {
  const navigate = useNavigate();

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
  };

  return (
    <div className={classNames(styles.heroContainer, 'bg-dark-theme')}>
      <div className={styles.heroSectionTop}>
        <div className={styles.heroSectionTopContent}>
          <h1 className={styles.heroTitle}>Lite Wallet dApp</h1>

          <p className={styles.heroDescription}>
            A sdk-dapp starter project providing the basics for MultiversX
            authentication and transaction signing.
          </p>
        </div>

        <div className={styles.heroSectionTopButtons}>
          <MvxButton onClick={handleLogIn} class='!bg-red-500'>
            Connect Wallet
          </MvxButton>
        </div>
      </div>
    </div>
  );
};
