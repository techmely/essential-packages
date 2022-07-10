import { isNotEmpties } from '@techmely/utils';
import { describe, expect, test } from 'vitest';

describe.concurrent('Test valid is', () => {
  test('Should return true', () => {
    expect(isNotEmpties('test', 'test')).toEqual(true);
    expect(isNotEmpties('test', 'test', 'test')).toEqual(true);
  });

  test('Should return false', () => {
    expect(isNotEmpties('', 'test')).toEqual(false);
    expect(isNotEmpties('', '')).toEqual(false);
    expect(isNotEmpties('test', '')).toEqual(false);
    expect(isNotEmpties('', '', '', '')).toEqual(false);
    expect(isNotEmpties('', 'test', '', '')).toEqual(false);
    expect(isNotEmpties('', '', '', 'test')).toEqual(false);
  });
});
