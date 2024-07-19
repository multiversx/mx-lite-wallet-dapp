import uniq from 'lodash/uniq';
import { CreateRoutesEnum, RecoverRoutesEnum } from 'localConstants';

export enum CreateRecoverProviderTypeEnum {
  recover = 'recover',
  create = 'create'
}

export interface CreateRecoverContextStateType {
  mnemonic: string;
  createdAddress: string;
  keystoreString: string;
  createRecoverWalletRoutes: Array<CreateRoutesEnum | RecoverRoutesEnum>;
  providerType: CreateRecoverProviderTypeEnum;
}

export const initialState: CreateRecoverContextStateType = {
  mnemonic: '',
  createdAddress: '',
  keystoreString: '',
  createRecoverWalletRoutes: [],
  providerType: CreateRecoverProviderTypeEnum.create
};

export type ActionType =
  | {
      type: 'setMnemonic';
      mnemonic: CreateRecoverContextStateType['mnemonic'];
    }
  | { type: 'resetWizard' }
  | {
      type: 'pushToWalletRoutes';
      nextRoute: CreateRoutesEnum | RecoverRoutesEnum;
    }
  | {
      type: 'setCreatedAddress';
      createdAddress: CreateRecoverContextStateType['createdAddress'];
    }
  | {
      type: 'setKeystoreString';
      keystoreString: CreateRecoverContextStateType['keystoreString'];
    };

export function createReducer(
  state: CreateRecoverContextStateType,
  action: ActionType
): CreateRecoverContextStateType {
  switch (action.type) {
    case 'setMnemonic': {
      return { ...state, mnemonic: action.mnemonic };
    }
    case 'setKeystoreString': {
      return {
        ...state,
        keystoreString: action.keystoreString,
        mnemonic: initialState.mnemonic
      };
    }
    case 'setCreatedAddress': {
      return { ...state, createdAddress: action.createdAddress };
    }
    case 'pushToWalletRoutes': {
      const { nextRoute } = action;
      const uniqueRoutes = uniq([
        ...state.createRecoverWalletRoutes,
        nextRoute
      ]);
      const newState = {
        ...state,
        createRecoverWalletRoutes: Array.from(uniqueRoutes)
      };
      return newState;
    }
    case 'resetWizard': {
      return { ...initialState, providerType: state.providerType };
    }

    default: {
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
}
