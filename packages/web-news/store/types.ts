import { Undefinable } from '@techmely/types';
import { PersistedState } from 'redux-persist';

export type ThemeType = Undefinable<'dark' | 'light'>;

export interface PreferencesState {
  theme: ThemeType;
  language: string;
}

export interface ContextState {
  theme?: ThemeType;
  language?: string;
}

export interface AccountState {
  theme?: ThemeType;
  language?: string;
}

export interface TraceState {}

export interface UserState {}

export type RootStateType = PersistedState & {
  account: AccountState;
  context: ContextState;
  preferences: PreferencesState;
  trace: TraceState;
  user: UserState;
};

export type StateSelector<ReturnTypeValue, State = RootStateType> = (
  state: State,
) => ReturnTypeValue;
