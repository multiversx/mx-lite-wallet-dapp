import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import merge from 'lodash/merge';
import {
  ExtendedValuesType,
  SendModalRouteState,
  SendTransactionsPropsType
} from 'types';

export interface FormSliceType {
  active?: boolean;
  amount: ExtendedValuesType['amount'];
  customHeaderId?: string;
  dappProps?: Omit<SendTransactionsPropsType, 'transactions'>;
  data: ExtendedValuesType['data'];
  gasLimit: ExtendedValuesType['gasLimit'];
  gasPrice: ExtendedValuesType['gasPrice'];
  isBurn?: boolean;
  multisigContractAddress?: string;
  processingMessage?: string;
  readonly?: ExtendedValuesType['readonly'];
  receiver: ExtendedValuesType['receiver'];
  redirectRoute?: string;
  sendModalConfig?: SendModalRouteState;
  sender?: string;
  skipToConfirm?: boolean;
  submittedMessage?: string;
  successMetadata?: Record<string, string>;
  successTitle?: string;
  tokenId?: ExtendedValuesType['tokenId'];
}

export const initialFormState: FormSliceType = {
  active: false,
  receiver: '',
  amount: '',
  tokenId: undefined,
  gasLimit: '0',
  gasPrice: '0',
  data: '',
  readonly: false,
  skipToConfirm: false,
  successTitle: '',
  dappProps: {
    signWithoutSending: false,
    transactionsDisplayInfo: {
      processingMessage: 'Processing transaction',
      errorMessage: 'An error has occured',
      successMessage: 'Transaction successful',
      transactionDuration: 10000
    },
    redirectAfterSign: false
  }
};

export const formSlice = createSlice({
  name: 'formSlice',
  initialState: initialFormState,
  reducers: {
    initFormState: (
      state: FormSliceType,
      action: PayloadAction<FormSliceType>
    ) => {
      const dappProps = merge(state.dappProps, action.payload.dappProps);

      return {
        ...state,
        ...action.payload,
        dappProps,
        active: true
      };
    },
    setTokenId: (state: FormSliceType, action: PayloadAction<string>) => {
      state.tokenId = action.payload;
    },
    resetFormState: () => {
      return initialFormState;
    }
  }
});

export const { initFormState, resetFormState, setTokenId } = formSlice.actions;

export const formReducer = formSlice.reducer;
