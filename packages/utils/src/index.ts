export * from "./array";
export * from "./base";
export * from "./bytes";

export * from "./calculate";
export * from "./colors";

export * from "./mines";
export * from "./download";

export * from "./object";
export * from "./regex";
export * from "./string";

export * from "./convert";

export * from "./vector";
export * from "./generate";

export * from "./is";
export * from "./cookie";

const __DEV__ = process.env.NODE_ENV !== "production";

export const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__ ? Object.freeze({}) : {};
export const EMPTY_ARR = __DEV__ ? Object.freeze([]) : [];

// Use this when your project install dayjs
// export * from './dayjs';

// Node.js only --> Import nested modules to use them in the node environment
// export * from './git';
// export * from './fs';
// export * from './findNearestFile';
