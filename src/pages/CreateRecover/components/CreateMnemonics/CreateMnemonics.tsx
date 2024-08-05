import { ChangeEvent, useState } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CopyButton } from 'components';
import { DataTestIdsEnum } from 'localConstants';

interface CreateMnemonicsPropsType {
  onNext: () => void;
  mnemonic: string;
}

export const CreateMnemonics = ({
  mnemonic,
  onNext
}: CreateMnemonicsPropsType) => {
  const mnemonicArray = mnemonic.split(' ');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const goToCheckMnemonic = () => {
    if (touched && isValid) {
      return onNext();
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

  return (
    <div className='flex flex-col items-center gap-4 mt-10'>
      <div className='flex flex-col items-center gap-4 mb-10'>
        <div>
          <p data-testid={DataTestIdsEnum.mnemonicsDisclaimer}>
            <FontAwesomeIcon icon={faInfoCircle} className='primary' /> Write
            down these words in this exact order. You can use them to access
            your wallet, make sure you protect them.
          </p>
        </div>

        <div
          className='flex flex-row flex-wrap items-center justify-start p-4 gap-2 bg-gray-100 border border-gray-200 relative'
          data-testid={DataTestIdsEnum.mnemonicWords}
        >
          {mnemonicArray.map((word, i) => (
            <div
              data-testid={DataTestIdsEnum.mnemonicWord}
              key={word + i}
              className='flex flex-row items-center justify-center p-2 gap-1 bg-gray-500 border border-gray-200 text-white rounded text-sm'
            >
              <span>{i + 1}</span>
              <span data-testid={`mnemonicWord${i}`}>{word}</span>
            </div>
          ))}

          <CopyButton
            className='text-gray-400 absolute right-0 bottom-0 m-2'
            text={textToCopy}
          />
        </div>

        <div>
          <input
            type='checkbox'
            id='check'
            data-testid={DataTestIdsEnum.check}
            onChange={handleCheckboxChange}
            className='mr-2'
          />

          <label htmlFor='check' data-testid={DataTestIdsEnum.mnemonicCheck}>
            I confirm I have written down and safely stored my secret phrase.
          </label>
        </div>
      </div>

      <Button
        id='goToCheckMnemonic'
        data-testid={DataTestIdsEnum.goToCheckMnemonic}
        disabled={!isValid}
        onClick={goToCheckMnemonic}
      >
        Create Wallet
      </Button>
    </div>
  );
};
