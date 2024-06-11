import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { WithClassnameType } from 'types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface ModalCloseButtonPropsType extends WithClassnameType {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  className?: string;
}

export const ModalCloseButton = ({
  className,
  'data-testid': dataTestId,
  onClick,
  disabled
}: ModalCloseButtonPropsType) => (
  <div
    onClick={onClick}
    data-testid={dataTestId || 'modalCloseButton'}
    className={classNames(
      'modal-layout-heading-icon close',
      { disabled },
      className
    )}
  >
    <FontAwesomeIcon icon={faTimes} />
  </div>
);
