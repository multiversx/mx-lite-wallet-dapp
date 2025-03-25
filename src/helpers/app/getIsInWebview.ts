import { getAccountProviderType } from 'lib';
import { accountSelector } from 'redux/selectors';
import { RootState, store } from 'redux/store';
import { LoginMethodsEnum } from 'types';

export const getIsInWebview = () => {
  try {
    const state: RootState = store.getState();
    const providerType = getAccountProviderType();
    const isExternalProvider = providerType === LoginMethodsEnum.extra;
    const { isWebview } = accountSelector(state);

    return isExternalProvider && isWebview;
  } catch (e) {
    console.error('Error checking getIsExternalWebview', e);
    return true;
  }
};
