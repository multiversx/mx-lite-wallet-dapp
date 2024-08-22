import { useMatch } from 'react-router-dom';
import { MxLink } from 'components/MxLink';
import { useGetIsLoggedIn } from 'lib';
import { DataTestIdsEnum, RouteNamesEnum } from 'localConstants';
import { routeNames } from 'routes';
import MultiversXLogo from '../../../assets/img/multiversx-logo.svg?react';
import { NetworkSwitcher } from '../../NetworkSwitcher';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const isUnlockRoute = Boolean(useMatch(RouteNamesEnum.unlock));

  const ConnectButton = isUnlockRoute ? null : (
    <MxLink data-testid={DataTestIdsEnum.connectBtn} to={RouteNamesEnum.unlock}>
      Connect
    </MxLink>
  );

  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? routeNames.dashboard : routeNames.home}
      >
        <MultiversXLogo className='w-full h-6' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          <NetworkSwitcher />

          {isLoggedIn ? (
            <MxLink
              className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
              data-testid={DataTestIdsEnum.logoutBtn}
              to={routeNames.logout}
            >
              Close
            </MxLink>
          ) : (
            ConnectButton
          )}
        </div>
      </nav>
    </header>
  );
};
