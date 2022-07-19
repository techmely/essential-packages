import { getTsupOptions } from '@techmely/build-configs';
import { defineConfig } from 'tsup';
import pkg from './package.json';

const universalOptions = getTsupOptions(pkg, {
  tsupOptions: {
    splitting: false,
    target: 'node16',
    entry: ['src/*.ts', 'src/**/*.ts']
  }
});

// const nodeOptions = getTsupOptions(pkg, {});
// const vendorOptions = getTsupOptions(pkg, {
//   tsupOptions: {
//     outDir: 'vendor',
//     target: 'node16',
//     entry: ['src/vendor/*.ts']
//   }
// });

export default defineConfig([universalOptions]);
