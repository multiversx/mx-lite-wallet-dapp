import { Button } from 'components';
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

  return <Button onClick={download}>Download keystore file again</Button>;
};
