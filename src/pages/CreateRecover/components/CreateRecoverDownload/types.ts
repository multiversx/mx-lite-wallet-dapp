import { ReactNode } from 'react';

export interface CreateRecoverDownloadType {
  accessWalletBtnLabel?: string;
  createdAddress: string;
  hasDownload?: boolean;
  infoSection?: ReactNode;
  keystoreString: string;
}
