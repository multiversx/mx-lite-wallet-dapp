import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InterfaceSliceType = {
  /**
   * Holds the protected route of `PrivateKeyCheckWrapper`.
   * It will navigate to this route after re-login with keystore or PEM
   */
  privateKeyCheckRedirectRoute: string;
};

export function getInitialInterfaceState(): InterfaceSliceType {
  return {
    privateKeyCheckRedirectRoute: ''
  };
}

export const interfaceSlice = createSlice({
  name: 'interfaceSlice',
  initialState: getInitialInterfaceState(),
  reducers: {
    setPrivateKeyCheckRedirectRoute: (
      state: InterfaceSliceType,
      action: PayloadAction<string>
    ) => {
      state.privateKeyCheckRedirectRoute = action.payload;
    }
  }
});

export const { setPrivateKeyCheckRedirectRoute } = interfaceSlice.actions;

export const interfaceReducer = interfaceSlice.reducer;
