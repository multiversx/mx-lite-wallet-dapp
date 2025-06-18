import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MxLink, PageState } from 'components';
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
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4 w-full mt-4'>
        <PageState
          icon={faCheckCircle}
          iconClass='fa-3x text-blue-600'
          description={infoSection}
        />

        <MxLink
          className='text-blue-400 underline decoration-dotted hover:decoration-solid'
          data-testid={DataTestIdsEnum.accessWalletBtn}
          to={routeNames.unlock}
        >
          {accessWalletBtnLabel}
        </MxLink>

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
