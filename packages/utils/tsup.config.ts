import { getTsupOptions } from '@techmely/build-configs';
import { defineConfig } from 'tsup';
import pkg from './package.json';

const options = getTsupOptions(pkg, {
  tsupOptions: {
    minify: true,
    splitting: true,
    target: 'node16',
    entry: ['src/*.ts', 'src/**/*.ts']
  }
});

export default defineConfig(options);
