import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { array, number, object, string } from 'yup';
import { addressIsErd, getSelectedTokenBalance } from 'helpers';
import { useSendTransactions, useTokenOptions } from 'hooks';
import { addressIsValid, useGetAccountInfo, useGetNetworkConfig } from 'lib';
import { networkSelector } from 'redux/selectors';
import { SendTypeEnum } from 'types';
import { getSovereignTransferTransaction } from '../helpers';
import { SovereignTransferFormFieldsEnum } from '../types';

export const useSovereignTransferForm = () => {
  const { address } = useGetAccountInfo();
  const {
    network: { chainId }
  } = useGetNetworkConfig();

  const {
    activeNetwork: { sovereignContractAddress }
  } = useSelector(networkSelector);

  const { sendTransactions } = useSendTransactions();
  const {
    allTokens,
    getTokenOptionsByType,
    getTokens,
    isLoading,
    tokenOptions
  } = useTokenOptions({
    sendType: SendTypeEnum.esdt
  });

  const defaultTokenOption = tokenOptions?.[0];

  const defaultToken = {
    [SovereignTransferFormFieldsEnum.amount]: '',
    [SovereignTransferFormFieldsEnum.token]: defaultTokenOption,
    [SovereignTransferFormFieldsEnum.type]: SendTypeEnum.esdt
  };

  const formik = useFormik({
    initialValues: {
      [SovereignTransferFormFieldsEnum.contract]: sovereignContractAddress,
      [SovereignTransferFormFieldsEnum.receiver]: '',
      [SovereignTransferFormFieldsEnum.token]: '',
      [SovereignTransferFormFieldsEnum.tokens]: [defaultToken]
    },
    validationSchema: object({
      [SovereignTransferFormFieldsEnum.receiver]: string()
        .test(
          'addressIsValid',
          'Address is invalid',
          (value) => !value || addressIsValid(value) || addressIsErd(value)
        )
        .required('Receiver is required'),
      [SovereignTransferFormFieldsEnum.contract]: string()
        .test(
          'addressIsValid',
          'Contract is invalid',
          (value) => !value || addressIsValid(value)
        )
        .required('Contract is required'),
      [SovereignTransferFormFieldsEnum.tokens]: array().of(
        object().shape({
          [SovereignTransferFormFieldsEnum.amount]: number()
            .required('Amount is required')
            .min(0, 'Amount must be greater than or equal to 0')
            .test(
              'insufficientBalance',
              'Insufficient balance',
              function (value) {
                if (
                  !value ||
                  !formik.values[SovereignTransferFormFieldsEnum.tokens]?.length
                ) {
                  return true;
                }

                // Find current token
                const selectedToken = this.parent;

                const isNFT =
                  selectedToken[SovereignTransferFormFieldsEnum.type] ===
                  SendTypeEnum.nft;

                const selectedTokenBalance = getSelectedTokenBalance({
                  isNFT,
                  selectedToken:
                    selectedToken[SovereignTransferFormFieldsEnum.token]?.value,
                  tokens: getTokens(
                    selectedToken[SovereignTransferFormFieldsEnum.type]
                  )
                });

                return new BigNumber(
                  selectedTokenBalance
                ).isGreaterThanOrEqualTo(new BigNumber(value));
              }
            ),
          [SovereignTransferFormFieldsEnum.token]: object()
            .nullable()
            .required('Token is required'),
          [SovereignTransferFormFieldsEnum.type]:
            string().required('Type is required')
        })
      )
    }),
    onSubmit: async (values) => {
      const transaction = getSovereignTransferTransaction({
        address,
        chainId,
        tokens: allTokens,
        values
      });

      await sendTransactions([transaction]);

      formik.resetForm();
    }
  });

  const getSelectedToken = (selectedToken: string) =>
    allTokens?.find((token) => token.identifier === selectedToken);

  const getIsNFT = (type: SendTypeEnum) => type === SendTypeEnum.nft;

  const getTokenAvailableAmount = ({
    sendType,
    token
  }: {
    sendType: SendTypeEnum;
    token?: string;
  }) => {
    const isNFT = sendType === SendTypeEnum.nft;

    return getSelectedTokenBalance({
      isNFT,
      selectedToken: token,
      tokens: getTokens(sendType)
    });
  };

  const handleAddToken = () => {
    const formTokens = formik.values[SovereignTransferFormFieldsEnum.tokens];
    formTokens.push(defaultToken);
    formik.setFieldValue(SovereignTransferFormFieldsEnum.tokens, formTokens);
  };

  const handleRemoveToken = (index: number) => () => {
    const formTokens = formik.values[SovereignTransferFormFieldsEnum.tokens];
    formTokens.splice(index, 1);
    formik.setFieldValue(SovereignTransferFormFieldsEnum.tokens, formTokens);
  };

  const getCanEditNftAmount = (availableAmount: number | string) =>
    new BigNumber(availableAmount).isGreaterThan(1);

  return {
    formik,
    getCanEditNftAmount,
    getIsNFT,
    getSelectedToken,
    getTokenAvailableAmount,
    getTokenOptionsByType,
    handleAddToken,
    handleRemoveToken,
    isLoading
  };
};
