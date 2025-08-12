import { Address } from 'lib/sdkCore';
export const addressIsHrp = (address: string, hrp: string = 'erd') => {
  try {
    if (!address || typeof address !== 'string') {
      return false;
    }

    const addressObj = Address.newFromBech32(address);
    const bech32 = addressObj.toBech32();
    const isValid = bech32.startsWith(hrp);

    return isValid;
  } catch (error) {
    return false;
  }
};
