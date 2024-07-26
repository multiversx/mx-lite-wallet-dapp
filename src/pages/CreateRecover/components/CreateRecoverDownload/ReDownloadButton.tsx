import { downloadFile } from '../../helpers';
import { Button } from 'components';

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
