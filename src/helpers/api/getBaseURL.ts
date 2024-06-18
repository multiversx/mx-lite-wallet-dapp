import { apiAddressSelector, sdkDappStore } from 'redux/sdkDapp.store';

export const getBaseURL = () => {
  const state = sdkDappStore.getState();

  return apiAddressSelector(state);
};
