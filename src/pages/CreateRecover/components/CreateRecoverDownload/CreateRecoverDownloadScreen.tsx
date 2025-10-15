import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MxLink } from 'components/MxLink';
import { PageState } from 'components/PageState';
import { DataTestIdsEnum } from 'localConstants';
import { RouteNamesEnum } from 'localConstants/routes';
import { ReDownloadButton } from './ReDownloadButton';
import { CreateRecoverDownloadType } from './types';

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
          to={RouteNamesEnum.unlock}
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
