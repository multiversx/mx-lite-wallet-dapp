import { ChangeEventHandler, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { object, string } from 'yup';
import { useSendTransactions } from 'hooks';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib/sdkDapp/sdkDapp.hooks';
import { addressIsValid } from 'lib/sdkDapp/sdkDapp.utils';
import { accountSelector } from 'lib/sdkDapp/sdkDapp.selectors';
import { getState } from 'lib/sdkDapp/sdkDapp.store';
import { RouteNamesEnum } from 'localConstants/routes';
import { networkSelector } from 'redux/selectors';
import { SendTypeEnum } from 'types';
import { addressIsHrp } from 'utils';
import { useRegisterTokenOptions } from './useRegisterTokenOptions';
import { getRegisterTokenTransaction } from '../helpers';
import { RegisterTokenFormFieldsEnum } from '../types';

export const useRegisterTokenForm = () => {
  const navigate = useNavigate();
  const { account } = useGetAccountInfo();
  const {
    activeNetwork: { hrp, sovereignContractAddress }
  } = useSelector(networkSelector);

  const {
    network: { chainId }
  } = useGetNetworkConfig();
  const { sendTransactions } = useSendTransactions({ skipAddNonce: true });
  const [sendType, setSendType] = useState(SendTypeEnum.esdt);
  const isNFT = sendType === SendTypeEnum.nft;
  const { tokenOptions, isLoading, tokens } = useRegisterTokenOptions(sendType);

  const defaultTokenOption = tokenOptions?.[0];

  const formik = useFormik({
    initialValues: {
      [RegisterTokenFormFieldsEnum.contract]: sovereignContractAddress,
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
      navigate(RouteNamesEnum.dashboard);
    }
  });

  const resetForm = () => {
    formik.setFieldValue(RegisterTokenFormFieldsEnum.token, defaultTokenOption);
    formik.setFieldValue(
      RegisterTokenFormFieldsEnum.contract,
      sovereignContractAddress
    );
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
