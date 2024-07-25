import { Link } from 'react-router-dom';
import { RecoverMnemonicsScreen } from './components';
import { useRecoverMnemonics } from './hooks';
import { UnlockRoutesEnum } from '../../../routes';

export const RecoverMnemonics = () => {
  const {
    handlePasteWords,
    onSubmit,
    handleRemoveTag,
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
      to={UnlockRoutesEnum.keystore}
      className='modal-layout-text'
    >
      Back to unlock
    </Link>
  );

  return (
    <RecoverMnemonicsScreen
      handlePasteWords={handlePasteWords}
      onSubmit={onSubmit}
      handleRemoveTag={handleRemoveTag}
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
