// import { getTsupOptions } from '@techmely/build-configs';
// import { defineConfig } from 'tsup';
// import pkg from './package.json';

// export default defineConfig(getTsupOptions(pkg));

import { defineConfig, Options } from 'tsup';
import pkg from './package.json';

const external = [...new Set(Object.keys(pkg?.peerDependencies ?? {}))];

const universalOptions: Options = {
  target: 'node16',
  entry: ['src/*.ts', 'src/**/*.ts'],
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  outDir: 'build',
  external,
  clean: true
};

export default defineConfig([universalOptions]);
