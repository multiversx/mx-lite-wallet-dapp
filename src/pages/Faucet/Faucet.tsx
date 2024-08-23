import { useRef, useState } from 'react';

import { DataTestIdsEnum } from 'localConstants';

import { FaucetError } from './components/FaucetError';
import { FaucetScreen } from './components/FaucetScreen';
import { FaucetSuccess } from './components/FaucetSuccess';
import {
  useGetFaucetSettingsQuery,
  useRequestFundsMutation
} from 'redux/endpoints';
import { getEgldLabel } from 'lib';
import { Loader } from 'components';

export const Faucet = () => {
  const ref = useRef(null);
  const [getFunds, { isSuccess }] = useRequestFundsMutation();
  const [fundsReceived, setFundsReceived] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const { data: settings, error: settingsError } = useGetFaucetSettingsQuery();
  const egldLabel = getEgldLabel();

  const onRequestClick = async (captcha: string) => {
    const response = await getFunds(captcha);

    if ('error' in response) {
      setRequestFailed(true);
    }

    if (ref.current !== null) {
      setFundsReceived(true);
    }
  };

  if (settingsError) {
    return <FaucetError message='Faucet not available. Try again later.' />;
  }

  if (!settings) {
    return (
      <div className='flex flex-col'>
        <h1
          className='text-2xl whitespace-nowrap mt-2'
          data-testid={DataTestIdsEnum.modalTitle}
        >
          {egldLabel} Faucet
        </h1>
        <Loader />
      </div>
    );
  }

  if (requestFailed) {
    return (
      <FaucetError message='The faucet is available once every 24 hours.' />
    );
  }

  const showFaucetScreen = !fundsReceived && !isSuccess;

  return (
    <div ref={ref} className='flex flex-col flex-grow'>
      {showFaucetScreen ? (
        <FaucetScreen settings={settings} onRequestClick={onRequestClick} />
      ) : (
        <FaucetSuccess settings={settings} />
      )}
    </div>
  );
};
