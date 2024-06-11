import React, { useEffect, useRef, useState } from 'react';
import { faRefresh } from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';

import { Trans, useTranslation } from 'react-i18next';
import { addNewCustomToast } from 'helpers';
import { useGetAccount, useGetAccountInfo } from 'hooks';
import { sdkDappStore } from 'redux/sdkDapp.store';
import { customToastsSelector } from 'redux/selectors';
import { hash } from '../../../../../../version.json';

const isMainnetWallet =
  window.location.origin === 'https://wallet.multiversx.com';
const versionUrl =
  'https://s3.amazonaws.com/wallet.multiversx.com/version.json';

const walletVersion = hash;

const ReloadButton = () => {
  const { t } = useTranslation(['layout']);
  const reload = () => {
    window.location.reload();
  };

  return (
    <Trans t={t}>
      A new version of the wallet is available.
      <a href='/' onClick={reload} className='ms-1'>
        <u>Reload</u>
      </a>
    </Trans>
  );
};

export const VersionCheck = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const versionIntervalRef = useRef<NodeJS.Timeout>();
  const [latestVersion, setLatestVersion] = useState<string>();
  const { websocketEvent } = useGetAccountInfo();
  const customToasts = customToastsSelector(sdkDappStore.getState());

  const fetchVersion = async () => {
    const instance = axios.create();
    try {
      const { data } = await instance.get(`${versionUrl}?${Date.now()}`);
      setLatestVersion(data?.version);
    } catch (err) {
      console.error('Unable to get version');
    }
  };

  const setVersionInterval = () => {
    if (isMainnetWallet && process.env.NODE_ENV !== 'test') {
      if (isLoggedIn) {
        versionIntervalRef.current = setInterval(fetchVersion, 60 * 1000);
      }
      fetchVersion();
    }
    return () => {
      if (versionIntervalRef.current) {
        clearInterval(versionIntervalRef.current);
      }
    };
  };

  const showVersionReloadToast = () => {
    const isVersionDefined = walletVersion != null && latestVersion != null;
    const walletOutdated = walletVersion !== latestVersion;

    const toastId = `newWalletVersion-${walletVersion}`;

    const isDisplayed = customToasts.some((toast) => toast.toastId === toastId);

    if (isVersionDefined && walletOutdated && isMainnetWallet && !isDisplayed) {
      addNewCustomToast({
        toastId,
        component: ReloadButton,
        type: 'custom',
        title: 'Outdated version',
        icon: faRefresh,
        iconClassName: 'bg-info'
      });
    }
  };

  useEffect(setVersionInterval, [isLoggedIn]);
  useEffect(showVersionReloadToast, [websocketEvent, latestVersion]);

  return null;
};
