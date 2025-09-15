import { CSSProperties, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Drawer } from 'components';
import { styles } from './tooltip.styles';
import { TooltipPlaceEnum, TooltipPropsType } from './tooltip.types';

export const Tooltip = ({
  identifier,
  children,
  className,
  content,
  skipTooltip,
  hasDrawer,
  drawerTitle,
  place = TooltipPlaceEnum.bottom,
  ...props
}: TooltipPropsType) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tooltipWrapperStyle = {
    '--rt-transition-show-delay': '200ms',
    '--rt-transition-closing-delay': '200ms',
    '--rt-opacity': 1
  } as CSSProperties;

  const handleTriggerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!hasDrawer) {
      return;
    }

    event.preventDefault();
    setIsDrawerOpen(true);
  };

  return (
    <div
      className={classNames(styles.tooltipWrapper, className)}
      style={tooltipWrapperStyle}
    >
      {hasDrawer && (
        <Drawer
          title={drawerTitle}
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          className={styles.tooltipDrawer}
        >
          {content}
        </Drawer>
      )}

      {!skipTooltip && (
        <ReactTooltip
          place={place}
          classNameArrow={styles.tooltipArrow}
          anchorSelect={`#${identifier}`}
          className={classNames(styles.tooltip, {
            [styles.tooltipMobile]: hasDrawer
          })}
          {...props}
        >
          <div className={styles.tooltipContent}>{content}</div>
        </ReactTooltip>
      )}

      <div
        id={identifier}
        data-testid={identifier}
        onClick={handleTriggerClick}
        className={styles.tooltipTrigger}
      >
        {children}
      </div>
    </div>
  );
};
