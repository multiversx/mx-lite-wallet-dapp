import { useEffect, useState } from 'react';
import { PartialNftType } from '@multiversx/sdk-dapp-form';
import BigNumber from 'bignumber.js';

import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Button, MxLink } from 'components';
import { getEgldLabel, computeTokenDataField } from 'lib';
import {
  calculateGasLimit,
  calculateNftGasLimit,
  computeNftDataField
} from 'lib';
import {
  DataTestIdsEnum,
  DECIMALS,
  GAS_LIMIT,
  SearchParamsEnum
} from 'localConstants';
import { routeNames } from 'routes';
import { getSelectedTokenBalance } from './helpers';
import { useSendForm, useTokenOptions } from './hooks';
import { FormFieldsEnum, SendTypeEnum } from './types';

export const Send = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenIdParam = searchParams.get(SearchParamsEnum.tokenId);
  const isNftParam = searchParams.get(SearchParamsEnum.isNFT);
  const [sendType, setSendType] = useState(
    isNftParam ? SendTypeEnum.nft : SendTypeEnum.esdt
  );

  const egldLabel = getEgldLabel();
  const isNFT = sendType === SendTypeEnum.nft;
  const { tokenOptions, isLoading, tokens } = useTokenOptions(sendType);
  const defaultTokenOption = tokenIdParam
    ? tokenOptions?.find((option) => option.value === tokenIdParam)
    : tokenOptions?.[0];

  const formik = useSendForm({
    isNFT,
    tokens,
    defaultTokenOption
  });

  const selectedToken = tokens?.find(
    (token) => token.identifier === formik.values[FormFieldsEnum.token]?.value
  );

  const isEgldToken = selectedToken?.identifier === egldLabel;
  const availableAmount = getSelectedTokenBalance({
    tokens,
    tokenOption: formik.values[FormFieldsEnum.token]
  });

  const canEditNftAmount = new BigNumber(availableAmount).isGreaterThan(1);

  const resetFormAndGetBalance = () => {
    const balance = defaultTokenOption
      ? getSelectedTokenBalance({ tokens, tokenOption: defaultTokenOption })
      : '';

    formik.setFieldValue(FormFieldsEnum.data, '');
    formik.setFieldValue(FormFieldsEnum.token, defaultTokenOption);
    formik.setFieldValue(FormFieldsEnum.amount, isNFT ? balance : '0');
    formik.setFieldValue(FormFieldsEnum.gasLimit, GAS_LIMIT);

    return balance;
  };

  useEffect(() => {
    const formTokenValue = formik.values[FormFieldsEnum.token]?.value;
    const selectedTokenValue = defaultTokenOption?.value;

    if (!formTokenValue && formTokenValue !== selectedTokenValue) {
      formik.setFieldValue(FormFieldsEnum.token, defaultTokenOption);
      resetFormAndGetBalance();
      setSearchParams();
    }
  }, [defaultTokenOption, tokenIdParam]);

  useEffect(() => {
    const balance = resetFormAndGetBalance();

    if (!defaultTokenOption || isEgldToken) {
      return;
    }

    let data;

    if (isNFT) {
      const defaultToken = tokens?.find(
        (token) => token.identifier === defaultTokenOption.value
      );

      data = computeNftDataField({
        nft: defaultToken as PartialNftType,
        amount: balance,
        receiver: formik.values[FormFieldsEnum.receiver],
        errors: false
      });
    } else {
      data = computeTokenDataField({
        tokenId: defaultTokenOption.value,
        amount: balance,
        decimals: selectedToken?.decimals ?? DECIMALS
      });
    }

    formik.setFieldValue(FormFieldsEnum.data, data);
  }, [sendType]);

  useEffect(() => {
    if (!selectedToken || isEgldToken) {
      return;
    }

    let data;

    if (isNFT) {
      data = computeNftDataField({
        nft: selectedToken as PartialNftType,
        amount: formik.values[FormFieldsEnum.amount],
        receiver: formik.values[FormFieldsEnum.receiver],
        errors: false
      });
    } else {
      data = computeTokenDataField({
        tokenId: selectedToken.identifier,
        amount: formik.values[FormFieldsEnum.amount],
        decimals: selectedToken?.decimals ?? DECIMALS
      });
    }

    const gasLimit = calculateNftGasLimit(data);
    formik.setFieldValue(FormFieldsEnum.data, data);
    formik.setFieldValue(FormFieldsEnum.gasLimit, gasLimit);
  }, [
    formik.values[FormFieldsEnum.amount],
    formik.values[FormFieldsEnum.receiver],
    formik.values[FormFieldsEnum.token]
  ]);

  return (
    <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'>
      <h2 className='text-2xl font-bold p-2 mb-2 text-center'>Send</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-4 h-full'>
          <div className='flex flex-col'>
            <label
              htmlFor={FormFieldsEnum.receiver}
              className='block text-sm font-bold mb-2'
            >
              Receiver:
            </label>
            <input
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              data-testid={DataTestIdsEnum.receiverInput}
              id={FormFieldsEnum.receiver}
              name={FormFieldsEnum.receiver}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='Enter receiver'
              value={formik.values[FormFieldsEnum.receiver]}
            />
            {formik.touched[FormFieldsEnum.receiver] &&
              formik.errors[FormFieldsEnum.receiver] && (
                <div
                  className='text-red-600 text-sm'
                  data-testid={DataTestIdsEnum.receiverError}
                >
                  {formik.errors[FormFieldsEnum.receiver]}
                </div>
              )}
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor={FormFieldsEnum.type}
              className='block text-sm font-bold mb-2'
            >
              Type:
            </label>
            <div className='flex flex-row gap-4'>
              <div>
                <input
                  checked={!isNFT}
                  className='mr-2'
                  data-testid={DataTestIdsEnum.sendEsdtTypeInput}
                  id={SendTypeEnum.esdt}
                  name={FormFieldsEnum.type}
                  onChange={(event) => {
                    setSendType(SendTypeEnum.esdt);

                    return formik.handleChange(event);
                  }}
                  type='radio'
                  value={SendTypeEnum.esdt}
                />
                <label htmlFor={SendTypeEnum.esdt} className='text-sm'>
                  {SendTypeEnum.esdt}
                </label>
              </div>
              <div>
                <input
                  checked={isNFT}
                  className='mr-2'
                  data-testid={DataTestIdsEnum.sendNFtTypeInput}
                  id={SendTypeEnum.nft}
                  name={FormFieldsEnum.type}
                  onChange={(event) => {
                    setSendType(SendTypeEnum.nft);

                    return formik.handleChange(event);
                  }}
                  type='radio'
                  value={SendTypeEnum.nft}
                />
                <label htmlFor={SendTypeEnum.nft} className='text-sm'>
                  {SendTypeEnum.nft}
                </label>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor={FormFieldsEnum.amount}
              className='block text-sm font-bold mb-2'
            >
              Amount:
            </label>
            <div className='flex flex-row gap-2'>
              <div className='flex flex-col w-full'>
                <input
                  className='p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
                  disabled={isNFT && !canEditNftAmount}
                  data-testid={DataTestIdsEnum.amountInput}
                  id={FormFieldsEnum.amount}
                  name={FormFieldsEnum.amount}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder='Enter amount'
                  type='number'
                  value={formik.values[FormFieldsEnum.amount]}
                />
                {formik.values[FormFieldsEnum.token] && (
                  <div
                    className='text-sm text-gray-400 mt-1'
                    data-testid={DataTestIdsEnum.availableAmount}
                  >
                    Available: {availableAmount}{' '}
                    {formik.values[FormFieldsEnum.token].label}
                  </div>
                )}
                {formik.touched[FormFieldsEnum.amount] &&
                  formik.errors[FormFieldsEnum.amount] && (
                    <div
                      className='text-red-600 text-sm mt-1'
                      data-testid={DataTestIdsEnum.amountError}
                    >
                      {formik.errors[FormFieldsEnum.amount]}
                    </div>
                  )}
              </div>
              <div className='flex flex-col w-1/2'>
                <Select
                  className='text-sm text-gray-700 placeholder-gray-400'
                  isLoading={isLoading}
                  options={tokenOptions}
                  name={FormFieldsEnum.token}
                  onChange={(option) =>
                    formik.setFieldValue(FormFieldsEnum.token, option)
                  }
                  onBlur={() =>
                    formik.setFieldTouched(FormFieldsEnum.token, true)
                  }
                  value={formik.values[FormFieldsEnum.token]}
                />
                {formik.touched[FormFieldsEnum.token] &&
                  formik.errors[FormFieldsEnum.token] && (
                    <div
                      className='text-red-600 text-sm mt-1'
                      data-testid={DataTestIdsEnum.tokenError}
                    >
                      {formik.errors[FormFieldsEnum.token]}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor={FormFieldsEnum.gasLimit}
              className='block text-sm font-bold mb-2'
            >
              Gas Limit:
            </label>
            <input
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              data-testid={DataTestIdsEnum.gasLimitInput}
              disabled={!isEgldToken}
              id={FormFieldsEnum.gasLimit}
              name={FormFieldsEnum.gasLimit}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='Enter gas limit'
              type='number'
              value={formik.values[FormFieldsEnum.gasLimit]}
            />
            {formik.touched[FormFieldsEnum.gasLimit] &&
              formik.errors[FormFieldsEnum.gasLimit] && (
                <div
                  className='text-red-600 text-sm mt-1'
                  data-testid={DataTestIdsEnum.gasLimitError}
                >
                  {formik.errors[FormFieldsEnum.gasLimit]}
                </div>
              )}
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor={FormFieldsEnum.data}
              className='block text-sm font-bold mb-2'
            >
              Data:
            </label>
            <textarea
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              data-testid={DataTestIdsEnum.dataInput}
              disabled={!isEgldToken}
              id={FormFieldsEnum.data}
              name={FormFieldsEnum.data}
              onBlur={formik.handleBlur}
              onChange={(event) => {
                if (!isEgldToken) {
                  return;
                }

                const gasLimit = calculateGasLimit({
                  data: event.target.value
                });

                formik.setFieldValue(FormFieldsEnum.gasLimit, gasLimit);

                return formik.handleChange(event);
              }}
              placeholder='Enter your data'
              value={formik.values[FormFieldsEnum.data]}
            />
          </div>
        </div>
        <div className='mt-4 flex flex-col align-middle'>
          <Button
            className='mt-4 mx-auto rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'
            data-testid={DataTestIdsEnum.sendBtn}
            type='submit'
          >
            Send
          </Button>
          <MxLink
            className='block w-full mt-2 px-4 py-2 text-sm text-center text-blue-600'
            data-testid={DataTestIdsEnum.cancelBtn}
            to={routeNames.dashboard}
          >
            Cancel
          </MxLink>
        </div>
      </form>
    </div>
  );
};
