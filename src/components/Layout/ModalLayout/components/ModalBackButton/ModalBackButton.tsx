import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { WithClassnameType } from 'types';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ModalBackButtonPropsType extends WithClassnameType {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export const ModalBackButton = (props: ModalBackButtonPropsType) => {
  const { className, onClick, 'data-testid': dataTestId } = props;

  return (
    <div
      onClick={onClick}
      className={classNames('modal-layout-heading-icon back', className)}
      data-testid={dataTestId || 'modalBackBtn'}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};
