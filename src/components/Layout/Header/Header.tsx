import { useNavigate } from 'react-router-dom';
import { Button, MxLink, NetworkSwitcher } from 'components';
import { getAccountProvider, useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';
import { ConnectButton } from './components';
import { NotificationsButton } from './components/NotificationsButton';
import MultiversXLogo from '../../../assets/img/multiversx-logo.svg?react';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();

  const handleLogout = async () => {
    try {
      await provider?.logout?.();
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      navigate(RouteNamesEnum.home);
    }
  };

  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <MultiversXLogo className='w-full h-6' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          <NetworkSwitcher />

          {isLoggedIn && (
            <>
              <NotificationsButton />
              <Button
                onClick={handleLogout}
                className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
              >
                Close
              </Button>
            </>
          )}

          {!isLoggedIn && <ConnectButton />}
        </div>
      </nav>
    </header>
  );
};
