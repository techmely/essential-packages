import { actions, key } from './preferences.actions';
import { initialState, reducers } from './preferences.reducer';
import { selectors } from './preferences.selectors';

export const preferences = {
  key,
  initialState,
  reducers,
  actions,
  selectors,
};
