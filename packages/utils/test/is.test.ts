import { isNotEmpties } from '../src/is';

describe('Test valid is', () => {
  it('Should return true', () => {
    expect(isNotEmpties('test', 'test')).toEqual(true);
    expect(isNotEmpties('test', 'test', 'test')).toEqual(true);
  });

  it('Should return false', () => {
    expect(isNotEmpties('', 'test')).toEqual(false);
    expect(isNotEmpties('', '')).toEqual(false);
    expect(isNotEmpties('test', '')).toEqual(false);
    expect(isNotEmpties('', '', '', '')).toEqual(false);
    expect(isNotEmpties('', 'test', '', '')).toEqual(false);
    expect(isNotEmpties('', '', '', 'test')).toEqual(false);
  });
});
