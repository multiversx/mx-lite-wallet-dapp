import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { readFromClipboard } from 'components/shared/CopyButton/helpers';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'contexts/createRecover';
import { mnemonicWords as allMnemonicWords } from 'helpers';
import { usePushAndNavigate } from 'hooks';
import { routeNames } from 'routes';
import { extractValidWordsFromText } from '../extractValidWordsFromText';
import { mnemonicSchema } from '../mnemonicSchema';
import { WordType } from '../TypeaheadInput';

export const useRecoverMnemonics = () => {
  const { t } = useTranslation(['createAndRecover']);
  const { t: c } = useTranslation(['common']);
  const recoverDispatch = useCreateRecoverDispatch();
  const dispatch = useDispatch();

  const { createRecoverWalletRoutes } = useCreateRecoverContext();
  const pushAndNavigate = usePushAndNavigate();
  const navigate = useNavigate({ from: 'RecoverMnemonics' });

  const [words, setWords] = useState<WordType[]>([]);
  const [error, setError] = useState<string>('');
  const [mnemonicWords, setMnemonicWords] =
    useState<string[]>(allMnemonicWords);

  const schema = mnemonicSchema({ t, c });

  const setOriginToUnlock = () => {
    dispatch(
      setWalletOrigin({
        pathname: routeNames.unlock,
        search: ''
      })
    );
  };

  const reordeWords = (reorderedWords: WordType[]) => {
    const newWords = reorderedWords.map((word, i) => ({
      content: word.content,
      id: i + 1
    }));

    setWords(newWords);
    setError('');
  };

  const handleRemoveTag =
    (word: WordType) =>
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      event.preventDefault();
      const newWords = words.filter((w) => word.id !== w.id);
      reordeWords(newWords);
    };

  const onSubmit = async () => {
    const mnemonicPhrase = words.map((word) => word.content).join(' ');

    try {
      await schema.validate(mnemonicPhrase, { abortEarly: false });
      recoverDispatch({
        type: 'setMnemonic',
        mnemonic: mnemonicPhrase
      });

      pushAndNavigate(RecoverRoutesEnum.setPassword);
    } catch (err) {
      setError((err as any).errors[0]);
    }
  };

  const checkRoute = () => {
    recoverDispatch({ type: 'resetWizard' });
    if (createRecoverWalletRoutes.includes(RecoverRoutesEnum.setPassword)) {
      navigate(routeNames.home);
    }
  };

  useEffect(checkRoute, []);

  const handlePasteWords = async () => {
    const text = await readFromClipboard();
    const validWords = extractValidWordsFromText(text, mnemonicWords);
    const mappedWords = validWords.map((word: string, index: number) => ({
      id: index + 1,
      content: word
    }));

    setWords(mappedWords);
  };

  return {
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
  };
};
