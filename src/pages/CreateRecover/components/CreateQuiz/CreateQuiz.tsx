import { MouseEventHandler, useState } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { Formik } from 'formik';
import Select from 'react-select';
import { Button } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { getCompareObject } from './getCompareObject';
import { mnemonicValidation } from './mnemonicValidation';
import { randomThree } from './randomThree';
import { mnemonicWords as allMnemonicWords } from '../../helpers';
import { SelectOptionType } from '../../types';

type KeyType = 'first' | 'second' | 'third';

type InitialValuesType = {
  [key in KeyType]: string;
};

interface CreateQuizPropsType {
  mnemonic: string;
  onBack: MouseEventHandler;
  onNext: () => void;
}

export const CreateQuiz = ({
  mnemonic,
  onBack,
  onNext
}: CreateQuizPropsType) => {
  const mnemonicArray = mnemonic.split(' ');
  const [shuffledArray] = useState<string[]>(randomThree([...mnemonicArray]));
  const initialValues: InitialValuesType = { first: '', second: '', third: '' };
  const compareObject = getCompareObject(shuffledArray, mnemonicArray);
  const validationSchema = mnemonicValidation(compareObject);

  const mnemonicWordsOptions: SelectOptionType[] = allMnemonicWords.map(
    (word) => ({
      label: word,
      value: word
    })
  );

  const onSubmit = () => {
    onNext();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const {
          touched,
          errors,
          isSubmitting,
          handleSubmit,
          setFieldValue,
          values
        } = props;

        return (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center gap-4 w-full'
          >
            <div className='w-full flex flex-col items-center justify-center mb-10'>
              <p
                className='text-sm text-secondary mb-10'
                data-testid={DataTestIdsEnum.modalSubtitle}
              >
                Enter the words from your Secret Phrase as indicated below.
              </p>

              <div className='flex flex-col items-center justify-center gap-4 w-full'>
                {Object.keys(initialValues).map((ordinal) => {
                  const inputKey = ordinal as keyof InitialValuesType;

                  return (
                    <div key={ordinal} className='w-full'>
                      <label
                        htmlFor={ordinal}
                        className='block text-sm text-primary font-normal mb-2'
                      >
                        Word{' '}
                        <span data-testid={`${ordinal}Label`}>
                          {
                            compareObject[ordinal as keyof InitialValuesType]
                              .label
                          }
                        </span>
                      </label>

                      <Select
                        className='text-sm text-neutral-800 placeholder-neutral-500'
                        inputId={ordinal}
                        options={mnemonicWordsOptions as any[]}
                        name={ordinal}
                        onChange={(option) => setFieldValue(ordinal, option)}
                        value={values[ordinal as keyof InitialValuesType]}
                      />

                      {touched[inputKey] && errors[inputKey] && (
                        <div
                          className='text-red-600 text-sm mt-1'
                          data-testid={DataTestIdsEnum.tokenError}
                        >
                          {errors[inputKey]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              className='bg-btn-primary text-btn-primary px-4 h-10 rounded-xl cursor-pointer hover:opacity-75'
              data-testid={DataTestIdsEnum.goToDownloadButton}
              disabled={isSubmitting}
              id='createWalletBtn'
              type='submit'
            >
              Continue
            </Button>

            <MvxButton
              data-testid={DataTestIdsEnum.backToWordsButton}
              onClick={onBack}
              variant='secondary'
            >
              Back to words
            </MvxButton>
          </form>
        );
      }}
    </Formik>
  );
};
