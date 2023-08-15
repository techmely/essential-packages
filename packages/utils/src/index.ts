export * from "./array";
export * from "./bytes";
export * from "./calculate";
export * from "./cache";
export * from "./colors";
export * from "./convert";
export * from "./cookie";

export * from "./date";
export * from "./download";
export * from "./env";
export * from "./generate";
export * from "./invariant";
export * from "./is";
export * from "./number";
export * from "./object";
export * from "./path";
export * from "./process";
export * from "./regex";
export * from "./stream";
export * from "./string";

export * from "./vector";

const __DEV__ = process.env.NODE_ENV !== "production";

export const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__ ? Object.freeze({}) : {};
export const EMPTY_ARR = __DEV__ ? Object.freeze([]) : [];
export const noop = () => {};

export const assert = (condition: boolean, message: string): asserts condition => {
	if (!condition) {
		throw new Error(message);
	}
};
