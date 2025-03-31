import { ChangeEventHandler, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { object, string } from 'yup';
import { useRefreshNativeAuthTokenForNetwork } from 'components/NetworkSwitcher/hooks';
import { networks } from 'config';
import { capitalize, addressIsErd } from 'helpers';
import { useSendTransactions } from 'hooks';
import { addressIsValid, useGetAccountInfo } from 'lib';
import {
  DEVNET_CHAIN_ID,
  MAINNET_CHAIN_ID,
  TESTNET_CHAIN_ID
} from 'localConstants';
import { accountSelector } from 'redux/sdkDapp.selectors';
import { sdkDappStore } from 'redux/sdkDapp.store';
import { routeNames } from 'routes';
import { EnvironmentsEnum, SendTypeEnum } from 'types';
import { sleep } from 'utils/testUtils/puppeteer';
import { useRegisterTokenOptions } from './useRegisterTokenOptions';
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

  const { sendTransactions } = useSendTransactions({ skipAddNonce: true });
  const [sendType, setSendType] = useState(SendTypeEnum.esdt);
  const isNFT = sendType === SendTypeEnum.nft;
  const { tokenOptions, isLoading, tokens } = useRegisterTokenOptions(sendType);

  const refreshNativeAuthTokenForNetwork =
    useRefreshNativeAuthTokenForNetwork();

  const switchNetwork = async (networkId: string) => {
    await refreshNativeAuthTokenForNetwork({
      networkId,
      origin: window.location.origin,
      signMessageCallback: (messageToSign) => Promise.resolve(messageToSign),
      preventPageReload: true
    });
  };

  const defaultTokenOption = tokenOptions?.[0];
  const testnetContract =
    networks.find((network) => network.id === EnvironmentsEnum.testnet)
      ?.sovereignContractAddress ?? '';

  const formik = useFormik({
    initialValues: {
      [RegisterTokenFormFieldsEnum.contract]: testnetContract,
      [RegisterTokenFormFieldsEnum.chainId]: defaultChain,
      [RegisterTokenFormFieldsEnum.token]: defaultTokenOption,
      [RegisterTokenFormFieldsEnum.type]: SendTypeEnum.esdt
    },
    validationSchema: object({
      [RegisterTokenFormFieldsEnum.contract]: string()
        .test(
          'addressIsValid',
          'Address is invalid',
          (value) => !value || addressIsValid(value) || addressIsErd(value)
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
      const token = tokens.find((t) =>
        'identifier' in t
          ? t.identifier === values.token.value
          : t.ticker === values.token.value
      );

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
      transaction.nonce = BigInt(nonce);
      await sendTransactions([transaction]);
      navigate(routeNames.dashboard);
    }
  });

  const resetForm = () => {
    formik.setFieldValue(RegisterTokenFormFieldsEnum.token, defaultTokenOption);
    formik.setFieldValue(RegisterTokenFormFieldsEnum.chainId, defaultChain);
    formik.setFieldValue(RegisterTokenFormFieldsEnum.contract, testnetContract);
  };

  const handleOnSendTypeChange: (
    sendType: SendTypeEnum
  ) => ChangeEventHandler<HTMLInputElement> =
    (selectedType: SendTypeEnum) => (event) => {
      setSendType(selectedType);

      return formik.handleChange(event);
    };

  const handleChainChange = (
    option: SingleValue<{ label: string; value: string }>
  ) => {
    formik.setFieldValue(RegisterTokenFormFieldsEnum.chainId, option);

    if (!option) {
      return;
    }

    const selectedNetwork = networks.find(
      (network) => network.id === option.label.toLowerCase()
    );

    formik.setFieldValue(
      RegisterTokenFormFieldsEnum.contract,
      selectedNetwork?.sovereignContractAddress ?? ''
    );
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
    handleChainChange,
    isLoading,
    isNFT,
    tokenOptions
  };
};
