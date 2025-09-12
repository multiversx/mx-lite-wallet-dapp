import { useState } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';
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
    <div className='flex flex-col items-center'>
      <p
        className='text-sm text-neutral-500 mb-10'
        data-testid={DataTestIdsEnum.modalSubtitle}
      >
        You can request {settings.token} every 24 hours
      </p>

      {!settings.recaptchaBypass && sitekey && (
        <div className='mb-10' data-testid={DataTestIdsEnum.captcha}>
          <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} />
        </div>
      )}

      <MvxButton
        data-testid={DataTestIdsEnum.requestFundsButton}
        disabled={requestDisabled}
        id={DataTestIdsEnum.requestFundsButton}
        onClick={handleRequestTokens}
      >
        <span className='text-sm font-normal'>Request Tokens</span>
      </MvxButton>
    </div>
  );
};
