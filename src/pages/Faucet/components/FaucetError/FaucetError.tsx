import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FeaturePageLayout } from 'components/Layout';
import { DataTestIdsEnum } from 'localConstants';

export const FaucetError = ({ message }: { message: string }) => (
  <FeaturePageLayout title='Failed'>
    <div className='flex flex-col items-center pb-5'>
      <FontAwesomeIcon
        className='text-red-500 mt-5 mb-1'
        size='4x'
        icon={faTimes}
      />
      <p
        className='text-sm text-red-500 mb-5'
        data-testid={DataTestIdsEnum.faucetErrorMessage}
      >
        {message}
      </p>
    </div>
  </FeaturePageLayout>
);
