import { camelCase } from '../../src';

test('camelCase', t => {
  expect(camelCase('foo'), 'foo');
  expect(camelCase('foo-bar'), 'fooBar');
  expect(camelCase('foo-bar-baz'), 'fooBarBaz');
  expect(camelCase('foo--bar'), 'fooBar');
  expect(camelCase('--foo-bar'), 'fooBar');
  expect(camelCase('--foo--bar'), 'fooBar');
  expect(camelCase('FOO-BAR'), 'fooBar');
  expect(camelCase('FOÈ-BAR'), 'foèBar');
  expect(camelCase('-foo-bar-'), 'fooBar');
  expect(camelCase('--foo--bar--'), 'fooBar');
  expect(camelCase('foo-1'), 'foo1');
  expect(camelCase('foo.bar'), 'fooBar');
  expect(camelCase('foo..bar'), 'fooBar');
  expect(camelCase('..foo..bar..'), 'fooBar');
  expect(camelCase('foo_bar'), 'fooBar');
  expect(camelCase('__foo__bar__'), 'fooBar');
  expect(camelCase('foo bar'), 'fooBar');
  expect(camelCase('  foo  bar  '), 'fooBar');
  expect(camelCase('-'), '-');
  expect(camelCase(' - '), '-');
  expect(camelCase('fooBar'), 'fooBar');
  expect(camelCase('fooBar-baz'), 'fooBarBaz');
  expect(camelCase('foìBar-baz'), 'foìBarBaz');
  expect(camelCase('fooBarBaz-bazzy'), 'fooBarBazBazzy');
  expect(camelCase('FBBazzy'), 'fbBazzy');
  expect(camelCase('F'), 'f');
  expect(camelCase('FooBar'), 'fooBar');
  expect(camelCase('Foo'), 'foo');
  expect(camelCase('FOO'), 'foo');
  expect(camelCase(['foo', 'bar']), 'fooBar');
  expect(camelCase(['foo', '-bar']), 'fooBar');
  expect(camelCase(['foo', '-bar', 'baz']), 'fooBarBaz');
  expect(camelCase(['', '']), '');
  expect(camelCase('--'), '');
  expect(camelCase(''), '');
  expect(camelCase('--__--_--_'), '');
  expect(camelCase(['---_', '--', '', '-_- ']), '');
  expect(camelCase('foo bar?'), 'fooBar?');
  expect(camelCase('foo bar!'), 'fooBar!');
  expect(camelCase('foo bar$'), 'fooBar$');
  expect(camelCase('foo-bar#'), 'fooBar#');
  expect(camelCase('XMLHttpRequest'), 'xmlHttpRequest');
  expect(camelCase('AjaxXMLHttpRequest'), 'ajaxXmlHttpRequest');
  expect(camelCase('Ajax-XMLHttpRequest'), 'ajaxXmlHttpRequest');
  expect(camelCase([]), '');
  expect(camelCase('mGridCol6@md'), 'mGridCol6@md');
  expect(camelCase('A::a'), 'a::a');
  expect(camelCase('Hello1World'), 'hello1World');
  expect(camelCase('Hello11World'), 'hello11World');
  expect(camelCase('hello1world'), 'hello1World');
  expect(camelCase('Hello1World11foo'), 'hello1World11Foo');
  expect(camelCase('Hello1'), 'hello1');
  expect(camelCase('hello1'), 'hello1');
  expect(camelCase('1Hello'), '1Hello');
  expect(camelCase('1hello'), '1Hello');
  expect(camelCase('h2w'), 'h2W');
  expect(camelCase('розовый_пушистый-единороги'), 'розовыйПушистыйЕдинороги');
  expect(camelCase('розовый_пушистый-единороги'), 'розовыйПушистыйЕдинороги');
  expect(camelCase('РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ'), 'розовыйПушистыйЕдинороги');
  expect(camelCase('桑德在这里。'), '桑德在这里。');
  expect(camelCase('桑德在这里。'), '桑德在这里。');
  expect(camelCase('桑德_在这里。'), '桑德在这里。');
});

