import React, { useRef, Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead, Hint } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { useTranslation } from 'react-i18next';
import { mnemonicWords as allMnemonicWords } from 'helpers';

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

export const TypeaheadInput = (props: TypeaheadInputType) => {
  const { t } = useTranslation(['createAndRecover']);
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

  const onChange = (selected: Option[]) => {
    const newTag: WordType = {
      id: words.length + 1,
      content: selected[0].toString()
    };
    setTags((existingTags) => [...existingTags, newTag]);
    (ref.current as any)?.clear();
  };

  const renderInput = ({
    inputRef,
    referenceElementRef,
    ...inputProps
  }: any) => (
    <Hint>
      <Form.Control
        {...inputProps}
        data-testid='mnemonicInput'
        ref={(node: any) => {
          inputRef(node);
          referenceElementRef(node);
        }}
      />
    </Hint>
  );

  return (
    <div className='notranslate typeahead'>
      <Typeahead
        caseSensitive={false}
        ref={ref}
        onInputChange={onInputChange}
        ignoreDiacritics
        selectHint={(shouldSelect, event) =>
          event.key === 'Enter' || shouldSelect
        }
        onChange={onChange}
        minLength={1}
        renderInput={renderInput}
        inputProps={{
          autoCapitalize: 'none'
        }}
        id='mnemonicInput'
        data-testid='mnemonicInput'
        options={mnemonicWords}
        placeholder={`${t('Type here...')}`}
      />
    </div>
  );
};
