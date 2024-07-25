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
    <button className='modal-layout-text' onClick={download}>
      Download keystore file again
    </button>
  );
};
