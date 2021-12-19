import { createReducer } from '@reduxjs/toolkit';
import { PreferencesState } from '@web-news/store/types';
import { actions } from './preferences.actions';

export const initialState: PreferencesState = {
  theme: 'light',
  language: 'vi',
};

export const reducers = createReducer(initialState, builder => {
  builder
    .addCase(actions.themeUpdated, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(actions.languageChanged, (state, action) => {
      state.language = action.payload;
    });
});
