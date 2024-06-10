import { sdkDappStore } from 'redux/sdkDapp.store';
import { isWalletConnectV2InitializedSelector } from 'redux/selectors';

export const waitForWalletConnectV2Initialization = ({
  maxRetries
}: {
  maxRetries: number;
}) => {
  return new Promise((resolve, reject) => {
    let retries = 0;

    // Function to periodically check the value of isInitializing
    const checkIsInitializing = () => {
      const isInitializing = isWalletConnectV2InitializedSelector(
        sdkDappStore.getState()
      );

      if (isInitializing === false) {
        resolve(false);
        return;
      }
      // If isInitializing is still true and maximum retries not reached, wait for some time and check again
      if (retries < maxRetries) {
        retries++;
        setTimeout(checkIsInitializing, 1000);
        return;
      }
      // Reject the promise if maximum retries reached
      reject(new Error('WalletConnect could not be initialized'));
    };

    checkIsInitializing();
  });
};
