import { nativeAuth } from '@multiversx/sdk-dapp/services/nativeAuth/nativeAuth';
import { replyToDapp as originalReplyToDapp } from '@multiversx/sdk-js-web-wallet-io/out/replyToDapp/replyToDapp';
import { ExtendedReplyWithPostMessageType, ReplyWithRedirectType } from 'types';

// Utility exports
export { getEgldLabel } from '@multiversx/sdk-dapp/utils/network/getEgldLabel';
export { getTransactions } from '@multiversx/sdk-dapp/apiCalls/transactions/getTransactions';
export { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
export { sendBatchTransactions as sendBatchTransactionsSdkDapp } from '@multiversx/sdk-dapp/services/transactions/sendBatchTransactions';
export { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';
export { logout } from '@multiversx/sdk-dapp/utils/logout';
export { signTransactions } from '@multiversx/sdk-dapp/services/transactions/signTransactions';
export { trimUsernameDomain } from '@multiversx/sdk-dapp/hooks/account/helpers';
export { getAccount } from '@multiversx/sdk-dapp/utils/account/getAccount';
export { getAddress } from '@multiversx/sdk-dapp/utils/account/getAddress';
export { newTransaction } from '@multiversx/sdk-dapp/models';
export { decodeNativeAuthToken } from '@multiversx/sdk-dapp/services/nativeAuth/helpers/decodeNativeAuthToken';
export { getIsNativeAuthSingingForbidden } from '@multiversx/sdk-dapp/services/nativeAuth/helpers/getIsNativeAuthSingingForbidden';
export { decodeLoginToken } from '@multiversx/sdk-dapp/services/nativeAuth/helpers/decodeLoginToken';
export { getWebviewToken } from '@multiversx/sdk-dapp/utils/account/getWebviewToken';
export { getAccountProviderType } from '@multiversx/sdk-dapp/utils/account/getAccountProviderType';
export { loginWithExternalProvider } from '@multiversx/sdk-dapp/utils/account/loginWithExternalProvider';
export { addressIsValid } from '@multiversx/sdk-dapp/utils/account/addressIsValid';
export { getInterpretedTransaction } from '@multiversx/sdk-dapp/utils/transactions/getInterpretedTransaction';
export { formatAmount } from '@multiversx/sdk-dapp/utils/operations/formatAmount';
export { parseAmount } from '@multiversx/sdk-dapp/utils/operations/parseAmount';
export { getIsProviderEqualTo } from '@multiversx/sdk-dapp/utils/account/getIsProviderEqualTo';
export { removeTransactionsToSign } from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
export { extractSessionId } from '@multiversx/sdk-dapp/hooks/transactions/helpers/extractSessionId';
export { checkIsValidSender } from '@multiversx/sdk-dapp/hooks/transactions/helpers/checkIsValidSender';
export { verifyMessage } from '@multiversx/sdk-dapp/hooks/signMessage/verifyMessage';
export { storage } from '@multiversx/sdk-dapp/utils/storage';
export { addNewCustomToast } from '@multiversx/sdk-dapp/utils/toasts';
export {
  maxDecimals,
  stringIsFloat,
  stringIsInteger
} from '@multiversx/sdk-dapp/utils/validation';
export {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
export {
  setTransactionsDisplayInfoState,
  setTransactionsToSignedState
} from '@multiversx/sdk-dapp/services/transactions/updateSignedTransactions';
export { sendBatchTransactions } from '@multiversx/sdk-dapp/services/transactions/sendBatchTransactions';

const { getToken } = nativeAuth();
export { getToken };

export const replyToDapp: (
  props: {
    callbackUrl: string;
    webwiewApp?: HTMLIFrameElement | null;
    postMessageData?: ExtendedReplyWithPostMessageType;
    transactionData?: ReplyWithRedirectType['transactionData'];
  },
  extensionReplyToDapp?: (props: ExtendedReplyWithPostMessageType) => void
) => void = originalReplyToDapp as any;
