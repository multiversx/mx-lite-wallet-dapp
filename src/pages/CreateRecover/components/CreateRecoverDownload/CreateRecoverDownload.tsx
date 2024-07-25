import { MouseEvent, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCreateRecoverDispatch } from 'contexts/createRecover';
import { downloadFile } from '../../helpers';
import { IS_TEST } from 'localConstants';
import { routeNames } from 'routes';

import { CreateRecoverDownloadScreen } from './components/CreateRecoverDownloadScreen';
import { useCreateRecoverDownload } from './hooks';
import { CreateRecoverRoutesEnum } from '../../routes';

export interface CreateRecoverDownloadType {
  createRecoverWalletRoutes: Array<CreateRecoverRoutesEnum>;
  accessWalletBtnHandler: (event: MouseEvent<HTMLAnchorElement>) => void;
  keystoreString: string;
  createdAddress: string;
  infoSection: JSX.Element;
  hasDownload?: boolean;
  accessWalletBtnLabel?: string;
}
export const CreateRecoverDownload = () => {
  const {
    createRecoverWalletRoutes,
    accessWalletBtnHandler,
    keystoreString,
    createdAddress
  } = useCreateRecoverDownload();

  const createDispatch = useCreateRecoverDispatch();

  const triggerDownloadJson = () => {
    if (!IS_TEST) {
      downloadFile({
        data: keystoreString,
        name: createdAddress,
        fileType: 'json'
      });
    }

    return () => {
      createDispatch({ type: 'resetWizard' });
    };
  };

  useEffect(triggerDownloadJson, []);

  if (
    !createRecoverWalletRoutes.includes(CreateRecoverRoutesEnum.createDownload)
  ) {
    return <Navigate to={routeNames.home} />;
  }

  const infoSection = (
    <>
      Great work. You downloaded the Keystore file. <br /> Save it, you’ll need
      it to access your wallet.
    </>
  );

  return (
    <CreateRecoverDownloadScreen
      accessWalletBtnHandler={accessWalletBtnHandler}
      keystoreString={keystoreString}
      createdAddress={createdAddress}
      createRecoverWalletRoutes={createRecoverWalletRoutes}
      infoSection={infoSection}
    />
  );
};
