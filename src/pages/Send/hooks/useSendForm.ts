import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { number, object, string } from 'yup';
import {
  prepareTransaction,
  getEgldLabel,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';
import { addressIsValid } from 'lib/sdkDapp';
import { GAS_LIMIT, GAS_PRICE, SearchParamsEnum } from 'localConstants';
import { useSendTransactions } from './useSendTransactions';
import { useTokenOptions } from './useTokenOptions';
import { getSelectedTokenBalance } from '../helpers';
import { FormFieldsEnum, SendTypeEnum, TokenOptionType } from '../types';

export const useSendForm = () => {
  const { address, account } = useGetAccountInfo();
  const { chainID } = useGetNetworkConfig();
  const { sendTransactions } = useSendTransactions();
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenIdParam = searchParams.get(SearchParamsEnum.tokenId);
  const isNftParam = searchParams.get(SearchParamsEnum.isNFT);
  const [sendType, setSendType] = useState(
    isNftParam ? SendTypeEnum.nft : SendTypeEnum.esdt
  );

  const { tokenOptions, isLoading, tokens } = useTokenOptions(sendType);
  const defaultTokenOption = tokenIdParam
    ? tokenOptions?.find((option) => option.value === tokenIdParam)
    : tokenOptions?.[0];

  const egldLabel = getEgldLabel();

  const formik = useFormik({
    initialValues: {
      [FormFieldsEnum.amount]: '',
      [FormFieldsEnum.data]: '',
      [FormFieldsEnum.gasLimit]: GAS_LIMIT,
      [FormFieldsEnum.receiver]: '',
      [FormFieldsEnum.token]: defaultTokenOption,
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
          'Receiver should be different than current account',
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

          const selectedTokenBalance = getSelectedTokenBalance({
            tokens,
            tokenOption: selectedTokenOption
          });

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
      const isEgldSend = values[FormFieldsEnum.token]?.value === egldLabel;

      const transaction = prepareTransaction({
        amount: isEgldSend ? String(values.amount) : '0',
        balance: account.balance,
        chainId: chainID,
        data: values[FormFieldsEnum.data].trim(),
        gasLimit: String(values[FormFieldsEnum.gasLimit]),
        gasPrice: String(GAS_PRICE),
        nonce: account.nonce,
        receiver: isNFT ? address : values.receiver,
        sender: address
      });

      await sendTransactions([transaction]);

      formik.resetForm();
    }
  });

  useEffect(() => {
    formik.setFieldValue('token', defaultTokenOption);
    formik.resetForm();
    setSearchParams();
  }, [defaultTokenOption, tokenIdParam]);

  useEffect(() => {
    formik.resetForm();
  }, [sendType]);

  const isNFT = sendType === SendTypeEnum.nft;

  const selectedToken = tokens?.find(
    (token) => token.identifier === formik.values[FormFieldsEnum.token]?.value
  );

  const isEgldToken = selectedToken?.identifier === getEgldLabel();
  const availableAmount = getSelectedTokenBalance({
    tokens,
    tokenOption: formik.values[FormFieldsEnum.token]
  });

  const canEditNftAmount = new BigNumber(availableAmount).isGreaterThan(1);

  const handleTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: SendTypeEnum
  ) => {
    setSendType(type);
    formik.handleChange(event);
  };

  useEffect(() => {
    const formTokenValue = formik.values[FormFieldsEnum.token]?.value;
    const selectedTokenValue = defaultTokenOption?.value;

    if (!formTokenValue && formTokenValue !== selectedTokenValue) {
      formik.setFieldValue(FormFieldsEnum.token, defaultTokenOption);
      formik.resetForm();
    }
  }, [defaultTokenOption, tokenIdParam]);

  useEffect(() => {
    formik.resetForm();
  }, [sendType]);

  return {
    availableAmount,
    canEditNftAmount,
    formik,
    handleTypeChange,
    isEgldToken,
    isLoading,
    isNFT,
    tokenOptions
  };
};
