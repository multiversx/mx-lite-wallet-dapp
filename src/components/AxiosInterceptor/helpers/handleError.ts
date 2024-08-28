import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { addNewCustomToast } from 'lib';
import {
  CUSTOM_TOAST_DEFAULT_DURATION,
  IS_DEVELOPMENT,
  IS_TEST
} from 'localConstants';
import { CustomToastType } from 'types';
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

  const newToast: CustomToastType = {
    toastId: 'axiosError' + Date.now(),
    type: 'custom',
    message: 'Your funds are safe.',
    duration: CUSTOM_TOAST_DEFAULT_DURATION,
    title: 'Failed to display some information.',
    status: 'Please try again later.',
    icon: faWarning,
    iconClassName: 'bg-warning'
  };

  addNewCustomToast(newToast);

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
