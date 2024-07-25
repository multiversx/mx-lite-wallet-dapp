import { useEffect, useState } from 'react';
import { readFromClipboard } from 'components';
import {
  useCreateRecoverContext,
  useCreateRecoverDispatch
} from 'pages/CreateRecover/contexts/createRecover';
import { mnemonicWords as allMnemonicWords } from '../../../../helpers';
import { usePushAndNavigate } from 'hooks';
import { routeNames } from 'routes';
import { extractValidWordsFromText } from '../extractValidWordsFromText';
import { mnemonicSchema } from '../mnemonicSchema';
import { WordType } from '../SelectAutocompleteMnemonicInput';
import { CreateRecoverRoutesEnum } from '../../../../routes';
import { useNavigate } from 'react-router-dom';

export const useRecoverMnemonics = () => {
  const recoverDispatch = useCreateRecoverDispatch();
  const { createRecoverWalletRoutes } = useCreateRecoverContext();
  const pushAndNavigate = usePushAndNavigate();
  const navigate = useNavigate();

  const [words, setWords] = useState<WordType[]>([]);
  const [error, setError] = useState<string>('');
  const [mnemonicWords, setMnemonicWords] =
    useState<string[]>(allMnemonicWords);

  const schema = mnemonicSchema();

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

      pushAndNavigate(CreateRecoverRoutesEnum.recoverPassword);
    } catch (err) {
      setError((err as any).errors[0]);
    }
  };

  const checkRoute = () => {
    recoverDispatch({ type: 'resetWizard' });
    if (
      createRecoverWalletRoutes.includes(
        CreateRecoverRoutesEnum.recoverPassword
      )
    ) {
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
    setMnemonicWords,
    error,
    words,
    reordeWords,
    setWords,
    setError,
    mnemonicWords
  };
};
