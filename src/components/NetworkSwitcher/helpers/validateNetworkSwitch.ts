import { NetworkType } from 'redux/slices';

interface INetworkSwitchValidationParams {
  currentNetwork: NetworkType;
  targetNetwork: NetworkType;
}

interface INetworkSwitchValidationReturn {
  isValid: boolean;
  error?: string;
}

export const validateNetworkSwitch = ({
  currentNetwork,
  targetNetwork
}: INetworkSwitchValidationParams): INetworkSwitchValidationReturn => {
  if (!targetNetwork || !targetNetwork.id) {
    return {
      isValid: false,
      error: 'Invalid target network'
    };
  }

  if (currentNetwork.id === targetNetwork.id) {
    return {
      isValid: false,
      error: 'Already connected to this network'
    };
  }

  if (!targetNetwork.apiAddress || !targetNetwork.walletAddress) {
    return {
      isValid: false,
      error: 'Target network missing required configuration'
    };
  }

  return { isValid: true };
};
