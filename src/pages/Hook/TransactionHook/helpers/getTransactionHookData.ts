import { InferType, object, string } from 'yup';
import { parseQueryParams, sanitizeSignHookCallbackUrl } from 'helpers';
import { IS_DEVELOPMENT } from 'localConstants';
import { transactionSchema } from './transactionSchema';

interface GetTransactionHookDataParamsType {
  chainId: string;
  schema: ReturnType<typeof transactionSchema>;
}

export const getTransactionHookData =
  ({ chainId, schema }: GetTransactionHookDataParamsType) =>
  (search: string) => {
    type TransactionHookType = InferType<typeof schema>;
    const hook = parseQueryParams(search) as TransactionHookType;

    try {
      schema
        .concat(
          object({
            chainId: string().test(
              'sameAsConfig',
              'Invalid Chain Id',
              (value) => {
                if (value != null && value !== '') {
                  return value === chainId;
                }

                return true;
              }
            )
          }).notRequired()
        )
        .validateSync(hook, { strict: true });

      const { callbackUrl } = sanitizeSignHookCallbackUrl({
        callbackUrl: hook.callbackUrl
      });

      return {
        ...hook,
        hookUrl: search,
        callbackUrl
      };
    } catch (errors) {
      if (IS_DEVELOPMENT) {
        console.error('hook format errors: ', errors);
      }
    }

    return null;
  };
