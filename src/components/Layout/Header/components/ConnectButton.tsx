import { useNavigate } from 'react-router-dom';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { RouteNamesEnum } from 'localConstants/routes/routeNames.enums';
import { Button } from '../../../Button/Button';

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
