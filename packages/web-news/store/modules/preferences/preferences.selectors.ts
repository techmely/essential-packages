import { StateSelector } from '@web-news/store/types';

const isDarkMode: StateSelector<boolean> = state => state.preferences.theme === 'dark';
const language: StateSelector<string> = state => state.preferences.language;

export const selectors = {
  isDarkMode,
  language,
};
