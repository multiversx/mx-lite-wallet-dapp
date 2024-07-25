import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';

import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { useCreateRecoverContext } from 'pages/CreateRecover/contexts/createRecover';
import { mnemonicWords as allMnemonicWords } from '../../../helpers';
import { usePushAndNavigate } from 'hooks';
import { DataTestIdsEnum } from 'localConstants';

import { getCompareObject } from './getCompareObject';
import { mnemonicValidation } from './mnemonicValidation';
import { randomThree } from './randomThree';
import { CreateRecoverRoutesEnum } from '../../../routes';
import Autosuggest from 'react-autosuggest';

type KeyType = 'first' | 'second' | 'third';

type InitialValuesType = {
  [key in KeyType]: string;
};

export interface MnemonicOptionType {
  label: string;
  value: string;
}

export const MnemonicForm = () => {
  const { mnemonic } = useCreateRecoverContext();
  const mnemonicArray = mnemonic.split(' ');
  const [shuffledArray] = useState<string[]>(randomThree([...mnemonicArray]));
  const pushAndNavigate = usePushAndNavigate();
  const initialValues: InitialValuesType = { first: '', second: '', third: '' };
  const compareObject = getCompareObject(shuffledArray, mnemonicArray);

  const refFirstInput = useRef<any>(null);
  const focus = () => {
    refFirstInput?.current?.focus?.();
  };

  useEffect(focus, []);

  const validationSchema = mnemonicValidation(compareObject);

  const onSubmit = () => {
    pushAndNavigate(CreateRecoverRoutesEnum.createPassword);
  };

  const mnemonicOptions: MnemonicOptionType[] = allMnemonicWords.map(
    (word) => ({
      label: word,
      value: word
    })
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { touched, errors, isSubmitting, handleSubmit, setFieldValue } =
          props;
        const errorMessage = errors.first || errors.second || errors.third;
        const fieldsTouched = touched.first && touched.second && touched.third;

        const onChange =
          (ordinal: string) => (option: SingleValue<MnemonicOptionType>) => {
            if (option) {
              setFieldValue(ordinal, option.value);
            }
          };

        return (
          <form
            onSubmit={handleSubmit}
            className='create-wrapper mnemonic-form'
          >
            <div className='create-top'>
              <p
                className='modal-layout-subtitle'
                data-testid={DataTestIdsEnum.modalSubtitle}
              >
                Enter the words from your Secret Phrase as indicated below.
              </p>

              <div className='modal-layout-fields'>
                {Object.keys(initialValues).map((ordinal) => {
                  const renderInputComponent = (inputProps: any) => (
                    <input {...inputProps} data-testid={`${ordinal}Input`} />
                  );

                  const autosuggestProps: any = {
                    suggestions: mnemonicOptions,
                    renderInputComponent,
                    onSuggestionSelected: onChange(ordinal)
                  };

                  return (
                    <div
                      key={ordinal}
                      data-testid={ordinal}
                      className='form-group modal-layout-field'
                    >
                      <label htmlFor={ordinal}>
                        Word{' '}
                        <span data-testid={`${ordinal}Label`}>
                          {(compareObject as any)[ordinal].label}
                        </span>
                      </label>

                      <Autosuggest {...autosuggestProps} />
                    </div>
                  );
                })}
              </div>

              {errorMessage && fieldsTouched && (
                <p className='modal-layout-error'>{errorMessage}</p>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary modal-layout-button'
              id='createWalletBtn'
              data-testid={DataTestIdsEnum.goToDownloadButton}
            >
              Continue
            </button>

            <div className='modal-layout-text'>
              <Link
                to={CreateRecoverRoutesEnum.createMnemonic}
                data-testid={DataTestIdsEnum.backToWordsButton}
              >
                Back to words
              </Link>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
