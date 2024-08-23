import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Loader } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { getEgldLabel } from 'lib';

const sitekey = import.meta.env.VITE_APP_GOOGLE_RECAPTCHA_KEY;
const isDisabled = process.env.NODE_ENV === 'production';

export interface FaucetScreenPropsType {
  settings: string;
  onRequestClick: (captcha: string) => void;
}

export const FaucetScreen = ({
  settings,
  onRequestClick
}: FaucetScreenPropsType) => {
  const [captcha, setCaptcha] = useState<string>('');
  const [requestDisabled, setRequestDisabled] = useState(isDisabled);
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
    <div className='flex flex-col'>
      <h1
        className='text-2xl whitespace-nowrap mt-2'
        data-testid={DataTestIdsEnum.modalTitle}
      >
        {egldLabel} Faucet
      </h1>

      <div>You can request {settings} every 24 hours</div>

      <div data-testid={DataTestIdsEnum.captcha}>
        <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} />

        <Loader />
      </div>

      <Button
        data-testid={DataTestIdsEnum.requestTokensButton}
        disabled={requestDisabled}
        id={DataTestIdsEnum.requestTokensButton}
        onClick={handleRequestTokens}
      >
        Request Tokens
      </Button>
    </div>
  );
};
