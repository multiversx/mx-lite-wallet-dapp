import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRemoteKeystoreSessionKey } from 'helpers';
import { useGetAccount, useIdleTimer, useLogout } from 'hooks';
import { useGetKeystoreData } from 'pages/Unlock/Keystore/helpers/useKeystoreManager/methods';
import { useRefreshSessionQuery } from 'redux/endpoints';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';

const POLLING_INTERVAL_MINUTES = 5;

export const IdleTimer = () => {
  const onLogout = useLogout('IdleTimer');
  useIdleTimer({ minutes: 10, onLogout });

  const { address } = useGetAccount();
  const { keystoreData, keystoreSessionKey } = useGetKeystoreData();
  const [remoteKeystoreSessionKey, setRemoteKeystoreSessionKey] = useState('');

  const shouldPoll = Boolean(remoteKeystoreSessionKey && address);
  const { type: hook } = useSelector(hookSelector);
  const { data: refreshSessionResponse } = useRefreshSessionQuery(
    remoteKeystoreSessionKey,
    {
      pollingInterval: POLLING_INTERVAL_MINUTES * 1000 * 60,
      skip: !shouldPoll
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!keystoreSessionKey || !keystoreData) {
      return;
    }
    const remoteSessionKey = getRemoteKeystoreSessionKey({
      localKeystoreSessionKey: keystoreSessionKey,
      keystoreSessionSalt: String(keystoreData?.keystoreSessionSalt)
    });
    setRemoteKeystoreSessionKey(remoteSessionKey);
  }, [keystoreData, keystoreSessionKey]);

  useEffect(() => {
    const skipLogout =
      !refreshSessionResponse || refreshSessionResponse?.sessionActive || hook;

    if (skipLogout) {
      return;
    }

    navigate(routeNames.logout, {
      state: { caller: 'Randomness session has expired' }
    });
  }, [refreshSessionResponse]);

  return null;
};
