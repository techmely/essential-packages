import { AnyAction, configureStore, Reducer, Store } from '@reduxjs/toolkit';
import { pokemonApi } from '@news/services/pokemon';
import getEnvVarOrDie from '@news/utils/accessEnv';

const rootReducer: Reducer<any, AnyAction> = () => {};

export const store: Store<any, AnyAction> = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return [...getDefaultMiddleware(), pokemonApi.middleware];
  },
  devTools:
    getEnvVarOrDie('ENV') !== 'production'
      ? {
          name: 'Techmely Store',
        }
      : false,
});
