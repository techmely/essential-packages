import { isDev } from '../is';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 *
 * @param {boolean} condition - The condition to verify.
 * @param {string} message - The format will throw err
 * @param {...any} args - arguments
 */
export const invariant = (condition: boolean, message?: string, ...args: Array<any>) => {
  if (isDev && message === undefined) {
    throw new Error('invariant requires an error message argument');
  }

  if (!condition) {
    let error;
    if (message === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.',
      );
    } else {
      let argIndex = 0;
      // eslint-disable-next-line no-plusplus
      error = new Error(message.replace(/%s/g, () => args[argIndex++]));
      error.name = 'Invariant Violation';
    }

    // @ts-expect-error we don't care about invariant's own frame
    error.framesToPop = 1;
    throw error;
  }
};
