import { createAction } from '@reduxjs/toolkit';

export interface LogoutType {
  keepCurrentExtensionState?: boolean;
  keystoreSessionKey?: string | null;
  skipCloseWindowOnRelogin?: boolean;
  noRedirect?: boolean;
}

export const logoutAction = createAction<LogoutType | undefined>('logout');
