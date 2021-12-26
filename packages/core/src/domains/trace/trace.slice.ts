import { createReducer, createSelector } from '@reduxjs/toolkit';
import { isDef } from '@techmely/utils';
import { NewsRootState, ProcessMeta, Progress, TraceState } from '../../types';
import { APICallAction, APICallSuffix, ProcessAction, ProcessSuffix } from '../actionsCreator';

export const initialState: TraceState = {
  request: {},
  process: {},
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addMatcher<APICallAction>(
      action => action.type.endsWith(APICallSuffix.success),
      (state, action) => {
        const requestKey = action.meta.requestKey || '';
        state.request[requestKey] = {
          state: Progress.SUCCESS,
          error: undefined,
        };
      },
    )
    .addMatcher(
      action => action.type.endsWith(APICallSuffix.start),
      (state, action) => {
        const requestKey = action.meta.requestKey || '';
        state.request[requestKey] = {
          state: Progress.PROCESSING,
          error: undefined,
        };
      },
    )
    .addMatcher(
      action => action.type.endsWith(APICallSuffix.failure),
      (state, action) => {
        const requestKey = action.meta.requestKey || '';
        state.request[requestKey] = {
          state: Progress.FAILURE,
          error: action.payload,
        };
      },
    )
    .addMatcher<ProcessAction>(
      action => action.type.endsWith(ProcessSuffix.start),
      (state, action) => {
        const processKey = action.meta.processKey || '';
        state.process[processKey] = {
          state: action.meta.processState as Progress,
          step: [action.type],
          processVariable: action.payload,
        };
      },
    )
    .addMatcher(
      action => action?.meta?.traceable,
      (state, action) => {
        const meta = action?.meta as ProcessMeta<unknown>;
        const processKey = meta?.processKey || '';

        state.process[processKey] = {
          step: [...(state.process[processKey]?.step ?? []), action.type],
          state: state.process[processKey]?.state,
          processVariable: state.process[processKey]?.processVariable,
        };
      },
    )
    .addMatcher<ProcessAction>(
      action => action.type.endsWith(ProcessSuffix.finish),
      (state, action) => {
        const processKey = action?.meta?.processKey || '';
        const isTraceable = isDef(action?.meta?.traceable) ? action?.meta?.traceable : true;

        state.process[processKey] = {
          state: action.meta.processState as Progress,
          step: [...(state.process?.[processKey]?.step ?? []), action.type],
          error: isTraceable ? action.payload : undefined,
          processVariable: isTraceable ? action.payload : undefined,
        };
      },
    );
});

// prevent selector to return new empty obj every time which causes hook to changed
const emptyObj = {};

const selectProcessFactory = (id: string) =>
  createSelector(
    (state: NewsRootState) => state?.trace,
    trace => trace?.process?.[id] || emptyObj,
  );

const selectRequestFactory = (id: string) =>
  createSelector(
    (state: NewsRootState) => state?.trace,
    trace => trace?.request?.[id] || emptyObj,
  );

export const selectors = {
  selectProcessFactory,
  selectRequestFactory,
};
