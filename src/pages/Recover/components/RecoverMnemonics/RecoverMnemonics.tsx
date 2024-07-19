import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { unlockRouteNames } from 'routes';
import { RecoverMnemonicsScreen } from './components';
import { useRecoverMnemonics } from './hooks';

export const RecoverMnemonics = () => {
  const { t } = useTranslation(['createAndRecover']);
  const {
    handlePasteWords,
    onSubmit,
    handleRemoveTag,
    setOriginToUnlock,
    setMnemonicWords,
    error,
    words,
    reordeWords,
    setWords,
    setError,
    mnemonicWords
  } = useRecoverMnemonics();

  const goToUnlockSection = (
    <Link
      id='backButton'
      onClick={setOriginToUnlock}
      to={unlockRouteNames.keystore}
      className='modal-layout-text'
    >
      <Trans t={t}>Back to unlock</Trans>
    </Link>
  );

  return (
    <RecoverMnemonicsScreen
      handlePasteWords={handlePasteWords}
      onSubmit={onSubmit}
      handleRemoveTag={handleRemoveTag}
      setOriginToUnlock={setOriginToUnlock}
      setMnemonicWords={setMnemonicWords}
      error={error}
      words={words}
      reordeWords={reordeWords}
      setWords={setWords}
      setError={setError}
      mnemonicWords={mnemonicWords}
      goToUnlockSection={goToUnlockSection}
    />
  );
};
