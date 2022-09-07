import { describe, expect, test } from 'vitest';
import { getRandomString, slugify } from '../src/string';

describe('Test valid is', () => {
  test('Should get the right length string', () => {
    expect(getRandomString(10)).toHaveLength(10);
    expect(getRandomString(20)).toHaveLength(20);
    expect(getRandomString(3)).toHaveLength(3);
  });
});

describe('Test valid is', () => {
  test('Should return slug-value', () => {
    expect(slugify('Tìm hiểu về tự do tài chính - Phần 1')).toEqual(
      'tim-hieu-ve-tu-do-tai-chinh-phan-1'
    );
    expect(slugify('Ăn quả nhớ kẻ trồng cây OK OK OK ')).toEqual(
      'an-qua-nho-ke-trong-cay-ok-ok-ok'
    );
  });
});
