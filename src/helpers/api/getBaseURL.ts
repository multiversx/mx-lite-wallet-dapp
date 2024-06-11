import { apiAddressSelector } from '@multiversx/sdk-dapp/reduxStore/selectors/networkConfigSelectors';
import { store } from '@multiversx/sdk-dapp/reduxStore/store';

export const getBaseURL = () => {
  const state = store.getState();

  return apiAddressSelector(state);
};
