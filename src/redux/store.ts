import { configureStore } from '@reduxjs/toolkit';
import { createSubscription } from 'react-redux/es/utils/Subscription';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer, ignoredSliceNames } from './reducers';
import { RootApi } from './rootApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [...ignoredSliceNames]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(RootApi.middleware)
});

export const subscription = createSubscription(store);
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
