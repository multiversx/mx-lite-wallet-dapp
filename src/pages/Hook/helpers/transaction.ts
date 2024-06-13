import { TFunction } from 'i18next';
import { string, mixed, AnySchema, object } from 'yup';
import { NetworkType } from 'config/sharedConfig';
import {
  isContract,
  stringIsInteger,
  isNftOrMultiEsdtTx,
  validUrlSchema
} from 'helpers';

export interface TransactionFieldsType {
  t: TFunction;
  isMainnet: boolean;
  hookWhitelist?: NetworkType['hookWhitelist'];
  isSignHook?: boolean;
}

export const transactionFields = ({
  t,
  isMainnet,
  hookWhitelist,
  isSignHook = false
}: TransactionFieldsType) => {
  return {
    data: mixed(),
    token: string().when(['data'], (data: string, schema: AnySchema) => {
      return schema.test(
        'notAllowed',
        t('Token and data not allowed'),
        (value: any) => !Boolean(value && data)
      );
    }),
    sender: string(),
    gasLimit: string().test(
      'validInteger',
      t('Gas limit invaild number'),
      (value) => {
        if (value != null && value !== '') {
          return stringIsInteger(value);
        }
        return true;
      }
    ),
    gasPrice: string().test(
      'validFloat',
      t('Gas price invaild number'),
      (value) => {
        if (value != null && value !== '') {
          return stringIsInteger(value);
        }
        return true;
      }
    ),
    receiver: string()
      .required()
      .test(
        'allowed',
        t('Receiver address not allowed'),
        function checkReceiver(value) {
          const data: string = this.parent.data;
          const decodedData = decodeURIComponent(data);

          if (isNftOrMultiEsdtTx(decodedData)) {
            return true;
          }

          const whitelist = hookWhitelist ?? [];

          const isNotSignHookOnMainnet = isMainnet && !isSignHook;

          return (
            !isNotSignHookOnMainnet ||
            whitelist.includes(String(value)) ||
            isContract(String(value))
          );
        }
      ),
    value: string()
      .test(
        'required',
        t('Value field required'),
        function checkReceiver(value) {
          const data: string = this.parent.data;
          const decodedData = decodeURIComponent(data);

          if (isNftOrMultiEsdtTx(decodedData)) {
            return true;
          }

          return value != null;
        }
      )
      .test('validInteger', t('Value invaild number'), (value) => {
        if (value != null) {
          return stringIsInteger(value);
        }
        return true;
      })
  };
};

export const transactionSchema = ({ t, isMainnet }: TransactionFieldsType) => {
  const txFields = transactionFields({ t, isMainnet });
  return object({
    ...txFields,
    callbackUrl: validUrlSchema.required()
  }).required();
};
