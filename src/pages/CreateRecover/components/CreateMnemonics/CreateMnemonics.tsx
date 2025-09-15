import { ChangeEvent, useState } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton, MvxCopyButton } from '@multiversx/sdk-dapp-ui/react';
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
            <FontAwesomeIcon
              icon={faInfoCircle}
              className='primary text-accent'
            />{' '}
            <span className='text-primary'>
              Write down these words in this exact order. You can use them to
              access your wallet, make sure you protect them.
            </span>
          </p>
        </div>

        <div
          className='flex flex-row flex-wrap items-center justify-start p-4 gap-2 bg-secondary border border-secondary rounded-xl relative'
          data-testid={DataTestIdsEnum.mnemonicWords}
        >
          {mnemonicArray.map((word, i) => (
            <div
              data-testid={DataTestIdsEnum.mnemonicWord}
              key={word + i}
              className='flex flex-row items-center justify-center p-2 gap-1 bg-primary border border-secondary text-primary rounded-lg text-sm'
            >
              <span>{i + 1}</span>
              <span data-testid={`mnemonicWord${i}`}>{word}</span>
            </div>
          ))}

          <MvxCopyButton
            className='text-link absolute right-2 bottom-2'
            text={textToCopy}
          />
        </div>

        <div>
          <input
            type='checkbox'
            id='check'
            data-testid={DataTestIdsEnum.check}
            onChange={handleCheckboxChange}
            className='mr-2 accent-accent'
          />

          <label
            htmlFor='check'
            data-testid={DataTestIdsEnum.mnemonicCheck}
            className='text-secondary'
          >
            I confirm I have written down and safely stored my secret phrase.
          </label>
        </div>
      </div>

      <MvxButton
        id='goToCheckMnemonic'
        data-testid={DataTestIdsEnum.goToCheckMnemonic}
        disabled={!isValid}
        onClick={goToCheckMnemonic}
      >
        <span className='font-normal text-sm'>Create Wallet</span>
      </MvxButton>
    </div>
  );
};
