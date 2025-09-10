import { MouseEvent } from 'react';
import { faClose, faPaste } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { DraggableArea } from 'react-draggable-tags';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { RecoverMnemonicsPropsType, useRecoverMnemonics } from './hooks';
import { isChromeIOS, mnemonicWords as allMnemonicWords } from '../../helpers';
import { SelectOptionType } from '../../types';

export const RecoverMnemonics = ({
  onNext,
  setMnemonic
}: RecoverMnemonicsPropsType) => {
  const {
    handlePasteWords,
    onSubmit,
    handleRemoveTag,
    handleAddTag,
    error,
    inputValue,
    words,
    reorderWords
  } = useRecoverMnemonics({ onNext, setMnemonic });
  const navigate = useNavigate();

  const handleBackToUnlock = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.unlock);
  };

  const mnemonicWordsOptions: SelectOptionType[] = allMnemonicWords.map(
    (word) => ({
      label: word,
      value: word
    })
  );

  const goToUnlockSection = (
    <MvxButton onClick={handleBackToUnlock} variant='secondary'>
      Back to unlock
    </MvxButton>
  );

  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full'>
      <p className='text-sm text-secondary w-full text-center'>
        Type in the words of your Secret Phrase in the right order, <br /> press
        „Enter” after each one.
      </p>

      <div className='w-full mb-10'>
        {isChromeIOS() && (
          <div className='p-2 border border-red-500 rounded bg-yellow-300 bg-y mb-spacer my-3'>
            <p className='m-0'>
              Due to a{' '}
              <a
                href='https://groups.google.com/a/chromium.org/g/chromium-html5/c/RKQ0ZJIj7c4?pli=1'
                rel='noopener noreferrer nofollow'
                target='_blank'
              >
                Chrome bug
              </a>{' '}
              there are issues with recovering a wallet using Chrome on iOS.
              Please use Safari to recover the wallet and then you can continue
              using it in Chrome.
            </p>
          </div>
        )}

        <div className='w-full flex flex-col items-center gap-4'>
          <div className='w-full'>
            <label className='block text-secondary text-sm font-normal mb-2'>
              Secret Phrase
            </label>

            <div
              className={classNames(
                'bg-secondary border border-secondary rounded-xl p-4 relative h-full',
                { 'border-red-600': error, 'p-8': words.length === 0 }
              )}
            >
              <DraggableArea
                tags={words}
                render={({ tag: word }: any) => (
                  <div
                    className='flex flex-row items-center justify-center p-2 gap-1 bg-secondary border border-secondary text-primary rounded-lg text-sm'
                    data-testid={word.content}
                  >
                    <span>{word.id}</span>
                    <span>{word.content}</span>

                    <span onClick={handleRemoveTag(word)}>
                      <FontAwesomeIcon icon={faClose} />
                    </span>
                  </div>
                )}
                onChange={reorderWords}
              />

              <button
                onClick={handlePasteWords}
                data-testid={DataTestIdsEnum.pasteMnemonicBtn}
                className={classNames(
                  'text-secondary absolute right-0 bottom-0 m-2',
                  {
                    hidden: words.length > 0
                  }
                )}
              >
                <FontAwesomeIcon
                  icon={faPaste}
                  className='cursor-pointer text-link hover:text-accent'
                />
              </button>
            </div>

            {error && (
              <span className='text-red-600 text-sm mt-1'>{error}</span>
            )}
          </div>

          <div className='w-full'>
            <label
              className='block text-sm font-normal text-secondary mb-2'
              htmlFor={DataTestIdsEnum.mnemonicInput}
            >
              Type here
            </label>

            <Select
              classNames={{
                control: () =>
                  '!text-sm !bg-secondary !text-primary !border-secondary !rounded-xl',
                placeholder: () => '!text-secondary',
                singleValue: () => '!text-primary',
                menu: () =>
                  '!bg-secondary border !border-secondary !rounded-xl px-1',
                option: ({ isFocused, isSelected }) =>
                  [
                    '!cursor-pointer !text-sm ',
                    isFocused
                      ? '!bg-primary !text-accent !rounded-lg'
                      : '!bg-secondary !text-secondary',
                    isSelected ? '!bg-primary !text-accent' : ''
                  ].join(' '),
                input: () => '!text-primary'
              }}
              inputId={DataTestIdsEnum.mnemonicInput}
              name={DataTestIdsEnum.mnemonicInput}
              onChange={handleAddTag as any}
              options={mnemonicWordsOptions}
              value={inputValue}
            />
          </div>
        </div>
      </div>

      <Button
        type='submit'
        onClick={onSubmit}
        id='goToPassword'
        data-testid={DataTestIdsEnum.submitButton}
        className='bg-btn-primary text-btn-primary px-4 h-10 rounded-xl hover:opacity-75 cursor-pointer'
      >
        Continue
      </Button>

      {goToUnlockSection}
    </div>
  );
};
