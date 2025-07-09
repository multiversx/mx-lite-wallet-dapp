import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FeaturePageLayout } from 'components/Layout';
import { DataTestIdsEnum } from 'localConstants';

export const FaucetSuccess = ({ token }: { token: string }) => (
  <FeaturePageLayout title='Success'>
    <div className='flex flex-col items-center pb-5'>
      <FontAwesomeIcon
        className='text-green-500 mt-5 mb-1'
        size='4x'
        icon={faCheck}
      />
      <p
        className='text-sm text-green-500 mb-5'
        data-testid={DataTestIdsEnum.faucetSuccessMessage}
      >
        {token} have been sent to your address.
      </p>
    </div>
  </FeaturePageLayout>
);
