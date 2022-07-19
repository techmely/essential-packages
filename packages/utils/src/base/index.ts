export const noop = () => {};

export const assert = (
  condition: boolean,
  message: string
): asserts condition => {
  if (!condition) throw new Error(message);
};
