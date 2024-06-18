import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { addressIsValid } from 'helpers/sdkDapp/sdkDapp.helpers';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks';
import { PartialNftType, prepareTransaction } from 'lib';
import { GAS_LIMIT, GAS_PRICE } from 'localConstants';
import { TokenType } from 'types';
import { useSendTransactions } from './useSendTransactions';
import { getSelectedTokenBalance } from '../helpers';
import { FormFieldsEnum, SendTypeEnum, TokenOptionType } from '../types';

export const useSendForm = ({
  isNFT,
  tokens,
  selectedToken
}: {
  isNFT: boolean;
  tokens?: PartialNftType[] | TokenType[];
  selectedToken?: TokenOptionType;
}) => {
  const { address, account } = useGetAccountInfo();
  const { chainID } = useGetNetworkConfig();
  const { sendTransactions } = useSendTransactions();

  const formik = useFormik({
    initialValues: {
      [FormFieldsEnum.amount]: '',
      [FormFieldsEnum.data]: '',
      [FormFieldsEnum.gasLimit]: GAS_LIMIT,
      [FormFieldsEnum.receiver]: '',
      [FormFieldsEnum.token]: selectedToken,
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

      await sendTransactions([transaction]);

      formik.resetForm();
    }
  });

  return formik;
};
