import { DataTestIdsEnum } from 'localConstants';
import { PageState } from 'components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const FaucetSuccess = ({ settings }: { settings: string }) => {
  return (
    <div className='flex flex-col'>
      <h1
        className='text-2xl whitespace-nowrap mt-2'
        data-testid={DataTestIdsEnum.modalTitle}
      >
        Success
      </h1>
      <div className='modal-layout-subtitle'>
        {settings} have been sent to your address.
      </div>

      <div>
        <PageState icon={faCheck} iconClass='fa-3x text-green-500' />
      </div>
    </div>
  );
};
