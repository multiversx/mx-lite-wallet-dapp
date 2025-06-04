import { AccountStatesEnum } from '../utils/enums';

export const sendData = {
  adress: AccountStatesEnum.guardedAccount,
  amount: '0.002'
};
export const sendNftData = {
  adress: AccountStatesEnum.guardedAccount
};

export const sendUsernameData = {
  adress: 'cypressuser',
  amount: '0.006'
};

export const invalidSendData = {
  adress: AccountStatesEnum.unGuardedAccount2,
  amount: '99999999'
};
