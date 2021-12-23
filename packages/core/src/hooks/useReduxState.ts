import { shallowEqual, useSelector } from 'react-redux';

type Result<S> = S extends (...args: any[]) => infer R ? R : any;

export function useReduxState<S extends (state: any) => any, R extends Result<S>>(
  selector: S,
  shallowCompare?: ((left: R, right: any) => boolean) | boolean,
) {
  return useSelector<S, R>(
    selector,
    shallowCompare === true ? shallowEqual : shallowCompare || undefined,
  );
}
