import React, { Dispatch, SetStateAction } from 'react';
import { faClose } from '@fortawesome/pro-regular-svg-icons/faClose';
import { faPaste } from '@fortawesome/pro-regular-svg-icons/faPaste';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { DraggableArea } from 'react-draggable-tags';
import { Trans, useTranslation } from 'react-i18next';

import { isChromeIOS } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { TypeaheadInput, WordType } from '../TypeaheadInput';

interface RecoverMnemonicsType {
  handlePasteWords: () => Promise<void>;
  onSubmit: () => Promise<void>;
  handleRemoveTag: (
    word: WordType
  ) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  setOriginToUnlock: () => void;
  setMnemonicWords: Dispatch<SetStateAction<string[]>>;
  error: string;
  words: WordType[];
  reordeWords: (reorderedWords: WordType[]) => void;
  setWords: Dispatch<SetStateAction<WordType[]>>;
  setError: Dispatch<SetStateAction<string>>;
  mnemonicWords: string[];
  goToUnlockSection?: JSX.Element;
}

export const RecoverMnemonicsScreen = ({
  handlePasteWords,
  onSubmit,
  handleRemoveTag,
  setMnemonicWords,
  error,
  words,
  reordeWords,
  setWords,
  setError,
  mnemonicWords,
  goToUnlockSection
}: RecoverMnemonicsType) => {
  const { t } = useTranslation(['createAndRecover']);
  const { t: c } = useTranslation(['common']);

  return (
    <div className='recover-wrapper mnemonic-form'>
      <p className='modal-layout-subtitle'>
        <Trans t={t}>
          Type in the words of your Secret Phrase in the right order, <br />{' '}
          press „Enter” after each one.
        </Trans>
      </p>

      <div className='recover-top'>
        {isChromeIOS() && (
          <div className='p-2 border rounded border-warning bg-warning-light mb-spacer my-3'>
            <p className='text-black m-0'>
              <Trans t={t}>
                Due to a{' '}
                <a
                  href='https://groups.google.com/a/chromium.org/g/chromium-html5/c/RKQ0ZJIj7c4?pli=1'
                  rel='noopener noreferrer nofollow'
                  target='_blank'
                >
                  Chrome bug
                </a>{' '}
                there are issues with recovering a wallet using Chrome on iOS.
                Please use Safari to recover the wallet and then you can
                continue using it in Chrome.
              </Trans>
            </p>
          </div>
        )}

        <div className='modal-layout-fields'>
          <div className='modal-layout-field'>
            <label>
              <Trans t={t}>Secret Phrase</Trans>
            </label>

            <div
              data-testid={DataTestIdsEnum.recoverMnemonicsInput}
              className={classNames('recover-mnemonics', { invalid: error })}
            >
              <DraggableArea
                tags={words}
                render={({ tag: word }: any) => (
                  <div className='mnemonic-word' data-testid={word.content}>
                    <span className='mnemonic-word-id'>{word.id}</span>
                    <span className='mnemonic-word-value'>{word.content}</span>

                    <span
                      className='mnemonic-word-action'
                      onClick={handleRemoveTag(word)}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </span>
                  </div>
                )}
                onChange={reordeWords}
              />

              <button
                onClick={handlePasteWords}
                data-testid={DataTestIdsEnum.pasteMenemonicBtn}
                className={classNames('mnemonic-copy', {
                  hidden: words.length > 0
                })}
              >
                <FontAwesomeIcon icon={faPaste} />
              </button>
            </div>

            {error && <p className='modal-layout-error'>{error}</p>}
          </div>

          <div className='modal-layout-field'>
            <label>
              <Trans t={t}>Type here</Trans>
            </label>

            <TypeaheadInput
              error={error}
              mnemonicWords={mnemonicWords}
              setError={setError}
              setMnemonicWords={setMnemonicWords}
              setTags={setWords}
              words={words}
            />
          </div>
        </div>
      </div>

      <button
        type='submit'
        onClick={onSubmit}
        className='btn btn-primary modal-layout-button'
        id='goToPassword'
        data-testid={DataTestIdsEnum.submitButton}
      >
        <Trans t={c}>Continue</Trans>
      </button>

      {goToUnlockSection}
    </div>
  );
};
