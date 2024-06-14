import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { DataTestIdsEnum } from 'localConstants';
import { getStatusIcon } from './helpers';
import { StatusPropsType } from './status.types';

export const Status = ({
  title,
  titleDataTestId = DataTestIdsEnum.statusTitle,
  subtitle,
  subtitleDataTestId = DataTestIdsEnum.statusSubtitle,
  className,
  type
}: StatusPropsType) => {
  const statusIcon = getStatusIcon(type);

  return (
    <div className={classNames('status-wrapper', className)}>
      <div className={classNames('status-icon-wrapper', type)}>
        <FontAwesomeIcon
          icon={statusIcon}
          className={classNames('status-icon', type)}
        />
      </div>

      <div className='status-title' data-testid={titleDataTestId}>
        {title}
      </div>

      <div className='status-subtitle' data-testid={subtitleDataTestId}>
        {subtitle}
      </div>
    </div>
  );
};
