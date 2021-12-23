import { createAction } from '@reduxjs/toolkit';

export const key = 'auth';

const actionTypes = {
  login: 'login',
  logout: 'logout',
  storeReset: 'auth/storeReset',
  tokenUpdated: 'auth/tokenUpdated',
  decodedTokenUpdated: 'auth/decodedTokenUpdated',
  synchronizeCookieTokenWithStore: 'auth/synchronizeCookieTokenWithStore',
};

const storeReset = createAction(actionTypes.storeReset);

export const actions = {
  storeReset,
};
