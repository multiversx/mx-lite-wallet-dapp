import { ChangeEvent, useState } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Navigate } from 'react-router-dom';
import { CopyButton } from 'components';
import { useCreateRecoverContext } from 'pages/CreateRecover/contexts/createRecover';
import { usePushAndNavigate } from 'hooks';
import { DataTestIdsEnum } from 'localConstants';
import { CreateRecoverRoutesEnum } from '../../../routes';

export const CreateMnemonics = () => {
  const { mnemonic, createRecoverWalletRoutes } = useCreateRecoverContext();
  const mnemonicArray = mnemonic.split(' ');
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false);
  const pushAndNavigate = usePushAndNavigate();

  const goToCheckMnemonic = () => {
    if (touched && isValid) {
      return pushAndNavigate(CreateRecoverRoutesEnum.createCheckMnemonic);
    }

    setTouched(true);
    setIsValid(false);
  };

  const textToCopy = mnemonicArray
    .map((word, i) => `${i + 1} ${word}`)
    .join('\n');

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    setTouched(true);
    if (checked) {
      setIsValid(true);
    } else {
      setIsValid(false);
      event.target.setCustomValidity(
        'Please confirm you have written down and safely stored your secret phrase.'
      );
    }
  };

  if (
    !createRecoverWalletRoutes.includes(CreateRecoverRoutesEnum.createMnemonic)
  ) {
    return <Navigate to={CreateRecoverRoutesEnum.info} />;
  }

  return (
    <div className='create-wrapper mnemonics-wrapper'>
      <div className='create-top'>
        <div className='create-disclaimers'>
          <p
            className='create-disclaimer'
            data-testid={DataTestIdsEnum.mnemonicsDisclaimer}
          >
            <FontAwesomeIcon icon={faInfoCircle} className='primary' /> Write
            down these words in this exact order. You can use them to access
            your wallet, make sure you protect them.
          </p>
        </div>

        <div
          className='create-mnemonics'
          data-testid={DataTestIdsEnum.mnemonicWords}
        >
          {mnemonicArray.map((word, i) => (
            <div
              data-testid={DataTestIdsEnum.mnemonicWord}
              key={word + i}
              className='mnemonic-word'
            >
              <span className='mnemonic-word-id'>{i + 1}</span>
              <span
                className='mnemonic-word-value'
                data-testid={`mnemonicWord${i}`}
              >
                {word}
              </span>
            </div>
          ))}

          <CopyButton text={textToCopy} className='mnemonic-copy' />
        </div>

        <div className='modal-layout-fields'>
          <div className='modal-layout-checkbox-field'>
            <input
              type='checkbox'
              id='check'
              data-testid={DataTestIdsEnum.check}
              onChange={handleCheckboxChange}
              className={classNames('modal-layout-checkbox-input', {
                invalid: touched && !isValid
              })}
            />

            <label htmlFor='check' data-testid={DataTestIdsEnum.mnemonicCheck}>
              I confirm I have written down and safely stored my secret phrase.
            </label>
          </div>
        </div>
      </div>

      <button
        className='btn btn-primary modal-layout-button'
        id='goToCheckMnemonic'
        data-testid={DataTestIdsEnum.goToCheckMnemonic}
        disabled={!isValid}
        onClick={goToCheckMnemonic}
      >
        Create Wallet
      </button>
    </div>
  );
};
