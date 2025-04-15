import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { useSendTransactions } from 'hooks';
import {
  useGetAccount,
  useGetNetworkConfig,
  Address,
  TokenManagementTransactionsFactory,
  TransactionsFactoryConfig
} from 'lib';
import { useGetCollectionsQuery } from 'redux/endpoints';
import { CollectionType } from 'types';
import { IssueNftFieldsEnum } from '../types';

export const useIssueNftForm = () => {
  const { address } = useGetAccount();
  const { sendTransactions } = useSendTransactions();
  const { isLoading, data } = useGetCollectionsQuery(address);
  const {
    network: { chainId }
  } = useGetNetworkConfig();
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType>();

  const collections =
    data?.map((collection) => ({
      label: collection.name,
      value: collection.collection
    })) || [];

  const factory = new TokenManagementTransactionsFactory({
    config: new TransactionsFactoryConfig({ chainID: chainId })
  });

  const formik = useFormik({
    initialValues: {
      [IssueNftFieldsEnum.name]: '',
      [IssueNftFieldsEnum.quantity]: 1,
      [IssueNftFieldsEnum.royalties]: 1,
      [IssueNftFieldsEnum.collection]: { label: '', value: '' },
      [IssueNftFieldsEnum.imageUrl]: ''
    },
    validationSchema: object().shape({
      name: string()
        .required('Required')
        .test(
          'validLength',
          'Must be between 3 - 50 characters long',
          (value) => Boolean(value && value.length >= 3 && value.length <= 50)
        ),
      quantity: number()
        .required('Required')
        .min(1, 'Should be greater than or equal to 1'),
      royalties: number()
        .required('Required')
        .min(0, 'Should be greater than or equal to 0')
        .max(100, 'Should be less than or equal to 100'),
      collection: object().nullable().required('Collection is required')
    }),
    onSubmit: async (values) => {
      const transaction = factory.createTransactionForCreatingNFT(
        new Address(address),
        {
          name: values.name,
          tokenIdentifier: values.collection.value,
          royalties: new BigNumber(values.royalties.toFixed(2))
            .multipliedBy(100)
            .toNumber(),
          initialQuantity: BigInt(values.quantity),
          hash: '',
          attributes: new Uint8Array(),
          uris: [values.imageUrl]
        }
      );

      await sendTransactions([transaction]);
      formik.resetForm();
    }
  });

  useEffect(() => {
    const collection = data?.find(
      (col) =>
        col.collection === formik.values[IssueNftFieldsEnum.collection].value
    );

    setSelectedCollection(collection);
  }, [formik.values[IssueNftFieldsEnum.collection]]);

  return { formik, isLoading, collections, selectedCollection };
};
