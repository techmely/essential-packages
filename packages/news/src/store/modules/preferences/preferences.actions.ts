import { createAction } from '@reduxjs/toolkit';
import { ThemeType } from '@news/src/store/types';

export const key = 'preferences';
const compose = (type: string) => `${key}/${type}`;

const actionsType = {
  themeUpdated: compose('themeUpdated'),
  languageChanged: compose('languageChange'),
};

export const actions = {
  themeUpdated: createAction<ThemeType>(actionsType.themeUpdated),
  languageChanged: createAction<string>(actionsType.languageChanged),
};
