import { AxiosError } from 'axios';

export interface GetErrorVerificationRetryInfoReturnType {
  remainingTrials: number;
  resetAfter: number;
  securityModeRemainingTrials?: number;
  securityModeResetAfter?: number;
}

enum ErrorsEnum {
  SECOND_CODE_EMPTY = 'second code is invalid in security mode with codeError empty code',
  SECOND_CODE_WRONG = 'second code is invalid in security mode with codeError wrong code'
}

type InfoType = {
  'remaining-trials': number;
  'reset-after': number;
  'security-mode-remaining-trials'?: number;
  'security-mode-reset-after'?: number;
};

export type GuardianErrorDataType = {
  code: 'internal_issue' | 'wrong code';
  error: ErrorsEnum;
  data: {
    'verification-retry-info': InfoType;
  };
};

export const getErrorVerificationRetryInfo = (
  error?: AxiosError<GuardianErrorDataType> | null
): GetErrorVerificationRetryInfoReturnType | null => {
  if (!error) {
    return null;
  }

  const data = error?.response?.data;

  if (!data) {
    return null;
  }

  const info: InfoType = data?.data?.['verification-retry-info'];

  return {
    remainingTrials: info['remaining-trials'],
    resetAfter: info['reset-after'],
    securityModeRemainingTrials: info['security-mode-remaining-trials'],
    securityModeResetAfter: info['security-mode-reset-after']
  };
};
