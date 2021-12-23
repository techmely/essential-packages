export interface RequestId {
  requestKey?: string;
}

export interface Traceable {
  traceable?: boolean;
  processKey?: string;
}

export enum Progress {
  INITIAL = 'INITIAL',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  UNKNOWN = 'UNKNOWN',
}
export type OnSuccessCallback<T> = (res: T) => void;
export type OnFailureCallback<T> = (res: T) => void;

export interface ResultCallback<SuccessResponse, FailResponse> {
  onSuccess?: OnSuccessCallback<SuccessResponse>;
  onFailure?: OnFailureCallback<FailResponse>;
}

export interface ProcessMeta<Success, Failure> extends ResultCallback<Success, Failure> {
  traceable?: boolean;
  processKey?: string;
  processState?: Progress;
}

export interface RequestMeta<S, F> extends ResultCallback<S, F>, RequestId, Traceable {}
export interface RequestMetaFail<S, F> extends RequestMeta<S, F> {
  /**
   * When we dont need toast error in api call ==> Set this to {false}
   */
  silent?: boolean;
}

export type ProcessPrepareAction<Payload, Success, Failure> = (
  payload: Payload,
  meta?: ProcessMeta<Success, Failure>,
) => {
  payload: Payload;
  meta: ProcessMeta<Success, Failure>;
};

export type RequestPrepareAction<Payload, Success, Failure> = (
  payload: Payload,
  meta?: RequestMeta<Success, Failure>,
) => {
  payload: Payload;
  meta: RequestMeta<Success, Failure>;
};

export type RequestFailPrepareAction<Payload, Success, Failure> = (
  payload: Payload,
  meta?: RequestMetaFail<Success, Failure>,
) => {
  payload: Payload;
  meta: RequestMetaFail<Success, Failure>;
};

export interface TraceItem<ProcessVariable = unknown, ResponseError = unknown> {
  state: Progress;
  step?: string[];
  error?: ResponseError;
  /**
   * Using this name for the consistency of the term of the flow process
   * {@link https://en.wikipedia.org/wiki/Process_variable}
   */
  processVariable?: ProcessVariable;
}

export interface TraceState {
  process: Record<string, TraceItem>;
  request: Record<string, TraceItem>;
}
