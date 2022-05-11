import { getTsupOptions } from '@techmely/build-configs';
import { defineConfig } from 'tsup';
import pkg from './package.json';

const options = getTsupOptions(pkg, {
  tsupOptions: {
    minify: true,
    target: 'node14',
    entry: [
      'src/**/index.ts',
      'src/index.ts',
      'src/colors.ts',
      'src/compat.ts',
      'src/generate.ts',
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

export default defineConfig(options);
