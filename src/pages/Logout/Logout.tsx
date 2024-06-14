import { useEffect } from 'react';
import { useLogout } from 'hooks';

export const Logout = () => {
  const logoutAndGoToUnlock = useLogout();

  useEffect(() => {
    logoutAndGoToUnlock();
  }, []);

  return null;
};
