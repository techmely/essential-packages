export * from './invariant';

/**
 * @description Log the warning in the basic
 * @param {string} message - Message to log
 * @param {any[]} args - any arguments
 * @returns {void}
 */
export function warn(message: string, ...args: any[]) {
  // eslint-disable-next-line no-console
  console.warn(`\u001B[1m\u001B[33m[Techmely]\u001B[0m\u001B[33m ${message}\u001B[0m\n`, args);
}
