import { useRef, Dispatch, SetStateAction } from 'react';
import { mnemonicWords as allMnemonicWords } from '../../../helpers';
import Autosuggest from 'react-autosuggest';
import { DataTestIdsEnum } from 'localConstants';

export interface WordType {
  content: string;
  id: number;
}

interface TypeaheadInputType {
  setMnemonicWords: Dispatch<SetStateAction<string[]>>;
  setError: Dispatch<SetStateAction<string>>;
  error: string;
  setTags: Dispatch<SetStateAction<WordType[]>>;
  words: WordType[];
  mnemonicWords: string[];
}

export const SelectAutocompleteMnemonicInput = (props: TypeaheadInputType) => {
  const { setMnemonicWords, setError, error, setTags, words, mnemonicWords } =
    props;
  const ref = useRef(null);
  const onInputChange = (text: string) => {
    const filteredWords = allMnemonicWords.filter((word: string) =>
      word.toLowerCase().startsWith(text.toLowerCase())
    );
    setMnemonicWords(filteredWords);
    if (error) {
      setError('');
    }
  };

  const onChange = (_: any, { suggestion }: { suggestion: string }) => {
    const newTag: WordType = {
      id: words.length + 1,
      content: suggestion
    };

    setTags((existingTags) => [...existingTags, newTag]);
    (ref.current as any)?.clear();
  };

  const renderSuggestion = (suggestion: string) => (
    <input
      data-testid={DataTestIdsEnum.mnemonicInput}
      type='text'
      value={suggestion}
    />
  );

  const inputProps = {
    placeholder: 'Type here...',
    onChange: onInputChange
  };

  const autosuggestProps: any = {
    suggestions: mnemonicWords,
    renderSuggestion,
    inputProps,
    onSuggestionSelected: onChange
  };

  return (
    <div className='notranslate typeahead'>
      <Autosuggest {...autosuggestProps} />
    </div>
  );
};
