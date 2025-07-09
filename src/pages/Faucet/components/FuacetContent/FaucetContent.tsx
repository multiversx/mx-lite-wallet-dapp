import { useEffect, useRef, useState } from 'react';
import { Loader } from 'components';
import { getEgldLabel, refreshAccount, useGetAccountInfo } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import {
  useGetFaucetSettingsQuery,
  useRequestFundsMutation
} from 'redux/endpoints';
import { FaucetError } from '../FaucetError';
import { FaucetScreen } from '../FaucetScreen';
import { FaucetSuccess } from '../FaucetSuccess';

export const FaucetContent = () => {
  const ref = useRef(null);
  const [getFunds, { isSuccess }] = useRequestFundsMutation();
  const [fundsReceived, setFundsReceived] = useState(false);
  const [requestFailed, setRequestFailed] = useState('');
  const { websocketEvent } = useGetAccountInfo();
  const { data: settings, error: settingsError } = useGetFaucetSettingsQuery();
  const egldLabel = getEgldLabel();

  useEffect(() => {
    if (isSuccess && fundsReceived) {
      refreshAccount();
    }
  }, [isSuccess, fundsReceived, websocketEvent]);

  const handleRequestClick = async (captcha: string) => {
    const response = await getFunds(captcha);

    if ('error' in response) {
      setRequestFailed(
        (response.error as any).data.message ||
          'The faucet is available once every 24 hours.'
      );
    }

    if (ref.current !== null) {
      setFundsReceived(true);
    }
  };

  if (settingsError) {
    return <FaucetError message='Faucet not available. Try again later.' />;
  }

  if (!settings?.token) {
    return (
      <div className='flex flex-col'>
        <h1
          className='text-2xl whitespace-nowrap mt-2'
          data-testid={DataTestIdsEnum.faucetTitle}
        >
          {egldLabel} Faucet
        </h1>
        <Loader />
      </div>
    );
  }

  if (requestFailed) {
    return <FaucetError message={requestFailed} />;
  }

  const showFaucetScreen = !fundsReceived && !isSuccess;

  return (
    <div ref={ref} className='flex flex-col flex-grow'>
      {showFaucetScreen ? (
        <FaucetScreen settings={settings} onRequestClick={handleRequestClick} />
      ) : (
        <FaucetSuccess token={settings.token} />
      )}
    </div>
  );
};
