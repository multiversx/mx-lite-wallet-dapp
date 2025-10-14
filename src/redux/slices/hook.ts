import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decodeLoginToken } from 'lib/sdkDapp';
import { HooksEnum } from 'localConstants';

export interface HookSliceType {
  callbackUrl: string;
  hookUrl: string;
  loginToken?: string;
  hasNativeAuthToken?: boolean;
  type: HooksEnum | null;
  wasCancelled?: boolean;
  signMessageOptions?: {
    title?: string;
    subtitle?: string;
    signMessageSource?: string;
  };
}

export const initialHookState: HookSliceType = {
  callbackUrl: '',
  hookUrl: '',
  type: null
};

export const hookSlice = createSlice({
  name: 'hookSlice',
  initialState: initialHookState,
  reducers: {
    setHook: (state: HookSliceType, action: PayloadAction<HookSliceType>) => {
      state = action.payload;
      state.hasNativeAuthToken =
        decodeLoginToken(String(action.payload.loginToken)) != null;
      state.wasCancelled = false;
      return state;
    },

    resetHook: (
      _: HookSliceType,
      action: PayloadAction<{ wasCancelled: boolean } | undefined>
    ) => {
      return {
        ...initialHookState,
        wasCancelled: action?.payload?.wasCancelled ?? false
      };
    }
  }
});

export const { setHook, resetHook } = hookSlice.actions;

export const hookReducer = hookSlice.reducer;
