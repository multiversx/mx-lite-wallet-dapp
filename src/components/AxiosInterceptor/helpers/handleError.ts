import { createCustomToast } from '@multiversx/sdk-dapp/out/store/actions/toasts/toastsActions';
import {
  CUSTOM_TOAST_DEFAULT_DURATION,
  IS_DEVELOPMENT,
  IS_TEST
} from 'localConstants';
import { hash } from '../../../../version.json';

const IGNORED_LIST = [
  '/stake-pool',
  '/version',
  'usernames/',
  '/v1/login',
  '/v1/users'
];
const walletVersion = hash;
let isToastVisible = false;

const createNotification = () => {
  if (isToastVisible) {
    return;
  }

  isToastVisible = true;

  createCustomToast({
    toastId: 'axiosError' + Date.now(),
    icon: 'warning',
    iconClassName: 'bg-warning',
    message: 'Your funds are safe.',
    title: 'Failed to display some information.'
  });

  setTimeout(() => {
    isToastVisible = false;
  }, CUSTOM_TOAST_DEFAULT_DURATION);
};

export const handleError = (axiosErrorUrl: string) => {
  if (IS_TEST) {
    return;
  }

  const logError =
    axiosErrorUrl && !IGNORED_LIST.some((url) => axiosErrorUrl.includes(url));

  if (!logError) {
    return;
  }

  const hasWalletVersion = walletVersion != null;

  if (!hasWalletVersion && IS_DEVELOPMENT) {
    createNotification();
  }
};
