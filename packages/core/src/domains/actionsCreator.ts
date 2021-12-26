import { createAction } from '@reduxjs/toolkit';
import {
  ProcessMeta,
  ProcessPrepareAction,
  Progress,
  RequestFailPrepareAction,
  RequestMeta,
  RequestMetaFail,
  RequestPrepareAction,
  Traceable,
} from '../types';

export const ProcessSuffix = {
  start: 'ProcessStart',
  finish: 'ProcessFinish',
};

export const APICallSuffix = {
  start: 'RequestStart',
  success: 'RequestSuccess',
  failure: 'RequestFailure',
};

export function processActionsCreator<
  Payload = any,
  FinishProcessPayload = any,
  ResponseOnSuccess = any,
>({ module, type }: { module: string; type: string }) {
  const actionKey = `${module}/${type}`;

  return {
    key: actionKey,
    start: createAction<ProcessPrepareAction<Payload, ResponseOnSuccess>, string>(
      `${actionKey}${ProcessSuffix.start}`,
      (payload: Payload, meta: ProcessMeta<ResponseOnSuccess> = {}) => ({
        payload,
        meta: {
          processKey: meta?.processKey || actionKey,
          processState: Progress.PROCESSING,
          ...meta,
        },
      }),
    ),
    finish: createAction<ProcessPrepareAction<FinishProcessPayload, ResponseOnSuccess>, string>(
      `${actionKey}${ProcessSuffix.finish}`,
      (payload: FinishProcessPayload, meta: ProcessMeta<ResponseOnSuccess> = {}) => {
        const processState = isError(payload)
          ? Progress.FAILURE
          : meta?.processState || Progress.UNKNOWN;
        return {
          payload,
          meta: {
            processKey: meta?.processKey || actionKey,
            processState,
            ...meta,
          },
        };
      },
    ),
  };
}

export function apiCallActionCreator<
  RequestPayload = any,
  SuccessPayload = any,
  Fail = any,
  ResponseOnSuccess = any,
>({ module, type }: { module: string; type: string }) {
  const actionKey = `${module}/${type}`;

  return {
    key: actionKey,
    request: createAction<RequestPrepareAction<RequestPayload, ResponseOnSuccess>>(
      `${actionKey}${APICallSuffix.start}`,
      (payload: RequestPayload, meta: Omit<RequestMeta<ResponseOnSuccess>, 'silent'> = {}) => ({
        payload,
        meta: {
          requestKey: meta?.requestKey || actionKey,
          ...meta,
        },
      }),
    ),
    success: createAction<RequestPrepareAction<SuccessPayload, ResponseOnSuccess>>(
      `${actionKey}${APICallSuffix.success}`,
      (payload: SuccessPayload, meta: RequestMeta<ResponseOnSuccess> = {}) => ({
        payload,
        meta: {
          requestKey: meta?.requestKey || actionKey,
          ...meta,
        },
      }),
    ),
    failure: createAction<RequestFailPrepareAction<Fail>>(
      `${actionKey}${APICallSuffix.failure}`,
      (payload: Fail, meta: RequestMetaFail & any = {}) => ({
        payload,
        error: true,
        meta: {
          requestKey: meta?.requestKey || actionKey,
          ...meta,
        },
      }),
    ),
  };
}

export function createTraceableAction<Payload = any, Meta = Traceable>(type: string) {
  return createAction(type, (payload: Payload, meta: Traceable & Meta) => ({ payload, meta }));
}

function isError(e) {
  return e && e.stack && e.message && typeof e.stack === 'string' && typeof e.message === 'string';
}

type ProcessStartAction = ReturnType<ReturnType<typeof processActionsCreator>['start']>;
type ProcessFinishAction = ReturnType<ReturnType<typeof processActionsCreator>['finish']>;
export type ProcessAction = ProcessStartAction | ProcessFinishAction;

type APICallActionRequest = ReturnType<ReturnType<typeof apiCallActionCreator>['request']>;
type APICallActionSuccess = ReturnType<ReturnType<typeof apiCallActionCreator>['success']>;
type APICallActionFailure = ReturnType<ReturnType<typeof apiCallActionCreator>['failure']>;

export type APICallAction = APICallActionRequest | APICallActionSuccess | APICallActionFailure;
