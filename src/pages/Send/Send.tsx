import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import { Link, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import {
  calculateGasLimit,
  calculateNftGasLimit,
  computeNftDataField
} from 'lib';
import { GAS_LIMIT, SearchParamsEnum } from 'localConstants';
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

  const isNFT = sendType === SendTypeEnum.nft;
  const { tokenOptions, isLoading, tokens } = useTokenOptions(sendType);
  const selectedToken = tokenIdParam
    ? tokenOptions?.find((option) => option.value === tokenIdParam)
    : tokenOptions?.[0];

  const formik = useSendForm({ isNFT, tokens, selectedToken });

  const availableAmount = getSelectedTokenBalance({
    tokens,
    tokenOption: formik.values[FormFieldsEnum.token]
  });

  const canEditNftAmount = new BigNumber(availableAmount).isGreaterThan(1);

  const resetFormAndGetBalance = () => {
    const balance = selectedToken
      ? getSelectedTokenBalance({ tokens, tokenOption: selectedToken })
      : '';

    formik.setFieldValue(FormFieldsEnum.data, '');
    formik.setFieldValue(FormFieldsEnum.token, selectedToken);
    formik.setFieldValue(FormFieldsEnum.amount, isNFT ? balance : '0');
    formik.setFieldValue(FormFieldsEnum.gasLimit, GAS_LIMIT);

    return balance;
  };

  useEffect(() => {
    const formTokenValue = formik.values[FormFieldsEnum.token]?.value;
    const selectedTokenValue = selectedToken?.value;

    if (!formTokenValue && formTokenValue !== selectedTokenValue) {
      formik.setFieldValue(FormFieldsEnum.token, selectedToken);
      resetFormAndGetBalance();
      setSearchParams();
    }
  }, [selectedToken, tokenIdParam]);

  useEffect(() => {
    const balance = resetFormAndGetBalance();

    if (!isNFT || !selectedToken) {
      return;
    }

    const data = computeNftDataField({
      nft: selectedToken,
      amount: balance,
      receiver: formik.values[FormFieldsEnum.receiver],
      errors: false
    });

    formik.setFieldValue(FormFieldsEnum.data, data);
  }, [sendType]);

  useEffect(() => {
    if (!isNFT || !formik.values[FormFieldsEnum.token]) {
      return;
    }

    const selectedNft = tokens?.find(
      (nft) => nft.identifier === formik.values[FormFieldsEnum.token]?.value
    );

    if (!selectedNft) {
      return;
    }

    const data = computeNftDataField({
      nft: selectedNft,
      amount: formik.values[FormFieldsEnum.amount],
      receiver: formik.values[FormFieldsEnum.receiver],
      errors: false
    });

    const gasLimit = calculateNftGasLimit(data);
    formik.setFieldValue(FormFieldsEnum.data, data);
    formik.setFieldValue(FormFieldsEnum.gasLimit, gasLimit);
  }, [
    formik.values[FormFieldsEnum.amount],
    formik.values[FormFieldsEnum.receiver],
    formik.values[FormFieldsEnum.token]
  ]);

  return (
    <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded'>
      <h2 className='text-3xl font-bold mb-4'>Send</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label
              htmlFor={FormFieldsEnum.receiver}
              className='block text-sm font-bold mb-2'
            >
              Receiver:
            </label>
            <input
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              id={FormFieldsEnum.receiver}
              name={FormFieldsEnum.receiver}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='Enter receiver'
              value={formik.values[FormFieldsEnum.receiver]}
            />
            {formik.touched[FormFieldsEnum.receiver] &&
              formik.errors[FormFieldsEnum.receiver] && (
                <div className='text-red-600 text-sm'>
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
                  id={FormFieldsEnum.amount}
                  name={FormFieldsEnum.amount}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder='Enter amount'
                  type='number'
                  value={formik.values[FormFieldsEnum.amount]}
                />
                {formik.values[FormFieldsEnum.token] && (
                  <div className='text-sm text-gray-400 mt-1'>
                    Available: {availableAmount}
                  </div>
                )}
                {formik.touched[FormFieldsEnum.amount] &&
                  formik.errors[FormFieldsEnum.amount] && (
                    <div className='text-red-600 text-sm mt-1'>
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
                    <div className='text-red-600 text-sm mt-1'>
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
              disabled={isNFT}
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
                <div className='text-red-600 text-sm mt-1'>
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
              disabled={isNFT}
              id={FormFieldsEnum.data}
              name={FormFieldsEnum.data}
              onBlur={formik.handleBlur}
              onChange={(event) => {
                if (isNFT) {
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
          <div>
            <button
              className='w-full mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'
              type='submit'
            >
              Send
            </button>
            <Link
              className='w-full mt-4 px-4 py-2 text-sm'
              to={routeNames.dashboard}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
