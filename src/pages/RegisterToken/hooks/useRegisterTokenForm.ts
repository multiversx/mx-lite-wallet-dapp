import { ChangeEventHandler, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { object, string } from 'yup';
import { networks } from 'config';
import { useSendTransactions } from 'hooks';
import {
  EnvironmentsEnum,
  addressIsValid,
  useGetAccountInfo,
  accountSelector,
  getState,
  useGetNetworkConfig
} from 'lib';
import { networkSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { SendTypeEnum } from 'types';
import { addressIsHrp } from 'utils';
import { useRegisterTokenOptions } from './useRegisterTokenOptions';
import { getRegisterTokenTransaction } from '../helpers';
import { RegisterTokenFormFieldsEnum } from '../types';

export const useRegisterTokenForm = () => {
  const navigate = useNavigate();
  const { account } = useGetAccountInfo();
  const {
    activeNetwork: { hrp }
  } = useSelector(networkSelector);

  const {
    network: { chainId }
  } = useGetNetworkConfig();
  const { sendTransactions } = useSendTransactions({ skipAddNonce: true });
  const [sendType, setSendType] = useState(SendTypeEnum.esdt);
  const isNFT = sendType === SendTypeEnum.nft;
  const { tokenOptions, isLoading, tokens } = useRegisterTokenOptions(sendType);

  const defaultTokenOption = tokenOptions?.[0];
  const testnetContract =
    networks.find((network) => network.id === EnvironmentsEnum.testnet)
      ?.sovereignContractAddress ?? '';

  const formik = useFormik({
    initialValues: {
      [RegisterTokenFormFieldsEnum.contract]: testnetContract,
      [RegisterTokenFormFieldsEnum.token]: defaultTokenOption,
      [RegisterTokenFormFieldsEnum.type]: SendTypeEnum.esdt
    },
    validationSchema: object({
      [RegisterTokenFormFieldsEnum.contract]: string()
        .test(
          'addressIsValid',
          'Address is invalid',
          (value) => !value || addressIsValid(value) || addressIsHrp(value, hrp)
        )
        .required('Contract is required'),
      [RegisterTokenFormFieldsEnum.token]: object()
        .nullable()
        .required('Token is required'),
      [RegisterTokenFormFieldsEnum.type]: string().required('Type is required')
    }),
    onSubmit: async (values) => {
      const token = tokens.find((t) =>
        'identifier' in t
          ? t.identifier === values.token.value
          : t.ticker === values.token.value
      );

      if (!token) {
        return;
      }

      const transaction = getRegisterTokenTransaction({
        address: account.address,
        chainId,
        values,
        token
      });

      const { nonce } = accountSelector(getState());
      transaction.nonce = BigInt(nonce);
      await sendTransactions([transaction]);
      navigate(routeNames.dashboard);
    }
  });

  const resetForm = () => {
    formik.setFieldValue(RegisterTokenFormFieldsEnum.token, defaultTokenOption);
    formik.setFieldValue(RegisterTokenFormFieldsEnum.contract, testnetContract);
  };

  const handleOnSendTypeChange: (
    sendType: SendTypeEnum
  ) => ChangeEventHandler<HTMLInputElement> =
    (selectedType: SendTypeEnum) => (event) => {
      setSendType(selectedType);

      return formik.handleChange(event);
    };

  useEffect(() => {
    const formTokenValue =
      formik.values[RegisterTokenFormFieldsEnum.token]?.value;
    const selectedTokenValue = defaultTokenOption?.value;

    if (!formTokenValue && formTokenValue !== selectedTokenValue) {
      resetForm();
    }
  }, [defaultTokenOption]);

  useEffect(() => {
    formik.setFieldValue(RegisterTokenFormFieldsEnum.token, defaultTokenOption);
  }, [sendType]);

  return {
    formik,
    handleOnSendTypeChange,
    isLoading,
    isNFT,
    tokenOptions
  };
};
