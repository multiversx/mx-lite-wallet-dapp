import { getAccountProvider, ProviderTypeEnum } from 'lib';
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

    const isExternalProvider = !Object.values(ProviderTypeEnum).includes(
      providerType as ProviderTypeEnum
    );

    const { isWebview } = accountSelector(state);

    return isExternalProvider && isWebview;
  } catch (e) {
    console.error('Error checking getIsExternalWebview', e);
    return true;
  }
};
