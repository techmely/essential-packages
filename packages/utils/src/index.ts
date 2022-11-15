export * from "./array";
export * from "./bytes";
export * from "./calculate";
export * from "./colors";
export * from "./convert";
export * from "./cookie";

export * from "./date";
export * from "./download";
export * from "./generate";
export * from "./is";
export * from "./number";
export * from "./object";
export * from "./regex";
export * from "./string";

export * from "./vector";
export * from "./types";

const __DEV__ = process.env.NODE_ENV !== "production";

export const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__ ? Object.freeze({}) : {};
export const EMPTY_ARR = __DEV__ ? Object.freeze([]) : [];

export const noop = () => {};

export const assert = (condition: boolean, message: string): asserts condition => {
	if (!condition) {
		throw new Error(message);
	}
};

// Use this when your project install dayjs
// export * from './dayjs';

// Node.js only --> Import nested modules to use them in the node environment
// export * from './git';
// export * from './file';
