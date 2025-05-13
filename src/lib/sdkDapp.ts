import { nativeAuth } from '@multiversx/sdk-dapp/services/nativeAuth/nativeAuth';
import { replyToDapp as originalReplyToDapp } from '@multiversx/sdk-js-web-wallet-io/out/replyToDapp/replyToDapp';
import { ExtendedReplyWithPostMessageType, ReplyWithRedirectType } from 'types';

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
export { useLoginService } from '@multiversx/sdk-dapp/hooks/login/useLoginService';
export { decodeNativeAuthToken } from '@multiversx/sdk-dapp/services/nativeAuth/helpers/decodeNativeAuthToken';
export { getIsNativeAuthSingingForbidden } from '@multiversx/sdk-dapp/services/nativeAuth/helpers/getIsNativeAuthSingingForbidden';
export { decodeLoginToken } from '@multiversx/sdk-dapp/services/nativeAuth/helpers/decodeLoginToken';
export { getWebviewToken } from '@multiversx/sdk-dapp/utils/account/getWebviewToken';
export { getAccountProviderType } from '@multiversx/sdk-dapp/utils/account/getAccountProviderType';

const { getToken } = nativeAuth();
export { getToken };
export { loginWithExternalProvider } from '@multiversx/sdk-dapp/utils/account/loginWithExternalProvider';
export { addressIsValid } from '@multiversx/sdk-dapp/utils/account/addressIsValid';
export { getInterpretedTransaction } from '@multiversx/sdk-dapp/utils/transactions/getInterpretedTransaction';
export { formatAmount } from '@multiversx/sdk-dapp/utils/operations/formatAmount';
export { parseAmount } from '@multiversx/sdk-dapp/utils/operations/parseAmount';
export { getIsProviderEqualTo } from '@multiversx/sdk-dapp/utils/account/getIsProviderEqualTo';
export { removeTransactionsToSign } from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
export { extractSessionId } from '@multiversx/sdk-dapp/hooks/transactions/helpers/extractSessionId';
export { checkIsValidSender } from '@multiversx/sdk-dapp/hooks/transactions/helpers/checkIsValidSender';
export { useAddressScreens } from '@multiversx/sdk-dapp/hooks/login/useAddressScreens';
export { useBatchTransactionsTracker } from '@multiversx/sdk-dapp/hooks/transactions/batch/tracker/useBatchTransactionsTracker';
export { useCheckBatch } from '@multiversx/sdk-dapp/hooks/transactions/batch/tracker/useCheckBatch';
export { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
export { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
export { useGetAccountProvider } from '@multiversx/sdk-dapp/hooks/account/useGetAccountProvider';
export { useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks/transactions/useGetActiveTransactionsStatus';
export { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn';
export { useGetIsWalletConnectV2Initialized } from '@multiversx/sdk-dapp/hooks/account/useGetIsWalletConnectV2Initialized';
export { useGetLastPendingTransactionHash } from '@multiversx/sdk-dapp/hooks/transactions/useGetLastPendingTransactionHash';
export { useGetLastSignedMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetLastSignedMessageSession';
export { useGetSignMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignMessageSession';
export { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
export { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
export { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
export { useGetSignMessageInfoStatus } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignedMessageStatus';
export { useGetSignTransactionsError } from '@multiversx/sdk-dapp/hooks/transactions/useGetSignTransactionsError';
export { useGetSignedTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetSignedTransactions';
export { useSendBatchTransactions } from '@multiversx/sdk-dapp/hooks/transactions/batch/useSendBatchTransactions';
export { useSignMessage } from '@multiversx/sdk-dapp/hooks/signMessage/useSignMessage';
export { useSignTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useSignTransactions';
export { useSignTransactionsCommonData } from '@multiversx/sdk-dapp/hooks/transactions/useSignTransactionsCommonData';
export { useSignTransactionsWithDevice } from '@multiversx/sdk-dapp/hooks/transactions/useSignTransactionsWithDevice';
export { useSignTransactionsWithLedger } from '@multiversx/sdk-dapp/hooks/transactions/useSignTransactionsWithLedger';
export { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus';
export { verifyMessage } from '@multiversx/sdk-dapp/hooks/signMessage/verifyMessage';
export { useTransactionsTracker } from '@multiversx/sdk-dapp/hooks/transactions/useTransactionsTracker';
export { useGetAccountFromApi } from '@multiversx/sdk-dapp/apiCalls/accounts/useGetAccountFromApi';
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
export { useAxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
export { storage } from '@multiversx/sdk-dapp/utils/storage';
export { addNewCustomToast } from '@multiversx/sdk-dapp/utils/toasts';
export {
  maxDecimals,
  stringIsFloat,
  stringIsInteger
} from '@multiversx/sdk-dapp/utils/validation';

export const replyToDapp: (
  props: {
    callbackUrl: string;
    webwiewApp?: HTMLIFrameElement | null;
    postMessageData?: ExtendedReplyWithPostMessageType;
    transactionData?: ReplyWithRedirectType['transactionData'];
  },
  extensionReplyToDapp?: (props: ExtendedReplyWithPostMessageType) => void
) => void = originalReplyToDapp as any; // use as any to allow extending input params
