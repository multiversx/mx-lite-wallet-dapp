import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { PageState } from 'components';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Loader = (props: {
  'data-testid'?: string;
  title?: ReactNode;
  hideText?: boolean;
  iconClass?: string;
  className?: string;
}) => {
  const { iconClass, title, hideText, className } = props;

  return (
    <div className={classNames('m-auto', 'pt-spacer', className)}>
      <PageState
        icon={faSpinner}
        iconClass={classNames('primary', 'fa-spin', 'fast-spin', iconClass)}
        iconSize='5x'
        data-testid={props['data-testid'] ?? 'loader'}
        title={hideText ? '' : title ?? 'Loading...'}
      />
    </div>
  );
};
