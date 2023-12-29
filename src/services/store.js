import { configureStore } from '@reduxjs/toolkit'
import slice from './slice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { thunk } from 'redux-thunk';
import { Tuple } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, slice);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: () => new Tuple(thunk),
})

export const persistor = persistStore(store);