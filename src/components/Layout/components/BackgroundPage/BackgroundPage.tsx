import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { Loader } from 'components';
import { useGetAccount, useMatchPath } from 'hooks';
import {
  accessTokenRedirectRouteSelector,
  walletOriginSelector
} from 'redux/selectors';
import { clearAccessTokenRedirectRoute, setWalletOrigin } from 'redux/slices';
import {
  backgroundRouteNames,
  backgroundRoutes,
  BackgroundRoutesType,
  hookRouteNames
} from 'routes';
import { ActiveLayout } from './components';
import { NavbarLayout } from '../../NavbarLayout';

const SEARCH_REGEX = /^\?[A-Za-z0-9=&-]+$/;

export const BackgroundPage = () => {
  const dispatch = useDispatch();
  const walletOrigin = useSelector(walletOriginSelector);
  const accessTokenRedirectRoute = useSelector(
    accessTokenRedirectRouteSelector
  );

  const location = useLocation();
  const matchLocationPath = useMatchPath();
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const { pathname, search } = location;
  const [lastOrigin, setLastOrigin] = useState('');

  const hookRoute = Object.values(hookRouteNames).find((path) =>
    matchLocationPath(path)
  );

  const setOrigin = (path: string) => {
    const newSearch = SEARCH_REGEX.test(search) ? search : '';

    dispatch(
      setWalletOrigin({
        pathname: path,
        search: newSearch
      })
    );

    setLastOrigin(path);
  };

  const handleSetWalletOrigin = () => {
    const foundBgPath = Object.values(backgroundRouteNames).find((path) =>
      matchLocationPath(path)
    );

    const hasChangedPathnameOrSearch =
      foundBgPath !== walletOrigin.pathname || search !== walletOrigin.search;
    const isUnlockBg = foundBgPath === backgroundRouteNames.unlock;
    const shouldSetUnlockBg = !isLoggedIn && isUnlockBg;
    const shouldSetOrigin =
      foundBgPath &&
      hasChangedPathnameOrSearch &&
      (shouldSetUnlockBg || !isUnlockBg);

    // Prevent setting 'unlock' wallet origin if we are logged in
    if (shouldSetOrigin) {
      setOrigin(pathname);
    }

    // Clear the accessTokenRedirectRoute if we already navigated to this route
    if (pathname === accessTokenRedirectRoute) {
      dispatch(clearAccessTokenRedirectRoute());
    }

    return () => {
      if (foundBgPath || lastOrigin) {
        const newPathname = pathname || lastOrigin;

        const foundNewBgPath = Object.entries(backgroundRouteNames).some(
          ([, path]) => newPathname === path
        );
        const isUnlockNewBg = newPathname === backgroundRouteNames.unlock;

        // Prevent setting 'unlock' wallet origin if we are logged in
        if (foundNewBgPath && isUnlockNewBg && isLoggedIn) {
          return;
        }

        if (foundNewBgPath) {
          dispatch(
            setWalletOrigin({
              pathname: newPathname,
              search: SEARCH_REGEX.test(search) ? search : ''
            })
          );
        }
      }
    };
  };

  useEffect(handleSetWalletOrigin, [
    pathname,
    search,
    lastOrigin,
    isLoggedIn,
    hookRoute
  ]);

  return useMemo(() => {
    if ([hookRouteNames.signHook].includes(String(hookRoute))) {
      return (
        <NavbarLayout>
          <Loader />
        </NavbarLayout>
      );
    }

    const foundBgPath = Object.entries(backgroundRouteNames).find(
      ([, path]) => {
        const isWalletOriginBgPath = matchPath(path, walletOrigin.pathname);
        return isWalletOriginBgPath || matchLocationPath(path);
      }
    );

    if (foundBgPath) {
      const [routeName] = foundBgPath;

      const backgroundRoute =
        backgroundRoutes[routeName as BackgroundRoutesType];

      return <ActiveLayout route={backgroundRoute} />;
    }

    return null;
  }, [walletOrigin, lastOrigin, pathname, hookRoute]);
};
