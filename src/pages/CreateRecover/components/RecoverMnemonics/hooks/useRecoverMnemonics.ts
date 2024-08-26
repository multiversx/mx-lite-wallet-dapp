import { MouseEventHandler, useState } from 'react';
import { readFromClipboard } from 'components';
import { mnemonicWords } from '../../../helpers';
import { SelectOptionType, WordType } from '../../../types';
import { extractValidWordsFromText } from '../extractValidWordsFromText';
import { mnemonicSchema } from '../mnemonicSchema';

export interface RecoverMnemonicsPropsType {
  onNext: () => void;
  setMnemonic: (mnemonic: string) => void;
}

export const useRecoverMnemonics = ({
  onNext,
  setMnemonic
}: RecoverMnemonicsPropsType) => {
  const [words, setWords] = useState<WordType[]>([]);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState<SelectOptionType>({
    label: '',
    value: ''
  });
  const schema = mnemonicSchema();

  const reorderWords = (reorderedWords: WordType[]) => {
    const newWords = reorderedWords.map((word, i) => ({
      content: word.content,
      id: i + 1
    }));

    setWords(newWords);
    setError('');
  };

  const handleAddTag = (option: SelectOptionType) => {
    if (error) {
      setError('');
    }

    const newTag: WordType = {
      id: words.length + 1,
      content: option.value
    };

    setWords((existingTags) => [...existingTags, newTag]);
    setInputValue({
      label: '',
      value: ''
    });
  };

  const handleRemoveTag: (
    word: WordType
  ) => MouseEventHandler<HTMLSpanElement> = (word) => (event) => {
    event.preventDefault();
    const newWords = words.filter((w) => word.id !== w.id);
    reorderWords(newWords);
  };

  const onSubmit = async () => {
    const mnemonicPhrase = words.map((word) => word.content).join(' ');

    try {
      await schema.validate(mnemonicPhrase, { abortEarly: false });
      setMnemonic(mnemonicPhrase);
      onNext();
    } catch (err) {
      setError((err as any).errors[0]);
    }
  };

  const handlePasteWords = async () => {
    const text = await readFromClipboard();
    const validWords = extractValidWordsFromText(text, mnemonicWords);
    const mappedWords: WordType[] = validWords.map(
      (word: string, index: number) => ({
        id: index + 1,
        content: word
      })
    );

    setWords(mappedWords);
  };

  return {
    error,
    handleAddTag,
    handlePasteWords,
    handleRemoveTag,
    inputValue,
    onSubmit,
    reorderWords,
    setError,
    setInputValue,
    setWords,
    words
  };
};
