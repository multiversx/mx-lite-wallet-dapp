import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useSendTransactions } from 'hooks';
import {
  useGetAccount,
  useGetNetworkConfig,
  maxDecimals,
  stringIsFloat,
  Address,
  TokenManagementTransactionsFactory,
  TransactionsFactoryConfig,
  parseAmount
} from 'lib';

import { DECIMALS } from 'localConstants';
import { IssueTokenFieldsEnum } from '../types';

export const useIssueTokenForm = () => {
  const { address } = useGetAccount();
  const { sendTransactions } = useSendTransactions();

  const {
    network: { chainId }
  } = useGetNetworkConfig();

  const factory = new TokenManagementTransactionsFactory({
    config: new TransactionsFactoryConfig({ chainID: chainId })
  });

  const formik = useFormik({
    initialValues: {
      [IssueTokenFieldsEnum.tokenName]: '',
      [IssueTokenFieldsEnum.tokenTicker]: '',
      [IssueTokenFieldsEnum.numDecimals]: 18,
      [IssueTokenFieldsEnum.mintedValue]: ''
    },
    validationSchema: object().shape({
      tokenName: string()
        .required('Required')
        .matches(/^[a-zA-Z0-9]*$/, 'Alphanumeric characters only')
        .test(
          'validLength',
          'Must be between 3 - 50 characters long',
          (value) => Boolean(value && value.length >= 3 && value.length <= 50)
        ),
      tokenTicker: string()
        .matches(/^[A-Z0-9]*$/, 'Alphanumeric uppercase characters only')
        .required('Required')
        .test(
          'validLength',
          'Must be between 3 - 10 characters long',
          (value) => Boolean(value && value.length >= 3 && value.length <= 10)
        ),
      numDecimals: string()
        .matches(/^[0-9]*$/, 'Invalid number')
        .required('Required')
        .test('validLength', `Must be between 0 - ${DECIMALS}`, (value) =>
          Boolean(value && parseInt(value) >= 0 && parseInt(value) <= DECIMALS)
        ),
      mintedValue: string()
        .required('Required')
        .test('decimals', `Maximum ${DECIMALS} decimals allowed`, (value) =>
          maxDecimals(String(value))
        )
        .test('isValidNumber', 'Invalid number', (value) =>
          Boolean(value && stringIsFloat(value))
        )
    }),
    onSubmit: async (values) => {
      const transaction = factory.createTransactionForIssuingFungible(
        new Address(address),
        {
          tokenName: values.tokenName,
          tokenTicker: values.tokenTicker.toUpperCase(),
          initialSupply: BigInt(
            parseAmount(values.mintedValue, values.numDecimals)
          ),
          numDecimals: BigInt(values.numDecimals),
          canFreeze: true,
          canWipe: true,
          canPause: true,
          canChangeOwner: true,
          canUpgrade: true,
          canAddSpecialRoles: true
        }
      );

      await sendTransactions([transaction]);
      formik.resetForm();
    }
  });

  return formik;
};
