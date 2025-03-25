import { Address } from '@multiversx/sdk-core';

export const addressIsErd = (address: string) => {
  try {
    const addressObj = Address.newFromBech32(address);
    return addressObj.toBech32().startsWith('erd');
  } catch (error) {
    return false;
  }
};
