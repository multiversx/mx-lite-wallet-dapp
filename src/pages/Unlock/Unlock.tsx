import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnlockPanelManager, useGetLoginInfo } from 'lib/sdkDapp';
import { RouteNamesEnum } from 'localConstants/routes';
import { useUnlockRedirect } from './hooks';

export const Unlock = () => {
  const onUnlockRedirect = useUnlockRedirect();
  const navigate = useNavigate();
  const { isLoggedIn } = useGetLoginInfo();

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: onUnlockRedirect,
    onClose: () => {
      navigate(RouteNamesEnum.home);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RouteNamesEnum.dashboard);
      return;
    }

    handleOpenUnlockPanel();
  }, [isLoggedIn]);

  return null;
};
