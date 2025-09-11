import { MouseEvent, useEffect, useState } from 'react';
import {
  faArrowRightLong,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Tooltip } from 'components';
import { ThemeTooltipDots } from './components';
import { styles } from './themeTooltip.styles';

interface ThemeTooltipOptionType {
  label: string;
  identifier: string;
  dotColors: string[];
}

const themeOptions: ThemeTooltipOptionType[] = [
  {
    label: 'TealLab',
    identifier: 'mvx:dark-theme',
    dotColors: ['#23F7DD', '#262626', '#B6B3AF', '#FFFFFF']
  },
  {
    label: 'VibeMode',
    identifier: 'mvx:vibe-theme',
    dotColors: ['#471150', '#5A2A62', '#D200FA', '#FFFFFF']
  },
  {
    label: 'BrightLight',
    identifier: 'mvx:light-theme',
    dotColors: ['#000000', '#A5A5A5', '#E2DEDC', '#F3EFED']
  }
];

export const ThemeTooltip = () => {
  const [rootTheme, setRootTheme] = useState(
    document.documentElement.getAttribute('data-mvx-theme')
  );

  const activeTheme = themeOptions.find(
    (themeOption) => themeOption.identifier === rootTheme
  );

  const handleThemeSwitch =
    (themeOption: ThemeTooltipOptionType) =>
    (event: MouseEvent<HTMLDivElement>) => {
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

  if (!activeTheme) {
    return null;
  }

  return (
    <Tooltip
      place='bottom'
      clickable={true}
      hasDrawer={true}
      drawerTitle='Choose Theme'
      identifier='theme-tooltip-identifier'
      className={styles.themeTooltip}
      content={
        <div className={styles.themeTooltipOptions}>
          {themeOptions.map((themeOption) => (
            <div
              key={`theme-${themeOption.identifier}-option`}
              onClick={handleThemeSwitch(themeOption)}
              className={classNames(styles.themeTooltipOption, {
                [styles.themeTooltipOptionActive]:
                  themeOption.identifier === activeTheme.identifier
              })}
            >
              <ThemeTooltipDots
                dotColors={themeOption.dotColors}
                className={styles.themeTooltipOptionDots}
              />

              <div className={styles.themeTooltipOptionLabel}>
                {themeOption.label}
              </div>

              {themeOption.identifier !== activeTheme.identifier && (
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className={styles.themeTooltipOptionArrow}
                />
              )}
            </div>
          ))}
        </div>
      }
    >
      <div className={styles.themeTooltipTrigger}>
        <ThemeTooltipDots
          dotColors={activeTheme.dotColors}
          className={styles.themeTooltipTriggerDots}
        />

        <FontAwesomeIcon
          icon={faChevronDown}
          className={classNames(styles.themeTooltipTriggerIcon, {
            [styles.themeTooltipTriggerIconRotated]: false
          })}
        />
      </div>
    </Tooltip>
  );
};