test('camelCase with pascalCase option', t => {
  expect(camelCase('foo', { isPascalCase: true }), 'Foo');
  expect(camelCase('foo-bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('foo-bar-baz', { isPascalCase: true }), 'FooBarBaz');
  expect(camelCase('foo--bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('--foo-bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('--foo--bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('FOO-BAR', { isPascalCase: true }), 'FooBar');
  expect(camelCase('FOÈ-BAR', { isPascalCase: true }), 'FoèBar');
  expect(camelCase('-foo-bar-', { isPascalCase: true }), 'FooBar');
  expect(camelCase('--foo--bar--', { isPascalCase: true }), 'FooBar');
  expect(camelCase('foo-1', { isPascalCase: true }), 'Foo1');
  expect(camelCase('foo.bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('foo..bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('..foo..bar..', { isPascalCase: true }), 'FooBar');
  expect(camelCase('foo_bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('__foo__bar__', { isPascalCase: true }), 'FooBar');
  expect(camelCase('__foo__bar__', { isPascalCase: true }), 'FooBar');
  expect(camelCase('foo bar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('  foo  bar  ', { isPascalCase: true }), 'FooBar');
  expect(camelCase('-', { isPascalCase: true }), '-');
  expect(camelCase(' - ', { isPascalCase: true }), '-');
  expect(camelCase('fooBar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('fooBar-baz', { isPascalCase: true }), 'FooBarBaz');
  expect(camelCase('foìBar-baz', { isPascalCase: true }), 'FoìBarBaz');
  expect(camelCase('fooBarBaz-bazzy', { isPascalCase: true }), 'FooBarBazBazzy');
  expect(camelCase('FBBazzy', { isPascalCase: true }), 'FbBazzy');
  expect(camelCase('F', { isPascalCase: true }), 'F');
  expect(camelCase('FooBar', { isPascalCase: true }), 'FooBar');
  expect(camelCase('Foo', { isPascalCase: true }), 'Foo');
  expect(camelCase('FOO', { isPascalCase: true }), 'Foo');
  expect(camelCase(['foo', 'bar'], { isPascalCase: true }), 'FooBar');
  expect(camelCase(['foo', '-bar'], { isPascalCase: true }), 'FooBar');
  expect(camelCase(['foo', '-bar', 'baz'], { isPascalCase: true }), 'FooBarBaz');
  expect(camelCase(['', ''], { isPascalCase: true }), '');
  expect(camelCase('--', { isPascalCase: true }), '');
  expect(camelCase('', { isPascalCase: true }), '');
  expect(camelCase('--__--_--_', { isPascalCase: true }), '');
  expect(camelCase(['---_', '--', '', '-_- '], { isPascalCase: true }), '');
  expect(camelCase('foo bar?', { isPascalCase: true }), 'FooBar?');
  expect(camelCase('foo bar!', { isPascalCase: true }), 'FooBar!');
  expect(camelCase('foo bar$', { isPascalCase: true }), 'FooBar$');
  expect(camelCase('foo-bar#', { isPascalCase: true }), 'FooBar#');
  expect(camelCase('XMLHttpRequest', { isPascalCase: true }), 'XmlHttpRequest');
  expect(camelCase('AjaxXMLHttpRequest', { isPascalCase: true }), 'AjaxXmlHttpRequest');
  expect(camelCase('Ajax-XMLHttpRequest', { isPascalCase: true }), 'AjaxXmlHttpRequest');
  expect(camelCase([], { isPascalCase: true }), '');
  expect(camelCase('mGridCol6@md', { isPascalCase: true }), 'MGridCol6@md');
  expect(camelCase('A::a', { isPascalCase: true }), 'A::a');
  expect(camelCase('Hello1World', { isPascalCase: true }), 'Hello1World');
  expect(camelCase('Hello11World', { isPascalCase: true }), 'Hello11World');
  expect(camelCase('hello1world', { isPascalCase: true }), 'Hello1World');
  expect(camelCase('hello1World', { isPascalCase: true }), 'Hello1World');
  expect(camelCase('hello1', { isPascalCase: true }), 'Hello1');
  expect(camelCase('Hello1', { isPascalCase: true }), 'Hello1');
  expect(camelCase('1hello', { isPascalCase: true }), '1Hello');
  expect(camelCase('1Hello', { isPascalCase: true }), '1Hello');
  expect(camelCase('h1W', { isPascalCase: true }), 'H1W');
  expect(camelCase('РозовыйПушистыйЕдинороги', { isPascalCase: true }), 'РозовыйПушистыйЕдинороги');
  expect(
    camelCase('розовый_пушистый-единороги', { isPascalCase: true }),
    'РозовыйПушистыйЕдинороги',
  );
  expect(
    camelCase('РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ', { isPascalCase: true }),
    'РозовыйПушистыйЕдинороги',
  );
  expect(camelCase('桑德在这里。', { isPascalCase: true }), '桑德在这里。');
  expect(camelCase('桑德_在这里。', { isPascalCase: true }), '桑德在这里。');
});

test('camelCase with preserveConsecutiveUppercase option', t => {
  expect(camelCase('foo-BAR', { willPreserveConsecutiveUppercase: true }), 'fooBAR');
  expect(camelCase('Foo-BAR', { willPreserveConsecutiveUppercase: true }), 'fooBAR');
  expect(camelCase('fooBAR', { willPreserveConsecutiveUppercase: true }), 'fooBAR');
  expect(camelCase('fooBaR', { willPreserveConsecutiveUppercase: true }), 'fooBaR');
  expect(camelCase('FOÈ-BAR', { willPreserveConsecutiveUppercase: true }), 'FOÈBAR');
  expect(camelCase(['foo', 'BAR'], { willPreserveConsecutiveUppercase: true }), 'fooBAR');
  expect(camelCase(['foo', '-BAR'], { willPreserveConsecutiveUppercase: true }), 'fooBAR');
  expect(
    camelCase(['foo', '-BAR', 'baz'], { willPreserveConsecutiveUppercase: true }),
    'fooBARBaz',
  );
  expect(camelCase(['', ''], { willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('--', { willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('', { willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('--__--_--_', { willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase(['---_', '--', '', '-_- '], { willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('foo BAR?', { willPreserveConsecutiveUppercase: true }), 'fooBAR?');
  expect(camelCase('foo BAR!', { willPreserveConsecutiveUppercase: true }), 'fooBAR!');
  expect(camelCase('foo BAR$', { willPreserveConsecutiveUppercase: true }), 'fooBAR$');
  expect(camelCase('foo-BAR#', { willPreserveConsecutiveUppercase: true }), 'fooBAR#');
  expect(camelCase('XMLHttpRequest', { willPreserveConsecutiveUppercase: true }), 'XMLHttpRequest');
  expect(
    camelCase('AjaxXMLHttpRequest', { willPreserveConsecutiveUppercase: true }),
    'ajaxXMLHttpRequest',
  );
  expect(
    camelCase('Ajax-XMLHttpRequest', { willPreserveConsecutiveUppercase: true }),
    'ajaxXMLHttpRequest',
  );
  expect(camelCase([], { willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('mGridCOl6@md', { willPreserveConsecutiveUppercase: true }), 'mGridCOl6@md');
  expect(camelCase('A::a', { willPreserveConsecutiveUppercase: true }), 'a::a');
  expect(camelCase('Hello1WORLD', { willPreserveConsecutiveUppercase: true }), 'hello1WORLD');
  expect(camelCase('Hello11WORLD', { willPreserveConsecutiveUppercase: true }), 'hello11WORLD');
  expect(
    camelCase('РозовыйПушистыйFOOдинорогиf', { willPreserveConsecutiveUppercase: true }),
    'розовыйПушистыйFOOдинорогиf',
  );
  expect(camelCase('桑德在这里。', { willPreserveConsecutiveUppercase: true }), '桑德在这里。');
  expect(camelCase('桑德_在这里。', { willPreserveConsecutiveUppercase: true }), '桑德在这里。');
});

test('camelCase with both pascalCase and preserveConsecutiveUppercase option', t => {
  expect(
    camelCase('foo-BAR', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR',
  );
  expect(
    camelCase('fooBAR', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR',
  );
  expect(
    camelCase('fooBaR', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBaR',
  );
  expect(
    camelCase('fOÈ-BAR', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FOÈBAR',
  );
  expect(
    camelCase('--foo.BAR', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR',
  );
  expect(
    camelCase(['Foo', 'BAR'], { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR',
  );
  expect(
    camelCase(['foo', '-BAR'], { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR',
  );
  expect(
    camelCase(['foo', '-BAR', 'baz'], {
      isPascalCase: true,
      willPreserveConsecutiveUppercase: true,
    }),
    'FooBARBaz',
  );
  expect(camelCase(['', ''], { isPascalCase: true, willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('--', { isPascalCase: true, willPreserveConsecutiveUppercase: true }), '');
  expect(camelCase('', { isPascalCase: true, willPreserveConsecutiveUppercase: true }), '');
  expect(
    camelCase('--__--_--_', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    '',
  );
  expect(
    camelCase(['---_', '--', '', '-_- '], {
      isPascalCase: true,
      willPreserveConsecutiveUppercase: true,
    }),
    '',
  );
  expect(
    camelCase('foo BAR?', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR?',
  );
  expect(
    camelCase('foo BAR!', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR!',
  );
  expect(
    camelCase('Foo BAR$', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR$',
  );
  expect(
    camelCase('foo-BAR#', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'FooBAR#',
  );
  expect(
    camelCase('xMLHttpRequest', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'XMLHttpRequest',
  );
  expect(
    camelCase('ajaxXMLHttpRequest', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'AjaxXMLHttpRequest',
  );
  expect(
    camelCase('Ajax-XMLHttpRequest', {
      isPascalCase: true,
      willPreserveConsecutiveUppercase: true,
    }),
    'AjaxXMLHttpRequest',
  );
  expect(camelCase([], { isPascalCase: true, willPreserveConsecutiveUppercase: true }), '');
  expect(
    camelCase('mGridCOl6@md', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'MGridCOl6@md',
  );
  expect(camelCase('A::a', { isPascalCase: true, willPreserveConsecutiveUppercase: true }), 'A::a');
  expect(
    camelCase('Hello1WORLD', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'Hello1WORLD',
  );
  expect(
    camelCase('Hello11WORLD', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    'Hello11WORLD',
  );
  expect(
    camelCase('pозовыйПушистыйFOOдинорогиf', {
      isPascalCase: true,
      willPreserveConsecutiveUppercase: true,
    }),
    'PозовыйПушистыйFOOдинорогиf',
  );
  expect(
    camelCase('桑德在这里。', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    '桑德在这里。',
  );
  expect(
    camelCase('桑德_在这里。', { isPascalCase: true, willPreserveConsecutiveUppercase: true }),
    '桑德在这里。',
  );
});

test('camelCase with locale option', t => {
  expect(camelCase('lorem-ipsum', { locale: 'tr-TR' }), 'loremİpsum');
  expect(camelCase('lorem-ipsum', { locale: 'en-EN' }), 'loremIpsum');
  expect(camelCase('lorem-ipsum', { locale: ['tr', 'TR', 'tr-TR'] }), 'loremİpsum');
  expect(camelCase('lorem-ipsum', { locale: ['en-EN', 'en-GB'] }), 'loremIpsum');
  expect(camelCase('ipsum-dolor', { isPascalCase: true, locale: 'tr-TR' }), 'İpsumDolor');
  expect(camelCase('ipsum-dolor', { isPascalCase: true, locale: 'en-EN' }), 'IpsumDolor');
  expect(
    camelCase('ipsum-dolor', { isPascalCase: true, locale: ['tr', 'TR', 'tr-TR'] }),
    'İpsumDolor',
  );
  expect(
    camelCase('ipsum-dolor', { isPascalCase: true, locale: ['en-EN', 'en-GB'] }),
    'IpsumDolor',
  );
});

test('invalid input', t => {
  t.throws(() => {
    camelCase(1);
  }, /Expected the input to be/);
});
