import {
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  createContext
} from 'react';
import {
  ActionType,
  CreateRecoverContextStateType,
  CreateRecoverProviderTypeEnum,
  createReducer,
  initialState
} from './reducer';

interface CreateRecoverContextProviderType {
  children: ReactNode;
  providerType: CreateRecoverProviderTypeEnum;
}

const CreateRecoverStateContext = createContext<{
  state: CreateRecoverContextStateType;
  dispatch?: Dispatch<ActionType>;
}>({ state: initialState });

function CreateRecoverContextProvider({
  children,
  providerType
}: CreateRecoverContextProviderType) {
  const [state, dispatch] = useReducer(createReducer, {
    ...initialState,
    providerType
  });

  return (
    <CreateRecoverStateContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateRecoverStateContext.Provider>
  );
}

function useCreateRecoverContext() {
  const { state } = useContext(CreateRecoverStateContext);
  if (state === undefined) {
    throw new Error(
      'useCreateRecoverState must be used within a GlobalProvider'
    );
  }
  return state;
}
function useCreateRecoverDispatch() {
  const { dispatch } = useContext(CreateRecoverStateContext);
  if (dispatch === undefined) {
    throw new Error(
      'useCreateRecoverDispatch must be used within a GlobalProvider'
    );
  }
  return dispatch;
}

export {
  CreateRecoverContextProvider,
  useCreateRecoverContext,
  useCreateRecoverDispatch
};
