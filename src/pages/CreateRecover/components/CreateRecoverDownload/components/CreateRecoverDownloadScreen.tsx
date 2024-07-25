import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { PageState } from 'components';
import { DataTestIdsEnum } from 'localConstants';

import { UnlockRoutesEnum } from '../../../routes';
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
      <div className='create-wrapper recover-wrapper'>
        <div className='create-top recover-top'>
          <PageState
            className='create-state'
            icon={faCheckCircle}
            iconClass='fa-3x primary'
            description={infoSection}
          />
        </div>

        <Link
          className='btn btn-primary modal-layout-button'
          data-testid={DataTestIdsEnum.accessWalletBtn}
          to={UnlockRoutesEnum.keystore}
        >
          {accessWalletBtnLabel}
        </Link>

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
