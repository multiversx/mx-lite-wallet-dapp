import { RecoverMnemonicsScreen } from './components';
import { useRecoverMnemonics } from './hooks';
import { UnlockRoutesEnum } from '../../../routes';
import { MxLink } from 'components';

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
    <MxLink to={UnlockRoutesEnum.keystore}>Back to unlock</MxLink>
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
