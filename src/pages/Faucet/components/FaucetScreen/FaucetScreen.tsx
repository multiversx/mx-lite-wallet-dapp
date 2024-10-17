import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from 'components';
import { getEgldLabel } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { FaucetSettingsReturnType } from 'redux/endpoints';

const sitekey = import.meta.env.VITE_APP_GOOGLE_RECAPTCHA_KEY;

export interface FaucetScreenPropsType {
  settings: FaucetSettingsReturnType;
  onRequestClick: (captcha: string) => void;
}

export const FaucetScreen = ({
  settings,
  onRequestClick
}: FaucetScreenPropsType) => {
  const [captcha, setCaptcha] = useState('');
  const [requestDisabled, setRequestDisabled] = useState(false);
  const egldLabel = getEgldLabel();

  const onRecaptchaChange = (value: string | null) => {
    setRequestDisabled(!value);

    if (value) {
      setCaptcha(value);
    }
  };

  const handleRequestTokens = () => {
    onRequestClick(captcha);
  };

  return (
    <div className='flex flex-col items-center pb-5'>
      <h1
        className='text-2xl whitespace-nowrap mt-5'
        data-testid={DataTestIdsEnum.modalTitle}
      >
        {egldLabel} Faucet
      </h1>
      <p
        className='text-sm text-gray-400 mb-10'
        data-testid={DataTestIdsEnum.modalSubtitle}
      >
        You can request {settings.token} every 24 hours
      </p>

      {!settings.recaptchaBypass && sitekey && (
        <div className='mb-10' data-testid={DataTestIdsEnum.captcha}>
          <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} />
        </div>
      )}

      <Button
        data-testid={DataTestIdsEnum.requestFundsButton}
        disabled={requestDisabled}
        id={DataTestIdsEnum.requestFundsButton}
        onClick={handleRequestTokens}
      >
        Request Tokens
      </Button>
    </div>
  );
};
