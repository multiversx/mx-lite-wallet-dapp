import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  createSearchParams,
  generatePath,
  useLocation,
  useSearchParams
} from 'react-router-dom';
import { accountSelector } from 'redux/selectors';
import { setPrivateKeyCheckRedirectRoute } from 'redux/slices';

export const PrivateKeyRedirectLogin = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchString = createSearchParams(searchParams).toString();
  const search = searchString ? `?${searchString}` : '';
  const { fileLogin } = useSelector(accountSelector);

  const redirectRoute = `${generatePath(':pathname', {
    pathname
  })}${search}`;

  useEffect(() => {
    dispatch(setPrivateKeyCheckRedirectRoute(redirectRoute));
  }, []);

  return (
    <Navigate
      to={unlockRouteNames[fileLogin ?? 'keystore']}
      from='PrivateKeyRedirectLogin'
    />
  );
};
