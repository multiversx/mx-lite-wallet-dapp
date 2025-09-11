import {
  FunctionComponent,
  MouseEvent,
  SVGProps,
  useEffect,
  useState
} from 'react';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import brightLightIcon from 'assets/img/bright-light-icon.svg?react';
import tealLabIcon from 'assets/img/teal-lab-icon.svg?react';
import vibeModeIcon from 'assets/img/vibe-mode-icon.svg?react';
import { DOCUMENTATION_LINK, RouteNamesEnum } from 'localConstants';
import { styles } from './heroComponent.styles';

interface ThemeOptionType {
  identifier: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
  backgroundClass: string;
}

const themeOptions: ThemeOptionType[] = [
  {
    identifier: 'mvx:dark-theme',
    icon: tealLabIcon,
    title: 'TealLab',
    label: 'Customizable',
    backgroundClass: 'bg-dark-theme'
  },
  {
    identifier: 'mvx:vibe-theme',
    icon: vibeModeIcon,
    title: 'VibeMode',
    label: 'Vibrant',
    backgroundClass: 'bg-vibe-theme'
  },
  {
    identifier: 'mvx:light-theme',
    icon: brightLightIcon,
    title: 'BrightLight',
    label: 'Ownable',
    backgroundClass: 'bg-light-theme'
  }
];

export const HeroComponent = () => {
  const [rootTheme, setRootTheme] = useState(
    document.documentElement.getAttribute('data-mvx-theme')
  );

  const navigate = useNavigate();

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
  };

  const activeTheme = themeOptions.find(
    (themeOption) => themeOption.identifier === rootTheme
  );

  const handleThemeSwitch =
    (themeOption: ThemeOptionType) => (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setRootTheme(themeOption.identifier);

      document.documentElement.setAttribute(
        'data-mvx-theme',
        themeOption.identifier
      );
    };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-mvx-theme');
      setRootTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mvx-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={classNames(styles.heroContainer, activeTheme?.backgroundClass)}
    >
      <div className={styles.heroSectionTop}>
        <div className={styles.heroSectionTopContent}>
          <h1 className={styles.heroTitle}>dApp Template</h1>

          <p className={styles.heroDescription}>
            The sdk-dapp starter project for any dApp built on the MultiversX
            blockchain.
          </p>
        </div>

        <div className={styles.heroSectionTopButtons}>
          <MvxButton onClick={handleLogIn} size='small'>
            Connect Wallet
          </MvxButton>

          <a
            href={DOCUMENTATION_LINK}
            target='_blank'
            className={styles.heroSectionTopDocButton}
          >
            <span className={styles.heroSectionTopDocButtonText}>
              See Documentation
            </span>

            <FontAwesomeIcon
              icon={faArrowRightLong}
              className={styles.heroSectionTopDocButtonIcon}
            />
          </a>
        </div>
      </div>

      <div className={styles.heroSectionBottom}>
        {themeOptions.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <div
              key={themeOption.identifier}
              onClick={handleThemeSwitch(themeOption)}
              className={classNames(styles.heroSectionBottomThemeOptions, {
                [styles.heroSectionBottomThemeOptionsOpacityFull]:
                  themeOption.identifier === activeTheme?.identifier
              })}
            >
              <div className={styles.heroSectionBottomThemeOption}>
                <Icon className={styles.themeOptionIcon} />

                <span className={styles.themeOptionTitle}>
                  {themeOption.title}
                </span>
              </div>

              {themeOption.identifier === activeTheme?.identifier && (
                <>
                  <span className={styles.themeOptionActiveDot} />

                  <div className={styles.themeOptionActiveLabel}>
                    {themeOption.label}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
