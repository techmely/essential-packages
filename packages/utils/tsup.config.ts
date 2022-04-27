import { getTsupOptions } from '@techmely/build-configs';
import { defineConfig } from 'tsup';
import pkg from './package.json';

const options = getTsupOptions(pkg, {
  tsupOptions: {
    minify: true,
    target: 'node14',
    entry: [
      'src/files',
      'src/helpers',
      'src/is',
      'src/math',
      'src/transform',
      'src/services',
      'src/vendor/dayjs.ts',
      'src/vendor/excel.ts',
      'src/vendor/jwt.ts',
      'src/index.ts',
      'src/colors.ts',
      'src/compat.ts',
      'src/generate.ts',
      'src/appMetadata.ts',
      'src/hasProp.ts',
      'src/validators.ts',
      'src/array.ts',
      'src/date.ts',
      'src/number.ts',
      'src/object.ts',
      'src/string.ts',
      'src/vector.ts'
    ]
  }
});
console.log('options', options);

export default defineConfig(options);
