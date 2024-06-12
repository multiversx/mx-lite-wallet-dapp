import React, { MouseEvent } from 'react';
import { prepareTransaction } from '@multiversx/sdk-dapp-form/hooks/useFetchGasLimit/prepareTransaction';
import { calculateGasLimit } from '@multiversx/sdk-dapp-form/operations/calculateGasLimit';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { number, object, string } from 'yup';
import { sendTransactions } from 'helpers';
import { useGetTokensWithEgld } from 'hooks';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks/sdkDapp.hooks';
import { GAS_LIMIT, GAS_PRICE, RouteNamesEnum } from 'localConstants';
import { addressIsValid, formatAmount } from 'utils';

interface TokenOptionType {
  value: string;
  label: string;
}

export const Send = () => {
  const { address, account } = useGetAccountInfo();
  const { chainID } = useGetNetworkConfig();
  const { tokens, isLoading } = useGetTokensWithEgld();
  const navigate = useNavigate();

  const tokenOptions = tokens.map((token) => ({
    value: token.identifier,
    label: token.name
  }));

  const getSelectedTokenBalance = (tokenOption: TokenOptionType | null) => {
    const currentToken = tokens.find(
      (token) => token.identifier === tokenOption?.value
    );

    if (!currentToken) {
      return '0';
    }

    return formatAmount({
      input: currentToken.balance ?? '0',
      decimals: currentToken.decimals
    });
  };

  const cancelSend = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(RouteNamesEnum.dashboard);
  };

  const formik = useFormik({
    initialValues: {
      receiver: '',
      amount: '',
      gasLimit: GAS_LIMIT,
      token: null,
      data: ''
    },
    validationSchema: object({
      receiver: string()
        .required('Receiver is required')
        .test(
          'addressIsValid',
          'Address is invalid',
          (value) => !value || addressIsValid(value)
        ),
      amount: number()
        .required('Amount is required')
        .min(0, 'Amount must be greater than or equal to 0')
        .test('insufficientBalance', 'Insufficient balance', (value) => {
          if (!value || !formik.values.token) {
            return true;
          }

          const selectedTokenOption = formik.values.token as TokenOptionType;

          const selectedTokenBalance =
            getSelectedTokenBalance(selectedTokenOption);

          return new BigNumber(selectedTokenBalance).isGreaterThanOrEqualTo(
            new BigNumber(value)
          );
        }),
      gasLimit: number()
        .required('Gas limit is required')
        .positive('Gas limit must be a positive number'),
      token: object().nullable().required('Token is required')
    }),
    onSubmit: async (values) => {
      const transaction = prepareTransaction({
        balance: account.balance,
        amount: values.amount,
        gasLimit: String(values.gasLimit),
        gasPrice: String(GAS_PRICE),
        data: values.data.trim(),
        receiver: values.receiver,
        sender: address,
        nonce: account.nonce,
        chainId: chainID
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

  const availableAmount = getSelectedTokenBalance(formik.values.token);

  return (
    <div className='flex flex-col p-4 max-w-2xl w-full bg-white shadow-md rounded'>
      <h2 className='text-3xl font-bold mb-4'>Send</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='receiver' className='block text-sm font-bold mb-2'>
              Receiver:
            </label>
            <input
              id='receiver'
              name='receiver'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.receiver}
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              placeholder='Enter receiver'
            />
            {formik.touched.receiver && formik.errors.receiver && (
              <div className='text-red-600 text-sm'>
                {formik.errors.receiver}
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='amount' className='block text-sm font-bold mb-2'>
              Amount:
            </label>
            <div className='flex flex-row gap-2'>
              <div className='flex flex-col block w-full'>
                <input
                  type='number'
                  id='amount'
                  name='amount'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  className='p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
                  placeholder='Enter amount'
                />
                {formik.values.token && (
                  <div className='text-sm text-gray-400 mt-1'>
                    Available: {availableAmount}
                  </div>
                )}
                {formik.touched.amount && formik.errors.amount && (
                  <div className='text-red-600 text-sm mt-1'>
                    {formik.errors.amount}
                  </div>
                )}
              </div>
              <div className='flex flex-col block w-1/2'>
                <Select
                  className='text-sm text-gray-700 placeholder-gray-400'
                  isLoading={isLoading}
                  options={tokenOptions}
                  name='token'
                  onChange={(option) => formik.setFieldValue('token', option)}
                  onBlur={() => formik.setFieldTouched('token', true)}
                  value={formik.values.token}
                />
                {formik.touched.token && formik.errors.token && (
                  <div className='text-red-600 text-sm mt-1'>
                    {formik.errors.token}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='gasLimit' className='block text-sm font-bold mb-2'>
              Gas Limit:
            </label>
            <input
              type='number'
              id='gasLimit'
              name='gasLimit'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gasLimit}
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              placeholder='Enter gas limit'
            />
            {formik.touched.gasLimit && formik.errors.gasLimit && (
              <div className='text-red-600 text-sm mt-1'>
                {formik.errors.gasLimit}
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='data' className='block text-sm font-bold mb-2'>
              Data:
            </label>
            <textarea
              id='data'
              name='data'
              onChange={(event) => {
                const gasLimit = calculateGasLimit({
                  data: event.target.value
                });

                formik.setFieldValue('gasLimit', gasLimit);

                return formik.handleChange(event);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.data}
              className='block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded'
              placeholder='Enter your data'
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'
            >
              Send
            </button>
            <button
              onClick={cancelSend}
              type='button'
              className='w-full mt-4 px-4 py-2 text-sm'
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
