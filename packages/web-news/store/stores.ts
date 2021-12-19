import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { pokemonApi } from '@web-news/services/pokemon';
import getEnvVarOrDie from '@web-news/utils/accessEnv';

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
