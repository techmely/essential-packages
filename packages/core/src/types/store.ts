import { PersistedState } from 'redux-persist';
import { TraceState } from './trace';
import { UserState } from './user';

export type ThemeType = 'dark' | 'light';

export interface NewsPreferencesState {
  theme: ThemeType;
  language: string;
}

export interface NewsContextState {
  activeNewId: string;
}

export type NewsRootState = PersistedState & {
  context: NewsContextState;
  preferences: NewsPreferencesState;
  trace: TraceState;
  user: UserState;
};

export type StateSelector<ReturnTypeValue, State = NewsRootState> = (
  state: State,
) => ReturnTypeValue;
