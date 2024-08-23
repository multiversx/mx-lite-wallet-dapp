import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PageState } from 'components';
import { DataTestIdsEnum } from 'localConstants';

export const FaucetError = ({ message }: { message: string }) => (
  <div className='faucet-content'>
    <h1
      className='text-2xl whitespace-nowrap mt-2'
      data-testid={DataTestIdsEnum.modalTitle}
    >
      Failed
    </h1>
    <div className='modal-layout-subtitle'>{message}</div>;
    <div className='faucet-icon-wrapper'>
      <PageState icon={faTimes} iconClass='fa-3x' className='text-red-500' />
    </div>
  </div>
);
