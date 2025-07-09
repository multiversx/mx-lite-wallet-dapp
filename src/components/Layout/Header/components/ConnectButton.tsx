import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { DataTestIdsEnum, RouteNamesEnum } from 'localConstants';

export const ConnectButton = () => {
  const navigate = useNavigate();

  const handleOpenUnlockPanel = () => {
    navigate(RouteNamesEnum.unlock);
  };

  return (
    <Button
      dataTestId={DataTestIdsEnum.connectBtn}
      onClick={handleOpenUnlockPanel}
    >
      Connect
    </Button>
  );
};
