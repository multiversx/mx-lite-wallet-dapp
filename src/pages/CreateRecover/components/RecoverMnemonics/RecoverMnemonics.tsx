import { faClose, faPaste } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { DraggableArea } from 'react-draggable-tags';
import Select from 'react-select';
import { Button, MxLink } from 'components';
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

  const mnemonicWordsOptions: SelectOptionType[] = allMnemonicWords.map(
    (word) => ({
      label: word,
      value: word
    })
  );

  const goToUnlockSection = (
    <MxLink
      className='text-blue-400 underline decoration-dotted hover:decoration-solid'
      to={routeNames.unlock}
    >
      Back to unlock
    </MxLink>
  );

  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full'>
      <p className='text-sm text-gray-400 w-full text-center'>
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
            <label className='block text-sm font-bold mb-2'>
              Secret Phrase
            </label>

            <div
              className={classNames(
                'bg-gray-100 border border-gray-200 p-4 relative h-full',
                { 'border-red-600': error, 'p-8': words.length === 0 }
              )}
            >
              <DraggableArea
                tags={words}
                render={({ tag: word }: any) => (
                  <div
                    className='flex flex-row items-center justify-center p-2 gap-1 bg-gray-500 border border-gray-200 text-white rounded text-sm'
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
                  'text-gray-400 absolute right-0 bottom-0 m-2',
                  {
                    hidden: words.length > 0
                  }
                )}
              >
                <FontAwesomeIcon icon={faPaste} />
              </button>
            </div>

            {error && (
              <span className='text-red-600 text-sm mt-1'>{error}</span>
            )}
          </div>

          <div className='w-full'>
            <label
              className='block text-sm font-bold mb-2'
              htmlFor={DataTestIdsEnum.mnemonicInput}
            >
              Type here
            </label>
            <Select
              className='text-sm text-gray-700 placeholder-gray-400'
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
      >
        Continue
      </Button>

      {goToUnlockSection}
    </div>
  );
};
