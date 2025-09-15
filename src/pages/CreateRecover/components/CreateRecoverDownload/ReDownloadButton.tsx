import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { downloadFile } from '../../helpers';

export interface ReDownloadButtonPropsType extends React.PropsWithChildren {
  keystoreString: string;
  address: string;
}

export const ReDownloadButton = ({
  keystoreString,
  address
}: ReDownloadButtonPropsType) => {
  const download = () => {
    downloadFile({ data: keystoreString, name: address, fileType: 'json' });
  };

  return (
    <MvxButton onClick={download} variant='secondary'>
      <span className='font-normal text-sm'>Download keystore file again</span>
    </MvxButton>
  );
};
