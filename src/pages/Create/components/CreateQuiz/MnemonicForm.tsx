import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { Select } from 'components/Select';
import { useCreateRecoverContext } from 'contexts/createRecover';
import { mnemonicWords as allMnemonicWords } from 'helpers';
import { usePushAndNavigate } from 'hooks';
import { DataTestIdsEnum } from 'localConstants';

import { CreateRoutesEnum, routeNames } from 'routes';

import { getCompareObject } from './getCompareObject';
import { mnemonicValidation } from './mnemonicValidation';
import { randomThree } from './randomThree';

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
  const { t } = useTranslation(['createAndRecover']);
  const { t: c } = useTranslation(['common']);

  const compareObject = getCompareObject(shuffledArray, mnemonicArray);

  const refFirstInput = useRef<any>(null);
  const focus = () => {
    refFirstInput?.current?.focus?.();
  };

  useEffect(focus, []);

  const validationSchema = mnemonicValidation(compareObject);

  const onSubmit = () => {
    pushAndNavigate(CreateRoutesEnum.setPassword);
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
                <Trans t={t}>
                  Enter the words from your Secret Phrase as indicated below.
                </Trans>
              </p>

              <div className='modal-layout-fields'>
                {Object.keys(initialValues).map((ordinal) => (
                  <div
                    key={ordinal}
                    data-testid={ordinal}
                    className='form-group modal-layout-field'
                  >
                    <label htmlFor={ordinal}>
                      <Trans t={t}>Word</Trans>{' '}
                      <span data-testid={`${ordinal}Label`}>
                        {(compareObject as any)[ordinal].label}
                      </span>
                    </label>

                    <Select
                      data-testid={`${ordinal}Input`}
                      identifier={ordinal}
                      isInvalid={Boolean(errorMessage && fieldsTouched)}
                      menuPlacement={ordinal === 'third' ? 'top' : 'bottom'}
                      onChange={onChange(ordinal)}
                      options={mnemonicOptions}
                      searchPattern='startsWith'
                      tabSelectsValue
                    />
                  </div>
                ))}
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
              <Trans t={c}>Continue</Trans>
            </button>

            <div className='modal-layout-text'>
              <Link
                to={`/${routeNames.create}/${CreateRoutesEnum.mnemonicPhrase}`}
                data-testid={DataTestIdsEnum.backToWordsButton}
              >
                <Trans t={t}>Back to words</Trans>
              </Link>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
