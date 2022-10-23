/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
export type UnionToIntersection<Union> = (
	Union extends any
		? (argument: Union) => void
		: never
) extends (argument: infer Intersection) => void // tslint:disable-line: no-unused
	? Intersection
	: never;

export type AnyFunction<ReturnType> = (...args: any) => ReturnType;
