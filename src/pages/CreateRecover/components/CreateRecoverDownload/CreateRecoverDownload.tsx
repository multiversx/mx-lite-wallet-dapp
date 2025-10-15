import { useEffect } from 'react';
import { DataTestIdsEnum, IS_TEST } from 'localConstants';
import { CreateRecoverDownloadScreen } from './CreateRecoverDownloadScreen';
import { CreateRecoverDownloadType } from './types';
import { downloadFile } from '../../helpers';

export const CreateRecoverDownload = ({
  keystoreString,
  createdAddress
}: CreateRecoverDownloadType) => {
  useEffect(() => {
    if (!IS_TEST) {
      downloadFile({
        data: keystoreString,
        name: createdAddress,
        fileType: 'json'
      });
    }
  }, []);

  const infoSection = (
    <p
      className='text-gray-400 mb-10'
      data-testid={DataTestIdsEnum.modalSubtitle}
    >
      Great work. You downloaded the Keystore file. <br /> Save it, you’ll need
      it to access your wallet.
    </p>
  );

  return (
    <CreateRecoverDownloadScreen
      keystoreString={keystoreString}
      createdAddress={createdAddress}
      infoSection={infoSection}
    />
  );
};
