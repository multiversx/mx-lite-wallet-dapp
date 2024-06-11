import React from 'react';
import { ModalLayout, Status } from 'components';
import { StatusTypeEnum } from 'components/shared/Status/status.types';

type PendingConnectionProps = {
  title?: string;
  subtitle?: string;
};

export const PendingConnection = ({
  title = 'Initializing connection...',
  subtitle = ''
}: PendingConnectionProps) => {
  return (
    <ModalLayout show hideHeaderCloseBtn narrowModal className='idle-modal'>
      <div className='idle-modal-wrapper'>
        <Status
          title={title}
          subtitle={subtitle}
          type={StatusTypeEnum.pending}
          className='idle-modal-status'
        />
      </div>
    </ModalLayout>
  );
};
