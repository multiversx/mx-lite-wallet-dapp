import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { prepareTransaction } from '@multiversx/sdk-dapp-form/hooks/useFetchGasLimit/prepareTransaction';
import { calculateGasLimit } from '@multiversx/sdk-dapp-form/operations/calculateGasLimit';
import { calculateNftGasLimit } from '@multiversx/sdk-dapp-form/operations/calculateNftGasLimit';
import { computeNftDataField } from '@multiversx/sdk-dapp-form/operations/computeDataField';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { number, object, string } from 'yup';
import { sendTransactions } from 'helpers';
import { useGetTokensWithEgld } from 'hooks';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks/sdkDapp.hooks';
import { GAS_LIMIT, GAS_PRICE, RouteNamesEnum } from 'localConstants';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { addressIsValid, formatAmount } from 'utils';

interface TokenOptionType {
  label: string;
  value: string;
}

enum SendTypeEnum {
  esdt = 'ESDT',
  nft = 'NFT'
}

enum FormFieldsEnum {
  amount = 'amount',
  data = 'data',
  gasLimit = 'gasLimit',
  receiver = 'receiver',
  token = 'token',
  type = 'type'
}

export const Send = () => {
  const { address, account, websocketEvent } = useGetAccountInfo();
  const { chainID } = useGetNetworkConfig();
  const navigate = useNavigate();
  const { tokens, isLoading: isLoadingTokens } = useGetTokensWithEgld();
  const [fetchNFTs, { data: nfts, isLoading: isLoadingNfts }] =
    useLazyGetNftsQuery();
  const [sendType, setSendType] = useState(SendTypeEnum.esdt);
  const isLoading = isLoadingNfts || isLoadingTokens;
  const isNFT = sendType === SendTypeEnum.nft;

  const tokenOptions = useMemo(() => {
    if (!isNFT) {
      return tokens.map((token) => ({
        value: token.identifier,
        label: token.name
      }));
    }

    return nfts?.map((token) => ({
      value: token.identifier,
      label: token.name
    }));
  }, [nfts, tokens, sendType]);

  const getSelectedTokenBalance = (tokenOption: TokenOptionType | null) => {
    const items = isNFT ? nfts : tokens;
    const currentToken = items?.find(
      (token) => token.identifier === tokenOption?.value
    );

    if (!currentToken) {
      return '0';
    }

    if (!currentToken.decimals) {
      return currentToken.balance ?? '0';
    }

    return formatAmount({
      input: currentToken.balance ?? '0',
      decimals: currentToken.decimals
    });
  };

  const formik = useFormik({
    initialValues: {
      [FormFieldsEnum.amount]: '',
      [FormFieldsEnum.data]: '',
      [FormFieldsEnum.gasLimit]: GAS_LIMIT,
      [FormFieldsEnum.receiver]: '',
      [FormFieldsEnum.token]: tokenOptions?.[0] ?? null,
      [FormFieldsEnum.type]: SendTypeEnum.esdt
    },
    validationSchema: object({
      [FormFieldsEnum.receiver]: string()
        .test(
          'addressIsValid',
          'Address is invalid',
          (value) => !value || addressIsValid(value)
        )
        .test(
          'differentSender',
          'Sender should be different than current account',
          (value) => !value || !isNFT || value !== address
        )
        .required('Receiver is required'),
      [FormFieldsEnum.amount]: number()
        .required('Amount is required')
        .min(0, 'Amount must be greater than or equal to 0')
        .test('insufficientBalance', 'Insufficient balance', (value) => {
          if (!value || !formik.values[FormFieldsEnum.token]) {
            return true;
          }

          const selectedTokenOption = formik.values[
            FormFieldsEnum.token
          ] as TokenOptionType;

          const selectedTokenBalance =
            getSelectedTokenBalance(selectedTokenOption);

          return new BigNumber(selectedTokenBalance).isGreaterThanOrEqualTo(
            new BigNumber(value)
          );
        }),
      [FormFieldsEnum.gasLimit]: number()
        .required('Gas limit is required')
        .positive('Gas limit must be a positive number'),
      [FormFieldsEnum.token]: object().nullable().required('Token is required'),
      [FormFieldsEnum.type]: string().required('Type is required')
    }),
    onSubmit: async (values) => {
      const transaction = prepareTransaction({
        amount: isNFT ? '0' : String(values.amount),
        balance: account.balance,
        chainId: chainID,
        data: values[FormFieldsEnum.data].trim(),
        gasLimit: String(values[FormFieldsEnum.gasLimit]),
        gasPrice: String(GAS_PRICE),
        nonce: account.nonce,
        receiver: isNFT ? address : values.receiver,
        sender: address
      });

      await sendTransactions({
        transactions: [transaction],
        signWithoutSending: false,
        transactionsDisplayInfo: {
          successMessage: 'Transactions successfully sent',
          errorMessage: 'An error has occurred',
          submittedMessage: 'Success',
          processingMessage: 'Processing transactions',
          transactionDuration: 10000
        },
        redirectAfterSign: false
      });
    }
  });

  const availableAmount = getSelectedTokenBalance(
    formik.values[FormFieldsEnum.token]
  );

  const canEditNftAmount = new BigNumber(availableAmount).isGreaterThan(1);

  const cancelSend = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(RouteNamesEnum.dashboard);
  };

  useEffect(() => {
    fetchNFTs({ address });
  }, [address, websocketEvent]);

  useEffect(() => {
    const selectedToken = tokenOptions?.[0] ?? null;
    const balance = selectedToken ? getSelectedTokenBalance(selectedToken) : '';
    formik.setFieldValue(FormFieldsEnum.data, '');
    formik.setFieldValue(FormFieldsEnum.amount, balance);
    formik.setFieldValue(FormFieldsEnum.token, selectedToken);
    formik.setFieldValue(FormFieldsEnum.gasLimit, GAS_LIMIT);

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

    const selectedNft = nfts?.find(
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
              <div className='flex flex-col block w-full'>
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
              <div className='flex flex-col block w-1/2'>
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
            <button
              className='w-full mt-4 px-4 py-2 text-sm'
              onClick={cancelSend}
              type='button'
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
