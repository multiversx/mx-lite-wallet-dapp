import { NetworkType } from 'redux/slices';

interface INetworkSwitchValidationParams {
  currentNetwork: NetworkType;
  targetNetwork: NetworkType;
  isNetworkSwitching: boolean;
}

interface INetworkSwitchValidationReturn {
  isValid: boolean;
  error?: string;
}

export const validateNetworkSwitch = ({
  currentNetwork,
  targetNetwork,
  isNetworkSwitching
}: INetworkSwitchValidationParams): INetworkSwitchValidationReturn => {
  if (isNetworkSwitching) {
    return {
      isValid: false,
      error: 'Network switch already in progress'
    };
  }

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
