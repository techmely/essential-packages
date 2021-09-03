import { Options } from 'tsup';

export default function getTsupOptions(pkg: any) {
  const external = [...new Set(Object.keys(pkg.peerDependencies ?? {}))];
  const isProd = process.env.NODE_ENV === 'production';

  const options: Options = {
    entryPoints: ['src/index.ts'],
    format: ['cjs', 'esm'],
    pure: isProd ? ['console.log', 'console.warn', 'debugger'] : undefined,
    sourcemap: !isProd,
    splitting: false,
    external,
    ignoreWatch: ['**/{.git,node_modules}/**', 'dist', 'src/**/*.spec.ts'],
  };
  return options;
}
