import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLogout } from 'hooks';

export const Logout = () => {
  const { state } = useLocation();
  const logoutAndGoToUnlock = useLogout(
    `Logout route called by: ${state?.caller}`
  );

  useEffect(() => {
    logoutAndGoToUnlock();
  }, []);

  return null;
};
