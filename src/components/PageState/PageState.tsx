import { ReactNode } from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { WithClassnameType } from 'types';

export const PageState = ({
  icon,
  title,
  action,
  iconClass,
  'data-testid': dataTestId,
  description,
  iconBgClass,
  iconSize = '5x',
  className = 'mx-auto p-4 text-center'
}: PageStatePropsType) => {
  const classes = {
    wrapper: classNames('mx-auto p-4 text-center', className),
    iconContainer: classNames(
      'flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full',
      iconBgClass || 'bg-gray-100'
    ),
    iconClass: classNames('text-gray-600', iconClass),
    title: classNames('text-xl font-semibold my-4 text-gray-900'),
    description: classNames('mb-3 text-gray-600')
  };

  return (
    <div className={classes.wrapper} data-testid={dataTestId}>
      {icon && (
        <span className={classes.iconContainer}>
          <FontAwesomeIcon
            icon={icon}
            className={classes.iconClass}
            size={iconSize}
          />
        </span>
      )}

      {title && <p className={classes.title}>{title}</p>}

      {description && <div className={classes.description}>{description}</div>}

      {action}
    </div>
  );
};

export interface PageStatePropsType extends WithClassnameType {
  title?: ReactNode;
  icon?: IconProp | IconDefinition | null;
  iconClass?: string;
  iconSize?: SizeProp;
  iconBgClass?: string;
  action?: ReactNode;
  description?: ReactNode;
}
