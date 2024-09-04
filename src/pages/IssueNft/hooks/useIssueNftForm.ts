import {
  Address,
  TokenManagementTransactionsFactory,
  TransactionsFactoryConfig
} from '@multiversx/sdk-core/out';

import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { useSendTransactions } from 'hooks';
import { useGetAccount, useGetNetworkConfig } from 'lib';
import { IssueNftFieldsEnum } from '../types';
import { useGetCollectionsQuery } from 'redux/endpoints';

export const useIssueNftForm = () => {
  const { address } = useGetAccount();
  const { sendTransactions } = useSendTransactions();
  const { isLoading, data } = useGetCollectionsQuery(address);
  const {
    network: { chainId }
  } = useGetNetworkConfig();

  const collections =
    data?.map((collection) => ({
      label: collection.name,
      value: collection.ticker
    })) || [];

  const factory = new TokenManagementTransactionsFactory({
    config: new TransactionsFactoryConfig({ chainID: chainId })
  });

  const formik = useFormik({
    initialValues: {
      [IssueNftFieldsEnum.name]: '',
      [IssueNftFieldsEnum.quantity]: 1,
      [IssueNftFieldsEnum.royalties]: 1,
      [IssueNftFieldsEnum.collection]: '',
      [IssueNftFieldsEnum.imageUrl]: ''
    },
    validationSchema: object().shape({
      name: string()
        .required('Required')
        .matches(/^[a-zA-Z0-9]*$/, 'Alphanumeric characters only')
        .test(
          'validLength',
          'Must be between 3 - 50 characters long',
          (value) => Boolean(value && value.length >= 3 && value.length <= 50)
        ),
      quantity: number()
        .required('Required')
        .min(1, 'Should be greater than or equal to 1'),
      collection: string().required('Required'),
      imageUrl: string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const transaction = factory.createTransactionForCreatingNFT({
          sender: new Address(address),
          name: values.name,
          tokenIdentifier: values.collection,
          royalties: values.quantity,
          initialQuantity: BigInt(values.quantity),
          hash: '',
          attributes: new Uint8Array(),
          uris: [values.imageUrl]
        });

        await sendTransactions([transaction]);
      } catch (err) {
        //setErrors({ amount: err.message });
      }

      formik.resetForm();
    }
  });

  return { formik, isLoading, collections };
};
