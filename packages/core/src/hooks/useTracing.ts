import { Undefinable } from '@techmely/types';
import { isNotEmpty } from '@techmely/utils';
import { useReduxState } from './useReduxState';
import { TraceItem } from '../types/trace';
import { selectors } from '../domains/trace';
import { Progress, StateSelector } from '../types';

export function useTracingProcess<ProcessVariable = unknown, T extends boolean = true>(
  id: string,
  isOnlySteps?: T,
): T extends false
  ? [Progress, unknown, Undefinable<string>, Undefinable<ProcessVariable>]
  : Undefinable<string>;

export function useTracingProcess<ProcessVariable = unknown>(
  id: string,
  isOnlySteps = true,
):
  | Undefinable<string>
  | [Progress, Undefinable<unknown>, Undefinable<string>, Undefinable<ProcessVariable>] {
  const tracing = useReduxState<StateSelector<TraceItem>, TraceItem<ProcessVariable>>(
    selectors.selectProcessFactory(id),
  );
  const steps = tracing?.step;
  const lastStep = isNotEmpty(steps) ? steps?.[steps.length - 1] : undefined;

  if (isOnlySteps) return lastStep;
  return [tracing.state, tracing?.error, lastStep, tracing?.processVariable];
}

export function useTracingRequest<ProcessVariable = unknown>(
  id: string,
): [Progress, Undefinable<unknown>] {
  const tracing = useReduxState<StateSelector<TraceItem>, TraceItem<ProcessVariable>>(
    selectors.selectRequestFactory(id),
  );
  return [tracing.state, tracing?.error];
}
