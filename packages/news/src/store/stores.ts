import type { AnyAction, Reducer, Store } from '@reduxjs/toolkit';
import { configureStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemon';
import { AppEnvConfig } from '../utils/environment';

const rootReducer: Reducer<any, AnyAction> = () => {};

export const store: Store<any, AnyAction> = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return [...getDefaultMiddleware(), pokemonApi.middleware];
  },
  devTools:
    AppEnvConfig.ENV !== 'production'
      ? {
          name: 'Techmely Store',
        }
      : false,
});
