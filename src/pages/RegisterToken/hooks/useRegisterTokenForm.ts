import { ChangeEventHandler, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useRefreshNativeAuthTokenForNetwork } from 'components/NetworkSwitcher/hooks';
import { capitalize } from 'helpers';
import { useSendTransactions, useTokenOptions } from 'hooks';
import { useGetAccountInfo, addressIsValid } from 'lib';
import {
  DEVNET_CHAIN_ID,
  TESTNET_CHAIN_ID,
  MAINNET_CHAIN_ID
} from 'localConstants';
import { accountSelector } from 'redux/sdkDapp.selectors';
import { sdkDappStore } from 'redux/sdkDapp.store';
import { networkSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { EnvironmentsEnum, SendTypeEnum } from 'types';
import { sleep } from 'utils/testUtils/puppeteer';
import { getRegisterTokenTransaction } from '../helpers';
import { RegisterTokenFormFieldsEnum } from '../types';

const defaultChain = {
  label: capitalize(EnvironmentsEnum.testnet),
  value: TESTNET_CHAIN_ID
};

const NetworkChainIdMap: Record<string, EnvironmentsEnum> = {
  [MAINNET_CHAIN_ID]: EnvironmentsEnum.mainnet,
  [DEVNET_CHAIN_ID]: EnvironmentsEnum.devnet,
  [TESTNET_CHAIN_ID]: EnvironmentsEnum.testnet
};

export const useRegisterTokenForm = () => {
  const navigate = useNavigate();
  const { account } = useGetAccountInfo();
  const {
    activeNetwork: { sovereignContractAddress }
  } = useSelector(networkSelector);
  const { sendTransactions } = useSendTransactions({ skipAddNonce: true });
  const [sendType, setSendType] = useState(SendTypeEnum.esdt);
  const isNFT = sendType === SendTypeEnum.nft;
  const { tokenOptions, isLoading, tokens } = useTokenOptions({
    sendType,
    skipAddEgld: true
  });

  const refreshNativeAuthTokenForNetwork =
    useRefreshNativeAuthTokenForNetwork();

  const switchNetwork = async (networkId: string) => {
    await refreshNativeAuthTokenForNetwork({
      networkId,
      origin: window.location.origin,
      signMessageCallback: (messageToSign) => Promise.resolve(messageToSign)
    });
  };

  const defaultTokenOption = tokenOptions?.[0];

  const formik = useFormik({
    initialValues: {
      [RegisterTokenFormFieldsEnum.contract]: sovereignContractAddress,
      [RegisterTokenFormFieldsEnum.chainId]: defaultChain,
      [RegisterTokenFormFieldsEnum.token]: defaultTokenOption,
      [RegisterTokenFormFieldsEnum.type]: SendTypeEnum.esdt
    },
    validationSchema: object({
      [RegisterTokenFormFieldsEnum.contract]: string()
        .test(
          'addressIsValid',
          'Address is invalid',
          (value) => !value || addressIsValid(value)
        )
        .required('Contract is required'),
      [RegisterTokenFormFieldsEnum.token]: object()
        .nullable()
        .required('Token is required'),
      [RegisterTokenFormFieldsEnum.chainId]: object()
        .nullable()
        .required('Chain is required'),
      [RegisterTokenFormFieldsEnum.type]: string().required('Type is required')
    }),
    onSubmit: async (values) => {
      const token = tokens.find((t) => t.identifier === values.token.value);

      if (!token) {
        return;
      }

      const transaction = getRegisterTokenTransaction({
        ...account,
        values,
        token
      });

      await switchNetwork(NetworkChainIdMap[transaction.chainID]);
      await sleep(1000);
      const { nonce } = accountSelector(sdkDappStore.getState());
      transaction.setNonce(nonce);
      await sendTransactions([transaction]);
      navigate(routeNames.dashboard);
    }
  });

  const resetForm = () => {
    formik.setFieldValue(RegisterTokenFormFieldsEnum.token, defaultTokenOption);
    formik.setFieldValue(RegisterTokenFormFieldsEnum.chainId, defaultChain);

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
