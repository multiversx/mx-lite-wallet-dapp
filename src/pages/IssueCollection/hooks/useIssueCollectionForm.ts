import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useSendTransactions } from 'hooks';
import {
  useGetAccount,
  useGetNetworkConfig,
  Address,
  TokenManagementTransactionsFactory,
  TransactionsFactoryConfig
} from 'lib';

import { CollectionTypeByNftEnum } from 'localConstants';
import { NftEnumType } from 'types';
import { IssueCollectionFieldsEnum } from '../types';

export const useIssueCollectionForm = () => {
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
      [IssueCollectionFieldsEnum.tokenName]: '',
      [IssueCollectionFieldsEnum.tokenTicker]: '',
      [IssueCollectionFieldsEnum.tokenType]:
        CollectionTypeByNftEnum[NftEnumType.NonFungibleESDT].toUpperCase()
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
        )
    }),
    onSubmit: async (values) => {
      const transaction =
        factory.createTransactionForRegisteringAndSettingRoles(
          new Address(address),
          {
            tokenName: values.tokenName,
            tokenTicker: values.tokenTicker.toUpperCase(),
            tokenType: values.tokenType as any,
            numDecimals: BigInt(0)
          }
        );

      await sendTransactions([transaction]);
      formik.resetForm();
    }
  });

  return formik;
};
