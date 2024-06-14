import React from 'react';
import { ModalContainer, Status, StatusTypeEnum } from 'components';

type PendingConnectionProps = {
  title?: string;
  subtitle?: string;
};

export const PendingConnection = ({
  title = 'Initializing connection...',
  subtitle = ''
}: PendingConnectionProps) => {
  return (
    <ModalContainer visible className='idle-modal'>
      <div className='idle-modal-wrapper'>
        <Status
          title={title}
          subtitle={subtitle}
          type={StatusTypeEnum.pending}
          className='idle-modal-status'
        />
      </div>
    </ModalContainer>
  );
};
