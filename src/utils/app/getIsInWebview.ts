import { getAccountProvider } from 'lib';
import { accountSelector } from 'redux/selectors';
import { RootState, store } from 'redux/store';

export const getIsInWebview = () => {
  try {
    const state: RootState = store.getState();
    const provider = getAccountProvider();
    const providerType = provider?.getType?.();

    if (!providerType) {
      return false;
    }

    const { isWebview } = accountSelector(state);

    return isWebview;
  } catch (e) {
    console.error('Error checking getIsExternalWebview', e);
    return true;
  }
};
