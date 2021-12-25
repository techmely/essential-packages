import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './stores';

const persistor = persistStore(store);

export const StoreProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={undefined} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
