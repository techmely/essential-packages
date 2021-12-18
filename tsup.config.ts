import { Options } from 'tsup';

import pkg from './package.json';

const external = [
  ...new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]),
];
const isProd = process.env.NODE_ENV === 'production';

const options: Options = {
  entryPoints: ['src'],
  format: ['cjs', 'esm'],
  pure: isProd ? ['console.log', 'console.warn', 'debugger'] : undefined,
  sourcemap: !isProd,
  splitting: false,
  external,
  ignoreWatch: ['**/{.git,node_modules}/**', 'dist', 'src/**/*.spec.ts'],
};

export default options;
