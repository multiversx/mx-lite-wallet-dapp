import { MouseEvent } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageState } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { CreateRecoverDownloadType } from '../CreateRecoverDownload';
import { ReDownloadButton } from '../ReDownloadButton';

export const CreateRecoverDownloadScreen = ({
  keystoreString,
  createdAddress,
  infoSection,
  hasDownload = true,
  accessWalletBtnLabel = 'Access Wallet'
}: CreateRecoverDownloadType) => {
  const navigate = useNavigate();

  const handleAccessWallet = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.unlock);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4 w-full mt-4'>
        <PageState
          icon={faCheckCircle}
          iconClass='fa-3x text-neutral-500'
          description={infoSection}
        />

        <MvxButton
          data-testid={DataTestIdsEnum.accessWalletBtn}
          onClick={handleAccessWallet}
        >
          <span className='font-normal text-sm'>{accessWalletBtnLabel}</span>
        </MvxButton>

        {hasDownload && (
          <ReDownloadButton
            keystoreString={keystoreString}
            address={createdAddress}
          />
        )}
      </div>
    </>
  );
};
