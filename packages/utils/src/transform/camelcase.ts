// This extend from https://github.com/sindresorhus/camelcase

import { isArray, isString } from '../is';

interface Options {
  /**
   * Uppercase the first character: `foo-bar` → `FooBar`.
   *
   * @default false
   */
  isPascalCase?: boolean;

  /**
   * Preserve the consecutive uppercase characters: `foo-BAR` → `FooBAR`.
   *
   * @default false
   */
  willPreserveConsecutiveUppercase?: boolean;

  /**
   * The locale parameter indicates the locale to be used to convert to upper/lower case according to any locale-specific case mappings. If multiple locales are given in an array, the best available locale is used.
   * Default: The host environment’s current locale.
   *
		@example
		```
		import { camelCase } from '@techmely/utils';
   
		camelCase('lorem-ipsum', {locale: 'en-US'});
		//=> 'loremIpsum'
		camelCase('lorem-ipsum', {locale: 'tr-TR'});
		//=> 'loremİpsum'
		camelCase('lorem-ipsum', {locale: ['en-US', 'en-GB']});
		//=> 'loremIpsum'
		camelCase('lorem-ipsum', {locale: ['tr', 'TR', 'tr-TR']});
		//=> 'loremİpsum'
		```
   */
  locale?: string | string[];
}

export const camelCase = (input: string, options: Options) => {
  if (!(isString(input) || isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }

  const defaultOptions = {
    isPascalCase: false,
    willPreserveConsecutiveUppercase: false,
    ...options,
  };

  let normalizeInput = isArray(input)
    ? input
        .map(x => x.trim())
        .filter(x => x.length)
        .join('-')
    : input.trim();

  if (normalizeInput.length === 0) {
    return '';
  }

  if (defaultOptions.locale) {
    if (normalizeInput.length === 1)
      return options.isPascalCase
        ? normalizeInput.toLocaleUpperCase(defaultOptions.locale)
        : normalizeInput.toLocaleLowerCase(defaultOptions.locale);

    const hasUpperCase = normalizeInput !== normalizeInput.toLocaleLowerCase(defaultOptions.locale);

    if (hasUpperCase) normalizeInput = preserveCamelCase(normalizeInput, defaultOptions.locale);

    normalizeInput = normalizeInput.replace(/^[ ._-]+/, '');

    normalizeInput = defaultOptions.willPreserveConsecutiveUppercase
      ? preserveConsecutiveUppercase(normalizeInput)
      : normalizeInput.toLocaleLowerCase();

    if (defaultOptions.isPascalCase)
      normalizeInput =
        normalizeInput.charAt(0).toLocaleUpperCase(defaultOptions.locale) + normalizeInput.slice(1);
  }

  return postProcess(normalizeInput, options);
};

/**
 * @param {string} input the value
 * @param {string | string[]} locale local
 * @returns {string} preserve input value
 */
function preserveCamelCase(input: string, locale: string | string[]) {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  const valueLength = input.length;
  let copyValue = input;

  for (let i = 0; i < valueLength; i += 1) {
    const character = copyValue[i];

    if (isLastCharLower && /[\p{Lu}]/u.test(character)) {
      copyValue = `${copyValue.slice(0, i)}-${copyValue.slice(i)}`;
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i += 1;
    } else if (isLastCharUpper && isLastLastCharUpper && /[\p{Ll}]/u.test(character)) {
      copyValue = `${copyValue.slice(0, i - 1)}-${copyValue.slice(i - 1)}`;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower =
        character.toLocaleLowerCase(locale) === character &&
        character.toLocaleUpperCase(locale) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper =
        character.toLocaleUpperCase(locale) === character &&
        character.toLocaleLowerCase(locale) !== character;
    }
  }

  return copyValue;
}

/**
 * @param {string} input the input you want to preserve consecutive with uppercase
 * @returns {string} the input you preserved
 */
function preserveConsecutiveUppercase(input: string) {
  return input.replace(/^[\p{Lu}](?![\p{Lu}])/gu, m1 => m1.toLowerCase());
}

/**
 * @param {string} input the clean input
 * @param {Options} options the options
 * @returns {string} the string was camelcase
 */
function postProcess(input: string, options: Options) {
  return input
    .replace(/[_.\- ]+([\p{Alpha}\p{N}_]|$)/gu, (_, p1) => p1.toLocaleUpperCase(options.locale))
    .replace(/\d+([\p{Alpha}\p{N}_]|$)/gu, m => m.toLocaleUpperCase(options.locale));
}
